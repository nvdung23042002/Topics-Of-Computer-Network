import { Form, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { ButtonStyled, ContainerForm, ForgotPasswordContainer, LayoutAntStyled } from './styled'
import Logo from '@/components/logo'
import Typography from '@/components/common/typography'
import Input from '@/components/common/form/Input'
import { useTranslation } from 'next-i18next'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import { useRouter } from 'next/router'
import NSBService from '@/services/NSB.service'
import { AppRoutes } from '@/constants/routes'
import useModal from '@/hooks/useModal'
const SubmitButton = () => {
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const form = Form.useFormInstance()
  const { t } = useTranslation('sponsor', { useSuspense: false })
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
    <div className='action-container'>
      <ButtonStyled htmlType='submit' type='primary' shape={'round'} disabled={!canSubmit}>
        {t('RESET_PASSWORD')}
      </ButtonStyled>
    </div>
  )
}
const CustomInput = ({ ...props }: any & { attention: string }) => {
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const { status } = Form.Item.useStatus()
  return (
    <>
      <Input {...props} />
      {(status === 'success' || !status) && (
        <Typography.Text className='text-left input-attention'>{t(props.attention)}</Typography.Text>
      )}
    </>
  )
}

const ResetPassword = () => {
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { query, push, replace } = useRouter()
  const { closeModal, openModal } = useModal()
  useEffect(() => {
    if (!query?.token) {
      push(AppRoutes.sponsorLogin)
    } else {
      ;(async () => {
        try {
          await NSBService.checkExpireLinkResetPassword(query?.token as string)
        } catch (error) {
          showMessage({ error: error?.response?.data?.message }, () => push(AppRoutes.sponsorLogin))
        }
      })()
    }
  }, [query])
  const handleSubmit = async (data: any) => {
    setLoading(true)
    try {
      await NSBService.changeSponsorPassword(query?.token as string, { newPassword: data.password })
      openModal({
        title: '成功',
        type: 'notification',
        subContent: 'パスワードが正常に変更されました。',
        okText: '確認',
        onOk: () => {
          closeModal()
          push(AppRoutes.sponsorLogin)
        }
      })
    } catch (error) {
      if (getError(error) === 'UNAUTHORIZED')
        openModal({
          type: 'notification',
          theme: 'error',
          title: 'エラー',
          subContent: 'リセットトークンが無効です。',
          onOk: () => {
            closeModal()
            replace(AppRoutes.sponsorLogin)
          }
        })
      else {
        showMessage({ error: getError(error)?.message })
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <LayoutAntStyled>
      <ForgotPasswordContainer>
        <Spin spinning={loading}>
          <Logo />
          <Typography.Title className='title'>{t('RESET_PASSWORD_TITLE')}</Typography.Title>
          <ContainerForm>
            <Form form={form} onFinish={handleSubmit}>
              <Form.Item
                rootClassName='text-left mb-5'
                name='password'
                rules={[
                  { required: true, message: t('PASSWORD_MINIMUM') ?? '' },
                  { min: 8, message: t('PASSWORD_MINIMUM') ?? '' },
                  {
                    max: 20,
                    message:
                      t('MAX_LENGTH_INPUT', {
                        fieldName: t('PASSWORD'),
                        length: '20',
                        dynamicValue: true
                      }) ?? ''
                  }
                ]}
                normalize={(value) => value.trim()}
              >
                <CustomInput label={t('PASSWORD')} inputType='password' attention={'ATTENTION_PASSWORD'} isRequired />
              </Form.Item>
              <Form.Item
                rootClassName='text-left mb-5'
                dependencies={['password']}
                name='passwordConfirmation'
                rules={[
                  { required: true, message: t('PASSWORD_MINIMUM') ?? '' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error(t('PASSWORD_NOT_MATCH') ?? ''))
                    }
                  })
                ]}
              >
                <CustomInput
                  label={t('PASSWORD_CONFIRMATION')}
                  inputType='password'
                  attention={'ATTENTION_CONFIRM_PASSWORD'}
                  isRequired
                />
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

export default ResetPassword
