import { Descriptions, Form } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ModalStyled } from '../choose-type/styled'
import {
  ButtonGroupModal,
  ButtonModalStyled,
  ContainerInfo,
  ContainerTitleModalInfo,
  DescriptionsStyled,
  TitleStyled,
  DividerStyled
} from './styled'
import { BNToFormat } from '@/utils/bigNumber'
import { useTranslation } from 'next-i18next'
type ModalProps = {
  open?: boolean
  handleSubmit?: (value: any) => void
  priceETHToYen: number
}
export type ModalConfirmRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  clearForm: () => void
  setDataConfirm: (data: any) => void
}

const ModalConfirmWithDraw = forwardRef<ModalConfirmRef, ModalProps>(({ handleSubmit, priceETHToYen }, fwRef) => {
  const [open, setOpen] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const { t } = useTranslation('withdrawal')
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
      clearForm() {
        form.resetFields()
      },
      setDataConfirm(dataConfirm: any) {
        setData(dataConfirm)
      }
    }),
    [form]
  )
  const infoWithdrawalEnum = {
    ['BANK_DEPOSIT']: (
      <>
        <DescriptionsStyled title={t('BANK_TRANSFER')} size={'small'} column={2} className='info-bank info-crypto'>
          <Descriptions.Item label={<span className='label'>{t('BANK_NAME')}</span>} className='vertical'>
            <span>{data?.bank_name}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('BANK_CODE')}</span>} className='vertical'>
            <span>{data?.bank_code}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('BRANCH_NAME')}</span>} className='vertical'>
            <span>{data?.branch_name}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('BRANCH_CODE')}</span>} className='vertical'>
            <span>{data?.branch_code}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('ACCOUNT_NAME')}</span>} className='vertical'>
            <span>{data?.account_name}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('ACCOUNT_NUMBER')}</span>} className='vertical'>
            <span>{data?.account_number}</span>
          </Descriptions.Item>
        </DescriptionsStyled>
      </>
    ),
    ['CRYPTOCURRENCY']: (
      <>
        <DescriptionsStyled title={t('CRYPTOCURRENCY')} size={'small'} column={1} className='info-bank info-crypto'>
          <Descriptions.Item label={<span className='label'>{t('CURRENCY')}</span>} className='vertical'>
            <span>{data?.currency}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('PUBLIC_ADDRESS')}</span>} className='vertical'>
            <span>{data?.toPublicAddress}</span>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span className='label'>
                {t('AMOUNT_RATE_ETH_TO_YEN', { dynamicValue: true, priceETHToYen: BNToFormat(priceETHToYen) })}
              </span>
            }
            className='vertical'
          >
            <span>{data?.cryptoAmount}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('GAS_EXPENSES')}</span>} className='vertical'>
            <span>{data?.gasData}</span>
          </Descriptions.Item>
        </DescriptionsStyled>
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
      }}
      footer={null}
      title={
        <ContainerTitleModalInfo>
          <TitleStyled className='title-modal'>
            {
              { BANK_DEPOSIT: t('CONFIRM_WITHDRAW_BANK'), CRYPTOCURRENCY: t('CONFIRM_WITHDRAW_CRYPTO') }[
                data?.payment_method
              ]
            }
          </TitleStyled>
        </ContainerTitleModalInfo>
      }
      className='custom-modal-antd'
    >
      <ContainerInfo>
        <DescriptionsStyled title={t('WITHDRAW_TITLE')} size={'small'} column={1} className='info-amount'>
          <Descriptions.Item label={<span className='label'>{t('BALANCE')}</span>}>
            <span className='color-success'>{BNToFormat(data?.balance ?? 0)} 円</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('WITHDRAWAL_AMOUNT')}</span>}>
            <span className='color-success'>{BNToFormat(data?.amount ?? 0)}円</span>
          </Descriptions.Item>
        </DescriptionsStyled>
        <DividerStyled />
        {/* <DescriptionsStyled title={t('BANK_TRANSFER')} size={'small'} column={2} className='info-bank info-crypto'>
          <Descriptions.Item label={<span className='label'>{t('BANK_NAME')}</span>} className='vertical'>
            <span>{data?.bank_name}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('BANK_CODE')}</span>} className='vertical'>
            <span>{data?.bank_code}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('BRANCH_NAME')}</span>} className='vertical'>
            <span>{data?.branch_name}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('BRANCH_CODE')}</span>} className='vertical'>
            <span>{data?.branch_code}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('ACCOUNT_NAME')}</span>} className='vertical'>
            <span>{data?.account_name}</span>
          </Descriptions.Item>
          <Descriptions.Item label={<span className='label'>{t('ACCOUNT_NUMBER')}</span>} className='vertical'>
            <span>{data?.account_number}</span>
          </Descriptions.Item>
        </DescriptionsStyled> */}
        {infoWithdrawalEnum[data?.payment_method]}
        <ButtonGroupModal>
          <ButtonModalStyled
            loading={loading}
            onClick={() => {
              setOpen(false)
            }}
          >
            {t('CANCEL', { ns: 'common' })}
            {''}
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
            {t('CONFIRM', { ns: 'common' })}
            {''}
          </ButtonModalStyled>
        </ButtonGroupModal>
      </ContainerInfo>
    </ModalStyled>
  )
})

export default ModalConfirmWithDraw
