import React, { ReactNode, useEffect, useRef } from 'react'
import { ModalConfirmStyled } from './styled'
import Typography from '../common/typography'
import { ModalProps } from 'antd'
import Button from '../common/button'
import { useTranslation } from 'next-i18next'

interface CusModalProps extends ModalProps {
  content?: string | ReactNode
  subContent?: string | ReactNode
  theme?: 'success' | 'error' | 'warning' | 'info'
}

export default (({ title, content, subContent, theme = 'success', ...props }) => {
  const okBtnRef = useRef<any>(null)
  const { t } = useTranslation('common', { useSuspense: false })

  useEffect(() => {
    okBtnRef.current && okBtnRef.current.focus()
  }, [])

  return (
    <ModalConfirmStyled
      className={`${theme}-theme ${props.className ?? ''}`}
      width={516}
      title={title}
      closable={false}
      destroyOnClose
      maskClosable={false}
      keyboard={false}
      centered
      {...props}
      footer={
        <>
          <Button className='cancel-btn' onClick={(e: any) => props.onCancel && props.onCancel(e as any)} shape='round'>
            {props.cancelText ?? t('CANCEL') ?? ''}
          </Button>

          <Button
            ref={okBtnRef}
            className='ok-btn'
            type='primary'
            onClick={(e: any) => props.onOk && props.onOk(e as any)}
            shape='round'
          >
            {props.okText ?? t('CONFIRM') ?? ''}
          </Button>
        </>
      }
    >
      {content && (
        <>
          <Typography.Title level={5}>{content}</Typography.Title>
        </>
      )}

      {subContent && (
        <>
          <Typography.Text>{subContent}</Typography.Text>
        </>
      )}
    </ModalConfirmStyled>
  )
}) as React.FC<CusModalProps>
