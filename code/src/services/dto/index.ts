export interface AuthType {
  token?: number
}

export interface PriceRate {
  name: string
  value: string
}

export interface IWithdrawalPayload {
  account_name: string
  account_number: number
  amount: number
  bank_code: number
  bank_name: string
  branch_code: number
  branch_name: string
  save_history: boolean
}

export interface IPayloadPaymentRequestTWG {
  amount: number
  email: string
  name: string
  phonePrefix: string
  phoneSuffix: string
}
export interface IPayloadPaymentDepositTWG {
  account_name: string
  account_number: string
  account_type?: string
  amount: number
  bank_name: string
  branch_code: string
  branch_name: string
  confirmation_number: string
  id: number
  reference_number: string
}

export interface ResponsePagination {
  limit: number
  page: number
  pages: number
  total: number
}

export interface Banner {
  id: number
  backgroundImage: string
  url: string
  position: number
  sponsorId: number
}
