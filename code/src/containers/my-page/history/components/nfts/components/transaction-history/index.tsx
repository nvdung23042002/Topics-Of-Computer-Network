import React, { useCallback, useEffect, useState } from 'react'
import { PaginationGroup, TableStyled, TransactionHistoryContainer } from './styled'
import { ColumnsType } from 'antd/es/table'
import { Avatar, Tooltip } from 'antd'
import trimPublicAddress from '@/utils/trimPublicAddress'
import Pagination from '@/components/common/pagination'
import { TypePagination } from '@/types'
import HistoryService from '@/services/History.service'
import { useRouter } from 'next/router'
import { BNToFormat } from '@/utils/bigNumber'
import { useTranslation } from 'next-i18next'
import { STATUS_ENUM } from '../../constants'
import classNames from 'classnames'
import Link from 'next/link'
import Config from '@/config'

const TransactionHistory = () => {
  const [pagination, setPagination] = useState<TypePagination>({ current: 1, pageSize: 10, total: 0 })
  const [dataSource, setDataSource] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const { locale } = useRouter()
  const { t } = useTranslation('history')
  const fetchData = useCallback(async (query) => {
    setLoading(true)
    try {
      const data = await HistoryService.getTransactionHistoryOfUser(query)
      setDataSource(data.records)
      setPagination({ current: data.page, pageSize: data.limit, total: data.totalPage })
    } catch (error) {
      // console.log(error)
      // showMessage({ error: getError(error) })
      setDataSource([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData({ langKey: locale?.toUpperCase() ?? 'JA', limit: pagination.pageSize, page: pagination.current })
  }, [pagination.current, locale])

  const handlePaginationChange = (page: number) => {
    setPagination({ ...pagination, current: page })
  }

  const columns: ColumnsType<any> = [
    {
      title: t('EVENT'),
      dataIndex: 'event',
      key: 'event',
      render: (event) => <span className='text-nowrap event-text'>{event ? t(event) : 'NA'}</span>,
      align: 'left'
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <span className={classNames(`status-${text.toLowerCase()} text-nowrap`)}>{t(STATUS_ENUM[text])}</span>
      )
    },
    {
      title: t('ITEMS'),
      dataIndex: 'items',
      key: 'items',
      render: (_, record) => (
        <div className='d-flex al-items-center'>
          <Avatar src={record.items} /> <span className='text-nowrap ms-2'>{record.name ? record.name : ''}</span>
        </div>
      )
    },
    {
      title: t('CURRENCY'),
      dataIndex: 'currency',
      key: 'currency',
      render: (currency) => <span className='text-nowrap'>{currency}</span>
    },
    {
      title: t('PRICE'),
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span className='text-nowrap'>{BNToFormat(price ? price : 0)}</span>,
      align: 'center'
    },
    {
      title: t('SELLER'),
      dataIndex: 'from',
      key: 'from',
      render: (text) => (
        <Tooltip title={text} placement='bottom'>
          <Link href={`${Config.CHECK_ACCOUNT_URL}/${text}`} target='_blank'>
            <span className='text-nowrap link'>{text ? trimPublicAddress(text, 5) : 'NA'}</span>
          </Link>
        </Tooltip>
      )
    },
    {
      title: t('BUYER'),
      dataIndex: 'to',
      key: 'to',
      render: (text) => (
        <Tooltip title={text} placement='bottom'>
          <Link href={`${Config.CHECK_ACCOUNT_URL}/${text}`} target='_blank'>
            <span className='text-nowrap link'>{text ? trimPublicAddress(text, 5) : 'NA'}</span>
          </Link>{' '}
        </Tooltip>
      )
    }
  ]
  return (
    <TransactionHistoryContainer>
      <TableStyled columns={columns} rowKey={''} scroll={{ x: true }} items={dataSource} loading={loading} />
      <PaginationGroup>
        <Pagination {...pagination} hideOnSinglePage onChange={handlePaginationChange} responsive />
      </PaginationGroup>
    </TransactionHistoryContainer>
  )
}

export default TransactionHistory
