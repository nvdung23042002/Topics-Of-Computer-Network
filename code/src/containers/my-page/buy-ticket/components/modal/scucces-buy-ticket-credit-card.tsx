import { Descriptions, Form, Modal as ModalAntd } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
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
import Verified from '@/assets/svg/verified.svg'

type ModalProps = {
  open?: boolean
  handleSubmit?: (value: any) => void
  priceOfTicket?: number
  data?: {
    amount: number
    paymentMethod: string
  }
  resetForm?: () => void
}
export type ModalRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  clearForm: () => void
}

const ModalSuccessBuyTicketByCreditCard = forwardRef<ModalRef, ModalProps>(
  ({ data = { amount: 0, paymentMethod: '' }, handleSubmit, priceOfTicket, resetForm, ...props }, fwRef) => {
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
      <ModalAntd
        centered
        open={open}
        destroyOnClose
        width={540}
        closable={false}
        footer={null}
        title={
          <ContainerTitleModalInfo>
            <TitleStyled className='title-modal'>投票チケット購入確認</TitleStyled>
          </ContainerTitleModalInfo>
        }
        className='custom-modal-antd'
      >
        <ContainerInfo>
          <div className='image-success'>
            <img src={Verified.src} alt='success' />
          </div>
          <DescriptionsStyled size={'small'} column={1}>
            <Descriptions.Item label={<span className='label'>投票数</span>}>
              <span className='color-success'>{data?.amount}枚</span>
            </Descriptions.Item>
            <Descriptions.Item label={<span className='label'>支払い金額（1枚＝{priceOfTicket}円）</span>}>
              <span className='color-success'>{BNToFormat(data?.amount * (priceOfTicket ?? 0))}円</span>
            </Descriptions.Item>
            <Descriptions.Item label={<span className='label'>支払い方法</span>}>
              <span className='color-success'>{t(data.paymentMethod)}</span>
            </Descriptions.Item>
          </DescriptionsStyled>
          <MessageConfirm>投票チケットを購入しました。</MessageConfirm>
          <ButtonGroupModal className='modal-completed'>
            <ButtonModalStyled
              type='primary'
              onClick={() => {
                setOpen(false)
                if (resetForm) {
                  resetForm()
                }
              }}
            >
              OK
            </ButtonModalStyled>
          </ButtonGroupModal>
        </ContainerInfo>
      </ModalAntd>
    )
  }
)

export default ModalSuccessBuyTicketByCreditCard
