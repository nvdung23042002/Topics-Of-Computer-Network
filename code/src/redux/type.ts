export interface ResponseGenerator {
  config?: any
  data?: any
  headers?: any
  request?: any
  status?: number
  statusText?: string
  meta?: any
  email?: any
  code?: any
}

export interface SignInParams {
  email: string
  fullName: string
  phone: number
  profileImage: string
  publicKey: string
  tokenId: string
  typeLogin: string
}
