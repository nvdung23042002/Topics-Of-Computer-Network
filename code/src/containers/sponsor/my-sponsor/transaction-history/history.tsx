import Typography from '@/components/common/typography'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { BNToFormat, plus } from '@/utils/bigNumber'
import { memo, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import dayjs from '@/utils/dayjs'
import { Tooltip } from 'antd'
import ReasonIcon from '@/components/icons/ReasonIcon'
import { dateTimeFormat } from '@/constants/format'
import { getSponsorPaymentThunk } from '@/redux/sponsor/thunk'
import { SponsorTransactionHistoryStyled } from './styled'
import Searchbox from './search'
import Table from '@/components/common/table'
import { useWindowSize } from '@/hooks/useWindowResize'

const History = memo(() => {
  const historyLoading = useAppSelector((state) => state.sponsor.historyLoading)
  const history = useAppSelector((state) => state.sponsor.history)
  const { t } = useTranslation('sponsor', { useSuspense: false })
  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

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
            {((history.sponsorshipHistoryPages?.page ?? 1) - 1) * history.sponsorshipHistoryPages?.limit + index + 1}
          </Typography.Text>
        )
      }
    },
    {
      title: 'タイプ',
      key: 'typeSponsor',
      dataIndex: 'typeSponsor',
      render: (cell: string) => <p className={`type-${cell?.toLowerCase()} text-nowrap font-bold`}>{t(cell)}</p>
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
      render: (cell: number) => (
        <Typography.Text className='amount-value text-nowrap'>{BNToFormat(cell)} 円</Typography.Text>
      )
    },
    {
      title: (
        <>
          スポンサー金額 <Typography.Text className='title-note'>(税為替手数料込)</Typography.Text>
        </>
      ),
      align: 'right',
      key: 'paymentFee',
      dataIndex: 'paymentFee',
      render: (cell: number, { sponsorAmount }: any) => (
        <Typography.Text className='amount-value text-nowrap'>
          {BNToFormat(plus(cell, sponsorAmount))} 円
        </Typography.Text>
      )
    },
    {
      title: '支払い方法',
      key: 'typePayment',
      dataIndex: 'typePayment',
      render: (cell: string) => <Typography.Text className='text-nowrap'>{t(cell)}</Typography.Text>
    },
    {
      title: '状態',
      key: 'statusPayment',
      dataIndex: 'statusPayment',
      render: (cell: string, { reason }) => (
        <p className={`status-${cell?.toLowerCase()} text-nowrap d-inline-flex al-items-center font-normal`}>
          {t(cell)}{' '}
          {['REJECTED', 'CANCELLED_TRANSFERRING', 'CANCELLED_TRANSFERRED'].includes(cell) && reason && (
            <Tooltip title={reason} trigger={'click'} color='#183B56'>
              <ReasonIcon className='ms-1' style={{ color: '#183B56' }} />
            </Tooltip>
          )}
        </p>
      )
    },
    {
      title: '更新時間',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (cell: string) => (
        <Typography.Text className='text-nowrap'>{dayjs(cell).format(dateTimeFormat)}</Typography.Text>
      )
    }
  ]

  useEffect(() => {
    dispatch(getSponsorPaymentThunk({ page: 1, limit: 10 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SponsorTransactionHistoryStyled>
      {!isMaxWidth1199 && (
        <Typography.Title className='title' level={2}>
          スポンサー履歴管理
        </Typography.Title>
      )}
      <Searchbox
        type='HISTORY'
        onSearch={(params: any) =>
          dispatch(getSponsorPaymentThunk({ ...params, page: 1, limit: history?.sponsorshipHistoryPages?.limit ?? 10 }))
        }
      />
      <Table
        style={{ minHeight: 'unset' }}
        rowKey='id'
        columns={columns}
        items={history?.sponsorshipHistoryPages?.records}
        total={history?.sponsorshipHistoryPages?.total ?? 0}
        page={history?.sponsorshipHistoryPages?.page ?? 1}
        limit={history?.sponsorshipHistoryPages?.limit ?? 10}
        loading={historyLoading}
        scroll={{ x: true }}
        action={(params: any) => dispatch(getSponsorPaymentThunk(params))}
      >
        <div className='total d-flex j-content-end al-items-center'>
          <span>
            スポンサー金額 <Typography.Text className='d-block'>(税為替手数料込)</Typography.Text>
          </span>
          <span className='text-nowrap ms-4'>{BNToFormat(history?.sponsorTotalAmount)} 円</span>
        </div>
      </Table>
    </SponsorTransactionHistoryStyled>
  )
})

export default History
