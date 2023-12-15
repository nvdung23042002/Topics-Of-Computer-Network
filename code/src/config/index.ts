declare global {
  interface Window {
    _CONFIG?: any
  }
}

type T = {
  ENV: string
  API_URL: string
  TOAST_DURATION: number
  MAXIMUM_DECIMAL_PLACEMENT: number
  MODE: string
  EXCHANGE_CONTRACT_ADDRESS: string
  NSB_ERC721A_CONTRACT_ADDRESS: string
  AMOUNT_MAX: string
  NSB_EXCHANGE_PROXY_CONTRACT_ADDRESS: string
  WETH_CONTRACT_ADDRESS: string
  RPC_TARGET: string
  NETWORK_NAME: string
  BLOCK_EXPLORER: string
  FIREBASE_CONFIG_API_KEY: string
  FIREBASE_CONFIG_AUTH_DOMAIN: string
  FIREBASE_CONFIG_PROJECT_ID: string
  WEB3AUTH_CLIENT_ID: string
  WEB3AUTH_GLOBAL_CLIENT_ID: string
  RPC_END_POINT: string
  API_NODE_URL: string
  CHAIN_ID: string
  MAX_TEXT_LENGTH: number
  MAX_NUMBER: number
  APP_URL: string
  APP_URL_GLOBAL: string
  WEB3AUTH_SESSION_DAY: number
  WEB3AUTH_NETWORK: any
  SIMPLE_AUCTION_CONTRACT_ADDRESS: string
  MAX_FILE_SIZE: number
  PRIVATE_KEY: string
  WETH_ADDRESS: string
  CHECK_ACCOUNT_URL: string
  CHECK_BLOCKCHAIN_URL: string
}

const Config: T = window._CONFIG?.split('\n')?.reduce((obj: Partial<T>, item: string) => {
  const [key, value] = item.split('=')
  obj[key] = /^\d*$/.test(value) ? Number(value) : value

  return obj
}, {})
export default Config
