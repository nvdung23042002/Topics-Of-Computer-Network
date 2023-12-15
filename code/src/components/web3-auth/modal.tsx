import { Divider, Form, FormInstance, ModalProps } from 'antd'
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { ButtonSubmit, ContainerLogin, InputSendMailStyled, ModalStyled } from './styled'
import { useTranslation } from 'next-i18next'
import Typography from '../common/typography'
import Button from '../common/button'
import GoogleIcon from '../icons/GoogleIcon'
import FacebookIcon from '../icons/FacebookIcon'
import TwitterIcon from '../icons/TwitterIcon'
import DiscordIcon from '../icons/DiscordIcon'
import MailIcon from '../icons/MailIcon'
import CloseIcon from '../icons/CloseIcon'
import { Web3AuthParams } from '.'
import { Web3AuthNoModal } from '@web3auth/no-modal'

export type ModalHandle = {
  visible: () => void
  hidden: () => void
}
export interface ModalType extends ModalProps {
  onLogin: (type: Web3AuthParams) => void
  web3auth: Web3AuthNoModal | undefined
}

const SubmitButton = memo(({ form }: { form: FormInstance }) => {
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const { t } = useTranslation('common', { useSuspense: false })

  // Watch all values
  const values = Form.useWatch([], form)

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setCanSubmit(true)
      },
      () => {
        setCanSubmit(false)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <ButtonSubmit htmlType='submit' type='primary' shape={'round'} disabled={!canSubmit}>
      {t('CONTINUE_WITH_EMAIL')}
    </ButtonSubmit>
  )
})

export default forwardRef<ModalHandle, ModalType>(({ onLogin }, forwardRef) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { t } = useTranslation('common', { useSuspense: false })

  const close: () => void = useCallback(
    () => {
      setIsOpen(false)
      form.resetFields()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useImperativeHandle(
    forwardRef,
    () => ({
      visible() {
        setIsOpen(true)
      },
      hidden() {
        close()
      }
    }),
    [close]
  )

  return (
    <ModalStyled
      title={t('MEMBER_REGISTRATION')}
      open={isOpen}
      onCancel={close}
      destroyOnClose
      closeIcon={<CloseIcon />}
      width={500}
      maskClosable={false}
      keyboard={false}
      footer={false}
      centered
    >
      <ContainerLogin>
        <Typography.Text className='login-policy'>{t('CONNECT_YOUR_WALLET_POLICY')}</Typography.Text>
        <Typography.Title level={5}>{t('PLEASE_SELECT')}</Typography.Title>
        <div className='button-group'>
          <Button
            className='google'
            type='primary'
            shape={'round'}
            icon={<GoogleIcon />}
            onClick={() => {
              onLogin({ loginProvider: 'google' })
            }}
          >
            {t('CONTINUE_WITH_GOOGLE')}
          </Button>
          <Button
            className='facebook'
            type='primary'
            icon={<FacebookIcon />}
            onClick={() => {
              onLogin({ loginProvider: 'facebook' })
            }}
          />
          <Button
            className='twitter'
            type='primary'
            icon={<TwitterIcon />}
            onClick={() => {
              onLogin({ loginProvider: 'twitter' })
            }}
          />
          <Button
            className='discord'
            type='primary'
            icon={<DiscordIcon />}
            onClick={() => {
              onLogin({ loginProvider: 'discord' })
            }}
          />
        </div>
        <Divider>{t('OR')}</Divider>
        <Form
          form={form}
          onFinish={(value) => {
            onLogin({ loginProvider: 'email_passwordless', extraLoginOptions: { login_hint: value.email } })
          }}
        >
          <Form.Item
            name='email'
            rules={[
              { required: true, message: '' },
              {
                type: 'email',
                message: t('EMAIL_IS_NOT_VALID') ?? ''
              }
            ]}
            normalize={(value) => value?.trim()}
          >
            <InputSendMailStyled placeholder={t('ENTER_YOUR_EMAIL') ?? ''} prefix={<MailIcon />} />
          </Form.Item>
          <Form.Item>
            <SubmitButton form={form} />
          </Form.Item>
        </Form>
      </ContainerLogin>
    </ModalStyled>
  )
})
