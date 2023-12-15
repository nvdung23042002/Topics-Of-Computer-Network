import Pagination from '@/components/common/pagination'
import { TypePagination } from '@/types'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonText, PaginationGroup, TableStyled, WithDrawalTableContainer } from './styled'
import { useRouter } from 'next/router'
import HistoryService from '@/services/History.service'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import { BNToFormat } from '@/utils/bigNumber'
import dayjs from '@/utils/dayjs'
import { COLOR_STATUS, METHOD_ENUM_WITHDRAWAL, STATUS_ENUM } from '../../../constants'
import { useTranslation } from 'next-i18next'
import { dateTimeFormat } from '@/constants/format'
import ModalShowInfoBank, { ModalRef } from '../../modal/show-info-bank'

const WithDrawalTable = () => {
  const [pagination, setPagination] = useState<TypePagination>({ current: 1, pageSize: 10, total: 0 })
  const [dataSource, setDataSource] = useState<any>([])
  const handlePaginationChange = (page: number) => {
    setPagination({ ...pagination, current: page })
  }
  const { t } = useTranslation('history')

  const [loading, setLoading] = useState(false)
  const { locale } = useRouter()
  const fetchData = async (query) => {
    setLoading(true)
    try {
      const data = await HistoryService.getHistoryWithdrawal(query)
      setDataSource(data?.result)
      setPagination({ current: data.page, pageSize: data.limit, total: data.total })
    } catch (error) {
      console.log(error)
      showMessage({ error: t(getError(error).code == 500 ? 'ERROR_UNKNOWN' : getError(error).code) })
      setDataSource([])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData({ langKey: locale?.toUpperCase() ?? 'JA', limit: pagination.pageSize, page: pagination.current })
  }, [pagination.current, locale])
  const modalShowInfoRef = useRef<ModalRef>(null)

  const columns: ColumnsType<any> = [
    {
      title: t('TRANSACTION_NUMBER'),
      dataIndex: 'ticketHistoryOrderId',
      key: 'ticketHistoryOrderId',
      align: 'center',
      render: (_, record) => (
        <>
          {record?.type == 'WITHDRAWAL_TGW' ? (
            <ButtonText
              onClick={() => {
                modalShowInfoRef.current?.visible()
                modalShowInfoRef.current?.setData(record?.bankInfo)
              }}
            >
              <span className='text-nowrap text-ellipsis history-id' title={record?.ticketHistoryOrderId}>
                {record?.ticketHistoryOrderId ?? '-'}
              </span>
            </ButtonText>
          ) : (
            <span title={record?.ticketHistoryOrderId}>{record?.ticketHistoryOrderId ?? '-'}</span>
          )}
        </>
      )
    },
    {
      title: t('PAYMENT_METHOD'),
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <span className='text-nowrap text-ellipsis' title={t(METHOD_ENUM_WITHDRAWAL[type]) ?? ''}>
          {t(METHOD_ENUM_WITHDRAWAL[type])}
        </span>
      )
    },
    {
      title: t('AMOUNT', { dynamicValue: true, currency: `(${t('YEN', { ns: 'common' })})` }),
      dataIndex: 'productPrice',
      key: 'productPrice',
      align: 'right',
      render: (productPrice) => (
        <span className='text-nowrap text-ellipsis' title={`${BNToFormat(productPrice)}${t('YEN', { ns: 'common' })}`}>
          {productPrice ? `${BNToFormat(productPrice, true)}${t('YEN', { ns: 'common' })}` : '-'}
        </span>
      )
    },
    {
      title: t('AMOUNT', { dynamicValue: true, currency: '(ETH)' }),
      dataIndex: 'ethPrice',
      key: 'ethPrice',
      align: 'right',
      render: (ethPrice) => (
        <span className='text-nowrap text-ellipsis' title={`${BNToFormat(ethPrice)} ETH`}>
          {ethPrice ? `${BNToFormat(ethPrice, true)} ETH` : '-'}
        </span>
      )
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          className='text-nowrap text-ellipsis'
          style={{ color: COLOR_STATUS[status] }}
          title={t(STATUS_ENUM[status]) ?? ''}
        >
          {t(STATUS_ENUM[status])}
        </span>
      )
    },
    {
      title: t('FAILED_REASON'),
      dataIndex: 'errorMessage',
      key: 'errorMessage',
      render: (errorMessage) => (
        <>
          {errorMessage ? (
            <span className='text-nowrap color-waring text-ellipsis' title={errorMessage}>
              {errorMessage}
            </span>
          ) : (
            <span className='text-nowrap'>-</span>
          )}
        </>
      ),
      align: 'center'
    },
    {
      title: t('CREATE_DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => (
        <span className='text-nowrap text-ellipsis' title={createdAt}>
          {
            dayjs(createdAt).format(dateTimeFormat) // '25/01/2019'
          }
        </span>
      )
    }
  ]
  return (
    <WithDrawalTableContainer>
      <TableStyled columns={columns} rowKey={''} scroll={{ x: true }} items={dataSource} loading={loading} />
      <PaginationGroup>
        <Pagination {...pagination} hideOnSinglePage onChange={handlePaginationChange} />
      </PaginationGroup>
      <ModalShowInfoBank ref={modalShowInfoRef} />
    </WithDrawalTableContainer>
  )
}

export default WithDrawalTable
