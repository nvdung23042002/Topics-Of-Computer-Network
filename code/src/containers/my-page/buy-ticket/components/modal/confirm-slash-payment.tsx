import { Descriptions, Form } from 'antd'
import React, { ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import {
  ButtonGroupModal,
  ButtonModalStyled,
  ContainerInfo,
  ContainerTitleModalInfo,
  DescriptionsStyled,
  MessageConfirm,
  TitleStyled
} from '../../styled'
import { BNToFormat } from '@/utils/bigNumber'
import { useTranslation } from 'next-i18next'
import { ModalStyled } from './styled'
type ModalProps = {
  open?: boolean
  handleSubmit?: (value: any) => void
  title?: ReactNode
  priceOfTicket?: number
  data?: {
    amount: number
    paymentMethod: string
  }
}
export type ModalRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  clearForm: () => void
}

const ModalConfirmBuyTicketBySlashPayment = forwardRef<ModalRef, ModalProps>(
  ({ data = { amount: 0, paymentMethod: '' }, handleSubmit, priceOfTicket, ...props }, fwRef) => {
    const [open, setOpen] = useState<boolean>(false)
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const { t } = useTranslation('buy-ticket')
    useImperativeHandle(
      fwRef,
      () => ({
        visible(id) {
          setOpen(true)
        },
        hidden() {
          setOpen(false)
        },
        setLoading(isLoading: boolean) {
          setLoading(isLoading)
        },
        clearForm() {
          form.resetFields()
        }
      }),
      []
    )
    useEffect(() => {
      form.setFieldsValue({
        allow: false,
        price: 0
      })
    }, [])

    return (
      <ModalStyled
        centered
        open={open}
        destroyOnClose
        width={540}
        closable={false}
        footer={null}
        title={
          <ContainerTitleModalInfo className='slash-payment'>
            <TitleStyled className='title-modal'>{t('TITLE_PURCHASE_CONFIRM_MODAL')}</TitleStyled>
          </ContainerTitleModalInfo>
        }
        className='custom-modal-antd'
      >
        <ContainerInfo className='slash-payment'>
          <DescriptionsStyled size={'small'} column={1} className='slash-payment'>
            <Descriptions.Item label={<span className='label'>{t('TICKETS')}</span>}>
              <span className='color-success'>
                {BNToFormat(data?.amount ?? 0)}
                {t('PIECE')}
              </span>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span className='label'>
                  {t('PAYMENT_AMOUNT', { dynamicValue: true, amountPrice: BNToFormat(priceOfTicket ?? 0) })}
                </span>
              }
            >
              <span className='color-success'>{BNToFormat(data?.amount * (priceOfTicket ?? 0))}円</span>
            </Descriptions.Item>
            <Descriptions.Item label={<span className='label'>{t('PAYMENT_METHOD')}</span>} className='last-item'>
              <span className='color-success'>{t(data.paymentMethod)}</span>
            </Descriptions.Item>
          </DescriptionsStyled>
          <MessageConfirm className='slash-payment-success'>{t('CONFIRM_BUY_TICKET_MESSAGE')}</MessageConfirm>
          <ButtonGroupModal className='group-btn-action'>
            <ButtonModalStyled
              loading={loading}
              onClick={() => {
                setOpen(false)
              }}
            >
              {t('CANCEL', { ns: 'common' })}
            </ButtonModalStyled>
            <ButtonModalStyled
              type='primary'
              loading={loading}
              onClick={() => {
                if (handleSubmit) {
                  handleSubmit(data)
                }
              }}
            >
              {''}
              {t('CONFIRM', { ns: 'common' })}
            </ButtonModalStyled>
          </ButtonGroupModal>
        </ContainerInfo>
      </ModalStyled>
    )
  }
)

export default ModalConfirmBuyTicketBySlashPayment
