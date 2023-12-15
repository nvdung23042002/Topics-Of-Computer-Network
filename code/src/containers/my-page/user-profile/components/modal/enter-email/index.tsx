import { Form } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ButtonActionGroup, ButtonSubmit, ContainerForm, InputStyled, ModalStyled, TitleForm } from './styled'
import { ModalRef } from '..'
import { useTranslation } from 'next-i18next'
import { REGEX_EMAIL } from '@/constants/regex'
type ModalProps = {
  open?: boolean
  handleSubmit?: (value: any) => void
}

const ModalFormChangeEmail = forwardRef<ModalRef, ModalProps>(({ handleSubmit }, fwRef) => {
  const [open, setOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation('user-profile')
  const [disabled, setDisabled] = useState<boolean>(!!form.getFieldValue('email'))
  useEffect(() => {
    setDisabled(!!form.getFieldValue('email'))
  }, [form.getFieldValue])
  useImperativeHandle(
    fwRef,
    () => ({
      visible() {
        setOpen(true)
      },
      hidden() {
        setOpen(false)
      },
      setLoading(isLoading: boolean) {
        setLoading(isLoading)
      },
      setData(email: string) {
        form.setFieldsValue({ email: email })
        setDisabled(!!form.getFieldValue('email'))
      },
      clearForm() {
        form.resetFields()
        setDisabled(!!form.getFieldValue('email'))
      }
    }),
    [form]
  )
  const CustomInput = ({ ...props }: any & { attention: string }) => {
    const { t } = useTranslation('user-profile', { useSuspense: false })
    const { status } = Form.Item.useStatus()
    return (
      <>
        <InputStyled {...props} />
        {(status === 'success' || !status) && <div className='attention'>{t(props.attention)}</div>}
      </>
    )
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
        form.resetFields()
      }}
      footer={null}
      title={<></>}
      className='custom-modal-antd'
    >
      <ContainerForm>
        <TitleForm>{t('EMAIL_VERIFICATION')}</TitleForm>
        <Form form={form} layout='vertical' className='form-email' onFinish={handleSubmit}>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message:
                  t('FIELD_REQUIRED', {
                    fieldName: t('EMAIL'),
                    dynamicValue: true
                  }) ?? ''
              },
              {
                max: 200,
                message:
                  t('MAX_LENGTH_INPUT', {
                    fieldName: t('EMAIL'),
                    length: '200',
                    dynamicValue: true
                  }) ?? ''
              },
              { pattern: REGEX_EMAIL, message: t('INCORRECT_EMAIL') ?? '' }
            ]}
            normalize={(value: string) => value.trim()}
          >
            <CustomInput label={t('EMAIL')} isRequired disabled={disabled} attention={t('EMAIL_ATTENTION_CONFIRM')} />
          </Form.Item>
          <ButtonActionGroup>
            <ButtonSubmit type='primary' htmlType='submit' loading={loading}>
              {t('SEND_CONFIRM')}
            </ButtonSubmit>
          </ButtonActionGroup>
        </Form>
      </ContainerForm>
    </ModalStyled>
  )
})

export default ModalFormChangeEmail
