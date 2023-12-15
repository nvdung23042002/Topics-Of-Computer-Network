import Config from '@/config'
import { message } from 'antd'

export default class {
  constructor(content: string | undefined, key?: string, duration = Config.TOAST_DURATION) {
    message.open({
      key,
      type: 'info',
      duration,
      content
    })
  }

  static loading(content: string | null = 'Processing...', key?: string) {
    message.open({
      key,
      type: 'loading',
      duration: 0,
      content: content
    })
  }
  static success(content: string | undefined, key?: string, duration = Config.TOAST_DURATION) {
    message.open({
      key,
      type: 'success',
      duration,
      content
    })
  }
  static warning(content: string | undefined, key?: string, duration = Config.TOAST_DURATION) {
    message.open({
      key,
      type: 'warning',
      duration,
      content
    })
  }

  static error(content: string | undefined, key?: string, duration = Config.TOAST_DURATION) {
    message.open({
      key,
      type: 'error',
      duration,
      content
    })
  }

  static destroy(key?: string) {
    message.destroy(key)
  }
}
