import Http from '@/http'
import {
  AuthType,
  IPayloadPaymentDepositTWG,
  IPayloadPaymentRequestTWG,
  IWithdrawalPayload,
  PriceRate,
  ResponsePagination
} from './dto'
import axios from 'axios'
import Config from '@/config'
type PreSigned = {
  preSignedURL: string
  url: string
}
class NSBService {
  private static _instance: NSBService

  static getInstance() {
    if (this._instance) {
      return this._instance
    }
    return (this._instance = new NSBService())
  }

  async login(payload: any): Promise<AuthType> {
    const { data } = await Http.getInstance('main').post(`/user/authentication/web3auth/sign-in`, payload)
    return data
  }

  async getPriceRate(): Promise<PriceRate[]> {
    const { data } = await Http.getInstance('main').get(`/user/product/price-rate`)
    return data
  }

  async getMatchDetail(payload: any): Promise<any> {
    const { matchId, langKey } = payload
    const data = await Http.getInstance('main').get(`/user/bet/get-details-bet?matchId=${matchId}&langKey=${langKey}`)

    return data
  }

  async getMatchDetailGlobal(payload: any): Promise<any> {
    const { matchId, langKey, methodBet } = payload
    const data = await Http.getInstance('main').get(
      `/user/bet-global/get-details-bet?matchId=${matchId}&langKey=${langKey}&methodBet=${methodBet}`
    )

    return data
  }

  async getMatchList(payload: any): Promise<any> {
    const { langKey } = payload
    const data = await Http.getInstance('main').get(`/user/bet/get-info-bet?langKey=${langKey}`)

    return data
  }

  async getGlobalMatchList(payload: any): Promise<any> {
    const { langKey, methodBet } = payload
    const data = await Http.getInstance('main').get(
      `/user/bet-global/get-match?langKey=${langKey}&methodBet=${methodBet}`
    )

    return data
  }

  async getTicketsToPrice(payload: any): Promise<any> {
    const response = await Http.getInstance('main').get('/user/product/price-rate', payload)
    return response
  }

  async web3AuthSignIn(payload: any): Promise<any> {
    const response = await Http.getInstance('main').post('/user/authentication/web3auth/sign-in', payload)
    return response
  }

  async createBetUser(payload: any): Promise<any> {
    const response = await Http.getInstance('main', true).post('/user/bet/create-bet-user', payload)
    return response
  }

  // global- pool
  async createPoolBet(payload: any): Promise<any> {
    const response = await Http.getInstance('main', true).post(
      '/user/bet-global/create-bet-user-pool?methodBet=BET_POOL',
      payload
    )
    return response
  }

  // global- normal
  async createNormalBet(payload: any): Promise<any> {
    const response = await Http.getInstance('main', true).post(
      '/user/bet-global/create-bet-user-normal?methodBet=BET_NORMAL',
      payload
    )
    return response
  }

