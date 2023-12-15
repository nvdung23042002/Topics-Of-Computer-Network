import Typography from '@/components/common/typography'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import bigNumber, { BNToFormat } from '@/utils/bigNumber'
import { RefObject, memo, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import dayjs from '@/utils/dayjs'
import { ConfigProvider } from 'antd'
import { dateTimeFormat } from '@/constants/format'
import { getSponsorPaymentThunk, getSponsorTransactionThunk, paymentThunk } from '@/redux/sponsor/thunk'
import { ButtonStyled, SponsorTransactionHistoryStyled } from './styled'
import { Transaction } from '@/services/dto/sponsor'
import Table from '@/components/common/table'
import Policy, { ModalHandle } from '../../../../components/policy'
import Radio from '@/components/common/form/Radio'
import Checkbox from '@/components/common/form/Checkbox'
import { ThemeProvider } from 'styled-components'
import { FormTheme } from '@/theme'
import { useRouter } from 'next/router'
import SearchBar from './search'
import { CREDIT_MAX_DOLLAR_AMOUNT } from '@/constants/common'
import showMessage from '@/utils/showMessage'
import { useWindowSize } from '@/hooks/useWindowResize'

const Payment = memo(() => {
  const modalRef: RefObject<ModalHandle> | undefined = useRef<ModalHandle>(null)
  const [isAcceptPolicy, setIsAcceptPolicy] = useState<boolean>(false)
  const [typePayment, setTypePayment] = useState<string>('CREDIT_CARD')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const transaction = useAppSelector((state) => state.sponsor.transaction)
  const transactionLoading = useAppSelector((state) => state.sponsor.transactionLoading)
  const usdToYen = useAppSelector((state) => state.auth.rate?.USD_TO_JPY) ?? 0
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const dispatch = useAppDispatch()
  const navigate = useRouter()
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const onChangePolicy = (isAccepted: boolean) => {
    setIsAcceptPolicy(isAccepted)
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Transaction[]) => {
      setSelectedTransaction(selectedRows)
      setTotalAmount(selectedRows?.reduce((prev: number, next: Transaction) => prev + (next.sponsorAmount ?? 0), 0))
    },
    getCheckboxProps: (record: Transaction) => ({
      disabled: record.statusPayment !== 'APPROVED', // Column configuration not to be checked
      name: record.id.toString()
    })
  }

  const payment = useCallback(async () => {
    const maxAmount = bigNumber(CREDIT_MAX_DOLLAR_AMOUNT)

    if (typePayment === 'CREDIT_CARD' && bigNumber(totalAmount).isGreaterThan(maxAmount)) {
      showMessage({
        warning: `クレジットカード支払いの方法は最大で${maxAmount.decimalPlaces(0).toFormat()}円まで対応しています。`
      })
      return
    }

    const data = {
      sponsorships: selectedTransaction,
      totalAmount,
      typePayment
    }
    const { meta, payload } = await dispatch(paymentThunk(data))

    if (meta.requestStatus === 'fulfilled') {
      if (payload?.status === 'SUCCESS' && typePayment === 'CREDIT_CARD' && payload?.data) {
        navigate.push(payload?.data)
      } else {
        showMessage({
          success: `請求書の支払い方法は正常に確認されました。`
        })

        setTotalAmount(0)
        setIsAcceptPolicy(false)
        setTypePayment('CREDIT_CARD')
        setSelectedTransaction([])
        dispatch(getSponsorTransactionThunk({ page: 1, limit: 10 }))
        dispatch(getSponsorPaymentThunk({ page: 1, limit: 10 }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTransaction, typePayment, totalAmount, usdToYen])

  const columns: any[] = [
    {
      title: '#',
      key: 'id',
      render: (cell: any, row: any, index: number) => {
        const style: React.CSSProperties = {
          whiteSpace: 'nowrap'
        }
        return (
          <Typography.Text style={style}>
            {((transaction?.page ?? 1) - 1) * transaction?.limit + index + 1}
          </Typography.Text>
        )
      }
    },
    {
      title: 'タイプ',
      key: 'typeSponsor',
      dataIndex: 'typeSponsor',
      render: (cell: string) => <p className={`type-${cell?.toLowerCase()} text-nowrap  font-bold`}>{t(cell)}</p>
    },
    {
      title: 'スポンサー対象',
      key: 'sponsorshipName',
      dataIndex: 'sponsorshipName',
      render: (cell: string) => (
        <Typography.Text className='text-nowrap-2' title={cell}>
          {cell}
        </Typography.Text>
      )
    },
    {
      title: 'スポンサー金額',
      align: 'right',
      key: 'sponsorAmount',
      dataIndex: 'sponsorAmount',
      render: (cell: string) => (
        <Typography.Text className='amount-value text-nowrap'>{BNToFormat(cell)} 円</Typography.Text>
      )
    },
    {
      title: '状態',
      key: 'statusPayment',
      dataIndex: 'statusPayment',
      render: (cell: string) => <p className={`status-${cell?.toLowerCase()} text-nowrap font-normal`}>{t(cell)}</p>
    },
    {
      title: '作成時間',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (cell: string) => (
        <Typography.Text className='text-nowrap'>{dayjs(cell).format(dateTimeFormat)}</Typography.Text>
      )
    }
  ]

  useEffect(() => {
    dispatch(getSponsorTransactionThunk({ page: 1, limit: 10 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SponsorTransactionHistoryStyled>
        {!isMaxWidth1199 && (
          <Typography.Title className='title' level={2}>
            スポンサー管理
          </Typography.Title>
        )}
        <SearchBar
          type='PAYMENT'
          onSearch={(params: any) =>
            dispatch(
              getSponsorTransactionThunk({
                ...params,
                page: 1,
                limit: transaction?.limit ?? 10
              })
            )
          }
        />
        <ConfigProvider theme={FormTheme}>
          <ThemeProvider theme={FormTheme}>
            <Table
              style={{ minHeight: 'unset' }}
              rowKey='id'
              columns={columns}
              items={transaction?.records}
              total={transaction?.total ?? 0}
              page={transaction?.page ?? 1}
              limit={transaction?.limit ?? 10}
              loading={transactionLoading}
              scroll={{ x: true }}
              action={(params: any) => dispatch(getSponsorTransactionThunk(params))}
              rowSelection={{
                type: 'checkbox',
                ...rowSelection
              }}
            >
              <div className='total d-flex j-content-end al-items-center'>
                <span>合計金額：</span>
                <span className='text-nowrap ms-1'>{BNToFormat(totalAmount)} 円</span>
              </div>
            </Table>
          </ThemeProvider>
        </ConfigProvider>

        <div className='policy mb-5'>
          <Checkbox checked={isAcceptPolicy} onClick={() => modalRef.current?.visible()} />
          <Typography.Text className='checkbox-text ms-2'>利用規約</Typography.Text>
        </div>

        <div className='payment-method'>
          <Radio
            value={typePayment}
            list={[
              { label: 'クレジットカード', value: 'CREDIT_CARD' },
              { label: '請求書', value: 'INVOICE' }
            ]}
            onChange={(e: any) => {
              setTypePayment(e.target.value)
            }}
          />
        </div>

        <div className='text-center'>
          <ButtonStyled
            type='primary'
            shape='round'
            disabled={!typePayment || !isAcceptPolicy || !selectedTransaction?.length}
            onClick={() => typePayment && isAcceptPolicy && selectedTransaction?.length && payment()}
          >
            支払いへ
          </ButtonStyled>
        </div>
      </SponsorTransactionHistoryStyled>
      <Policy ref={modalRef} onChangePolicy={onChangePolicy} page='sponsor' typeTerm='TERM_SPONSOR' />
    </>
  )
})

export default Payment
