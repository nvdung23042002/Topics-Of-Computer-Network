import Http from '@/http'
import { IBetResult, ProductAuction, ProductHistoryResponse, ProductWish, ResponsePagination } from './dto/history'
import { AxiosError } from 'axios'

class HistoryService {
  private static _instance: HistoryService

  static getInstance() {
    if (this._instance) {
      return this._instance
    }
    return (this._instance = new HistoryService())
  }

  async getOwnedItems(query: { langKey: string; page: number; limit: number }): Promise<ProductHistoryResponse> {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).get(
      `/user/product/list-owned?sortBy=NEWEST_TO_OLDEST&findType=OWNED&${parameters}`
    )
    return data
  }
  async getSellingItems(query: { langKey: string; page: number; limit: number }) {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).get(
      `/user/product/list-owned?sortBy=NEWEST_TO_OLDEST&findType=RESELL&${parameters}`
    )
    return data
  }
  async getResaleOfferItems(query: { langKey: string; page: number; limit: number }) {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).get(
      `/user/product/list-owned?sortBy=NEWEST_TO_OLDEST&findType=OFFER&${parameters}`
    )
    return data
  }
  async getResoldItems(query: { langKey: string; page: number; limit: number }) {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).get(
      `/user/product/list-owned?sortBy=NEWEST_TO_OLDEST&findType=SOLD&${parameters}`
    )
    return data
  }
  async getTransactionHistoryOfUser(query: { langKey: string; page: number; limit: number }): Promise<{
    limit: number
    page: number
    records: any[]
    total: number
    totalPage: number
  }> {
    const parameters = new URLSearchParams(query as any)
    return await Http.getInstance('main', true).get(`/user/product/user-product-transaction-history?${parameters}`)
  }
  async getMyAuction(query: {
    langKey: string
    page: number
    limit: number
  }): Promise<ResponsePagination & { result: ProductAuction[] }> {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).get(`/user/product/auction?${parameters}`)
    return data
  }
  async getWishProduct(query: {
    langKey: string
    page: number
    limit: number
  }): Promise<ResponsePagination & { result: ProductWish[] }> {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).get(`/user/product/wish?findType=MOST_WISH&${parameters}`)
    return data
  }
  async getHistoryDeposit(query: {
    langKey: string
    page: number
    limit: number
  }): Promise<{ result: []; pages: number; page: number; total: number; limit: number }> {
    const parameters = new URLSearchParams(query as any)
    return await Http.getInstance('main', true).get(`/user/get-history-deposit?${parameters}`)
  }
  async getHistoryWithdrawal(query: {
    langKey: string
    page: number
    limit: number
  }): Promise<{ result: []; pages: number; page: number; total: number; limit: number }> {
    const parameters = new URLSearchParams(query as any)
    return await Http.getInstance('main', true).get(`/user/get-history-withdraw?${parameters}`)
  }
  async getAffiliateHistoryRegister(query: {
    page: number
    limit: number
  }): Promise<{ records: []; totalPage: number; page: number; total: number; limit: number }> {
    const parameters = new URLSearchParams(query as any)
    return await Http.getInstance('main', true).get(`/user/affiliate/history-register?${parameters}`)
  }
  async insertAffiliateCode(payload: { affiliateCode: string }) {
    try {
      const { data } = await Http.getInstance('main', true).post(`/user/affiliate/insert-code`, payload)
      return data
    } catch (error) {
      if (error instanceof AxiosError) throw error.response?.data
    }
  }
  async getAffiliateInfo(): Promise<any> {
    return await Http.getInstance('main', true).get(`/user/affiliate/get-affiliate-info`)
  }
  async getMyBetResult(query: { status: string; page: number; limit: number; langKey: string }): Promise<{
    total: number
    limit: number
    pages: number
    page: number
    result: IBetResult[]
    sumTicket: number
    sumExpectedAmount: number
    sumActualAmount: number
  }> {
    const parameters = new URLSearchParams(query as any)
    const { data } = await Http.getInstance('main', true).get(`/user/bet/get-my-bet-result?${parameters}`)
    return data
  }
  async getShopOnlineHistory(query: {
    // langKey: string
    status: string
    page: number
    limit: number
  }): Promise<{ result: []; pages: number; page: number; total: number; limit: number }> {
    const parameters = new URLSearchParams(query as any)
    return await Http.getInstance('main', true).get(`/user/shopping-order/history-order?${parameters}`)
  }
  async getShopOnlineHistoryDetail(id: number): Promise<any> {
    return await Http.getInstance('main', true).get(`/user/shopping-order/history-details-order/${id}`)
  }
  async registerResale(
    payload: {
      resellType: string
      approvePublicAddress: string
      productResellId: number
      currency: string
      commissionFee: number
      adminPercent: number
      maxQuantity: number
    },
    id: number
  ): Promise<any> {
    return await Http.getInstance('main', true).post(`user/product/register-resell/${id}`, payload)
  }
  async cancelResale(productId: any): Promise<any> {
    return await Http.getInstance('main', true).put(`user/product/${productId}/cancel-resell`)
  }
  async cancelBid({ productId, id, ...payload }) {
    const { data } = await Http.getInstance('main', true).put(
      `/user/purchase/product/${productId}/cancel-bid/${id}`,
      payload
    )
    return data
  }
  async updateStatusOffer(productId: string, payload: { canOfferFlag: boolean }) {
    const { data } = await Http.getInstance('main', true).put(`/user/product/${productId}/active-offer`, payload)
    return data
  }
}
export default HistoryService.getInstance()
