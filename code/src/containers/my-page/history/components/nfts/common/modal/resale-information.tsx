import {
  ButtonCancel,
  ButtonSubmit,
  DescriptionsStyled,
  FormStyled,
  ModalBodyStyled,
  ModalStyled,
  RadioButtonCurrency,
  RadioGroupChooseCurrency,
  TitleStyled
} from './resale-information-styled'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ModalRef } from '.'
import { Checkbox, ConfigProvider, Descriptions, Divider, Form } from 'antd'
import InputPrice from '@/components/input-price'
import ThreeArrowRightIcon from '@/components/icons/ThreeArrowRightIcon'
import { useWatch } from 'antd/es/form/Form'
import { useTranslation } from 'next-i18next'

type ResaleInformationProps = {
  handleSubmit: (data: any) => void
  open?: boolean
}

const ResaleInformationModal = forwardRef<ModalRef, ResaleInformationProps>(({ handleSubmit, ...props }, fwRef) => {
  const [open, setOpen] = useState<boolean>(props.open ?? false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const watchOfferPrice = useWatch('offerPrice', form)
  const watchAllow = useWatch('allow', form)
  const [data, setData] = useState({})
  const { t } = useTranslation('history')
  useImperativeHandle(
    fwRef,
    () => ({
      visible(id) {
        setOpen(true)
      },
      hidden() {
        setOpen(false)
      },
      setLoadingForm(isLoading: boolean) {
        setLoading(isLoading)
      },
      clearForm() {
        form.resetFields()
      },
      setData(value: any) {
        setData(value)
      }
    }),
    []
  )
  return (
    <ModalStyled
      centered
      open={open}
      destroyOnClose
      width={900}
      closable={false}
      footer={null}
      title={null}
      forceRender
      className='custom-modal-antd'
    >
      <ModalBodyStyled className='modal-body'>
        <div className='header'>
          <TitleStyled>{t('RESALE_INFORMATION')}</TitleStyled>
        </div>
        <FormStyled
          form={form}
          layout='vertical'
          className='form-content'
          onFinish={(values: any) => {
            handleSubmit({ ...data, maxQuantity: +values.offerPrice })
          }}
        >
          <div>
            <div className='choose-currency'>
              <span>{t('CRYPTOCURRENCY')}</span>
              <ConfigProvider theme={{ token: { colorPrimary: '#2969DF' } }}>
                <RadioGroupChooseCurrency defaultValue={'ETH'} buttonStyle='solid'>
                  <RadioButtonCurrency value={'ETH'}>ETH</RadioButtonCurrency>
                </RadioGroupChooseCurrency>
              </ConfigProvider>
            </div>
            <Form.Item label={<span className='label'>{t('PRICE')}</span>} name='offerPrice'>
              <InputPrice color={'blue'} />
            </Form.Item>
          </div>
          <Divider className='divider-form' />
          <div>
            <DescriptionsStyled title={<span>{t('CONFIRMATION')}</span>} column={1} colon={false}>
              <Descriptions.Item label={t('SELLING_METHOD')}>
                <span className='color-blue'>{t('NORMAL')}</span>
              </Descriptions.Item>
              <Descriptions.Item label={t('SELLING_CURRENCY')}>
                <span className='color-blue'>ETH</span>
              </Descriptions.Item>
              <Descriptions.Item label={t('PRICE')}>
                <span className='color-blue'>{isNaN(Number(watchOfferPrice)) ? 0 : watchOfferPrice} ETH</span>
              </Descriptions.Item>
              <Descriptions.Item label={'手数料'}>
                <span className='color-blue'>0 ETH</span>
              </Descriptions.Item>
              <Descriptions.Item label={'手数料'}>
                <span className='color-blue'>0 ETH</span>
              </Descriptions.Item>
              <Descriptions.Item>
                <Divider className='divider-description' />
              </Descriptions.Item>
              <Descriptions.Item label={t('TOTAL_SELLING_PRICE')}>
                <span className='color-blue'>{isNaN(Number(watchOfferPrice)) ? 0 : watchOfferPrice} ETH</span>
              </Descriptions.Item>
            </DescriptionsStyled>
            <Form.Item name='allow' valuePropName='checked'>
              <Checkbox className='checkbox'>{t('CONFIRM_MESSAGE')}</Checkbox>
            </Form.Item>
            <div className='action'>
              <ButtonCancel
                disabled={loading}
                onClick={() => {
                  setOpen(false)
                  form.resetFields()
                }}
                className='btn-action'
              >
                {t('CANCEL', { ns: 'common' })}
              </ButtonCancel>
              <ButtonSubmit
                htmlType='submit'
                type='primary'
                className='btn-action'
                disabled={!watchAllow || !watchOfferPrice || loading}
              >
                {''}
                {t('RESALE')}
              </ButtonSubmit>
            </div>
            <ThreeArrowRightIcon className='three-arrow-right-icon' />
          </div>
        </FormStyled>
      </ModalBodyStyled>
    </ModalStyled>
  )
})

export default ResaleInformationModal
