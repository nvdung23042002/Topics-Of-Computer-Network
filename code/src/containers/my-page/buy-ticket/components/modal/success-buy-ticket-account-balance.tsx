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
import Verified from '@/assets/svg/verified.svg'
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
    balanceBefore: string
    balanceAfter: string
  }
  resetForm?: () => void
  handleOK?: () => void
}
export type ModalRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  clearForm: () => void
}

const ModalSuccessVotingBuyTicket = forwardRef<ModalRef, ModalProps>(
  (
    {
      data = { amount: 0, balanceAfter: '', balanceBefore: '', paymentMethod: '' },
      handleSubmit,
      priceOfTicket,
      resetForm,
      handleOK,
      ...props
    },
    fwRef
  ) => {
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
          <ContainerTitleModalInfo className='account-balance success'>
            <TitleStyled className='title-modal'>{t('TITLE_PURCHASE_CONFIRM_MODAL')}</TitleStyled>
          </ContainerTitleModalInfo>
        }
        className='custom-modal-antd'
      >
        <ContainerInfo className='account-balance success'>
          <div className='image-success'>
            <img src={Verified.src} alt='success' />
          </div>
          <DescriptionsStyled size={'small'} column={1} className='account-balance'>
            <Descriptions.Item label={<span className='label'>{t('TICKETS')}</span>}>
              <span className='color-success'>
                {BNToFormat(data?.amount ?? 0)}
                {t('PIECE')}
              </span>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <div className='container-label-payment-amount'>
                  <span className='label'>{t('PAYMENT_AMOUNT_NO_VALUE')}</span>
                  <span className='label'>
                    (1{t('TICKET')} = {BNToFormat(priceOfTicket ?? 0)}円)
                  </span>
                </div>
              }
            >
              <span className='color-success'>{BNToFormat(data?.amount * (priceOfTicket ?? 0))}円</span>
            </Descriptions.Item>
            <Descriptions.Item label={<span className='label'>{t('PAYMENT_METHOD')}</span>}>
              <span className='color-success'>{t(data.paymentMethod)}</span>
            </Descriptions.Item>
            <Descriptions.Item label={<span className='label'>{t('BALANCE_BEFORE_SETTLEMENT')}</span>}>
              <span className='color-success'>{data.balanceBefore}</span>
            </Descriptions.Item>
            <Descriptions.Item label={<span className='label'>{t('BALANCE_AFTER_SETTLEMENT')}</span>}>
              <span className='color-success'>{data.balanceAfter}</span>
            </Descriptions.Item>
          </DescriptionsStyled>
          <MessageConfirm className='account-balance-success'>{t('YOU_HAVE_PURCHASED_TICKETS')}</MessageConfirm>
          <ButtonGroupModal className='modal-completed'>
            <ButtonModalStyled
              type='primary'
              onClick={() => {
                setOpen(false)
                if (resetForm) {
                  resetForm()
                }
                if (handleOK) {
                  handleOK()
                }
              }}
            >
              OK
            </ButtonModalStyled>
          </ButtonGroupModal>
        </ContainerInfo>
      </ModalStyled>
    )
  }
)

export default ModalSuccessVotingBuyTicket
