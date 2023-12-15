import { useAppSelector } from '@/hooks/store'
import Confirm from './confirm'
import Notification from './notification'
import { ReactNode, memo } from 'react'

export type ModalPropsType = {
  type: 'confirmation' | 'notification'
  theme?: 'success' | 'error' | 'warning' | 'info'
  title?: string | ReactNode
  content?: string | ReactNode
  subContent?: string | ReactNode
  open?: boolean
  cancelText?: string
  okText?: string
  confirmLoading?: boolean
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default memo(() => {
  const modal = useAppSelector((state) => state.app.modal)

  return modal?.type ? (
    {
      confirmation: <Confirm {...modal} />,
      notification: <Notification {...modal} />
    }[modal?.type]
  ) : (
    <></>
  )
}) as React.FC
