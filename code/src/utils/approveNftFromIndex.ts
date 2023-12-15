import { ethers } from 'ethers'
import NSB_ERC721A_ABI from '@/config/web3/NSB_ERC721A_ABI.json'

export const approveNftFromIndex = async (
  network,
  nftContractAddress,
  web3AuthKey,
  nftIndex,
  exchangeContractAddress
) => {
  // try {
  const provider = new ethers.providers.JsonRpcProvider(network)
  const wallet = new ethers.Wallet(web3AuthKey, provider)

  const nftContract = new ethers.Contract(nftContractAddress, NSB_ERC721A_ABI, wallet)
  const totalSupply = await nftContract.totalSupply()

  if (nftIndex <= Number(totalSupply)) {
    const [approveForAddress, ownerOf, callerAddress] = await Promise.all([
      nftContract.getApproved(nftIndex),
      nftContract.ownerOf(nftIndex),
      wallet.getAddress()
    ])
    if (ownerOf.toUpperCase() == callerAddress.toUpperCase()) {
      if (approveForAddress.toUpperCase() != exchangeContractAddress.toUpperCase()) {
        const [gasPrice, estimateGas, currentNonce] = await Promise.all([
          provider.getGasPrice(),
          nftContract.estimateGas.approve(exchangeContractAddress, nftIndex),
          provider.getTransactionCount(callerAddress)
        ])

        const transactionApprove = await nftContract.approve(exchangeContractAddress, nftIndex, {
          gasLimit: ethers.utils.hexlify(Math.ceil(Number(estimateGas) * 1.2)),
          gasPrice: ethers.utils.hexlify(Math.ceil(Number(gasPrice) * 1.2)),
          nonce: currentNonce
        })
        await transactionApprove.wait()
        // console.log('Transaction approve', transactionApprove.hash)
      } else {
        // throw new Error('You already approve this contract')
        // console.log('You already approve this contract')
      }
    } else {
      // ERROR_ARE_YOU_NOT_OWNER_NFT
      throw new Error('ERROR_ARE_YOU_NOT_OWNER_NFT')
      // console.log('Are you not owner this NFT')
    }
  } else {
    // ERROR_INVALID_TOKEN_ID
    throw new Error('ERROR_INVALID_TOKEN_ID')
    // console.log('Invalid Token Id')
  }
  // } catch (error) {
  //   // console.log(error)
  //   throw error
  // }
}
