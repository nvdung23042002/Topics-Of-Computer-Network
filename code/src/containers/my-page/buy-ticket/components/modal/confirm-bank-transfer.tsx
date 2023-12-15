import { Descriptions, Form } from 'antd'
import React, { ReactNode, forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import {
  ButtonGroupModal,
  ButtonModalStyled,
  ContainerInfo,
  ContainerInfoBank,
  ContainerInfoUser,
  ContainerTitleModalInfo,
  DescriptionsStyled,
  DividerModalConfirmStyled,
  TitleStyled
} from '../../styled'
import { BNToFormat } from '@/utils/bigNumber'
import { useTranslation } from 'next-i18next'
import { useAppSelector } from '@/hooks/store'
import { ModalStyled } from './styled'
import Typography from '@/components/common/typography'
import { formatPhoneNumberWithDynamicCountryCode } from '@/utils/phoneFormat'
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
}
export type ModalRefConfirmBankTransfer = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  clearForm: () => void
  setData: (dataConfirm: any) => void
}

const ModalConfirmBankTransfer = forwardRef<ModalRefConfirmBankTransfer, ModalProps>(
  ({ handleSubmit, priceOfTicket, ...props }, fwRef) => {
    const [open, setOpen] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const { t } = useTranslation('buy-ticket')
    const rate = useAppSelector((state) => state.auth.rate)
    const priceTicket = useMemo(() => {
      return rate?.TICKET_TO_JPY || '0'
    }, [rate])
    const priceTicketNumber = parseFloat(priceTicket) || 0
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
        },
        setData(dataConfirm: any) {
          setData(dataConfirm)
        }
      }),
      []
    )

    return (
      <ModalStyled
        centered
        open={open}
        destroyOnClose
        width={540}
        closable={false}
        footer={null}
        title={
          <ContainerTitleModalInfo className='bank-transfer'>
            <TitleStyled className='title-modal'>{t('TITLE_PURCHASE_CONFIRM_MODAL')}</TitleStyled>
          </ContainerTitleModalInfo>
        }
        className='custom-modal-antd'
      >
        <ContainerInfo className='bank-transfer'>
          <DescriptionsStyled title={t('PURCHASE_INFORMATION')} size={'small'} column={1} className='bank-transfer'>
            <Descriptions.Item label={<span className='label'>{t('TICKETS')}</span>}>
              <span className='color-success'>
                {BNToFormat(data?.amount ?? 0)}
                {t('PIECE')}
              </span>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <span className='label payment-amount'>
                    {t('PAYMENT_AMOUNT', { dynamicValue: true, amountPrice: BNToFormat(priceTicketNumber ?? 0) })}
                  </span>
                  <div className='label payment-amount mobile container-label-payment-amount'>
                    <span>{t('PAYMENT_AMOUNT_NO_VALUE')}</span>
                    <span>
                      {t('PAYMENT_VALUE_TRANSFER', {
                        dynamicValue: true,
                        amountPrice: BNToFormat(priceTicketNumber ?? 0)
                      })}
                    </span>
                  </div>
                </>
              }
            >
              <span className='color-success'>{BNToFormat(data?.amount * (priceTicketNumber ?? 0))}円</span>
            </Descriptions.Item>
            <Descriptions.Item label={<span className='label'>{t('PAYMENT_METHOD')}</span>}>
              <span className='color-success'>{t(data?.paymentMethod)}</span>
            </Descriptions.Item>
          </DescriptionsStyled>
          <DividerModalConfirmStyled />
          <ContainerInfoBank>
            <div className='title'>{t('BANK_INFORMATION')}</div>
            <div className='content'>
              <div className='left'>
                <div className='item'>
                  <div className='label'>{t('BANK_NAME')}</div>
                  <div className='value' title={data?.bankName}>
                    {data?.bankName}
                  </div>
                </div>
                <div className='item'>
                  <div className='label'>{t('BRANCH_NAME')}</div>
                  <div className='value' title={data?.shitenName}>
                    {data?.shitenName}
                  </div>
                </div>
                <div className='item'>
                  <div className='label'>{t('ACCOUNT_NAME')}</div>
                  <div className='value' title={data?.kouzaMeigi}>
                    {data?.kouzaMeigi}
                  </div>
                </div>
              </div>
              <div className='right'>
                <div className='item'>
                  <div className='label'>{t('BANK_CODE')}</div>
                  <div className='value' title={data?.bank_id}>
                    {data?.bank_id}
                  </div>
                </div>
                <div className='item'>
                  <div className='label'>{t('BRANCH_CODE')}</div>
                  <div className='value' title={data?.shitenNm}>
                    {data?.shitenNm}
                  </div>
                </div>
                <div className='item'>
                  <div className='label'>{t('ACCOUNT_CODE')}</div>
                  <div className='value' title={data?.kouzaNm}>
                    {data?.kouzaNm}
                  </div>
                </div>
              </div>
            </div>
          </ContainerInfoBank>
          <DividerModalConfirmStyled />
          <ContainerInfoUser>
            <div className='title'>{t('USER_INFORMATION')}</div>
            <div className='content'>
              <div className='left'>
                <div className='item'>
                  <div className='label'>{t('NAME')}</div>
                  <div className='value' title={data?.name}>
                    {data?.name}
                  </div>
                </div>
                <div className='item'>
                  <div className='label'>{t('EMAIL')}</div>
                  <Typography.Text className='value' title={data?.email}>
                    {data?.email}
                  </Typography.Text>
                </div>
              </div>
              <div className='right'>
                <div className='item'>
                  <div className='label'>{t('PHONE_NUMBER')}</div>
                  <div className='value' title={data?.phone}>
                    {data?.phone ? formatPhoneNumberWithDynamicCountryCode(data?.phone) : ''}
                  </div>
                </div>
              </div>
            </div>
          </ContainerInfoUser>
          <div className='attention'>*{t('BANK_TRANSFER_SUCCESS_MESSAGE')}</div>
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
                  handleSubmit({
                    account_name: data?.kouzaMeigi,
                    account_number: data?.kouzaNm,
                    amount: data?.amount,
                    bank_name: data?.bankName,
                    branch_code: data?.shitenNm,
                    branch_name: data?.shitenName,
                    confirmation_number: data?.nameId,
                    id: data?.id ?? 0,
                    reference_number: data?.nameId,
                    paymentMethod: data?.paymentMethod
                  })
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

export default ModalConfirmBankTransfer
