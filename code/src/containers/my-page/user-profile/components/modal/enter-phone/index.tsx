import { Form } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ButtonActionGroup, ButtonSubmit, ContainerForm, ModalStyled, TitleForm } from './styled'
import { ModalRef } from '..'
import { useTranslation } from 'next-i18next'
// import { REGEX_PHONENUMBER } from '@/constants/regex'
import CustomPhone from '../../common/custom-phone'
type ModalProps = {
  open?: boolean
  handleSubmit?: (value: any) => void
}
const ModalFormChangePhoneNumber = forwardRef<ModalRef, ModalProps>(({ handleSubmit }, fwRef) => {
  const [open, setOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation('user-profile')
  const [disabled, setDisabled] = useState<boolean>(!!form.getFieldValue('phoneSuffix'))
  const [isCanSubmit, setIsCanSubmit] = useState<boolean>(true)
  const [isShowAttention, setIsShowAttention] = useState<boolean>(true)
  const phoneSuffixValue = Form.useWatch('phoneSuffix', form)
  useEffect(() => {
    const arrayTouched = form.isFieldTouched('phoneSuffix') ? ['phoneSuffix'] : []
    form
      .validateFields(arrayTouched, { validateOnly: true })
      .then(() => {
        setIsShowAttention(true)
        if (form.getFieldValue('phoneSuffix')) {
          setIsCanSubmit(true)
        } else {
          setIsCanSubmit(false)
        }
      })
      .catch(() => {
        setIsShowAttention(false)
        setIsCanSubmit(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneSuffixValue])
  useEffect(() => {
    setDisabled(form.getFieldValue('phoneSuffix'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setData(phone: any) {
        form.setFieldsValue({ phoneSuffix: phone.phoneSuffix, phonePrefix: phone.phonePrefix })
        setDisabled(!!form.getFieldValue('phoneSuffix'))
      },
      clearForm() {
        form.resetFields()
        form.setFieldValue('phonePrefix', 'JP(+81)')
        setDisabled(!!form.getFieldValue('phoneSuffix'))
      }
    }),
    [form]
  )
  useEffect(() => {
    if (!form.getFieldValue('phonePrefix')) {
      form.setFieldValue('phonePrefix', 'JP(+81)')
    }
  }, [form.getFieldValue('phonePrefix')])
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
        form.setFieldValue('phonePrefix', 'JP(+81)')
      }}
      footer={null}
      title={<></>}
      className='custom-modal-antd'
    >
      <ContainerForm>
        <TitleForm>{t('PHONE_VERIFICATION')}</TitleForm>
        <Form form={form} layout='vertical' className='form-email' onFinish={handleSubmit}>
          <CustomPhone
            label={t('PHONE')}
            isRequired
            disabled={disabled}
            attention={t('PHONE_ATTENTION_CONFIRM')}
            prefixName={'phonePrefix'}
            isShowAttention={isShowAttention}
          />
          <ButtonActionGroup>
            <ButtonSubmit type='primary' htmlType='submit' loading={loading} disabled={!isCanSubmit}>
              {t('SEND_CONFIRM')}
            </ButtonSubmit>
          </ButtonActionGroup>
        </Form>
      </ContainerForm>
    </ModalStyled>
  )
})

export default ModalFormChangePhoneNumber
