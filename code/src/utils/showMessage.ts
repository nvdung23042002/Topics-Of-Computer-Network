import { destroyModal, onModal } from '@/redux/app/slice'
import store from '@/redux/store'
import { ReactNode } from 'react'
import { commonErrors } from './getError'

export type MessageContent = Partial<{
  success: string | ReactNode | undefined
  error: string | ReactNode | undefined
  info: string | ReactNode | undefined
  warning: string | ReactNode | undefined
}>

export default async (message: MessageContent, onOk?: () => void, nsTrans?: string, okText?: string) => {
  const type: string = Object.keys(message)[0]
  const ns = commonErrors.includes(message.error as string) ? 'error-message' : nsTrans

  if (Object.values(message)?.filter((item) => item)?.length) {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        switch (type) {
          case 'success':
            store.dispatch(
              onModal({
                type: 'notification',
                theme: 'success',
                title: 'SUCCESS',
                subContent: message.success,
                ns,
                okText,
                onOk: () => {
                  onOk && onOk()
                  store.dispatch(destroyModal())
                }
              })
            )
            break
          case 'error':
            store.dispatch(
              onModal({
                type: 'notification',
                theme: 'error',
                title: 'ERROR',
                subContent: message.error,
                ns,
                okText,
                onOk: () => {
                  onOk && onOk()
                  store.dispatch(destroyModal())
                }
              })
            )
            break
          case 'warning':
            store.dispatch(
              onModal({
                type: 'notification',
                theme: 'warning',
                title: 'WARNING',
                okText,
                subContent: message.warning,
                ns,
                onOk: () => {
                  onOk && onOk()
                  store.dispatch(destroyModal())
                }
              })
            )
            break
          case 'info':
            store.dispatch(
              onModal({
                type: 'notification',
                theme: 'info',
                title: 'INFO',
                subContent: message.info,
                okText,
                ns,
                onOk: () => {
                  onOk && onOk()
                  store.dispatch(destroyModal())
                }
              })
            )
            break
          default:
            break
        }
        resolve(true)
      }, 0)
    })
  }
}
