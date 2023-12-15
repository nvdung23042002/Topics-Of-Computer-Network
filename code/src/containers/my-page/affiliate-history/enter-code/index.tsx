import React, { useEffect, useState } from 'react'
import { ButtonStyled, ContainerForm, EnterCodeContainer, LayoutAntStyled } from './styled'
import { Form, Spin } from 'antd'
import Logo from '@/components/logo'
import Typography from '@/components/common/typography'
import { useTranslation } from 'next-i18next'
import Input from '@/components/common/form/Input'
import CheckIsNewAccount from '@/components/layout-my-page/check-is-new-account'
import { AppRoutes } from '@/constants/routes'
import { useRouter } from 'next/navigation'
import storage from '@/utils/storage'
import { STORAGE_KEY } from '@/constants/common'
import HistoryService from '@/services/History.service'
import showMessage from '@/utils/showMessage'

const SubmitButton = () => {
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const form = Form.useFormInstance()
  const { t } = useTranslation('enter-code', { useSuspense: false })
  // Watch all values
  const values = Form.useWatch([], form)
  const haveValue = Form.useWatch('affiliateCode', form)
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
      <ButtonStyled
        htmlType='button'
        shape={'round'}
        onClick={() => {
          const user = storage().get(STORAGE_KEY.W3A_TOKEN)
          storage().set(STORAGE_KEY.W3A_TOKEN, {
            ...user,
            skipEnterCode: true
          })
          navigate.push(AppRoutes.affiliateHistory)
        }}
      >
        {t('SKIP_ENTER_CODE')}
      </ButtonStyled>
      <ButtonStyled htmlType='submit' type='primary' shape={'round'} disabled={!canSubmit || !haveValue}>
        {t('SEND_CODE')}
      </ButtonStyled>
    </div>
  )
}
const EnterCode = () => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation('enter-code', { useSuspense: false })
  const [form] = Form.useForm()
  const navigator = useRouter()
  const handelSubmit = async (data: { affiliateCode: string }) => {
    setLoading(true)
    try {
      await HistoryService.insertAffiliateCode({ affiliateCode: (data['affiliateCode'] as string).trim() })
      const user = storage().get(STORAGE_KEY.W3A_TOKEN)
      storage().set(STORAGE_KEY.W3A_TOKEN, {
        ...user,
        isNewAccount: false,
        skipEnterCode: false
      })
      navigator.push(AppRoutes.successEnterCodeAffiliate)
    } catch (error) {
      if (error.code) {
        showMessage({ error: t(t(error.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
      } else {
        showMessage({ error: t('INTERNAL_SERVER_ERROR', { ns: 'error-message' }) })
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <CheckIsNewAccount>
      <LayoutAntStyled>
        <EnterCodeContainer className='center-box'>
          <Spin spinning={loading}>
            <Logo />
            <Typography.Title className='title'>{t('ENTER_CODE_TITLE')}</Typography.Title>
            <ContainerForm>
              <Form form={form} layout='vertical' className='form-email' onFinish={handelSubmit}>
                <Form.Item
                  // label={<span className='label'>{t('SHARED_AFFILIATE_CODE')}</span>}
                  name='affiliateCode'
                  rules={[
                    {
                      required: true,
                      message:
                        t('FIELD_REQUIRED', {
                          fieldName: t('SHARED_AFFILIATE_CODE'),
                          dynamicValue: true
                        }) ?? ''
                    },
                    {
                      max: 255,
                      message:
                        t('MAX_LENGTH_INPUT', {
                          fieldName: t('SHARED_AFFILIATE_CODE'),
                          length: 255,
                          dynamicValue: true
                        }) ?? ''
                    }
                  ]}
                >
                  <Input label={t('SHARED_AFFILIATE_CODE')} />
                </Form.Item>
                <Form.Item>
                  <SubmitButton />
                </Form.Item>
              </Form>
            </ContainerForm>
          </Spin>
        </EnterCodeContainer>
      </LayoutAntStyled>
    </CheckIsNewAccount>
  )
}
export default EnterCode
