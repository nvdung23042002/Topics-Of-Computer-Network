import Radio from '@/components/common/radio'
import { ConfigProvider, Form } from 'antd'
import { ColumnsType } from 'antd/es/table/interface'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  ButtonGroupStyled,
  ButtonStyled,
  ButtonSubmitStyled,
  ContainerStyled,
  ModalStyled,
  TableStyled,
  TextStyled,
  TitleStyled
} from './styled'
import { useTranslation } from 'next-i18next'
import { ThemeProvider } from 'styled-components'
type ModalProps = {
  open?: boolean
  handleSubmit?: (value: any) => void
  nameTable: string | number
  data: any[]
  width?: number
  selectedItem?: any
  handleDelete?: (id: string) => void
}
export type ModalRef = {
  visible: (id?: string | number) => void
  hidden: () => void
  setLoading: (isLoading: boolean) => void
  clearForm: () => void
}

const ModalChooseType = forwardRef<ModalRef, ModalProps>(
  ({ handleSubmit, data, nameTable, width = 610, handleDelete, ...props }, fwRef) => {
    const [open, setOpen] = useState<boolean>(false)
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<any | null>(props.selectedItem)
    const { t } = useTranslation('withdrawal')
    const containerRef = useRef(null)
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
        }
      }),
      [form]
    )
    useEffect(() => {
      if (props.selectedItem && data.length > 0) {
        setSelectedItem(props.selectedItem)
      } else {
        setSelectedItem(data[0])
      }
    }, [data])
    const handleRadioChange = (item: any) => {
      setSelectedItem(item)
    }
    const columns: { [key: string]: ColumnsType<any> } = {
      ['CRYPTOCURRENCY']: [
        {
          title: '',
          dataIndex: 'radio',
          render: (text: any, item: any) => (
            <Radio checked={selectedItem?.id === item.id} onChange={() => handleRadioChange(item)} />
          ),
          className: 'radio-choose'
        },
        {
          title: t('CURRENCY'),
          dataIndex: 'currency',
          width: 100,
          className: 'name-crypto',
          render: (currency) => (
            <TextStyled title={currency} className='text-nowrap text-nowrap-1 text-b' style={{ maxWidth: 100 }}>
              {currency}
            </TextStyled>
          )
        },
        {
          title: t('WALLET_ADDRESS'),
          dataIndex: 'walletAddress',
          width: 200,
          className: 'public-address',
          render: (walletAddress) => (
            <TextStyled title={walletAddress} className='text-nowrap text-nowrap-1' style={{ maxWidth: 200 }}>
              {walletAddress}
            </TextStyled>
          )
        },
        {
          title: '',
          dataIndex: 'actions',
          render: (_, record, index) => (
            <ConfigProvider theme={{ token: { colorPrimary: '#2969DF' } }}>
              <ThemeProvider theme={{ token: { colorPrimary: '#2969DF' } }}>
                <ButtonStyled
                  type='primary'
                  onClick={() => {
                    if (handleDelete) {
                      handleDelete(record?.id)
                    }
                  }}
                  shape='round'
                  className='btn-delete'
                >
                  {t('DELETE')}
                  {''}
                </ButtonStyled>
              </ThemeProvider>
            </ConfigProvider>
          ),
          className: 'action'
        }
      ],
      ['BANK_DEPOSIT']: [
        {
          title: '',
          width: 20,
          dataIndex: 'radio',
          render: (text: any, item: any) => (
            <Radio checked={selectedItem?.id === item.id} onChange={() => handleRadioChange(item)} />
          ),
          className: 'radio-choose'
        },
        {
          title: t('BANK_NAME'),
          dataIndex: 'bankName',
          key: 'bankName',
          width: 200,
          render: (bankName) => (
            <span title={bankName} className='text-b bank-name'>
              {bankName}
            </span>
            // <TextStyled title={bankName} className='text-nowrap text-nowrap-1 text-b' style={{ maxWidth: 200 }}>
            //   {bankName}
            // </TextStyled>
          )
        },
        {
          title: t('BRANCH_NAME'),
          dataIndex: 'branchName',
          key: 'branchName',
          width: 150,
          render: (branchName) => (
            <span title={branchName} className='branch-name'>
              {branchName}
            </span>
          )
        },
        {
          title: t('BANK_CODE'),
          dataIndex: 'bankCode',
          key: 'bankCode',
          render: (bankCode) => (
            <span title={bankCode} className='bank-code'>
              {bankCode}
            </span>
          )
        },
        {
          title: t('BRANCH_CODE'),
          dataIndex: 'branchCode',
          key: 'branchCode',
          render: (branchCode) => (
            <span title={branchCode} className='branch-code'>
              {branchCode}
            </span>
          )
        },
        {
          title: t('ACCOUNT_NUMBER'),
          dataIndex: 'accountNumber',
          key: 'accountNumber',
          width: 150,
          render: (accountNumber) => <span title={accountNumber}>{accountNumber}</span>
        },
        {
          title: t('ACCOUNT_NAME'),
          dataIndex: 'accountName',
          key: 'accountName',
          width: 200,
          render: (accountName) => (
            <span title={accountName} className='account_name'>
              {accountName}
            </span>
          )
        },
        {
          title: '',
          dataIndex: 'actions',
          width: 100,
          render: (_, record, index) => (
            <>
              <ConfigProvider theme={{ token: { colorPrimary: '#2969DF' } }}>
                <ThemeProvider theme={{ token: { colorPrimary: '#2969DF' } }}>
                  <ButtonStyled
                    type='primary'
                    onClick={() => {
                      if (handleDelete) {
                        handleDelete(record?.id)
                      }
                    }}
                    shape='round'
                    className='btn-delete'
                  >
                    {t('DELETE')}
                    {''}
                  </ButtonStyled>
                </ThemeProvider>
              </ConfigProvider>
            </>
          ),
          className: 'action'
        }
      ]
    }
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
          <TitleStyled>{t('WITHDRAWAL_HISTORY')}</TitleStyled>
          <TableStyled
            items={data}
            columns={columns[nameTable]}
            rowKey='id'
            pagination={false}
            loading={loading}
            scroll={data.length > 4 ? { y: 300, x: true } : { x: true }}
          />
          <ButtonGroupStyled>
            <ButtonSubmitStyled
              type='primary'
              onClick={() => {
                if (handleSubmit) {
                  handleSubmit(selectedItem)
                }
              }}
              shape='round'
              disabled={data.length <= 0 || loading}
            >
              {t('SELECT', { ns: 'common' })}
              {''}
            </ButtonSubmitStyled>
          </ButtonGroupStyled>
        </ContainerStyled>
      </ModalStyled>
    )
  }
)

export default ModalChooseType
