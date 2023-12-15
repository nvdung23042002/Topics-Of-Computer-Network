import React, { ReactNode, useEffect, useRef } from 'react'
import { ModalStyled } from './styled'
import Typography from '../common/typography'
import { ModalProps } from 'antd'
import Button from '../common/button'
import CheckedIcon from '../icons/CheckedIcon'
import ErrorPopupIcon from '../icons/ErrorPopupIcon'
import WarningPopupIcon from '../icons/WarningPopupIcon'
import { useTranslation } from 'next-i18next'

interface CusModalProps extends ModalProps {
  content?: string | ReactNode
  subContent?: string | ReactNode
  theme?: 'success' | 'error' | 'warning' | 'info'
  ns?: string
}

export default (({ title, content, subContent, theme = 'success', ns, ...props }) => {
  const okBtnRef = useRef<any>(null)
  const { t } = useTranslation('common', { useSuspense: false })

  useEffect(() => {
    okBtnRef.current && okBtnRef.current.focus()
  }, [])

  return (
    <ModalStyled
      className={`theme ${props.className ?? ''}`}
      width={653}
      title={t(title as string) ?? ''}
      closable={false}
      destroyOnClose
      maskClosable={false}
      keyboard={false}
      centered
      {...props}
      footer={
        <>
          <Button
            ref={okBtnRef}
            className='ok-btn'
            shape='round'
            type='primary'
            onClick={(e: any) => props.onOk && props.onOk(e)}
          >
            {props.okText ?? t('OK', { ns: ns ?? 'common' })}
          </Button>
        </>
      }
    >
      {theme === 'success' && <CheckedIcon style={{ margin: '24px auto 32px' }} />}
      {theme === 'error' && <ErrorPopupIcon style={{ margin: '0 auto 8px' }} />}
      {theme === 'warning' && <WarningPopupIcon style={{ margin: '0 auto 8px' }} />}
      {content && (
        <>
          <Typography.Title level={5}>
            {ns && typeof content === 'string' ? t(content, { ns }) ?? '' : content}
          </Typography.Title>
        </>
      )}

      {subContent && (
        <>
          <Typography.Text>
            {ns && typeof subContent === 'string' ? t(subContent, { ns }) ?? '' : subContent}
          </Typography.Text>
        </>
      )}
    </ModalStyled>
  )
}) as React.FC<CusModalProps>
