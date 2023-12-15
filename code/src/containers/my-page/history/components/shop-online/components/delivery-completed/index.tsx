import React, { useEffect, useState } from 'react'
import { FirstLastPaginationButtonStyled, OrderCodeStyled, TableStyled, TextStyled, WrapComponent } from '../styled'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import HistoryService from '@/services/History.service'
import dayjs from '@/utils/dayjs'
import { dateTimeFormat } from '@/constants/format'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import ArrowLeftPaginationIcon from '@/components/icons/ArrowLeftPaginationIcon'
import { useTranslation } from 'next-i18next'
import useDetectDevice from '@/hooks/useDetectDevice'

interface IComponent {
  getOrderDetail: (id: number) => Promise<void>
  setCount: (count: number) => void
}

export default function DeliveryComponent({ getOrderDetail, setCount }: IComponent) {
  const { t } = useTranslation('history')

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0, pages: 0 })
  const [dataSource, setDataSource] = useState<any>([])

  const handlePaginationChange = (page: number) => {
    setPagination({ ...pagination, current: page })
  }
  const [loading, setLoading] = useState(false)
  const deviceDetect = useDetectDevice()
  // const router = useRouter()
  const { isMobile } = deviceDetect
  const fetchData = async (query) => {
    setLoading(true)
    try {
      const response = await HistoryService.getShopOnlineHistory({ ...query, status: 'SUCCESS' })
      const { data }: any = response
      setDataSource(data?.result)
      setCount(data?.total)
      setPagination({ current: data.page, pageSize: data.limit, total: data.total, pages: data.pages })
    } catch (error) {
      showMessage({ error: getError(error) })
      setDataSource([])
    } finally {
      setLoading(false)
    }
  }

  const { current, pageSize } = pagination

  useEffect(() => {
    fetchData({ limit: pageSize, page: current })
  }, [current, pageSize])

  const parsePrice = (price, currency) => {
    if (!price) {
      return <TextStyled>-</TextStyled>
    }

    let digits = 0
    if (!/\d/.test(price.toString())) {
      digits = 3
    }

    return (
      <TextStyled>{`${Number(price)?.toLocaleString('en-US', {
        minimumFractionDigits: digits
      })}${currency}`}</TextStyled>
    )
  }

  const columns = [
    {
      title: t('HISTORY.COL_ORDER_CODE'),
      dataIndex: 'orderId',
      key: 'orderId',
      render: (_, { orderId }) => <OrderCodeStyled onClick={() => getOrderDetail(orderId)}>{orderId}</OrderCodeStyled>
    },
    {
      title: t('HISTORY.COL_TICKET'),
      dataIndex: 'totalTicket',
      key: 'totalTicket',
      render: (_, { totalTicket }) => parsePrice(totalTicket, '枚')
    },
    {
      title: t('HISTORY.COL_TOTAL_AMOUNT'),
      dataIndex: 'totalMoney',
      key: 'totalMoney',
      render: (_, { totalMoney }) => parsePrice(totalMoney, '円')
    },
    {
      title: t('HISTORY.COL_ORDER_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => <TextStyled>{createdAt ? dayjs(createdAt).format(dateTimeFormat) : '-'}</TextStyled>
    },
    {
      title: t('HISTORY.COL_ORDER_STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: () => <TextStyled className='success'>{t('HISTORY.COMPLETED')}</TextStyled>
    },
    {
      title: t('HISTORY.COL_ORDER_METHOD'),
      dataIndex: 'typePayment',
      key: 'typePayment',
      render: (_, { typePayment }) => {
        let text = ''
        switch (typePayment) {
          case 'CREDIT_CARD':
            text = t('HISTORY.CREDIT_CARD')
            break
          case 'CRYPTO':
            text = t('HISTORY.VIRTUAL_CURRENCY')
            break
          case 'TICKET_EXCHANGE':
            text = t('HISTORY.TICKET_EXCHANGE')
            break
          case 'ACCOUNT_BALANCE':
            text = t('HISTORY.ACCOUNT_BALANCE')
            break
          default:
            text = ''
            break
        }

        return <TextStyled>{text}</TextStyled>
      }
    }
  ]

  return (
    <WrapComponent>
      <TableStyled
        bordered={false}
        // locale={{
        //   emptyText: 'データなし'
        // }}
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        scroll={(isMobile() ? { x: 991 } : false) as any}
        rowKey={''}
        pagination={{
          total: pagination.total || 0,
          hideOnSinglePage: true,
          itemRender: (page, type, originalElement) => {
            if (type === 'prev') {
              return (
                <>
                  <FirstLastPaginationButtonStyled
                    disabled={pagination.current === 1}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePaginationChange(1)
                    }}
                  >
                    <DoubleLeftOutlined />
                  </FirstLastPaginationButtonStyled>
                  <FirstLastPaginationButtonStyled
                    disabled={pagination.current === 1}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePaginationChange(pagination.current - 1)
                    }}
                  >
                    <ArrowLeftPaginationIcon />
                  </FirstLastPaginationButtonStyled>
                </>
              )
            }
            if (type === 'next') {
              return (
                <>
                  <FirstLastPaginationButtonStyled
                    disabled={pagination.current >= pagination.pages}
                    className='rotate'
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePaginationChange(pagination.current + 1)
                    }}
                  >
                    <ArrowLeftPaginationIcon />
                  </FirstLastPaginationButtonStyled>
                  <FirstLastPaginationButtonStyled
                    disabled={pagination.current >= pagination.pages}
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePaginationChange(pagination.pages)
                    }}
                  >
                    <DoubleRightOutlined />
                  </FirstLastPaginationButtonStyled>
                </>
              )
            }

            return originalElement
          },
          responsive: true,
          current: pagination.current,
          async onChange(page) {
            await handlePaginationChange(page)
          }
        }}
      />
    </WrapComponent>
  )
}