  async paymentAccountBalance(query: { amountTicket: number }) {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).post(`/user/payment-account-balance?${parameters}`)
    return data
  }

  async paymentSlash(query: { amount: number; langKey: string }) {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).post(`/user/payment-slash?${parameters}`)
    return data
  }
  async paymentStripe(query: { amount: number; langKey: string; redirectType: any; matchId: any }) {
    const { amount, langKey, redirectType, matchId } = query || {}
    let newQuery: any

    if (query.redirectType === 'MATCH_DETAIL') {
      newQuery = {
        amount,
        langKey,
        redirectType,
        matchId
      }
    } else {
      newQuery = {
        amount,
        langKey,
        redirectType
      }
    }

    const parameters = new URLSearchParams(newQuery as any)
    const { data } = await Http.getInstance('main', true).post(`/user/payment-stripe?${parameters}`)
    return data
  }
  async paymentTGW(query: {
    transaction_id: string
    system_transaction_id: string
    reference_number: string
    confirmation_number: string
    amount_requested: string
    date_requested: string
    amount_deposited: string
    date_deposited: string
    status: string
    type: string
  }) {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).post(`/user/payment-tgw?${parameters}`)
    return data
  }

  async getMyBetProcessTab(payload: any): Promise<any> {
    const { status, page, limit } = payload
    const response = await Http.getInstance('main', true).get(
      `/user/bet/get-my-bet-result?status=${status}&page=${page}&limit=${limit}`
    )
    return response
  }

  // global
  async getGlobalMyBetProcessTab(payload: any): Promise<any> {
    const { status, page, limit, methodBet } = payload
    const response = await Http.getInstance('main', true).get(
      `/user/bet-global/get-my-bet-result?status=${status}&methodBet=${methodBet}&page=${page}&limit=${limit}`
    )
    return response
  }

  async withdrawalTGW(payload: IWithdrawalPayload): Promise<any> {
    const response = await Http.getInstance('main', true).post('/user/withdraw-tgw', payload)
    return response
  }
  async PaymentRequestTWG(payload: IPayloadPaymentRequestTWG): Promise<any> {
    const response = await Http.getInstance('main', true).post('/user/payment-request-tgw', payload)
    return response
  }
  async PaymentDepositTWG(payload: IPayloadPaymentDepositTWG): Promise<any> {
    const response = await Http.getInstance('main', true).post('/user/payment-deposit-tgw', payload)
    return response
  }

  async GetFighterList(payload: any): Promise<any> {
    const filteredParams: any = Object.fromEntries(Object.entries(payload).filter(([key, value]) => value))
    const baseUrl = '/user/fighter/get-fighter-list'
    const url = baseUrl + '?' + new URLSearchParams(filteredParams).toString()

    const response = await Http.getInstance('main', false).get(url, payload)
    return response
  }

  async GetFighterDetail(payload: any): Promise<any> {
    const { fighterId } = payload
    const response = await Http.getInstance('main', false).get(`/user/fighter/details?fighterId=${fighterId}`, payload)
    return response
  }

  async getBanner(payload: any): Promise<any> {
    const response = await Http.getInstance('main', false).get('/user/banner', payload)
    return response
  }
  async getListBankByUser(): Promise<ResponsePagination & { result: any[] }> {
    return await Http.getInstance('main', true).get('/user/withdrawal/get-list-bank-account')
  }
  async deleteBankUserById(id: string): Promise<any> {
    const response = await Http.getInstance('main', true).delete(`/user/withdrawal/delete-bank-account/${id}`)
    return response
  }

  async GetNewsList(payload: any): Promise<any> {
    const { page, limit, langKey } = payload
    const response = await Http.getInstance('main', false).get(
      `/user/news/list?page=${page}&limit=${limit}&langKey=${langKey}`
    )
    return response
  }

  async GetNewsDetail(payload: any): Promise<any> {
    const { id } = payload
    const response = await Http.getInstance('main', false).get(`/user/news/${id}`, payload)
    return response
  }

  async getNewListForDetail(payload: any): Promise<any> {
    const { page, limit, langKey } = payload
    const response = await Http.getInstance('main').get(
      `user/news/list-for-details?langKey=${langKey}&page=${page}&limit=${limit}`,
      payload
    )
    return response
  }

  async GetTournaments(payload: any): Promise<any> {
    const response = await Http.getInstance('main', false).get('/user/bet/get-tournaments', payload)
    return response
  }

  async GetGlobalTournaments(payload: { methodBet: string }): Promise<any> {
    const { methodBet } = payload
    const response = await Http.getInstance('main', false).get(
      `/user/bet-global/get-tournaments?methodBet=${methodBet}`
    )
    return response
  }

  async GetDetailSponsorBet(payload: any): Promise<any> {
    const { sponsorId } = payload
    const response = await Http.getInstance('main', true).get(`/sponsor/homepage-user/get?sponsorId=${sponsorId}`)
    return response
  }
  async getTicketUserInfo(): Promise<any> {
    const { data } = await Http.getInstance('main', true).get(`/user/get-ticket`)
    return data
  }
  async upload(files: File[], type: string) {
    const signedPayload = Array.from(files).map((file) => {
      const fileNamePaths = file.name.split('.')
      return {
        fileName: fileNamePaths[0],
        fileType: fileNamePaths[fileNamePaths.length - 1].toLowerCase(),
        imageFolderType: type
      }
    })
    const { data: signedResult }: { data: PreSigned[] } = await Http.getInstance('main', true).post(
      '/images/pre-signed',
      signedPayload
    )
    const promiseArray: Promise<any>[] = []

    signedResult?.forEach((item, index: any) => {
      promiseArray.push(
        Http.getInstance('external', signedPayload[index].fileType as any).put(item.preSignedURL, files[index])
      )
    })
    await Promise.all(promiseArray)

    return signedResult.map((item: any) => item.url)
  }
  async getUserProfile() {
    const { data } = await Http.getInstance('main', true).get('/user/profile/get-profile')
    return data
  }
  async getPrefectures() {
    const { data } = await Http.getInstance('main', true).get('/prefectures')
    return data
  }
  async editUserProfile(payload: any) {
    const { data } = await Http.getInstance('main', true).post('/user/profile/edit', payload)
    return data
  }
  async BuyTicketBySlash(query: { amount: number; redirectType: any; matchId: any }) {
    const { amount, redirectType, matchId } = query || {}
    let newQuery: any

    if (query.redirectType === 'MATCH_DETAIL') {
      newQuery = {
        amount,
        redirectType,
        matchId
      }
    } else {
      newQuery = {
        amount,
        redirectType
      }
    }

    const parameters = new URLSearchParams(newQuery as any)
    const { data } = await Http.getInstance('main', true).post(`/user/payment-slash-ticket?${parameters}`)
    return data
  }
  async CallbackPaymentSlash(payment_token) {
    const { data } = await Http.getInstance('main').get(`/user/payment-slash-redirect?payment_token=${payment_token}`)
    return data
  }
  async sendMailForgotPassword(payload: { email: string }) {
    const { data } = await Http.getInstance('main').post(`/user/authentication/forgot-password`, payload)
    return data
  }
  async changeSponsorPassword(resetToken: string, payload: { newPassword: string }) {
    const { data } = await axios.post(`${Config.API_URL}/user/authentication/change-password/${resetToken}`, payload)
    return data
  }
  async sendOTPEmail(payload: { email: string }) {
    const { data } = await Http.getInstance('main', true).post(`/user/profile/send-otp-email`, payload)
    return data
  }
  async sendOTPPhone(payload: { phonePrefix: string; phoneSuffix: string }) {
    const { data } = await Http.getInstance('main', true).post(`/user/profile/send-otp`, payload)
    return data
  }
  async verifyEmail(payload: { email: string; optEmail: string }) {
    const { data } = await Http.getInstance('main', true).post(`/user/profile/verify-email`, payload)
    return data
  }
  async verifyPhone(payload: { phonePrefix: string; phoneSuffix: string; otp: string }) {
    const { data } = await Http.getInstance('main', true).post(`/user/profile/verify-phone`, payload)
    return data
  }
  async getMatchAtHomePage() {
    const { data } = await Http.getInstance('main').get(`/user/bet/get-match-home-page`)
    return data
  }
  async getListCryptoUserAccount(): Promise<any> {
    return await Http.getInstance('main', true).get(`/user/withdrawal/get-list-crypto-account`)
  }
  async deleteCryptoUserAccount(id: string): Promise<any> {
    return await Http.getInstance('main', true).delete(`/user/withdrawal/delete-crypto-account/${id}`)
  }
  async withdrawCrypto(payload: {
    cryptoAmount: number
    currency: string
    jpyAmount: number
    saveHistory: boolean
    toPublicAddress: string
    gasData: any
  }): Promise<any> {
    return await Http.getInstance('main', true).post(`/user/withdraw-crypto`, payload)
  }
  async inquiry(payload: { fromEmail: string; titleEmail: string; contentEmail: string }) {
    return await Http.getInstance('main').post(`/user/profile/send-email-inquiry`, payload)
  }
  async checkExpireLinkResetPassword(token: string) {
    return await Http.getInstance('main').post(`/user/authentication/verify-token/${token}`)
  }
  async getGasCrypto(payload: { cryptoAmount: number; currency: string; jpyAmount: number; toPublicAddress: string }) {
    const { data } = await Http.getInstance('main', true).post(`/user/get-gas-crypto`, payload)
    return data
  }
  async getTerms(termType: string): Promise<any> {
    const params = new URLSearchParams({ termType }).toString()
    return await Http.getInstance('main', true).get(`/user/team-conditions/by-id?${params}`)
  }
}

export default NSBService.getInstance()
