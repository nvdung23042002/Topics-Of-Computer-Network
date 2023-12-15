import axios, { AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'
import Config from '@/config'
import Storage from '@/utils/storage'
import { STORAGE_KEY } from '@/constants/common'

type ImageFormatType = {
  png: string
  jpeg: string
  jpg: string
  svg: string
  gif: string
}

const controller = new AbortController()
const TIMEOUT_REQUEST = 30000
const imageFormats: ImageFormatType = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  svg: 'image/svg+xml',
  gif: 'image/gif'
}
const configs: (
  token?: string,
  type?: 'main' | 'external',
  imgFormat?: keyof ImageFormatType
) => CreateAxiosDefaults<any> = (token, type, imgFormat = 'png') => ({
  baseURL: type === 'main' ? Config.API_URL : '',

  headers: {
    Accept: type === 'external' ? `*` : 'application/json',
    Authorization: token && type === 'main' ? `Bearer ${token}` : undefined,
    'Content-type': type === 'external' ? imageFormats[imgFormat] : 'application/json',
    'Accept-Language': 'ja|en'
  },
  timeout: type === 'main' ? TIMEOUT_REQUEST : undefined,
  signal: controller.signal
})
class API {
  static getInstance = (type: 'main' | 'external' = 'main', auth = false) => {
    const token = auth ? Storage().get(STORAGE_KEY.W3A_TOKEN)?.accessToken : undefined
    const axiosClient = axios.create(configs(token, type))
    if (type === 'main') {
      axiosClient.interceptors.request.use(
        function (config: InternalAxiosRequestConfig<any>) {
          return config
        },
        (err: any) => {
          return Promise.reject(err)
        }
      )
      axiosClient.interceptors.response.use(
        function (res: AxiosResponse<any, any>) {
          return res.data
        },
        (err: any) => {
          if ([401, 403].includes(err.response?.status)) {
            controller.abort()
            Storage().remove(STORAGE_KEY.W3A_TOKEN)
            window.location.replace('/')
          }
          return Promise.reject(err)
        }
      )
    }

    return axiosClient
  }

  static get(url: string, params?: any): Promise<AxiosResponse<any, any>> {
    return API.getInstance().request({
      method: 'GET',
      url,
      params
    })
  }

  static post(url: string, data: any, params?: any): Promise<AxiosResponse<any, any>> {
    return API.getInstance().request({
      method: 'POST',
      url,
      data,
      params
    })
  }

  static put(url: string, params: any, data: any): Promise<AxiosResponse<any, any>> {
    return API.getInstance().request({
      method: 'PUT',
      url,
      params,
      data
    })
  }

  static delete(url: string, params?: any): Promise<AxiosResponse<any, any>> {
    return API.getInstance().request({
      method: 'DELETE',
      url,
      params
    })
  }
}

export default API
