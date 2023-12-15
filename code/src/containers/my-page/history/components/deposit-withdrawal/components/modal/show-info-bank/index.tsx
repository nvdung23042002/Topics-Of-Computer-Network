import { ColumnsType } from 'antd/es/table'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { ButtonGroupStyled, ButtonSubmitStyled, ContainerStyled, ModalStyled, TableStyled, TitleStyled } from './styled'

type ModalProps = {
  open?: boolean
  width?: number
  data?: any[]
}
export type ModalRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  setData: (data: any) => void
}
const ModalShowInfoBank = forwardRef<ModalRef, ModalProps>(({ width = 1067, ...props }: ModalProps, fwRef) => {
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation('history')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
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
      setData(value: any) {
        if (value) {
          setData([value as never])
        } else {
          setData([])
        }
      }
    }),
    []
  )
  const columns: ColumnsType<any> = [
    {
      title: t('BANK_NAME'),
      dataIndex: 'bank_name',
      key: 'bank_name',
      render: (bankName) => (
        <span title={bankName} className='text-b bank-name'>
          {bankName}
        </span>
      )
    },
    // {
    //   title: t('BANK_CODE'),
    //   dataIndex: 'bank_code',
    //   key: 'bank_code',
    //   width: 150,
    //   render: (bankCode) => (
    //     <span title={bankCode} className='text-nowrap text-nowrap-1' style={{ maxWidth: 100 }}>
    //       {bankCode}
    //     </span>
    //   )
    // },
    {
      title: t('BRANCH_NAME'),
      dataIndex: 'branch_name',
      key: 'branch_name',
      // width: 150,
      render: (branchName) => (
        <span title={branchName} className='branch-name'>
          {branchName}
        </span>
      )
    },
    {
      title: t('BRANCH_CODE'),
      dataIndex: 'branch_code',
      key: 'branch_code',
      // width: 150,
      render: (branchCode) => (
        <span title={branchCode} className='' style={{ maxWidth: '100%' }}>
          {branchCode}
        </span>
      )
    },
    {
      title: t('ACCOUNT_NUMBER'),
      dataIndex: 'account_number',
      key: 'account_number',
      // width: 150,
      render: (accountNumber) => (
        <span title={accountNumber} className='' style={{ maxWidth: '100%' }}>
          {accountNumber}
        </span>
      )
    },
    {
      title: t('ACCOUNT_NAME'),
      dataIndex: 'account_name',
      key: 'account_name',
      width: 200,
      render: (accountName) => (
        <span className='account_name' title={accountName}>
          {accountName}
        </span>
      )
    }
  ]
  const containerRef = useRef(null)

  return (
    <ModalStyled
      centered
      open={open}
      destroyOnClose
      width={width}
      closable={false}
      onCancel={() => {
        setOpen(false)
      }}
      footer={null}
      title={<></>}
      className='custom-modal-antd'
    >
      <ContainerStyled ref={containerRef}>
        <TitleStyled>{t('TRANSACTION_HISTORY_MODAL')}</TitleStyled>
        <TableStyled
          items={data}
          columns={columns}
          rowKey='id'
          pagination={false}
          loading={loading}
          scroll={{ x: true }}
        />
        <ButtonGroupStyled>
          <ButtonSubmitStyled
            type='primary'
            onClick={() => {
              setOpen(false)
            }}
            shape='round'
            // disabled={data.length <= 0 || loading}
          >
            {t('CLOSE', { ns: 'common' })}
            {''}
          </ButtonSubmitStyled>
        </ButtonGroupStyled>
      </ContainerStyled>
    </ModalStyled>
  )
})

export default ModalShowInfoBank
