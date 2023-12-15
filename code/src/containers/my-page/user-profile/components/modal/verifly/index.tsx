import { ConfigProvider, Form } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ModalVerifyRef } from '..'
import { ContainerForm, ButtonSubmit, ButtonActionGroup, ButtonStyled, TitleForm, ModalStyled } from './styled'
import { useTranslation } from 'next-i18next'
import CustomInput from '../../common/custom-input'
import { REGEX_6_NUMBER } from '@/constants/regex'
import CustomPhone from '../../common/custom-phone'
type ModalProps = {
  open?: boolean
  handleSubmit?: (value: any) => void
  title: string
  type: 'email' | 'phone'
  handleResendCode: (value: any) => void
}
const CONFIRM_SECOND = 90
const ModalFormVerify = forwardRef<ModalVerifyRef, ModalProps>(({ handleSubmit, title, type, ...props }, fwRef) => {
  const [open, setOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingResendCode, setLoadingResendCode] = useState<boolean>(false)

  const [totalSeconds, setTotalSeconds] = useState(CONFIRM_SECOND)
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const { t } = useTranslation('user-profile')

  useEffect(() => {
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        setTotalSeconds((prevSeconds) => prevSeconds - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [totalSeconds])

  // const minutes = Math.floor(totalSeconds / 60)
  // const seconds = totalSeconds % 60
  useImperativeHandle(
    fwRef,
    () => ({
      visible() {
        setOpen(true)
        setTotalSeconds(CONFIRM_SECOND)
      },
      hidden() {
        setOpen(false)
        setTotalSeconds(CONFIRM_SECOND)
      },
      setLoading(isLoading: boolean) {
        setLoading(isLoading)
      },
      setData(value: any) {
        switch (type) {
          case 'phone':
            form.setFieldsValue(value)
            break
          case 'email':
            form.setFieldsValue({ ['email']: value })
            break

          default:
            break
        }
        form.setFieldsValue({ [type]: value })
      },
      clearForm() {
        form.resetFields()
      },
      setLoadingResendButton(isLoading: boolean) {
        setLoadingResendCode(isLoading)
      },
      setTimeResendCode() {
        setTotalSeconds(CONFIRM_SECOND)
      }
    }),
    [form]
  )
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
  const handleResendCode = () => {
    if (props.handleResendCode) {
      props.handleResendCode(form.getFieldValue(type))
    }
  }
  return (
    <ModalStyled
      centered
      open={open}
      destroyOnClose
      width={526}
      closable={false}
      onCancel={() => {
        setOpen(false)
        setTotalSeconds(CONFIRM_SECOND)
        form.resetFields()
      }}
      footer={null}
      title={<></>}
      className='custom-modal-antd'
    >
      <ContainerForm>
        <TitleForm>{title}</TitleForm>
        <Form
          form={form}
          onFinish={(data) => {
            if (handleSubmit) {
              handleSubmit(data)
            }
          }}
        >
          {
            {
              ['email']: (
                <>
                  <Form.Item name='email'>
                    <CustomInput
                      label={t('EMAIL')}
                      isRequired
                      disabled={true}
                      attention={t('EMAIL_ATTENTION_CONFIRM')}
                    />
                    {/* <InputStyled label={'メール'} isRequired disabled={true} /> */}
                  </Form.Item>
                  {/* <div className='attention'>{t('EMAIL_ATTENTION_CONFIRM')}</div> */}
                  <Form.Item>
                    <ButtonActionGroup>
                      <ConfigProvider theme={{ token: { colorPrimary: '#2969DF' } }}>
                        <ButtonStyled
                          type='primary'
                          htmlType='button'
                          className='btn-resend-code'
                          disabled={totalSeconds !== 0 || !form.getFieldValue('email')}
                          loading={loadingResendCode}
                          onClick={() => {
                            handleResendCode()
                          }}
                        >
                          {t('RESEND_CODE')}
                        </ButtonStyled>
                      </ConfigProvider>
                    </ButtonActionGroup>
                    <div className='attention text-center'>
                      <>
                        {totalSeconds === 0 ? (
                          <span>
                            {t('ATTENTION_RESEND_CODE', {
                              dynamicValue: true,
                              s: '00'
                            })}
                          </span>
                        ) : (
                          <span>
                            {t('ATTENTION_RESEND_CODE', {
                              dynamicValue: true,
                              s: totalSeconds
                            })}
                          </span>
                        )}
                      </>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name='code'
                    rules={[
                      {
                        required: true,
                        message:
                          t('FIELD_REQUIRED', {
                            fieldName: t('VERIFY_CODE'),
                            dynamicValue: true
                          }) ?? ''
                      },
                      { pattern: REGEX_6_NUMBER, message: t('INVALID_CODE') ?? '' }
                    ]}
                    normalize={(value: string) => value.trim()}
                  >
                    <CustomInput label={t('VERIFY_CODE')} attention={t('VERIFY_CODE_EMAIL_ATTENTION')} />
                  </Form.Item>
                </>
              ),
              ['phone']: (
                <>
                  <CustomPhone
                    label={t('PHONE')}
                    isRequired
                    disabled={!!form.getFieldValue('phone')}
                    attention={t('PHONE_ATTENTION_CONFIRM')}
                    prefixName={'phonePrefix'}
                    isShowAttention={true}
                  />
                  <Form.Item>
                    <ButtonActionGroup>
                      <ConfigProvider theme={{ token: { colorPrimary: '#2969DF' } }}>
                        <ButtonStyled
                          type='primary'
                          htmlType='button'
                          className='btn-resend-code'
                          disabled={totalSeconds !== 0 || !form.getFieldValue('phone')}
                          loading={loadingResendCode}
                          onClick={() => {
                            handleResendCode()
                          }}
                        >
                          {t('RESEND_CODE')}
                        </ButtonStyled>
                      </ConfigProvider>
                    </ButtonActionGroup>
                    <div className='attention text-center'>
                      <>
                        {totalSeconds === 0 ? (
                          <span>
                            {t('ATTENTION_RESEND_CODE', {
                              dynamicValue: true,
                              s: '00'
                            })}
                          </span>
                        ) : (
                          <span>
                            {t('ATTENTION_RESEND_CODE', {
                              dynamicValue: true,
                              s: totalSeconds
                            })}
                          </span>
                        )}
                      </>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name='code'
                    rules={[
                      {
                        required: true,
                        message:
                          t('FIELD_REQUIRED', {
                            fieldName: t('VERIFY_CODE'),
                            dynamicValue: true
                          }) ?? ''
                      },
                      { pattern: REGEX_6_NUMBER, message: t('INVALID_CODE') ?? '' }
                    ]}
                    normalize={(value: string) => value.trim()}
                  >
                    <CustomInput label={t('VERIFY_CODE')} attention={t('VERIFY_CODE_PHONE_ATTENTION')} />
                  </Form.Item>
                </>
              )
            }[type]
          }
          <Form.Item>
            <ButtonActionGroup>
              <ButtonSubmit
                type='primary'
                htmlType='submit'
                className='btn-submit'
                disabled={!canSubmit}
                loading={loading}
              >
                {t('CONFIRMATION')}
              </ButtonSubmit>
            </ButtonActionGroup>
          </Form.Item>
        </Form>
      </ContainerForm>
    </ModalStyled>
  )
})

export default ModalFormVerify
