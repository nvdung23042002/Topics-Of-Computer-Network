import Config from '@/config'
import abi from '@/constants/abi'
import Web3 from 'web3'

export default class Web3RPC {
  public static provider: any
  static setProvider(provider: any) {
    Web3RPC.provider = provider
  }

  static async disconnectMetamask() {
    try {
      const web3: any = new Web3(Web3RPC.provider)
      if (web3) {
        web3.ethereum.disconnect()
      }
    } catch (error) {
      return error
    }
  }

  static async getSignature(originalMessage: string) {
    try {
      const web3: any = new Web3(Web3RPC.provider)
      const fromAddress = (await web3.eth.getAccounts())[0]
      const signedMessage = await web3.eth.personal.sign(originalMessage, fromAddress)

      return signedMessage
    } catch (error) {
      return error
    }
  }

  static async getChainId() {
    try {
      const web3 = new Web3(Web3RPC.provider)
      const chainId = await web3.eth.getChainId()

      return chainId.toString()
    } catch (error) {
      return error
    }
  }

  static async getAccounts() {
    try {
      const web3 = new Web3(Web3RPC.provider)
      const address = (await web3.eth.getAccounts())[0]
      return address
    } catch (error) {
      return error
    }
  }
  static async getBalance() {
    try {
      const web3 = new Web3(Web3RPC.provider)
      const address = (await web3.eth.getAccounts())[0]

      const balance = web3.utils.fromWei(await web3.eth.getBalance(address))

      return balance
    } catch (error) {
      return error
    }
  }

  static async sendTransaction() {
    try {
      const web3 = new Web3(Web3RPC.provider)
      const fromAddress = (await web3.eth.getAccounts())[0]
      const destination = fromAddress
      const amount = web3.utils.toWei('0.001')

      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: amount,
        maxPriorityFeePerGas: '5000000000', // Max priority fee per gas
        maxFeePerGas: '6000000000000' // Max fee per gas
      })

      return receipt
    } catch (error) {
      return error
    }
  }
  static async getInstanceWeb3() {
    try {
      const web3 = new Web3(Web3RPC.provider)
      return new web3.eth.Contract(abi as any, Config.NSB_ERC721A_CONTRACT_ADDRESS)
    } catch (error) {
      return error
    }
  }
  static async sendContractTransaction() {
    try {
      const web3 = new Web3(Web3RPC.provider)

      const tokenContract: any = new web3.eth.Contract(abi as any, '0x07920F6d18464E56Da438D1ffF38f125C8AB90dD')

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0]

      const destination = fromAddress

      //dsdf
      const response = await tokenContract.methods
        .approve('0xd1d25EAc33401b97568869564ee4ba6e259DCB35', '100000000000000000000000000')
        .send(
          {
            from: fromAddress
          },
          function (error: any, transactionHash: any) {
            if (transactionHash) {
              console.log(transactionHash)

              // setApproveCase(3);
            } else {
              console.log(error)
            }
          }
        )
        .on('receipt', async function (receipt: any) {
          console.log(receipt)
        })
        .on('error', async function (error: any) {
          console.log(error)
        })
      // Submit transaction to the blockchain and wait for it to be mined
      //   const receipt = await web3.eth.sendTransaction({
      //     from: fromAddress,
      //     to: destination,
      //     value: amount,
      //     maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
      //     maxFeePerGas: "6000000000000", // Max fee per gas
      //   });

      return response
    } catch (error) {
      return error
    }
  }

  static async getPrivateKey() {
    try {
      const privateKey = await Web3RPC.provider.request({
        method: 'eth_private_key'
      })

      return privateKey
    } catch (error) {
      return error
    }
  }
}
