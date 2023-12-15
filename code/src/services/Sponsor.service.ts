import Http from '@/http/sponsor'
import { LoginType, PaymentPayload, RegisterType, SponsorTransaction } from './dto/sponsor'

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

  async loginSponsor(payload: LoginType) {
    const { data } = await Http.getInstance('main').post(`/user/authentication/login-sponsor`, payload)
    return data
  }
  async refreshTokenSponsor(payload: { refreshToken: string }) {
    const { data } = await Http.getInstance('main').post(`user/authentication/access-token`, payload)
    return data
  }
  async registerSponsor(payload: RegisterType) {
    const { data } = await Http.getInstance('main').post(`/user/authentication/register-sponsor`, payload)
    return data
  }
  async getSponsorTournament() {
    const { data } = await Http.getInstance('main', true).get(`/sponsor/get-sponsor-tournament`)
    return data
  }
  async getSponsorMatch() {
    const { data } = await Http.getInstance('main', true).get(`/sponsor/get-sponsor-match`)
    return data
  }
  async createSponsorTransaction(payload: SponsorTransaction[]) {
    const { data } = await Http.getInstance('main', true).post(`sponsor/create-sponsor-transaction`, payload)
    return data
  }
  async getSponsorTransaction(params: { limit: number; page: number }) {
    const data = await Http.getInstance('main', true).get(`/sponsor/get-sponsor-transaction`, { params })
    return data
  }
  async getSponsorPayment(params: { limit: number; page: number }) {
    const data = await Http.getInstance('main', true).get(`/sponsor/get-payment-history`, { params })
    return data
  }
  async payment(payload: PaymentPayload) {
    const data = await Http.getInstance('main', true).post(`/sponsor/create-payment-transaction`, payload)
    return data
  }
  async getProfile() {
    const data = await Http.getInstance('main', true).get(`/sponsor/profile/get`)
    return data
  }
  async updateProfile(payload: PaymentPayload) {
    const data = await Http.getInstance('main', true).post(`/sponsor/profile/edit`, payload)
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

  async changePasswordSponsorProfile(payload: { password: string }, sponsorId: string) {
    const response = await Http.getInstance('main', true).put(`/sponsor/change-password/${sponsorId}`, payload)
    return response
  }

  async SponsorHomepageList(payload: any): Promise<any> {
    const { page, limit } = payload
    const response = await Http.getInstance('main', true).get(`/sponsor/homepage/list?page=${page}&limit=${limit}`)
    return response
  }

  async GetDetailTemplate(payload: any): Promise<any> {
    const { id } = payload
    const response = await Http.getInstance('main', true).get(`/sponsor/homepage/${id}`)
    return response
  }

  async SaveTemplateHomepage(payload: any): Promise<any> {
    const response = await Http.getInstance('main', true).post('/sponsor/homepage/edit', payload)
    return response
  }

  async verifyAccount(payload: any): Promise<any> {
    return await Http.getInstance('main').post('/user/authentication/verify-email-sponsor', payload)
  }

  async getSponsorDetail(sponsorId: any): Promise<any> {
    const params = new URLSearchParams({ sponsorId }).toString()
    return await Http.getInstance('main').get(`/sponsor/homepage-user/get?${params}`)
  }

  async getTerms(termType: string): Promise<any> {
    const params = new URLSearchParams({ termType }).toString()
    return await Http.getInstance('main', true).get(`/user/team-conditions/by-id?${params}`)
  }
}
export default NSBService.getInstance()
