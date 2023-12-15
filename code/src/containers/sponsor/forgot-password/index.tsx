import { Form, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { ButtonStyled, ContainerForm, ForgotPasswordContainer, LayoutAntStyled } from './styled'
import { useRouter } from 'next/router'
import Logo from '@/components/logo'
import Typography from '@/components/common/typography'
import Input from '@/components/common/form/Input'
import MailIcon from '@/components/icons/MailIcon'
import { useTranslation } from 'next-i18next'
import { AppRoutes } from '@/constants/routes'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import NSBService from '@/services/NSB.service'
import useModal from '@/hooks/useModal'
import { useAppSelector } from '@/hooks/store'

const SubmitButton = () => {
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const form = Form.useFormInstance()
  const { t } = useTranslation('forgot-password', { useSuspense: false })
  // Watch all values
  const values = Form.useWatch([], form)
  const haveValue = Form.useWatch('email', form)
  const navigate = useRouter()

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
    <div className='action-container'>
      <ButtonStyled htmlType='submit' type='primary' shape={'round'} disabled={!canSubmit || !haveValue}>
        {t('REQUEST_RESET_LINK')}
      </ButtonStyled>
      <ButtonStyled
        htmlType='button'
        shape={'round'}
        onClick={() => {
          navigate.push(AppRoutes.sponsorLogin)
        }}
      >
        {t('BACK_TO_SIGN_IN')}
      </ButtonStyled>
    </div>
  )
}
const CustomInput = ({ ...props }) => {
  const { t } = useTranslation('forgot-password', { useSuspense: false })
  const { status } = Form.Item.useStatus()
  return (
    <>
      <Input {...props} />
      {(status === 'success' || !status) && (
        <Typography.Text className='text-left input-attention'>{t('EMAIL_ATTENTION')}</Typography.Text>
      )}
    </>
  )
}

const ForgotPassword = () => {
  const zone = useAppSelector((state) => state.app.zone)
  const { t } = useTranslation('forgot-password', { useSuspense: false })
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { closeModal, openModal } = useModal()
  const navigate = useRouter()
  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      await NSBService.sendMailForgotPassword({ email: data?.email ?? '' })
      openModal({
        title: '成功',
        type: 'notification',
        subContent: 'パスワードリセットのリンクがメールに送信されました。メールを確認して続けてください。',
        okText: '確認',
        onOk: () => {
          closeModal()
          form.resetFields()
        }
      })
    } catch (error) {
      showMessage({ error: getError(error)?.message })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    /** Not support global version */
    if (zone === 'global') {
      navigate.replace(AppRoutes[404])
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zone])
  return (
    <LayoutAntStyled>
      <ForgotPasswordContainer>
        <Spin spinning={loading}>
          <Logo />
          <Typography.Title className='title'>{t('RESET_YOUR_PASSWORD')}</Typography.Title>
          <ContainerForm>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item
                rootClassName='text-left p-relative'
                style={{ marginBottom: 40 }}
                name='email'
                rules={[
                  { required: true, message: t('REQUIRED_EMAIL') ?? '' },
                  { type: 'email', message: t('INCORRECT_EMAIL') ?? '' },
                  {
                    max: 50,
                    message:
                      t('MAX_LENGTH_INPUT', {
                        fieldName: t('EMAIL'),
                        length: '50',
                        dynamicValue: true,
                        ns: 'sponsor'
                      }) ?? ''
                  }
                ]}
                normalize={(value) => value.trim()}
              >
                <CustomInput label={t('EMAIL')} suffix={<MailIcon />} isRequired />
              </Form.Item>

              <Form.Item>
                <SubmitButton />
              </Form.Item>
            </Form>
          </ContainerForm>
        </Spin>
      </ForgotPasswordContainer>
    </LayoutAntStyled>
  )
}

export default ForgotPassword
