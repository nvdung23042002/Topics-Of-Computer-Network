import { TypePagination } from '@/types'
import React, { useEffect, useState } from 'react'
import { NFTPurchaseTableContainer, PaginationGroup, TableStyled } from './styled'
import { ColumnsType } from 'antd/es/table'
import Pagination from '@/components/common/pagination'
import { useRouter } from 'next/router'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import { useTranslation } from 'next-i18next'
import HistoryService from '@/services/History.service'
import { dateTimeFormat } from '@/constants/format'
import dayjs from '@/utils/dayjs'
import { BNToFormat } from '@/utils/bigNumber'
import Typography from '@/components/common/typography'
const NFTPurchaseTable = () => {
  const [pagination, setPagination] = useState<TypePagination>({ current: 1, pageSize: 10, total: 0 })
  const [dataSource, setDataSource] = useState<any>([])
  const { t } = useTranslation('affiliate-history')

  const handlePaginationChange = (page: number) => {
    setPagination({ ...pagination, current: page })
  }
  const [shortData, setShortData] = useState({
    sortColumn: undefined,
    sortType: undefined
  })
  const [loading, setLoading] = useState(false)
  const { locale } = useRouter()
  const fetchData = async (query) => {
    setLoading(true)
    try {
      const data = await HistoryService.getAffiliateHistoryRegister(query)
      setDataSource(data.records)
      setPagination({ current: data.page, pageSize: data.limit, total: data.total })
    } catch (error) {
      // console.log(error)
      showMessage({ error: getError(error) })
      setDataSource([])
    } finally {
      setLoading(false)
    }
  }
  const calcNo = (page: number, size: number, index: number) => {
    return (page - 1) * size + index + 1
  }
  useEffect(() => {
    fetchData({
      limit: pagination.pageSize,
      page: pagination.current,
      sortColumn: shortData.sortColumn,
      sortType: shortData.sortType,
      typeAffiliate: 'AFFILIATE_NFT'
    })
  }, [pagination.current, locale, shortData])

  const columns: ColumnsType<any> = [
    {
      title: 'No.',
      key: 'No.',
      render: (text, record, index) => (
        <span className='text-nowrap'>{calcNo(pagination.current, pagination.pageSize, index)}</span>
      )
    },
    {
      title: t('USERNAME'),
      dataIndex: 'userName',
      key: 'userName',
      render: (userName) => <span className='text-nowrap'>{userName}</span>
    },
    {
      title: t('NFT_LINK'),
      dataIndex: 'linkNft',
      key: 'linkNft',
      render: (linkNft) => (
        <Typography.Text title={linkNft}>
          <span className='text-nowrap link-affiliate'>{linkNft} </span>
        </Typography.Text>
      )
    },
    {
      title: t('DATE_OF_PURCHASE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => <span className='text-nowrap'>{dayjs(createdAt).format(dateTimeFormat)}</span>
    },
    {
      title: t('BONUS_AMOUNT'),
      dataIndex: 'nftReceived',
      key: 'nftReceived',
      render: (nftReceived) => <span className='text-nowrap'>{BNToFormat(nftReceived, true)}</span>
    }
  ]
  return (
    <NFTPurchaseTableContainer>
      <TableStyled
        columns={columns}
        rowKey={''}
        scroll={{ x: true }}
        items={dataSource}
        loading={loading}
        showSorterTooltip={false}
        sort={{
          sortColumns: ['createdAt', 'userName'],
          sortColumn: shortData.sortColumn,
          sortType: shortData.sortType
        }}
        action={(params) => {
          setShortData({
            sortColumn: params.sortColumn,
            sortType: params.sortType
          })
        }}
      />
      <PaginationGroup>
        <Pagination {...pagination} hideOnSinglePage onChange={handlePaginationChange} />
      </PaginationGroup>
    </NFTPurchaseTableContainer>
  )
}

export default NFTPurchaseTable
