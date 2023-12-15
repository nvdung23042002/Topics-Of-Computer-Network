import Web3RPC from '@/utils/web3'
export const getBalance = async () => {
  const balance = await Web3RPC.getBalance()
  return balance
}
