import { ethers } from 'ethers'
import Config from '@/config'
import wethABI from '@/config/web3/WETH_API.json'

// export const cancelAuction = async (network, simpleAuctionContractAddress, web3AuthKey, auctionId) => {
//   const provider = new ethers.providers.JsonRpcProvider(network)
//   const wallet = new ethers.Wallet(web3AuthKey, provider)

//   const simpleAuction = new ethers.Contract(simpleAuctionContractAddress, SIMPLE_AUCTION_ABI, wallet)
//   const currentAddress = await wallet.getAddress()
//   console.log('Activate by address', currentAddress)

//   const [gasPrice, auctionInfos, auctionStatus, etmCancelAuction] = await Promise.all([
//     provider.getGasPrice(),
//     simpleAuction.getAuctionInfos(auctionId),
//     simpleAuction.checkAuctionTime(auctionId),
//     simpleAuction.estimateGas.cancelAuction(auctionId, { from: currentAddress })
//   ])

//   let isAlreadyJoined = false
//   for (let index = 0; index < auctionInfos.auctionsAddress.length; index++) {
//     if (auctionInfos.auctionsAddress[index] == currentAddress) {
//       isAlreadyJoined = true
//       break
//     }
//   }
//   if (Number(auctionStatus) == 1) {
//     if (isAlreadyJoined) {
//       const txCancelAuction = await simpleAuction.cancelAuction(auctionId, {
//         from: currentAddress,
//         gasLimit: ethers.utils.hexlify(Math.ceil(Number(etmCancelAuction) * 1.2)),
//         gasPrice: ethers.utils.hexlify(Math.ceil(Number(gasPrice) * 1.2))
//       })
//       await txCancelAuction.wait()
//       console.log('TxCancelAuction', txCancelAuction.hash)
//     } else {
//       // TODO: throw error: Auction must be in the PROCESSING status
//       throw new Error('USER_NOT_JOIN_THIS_AUCTION_YET')
//       // console.log('User not join this auction yet')
//     }
//   } else {
//     // TODO: throw error: Auction must be in the PROCESSING status
//     throw new Error('AUCTION_MUST_BE_IN_THE_PROCESSING_STATUS')

//     //   console.log('Auction must be in the PROCESSING status')
//   }
// }
export const getSigningByUser = async (privateKey, provider, guy, wad) => {
  const currentTime = Math.ceil(new Date().getTime() / 1000)
  const hash = ethers.utils.solidityKeccak256(['address', 'uint', 'uint'], [guy, wad, currentTime])
  const sigHashBytes = ethers.utils.arrayify(hash)
  const signingMessage = ethers.utils.hexlify(sigHashBytes)
  const wallet = new ethers.Wallet(privateKey, provider)
  const signature = await wallet.signMessage(ethers.utils.arrayify(signingMessage))
  return { currentTime: currentTime, signature: signature }
}

export const cancelAuction = async (rpcEndPoint, web3AuthKey, amount) => {
  const provider = new ethers.providers.JsonRpcProvider(rpcEndPoint)
  const wallet = new ethers.Wallet(web3AuthKey, provider)

  const wethContract = new ethers.Contract(Config.WETH_ADDRESS, wethABI, wallet)

  const [allowanceEx, balanceWeth, decimals, gasPrice] = await Promise.all([
    wethContract.allowance(wallet.address, Config.EXCHANGE_CONTRACT_ADDRESS),
    wethContract.balanceOf(wallet.address),
    wethContract.decimals(),
    provider.getGasPrice()
  ])

  const message = await getSigningByUser(Config.PRIVATE_KEY, provider, Config.EXCHANGE_CONTRACT_ADDRESS, '0')
  if (allowanceEx != 0) {
    const etmGas = await wethContract.estimateGas.approve(
      Config.EXCHANGE_CONTRACT_ADDRESS,
      '0',
      message.currentTime,
      message.signature,
      {
        from: wallet.address
      }
    )

    const txApprove = await wethContract.approve(
      Config.EXCHANGE_CONTRACT_ADDRESS,
      0,
      message.currentTime,
      message.signature,
      {
        gasLimit: ethers.utils.hexlify(Math.ceil(Number(etmGas) * 1.2)),
        gasPrice: ethers.utils.hexlify(Math.ceil(Number(gasPrice) * 1.2)),
        from: wallet.address
      }
    )
    await txApprove.wait()
    console.log('TxApproveHash', txApprove.hash)
  }
  const amountToWei = ethers.utils.parseUnits(amount, decimals)
  if (balanceWeth >= amountToWei) {
    const etmGas = await wethContract.estimateGas.withdraw(amountToWei, {
      from: wallet.address
    })
    const txWithdrawWeth = await wethContract.withdraw(amountToWei, {
      from: wallet.address
    })
    await txWithdrawWeth.wait()
    console.log('txWithdrawWeth hash', txWithdrawWeth.hash)
    return txWithdrawWeth.hash
  } else {
    throw Error('Balance WETH not enough')
    console.log('Balance WETH not enough')
  }
}
