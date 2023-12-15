import React, { useCallback, useEffect, useState } from 'react'
import { FavoriteContainer, ListProduct } from './styled'
import Product from '@/components/product'
import { TypePagination } from '@/types'
import Pagination from '@/components/common/pagination'
import { useRouter } from 'next/router'
import HistoryService from '@/services/History.service'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import { ProductWish } from '@/services/dto/history'
const Favorite = () => {
  const [pagination, setPagination] = useState<TypePagination>({ current: 1, pageSize: 6, total: 0 })
  const [dataSource, setDataSource] = useState<any>([])
  const handlePaginationChange = (page: number) => {
    setPagination({ ...pagination, current: page })
  }
  const [loading, setLoading] = useState(false)
  const { locale } = useRouter()
  const fetchData = useCallback(async (query) => {
    setLoading(true)
    try {
      const data = await HistoryService.getWishProduct(query)
      setDataSource(data.result)
      setPagination({ current: data.page, pageSize: data.limit, total: data.pages })
    } catch (error) {
      console.log(error)
      showMessage({ error: getError(error) })
      setDataSource([])
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    fetchData({ langKey: locale?.toUpperCase() ?? 'JA', limit: pagination.pageSize, page: pagination.current })
  }, [pagination.current, locale])
  return (
    <FavoriteContainer>
      <ListProduct
        grid={{ gutter: 0, xs: 2, sm: 2, lg: 3, md: 3, xl: 3, xxl: 3 }}
        dataSource={dataSource}
        loading={loading}
        renderItem={(item: ProductWish, index) => {
          return (
            <ListProduct.Item key={index}>
              <Product
                id={item.id.toString()}
                status={item.status.toUpperCase()}
                src={item?.imageUrl}
                collectionName={item.categoryName}
                name={item?.name}
                priceETH={item?.price}
                wishCount={item.wishCount ?? 0}
                price={item?.yenPrice}
                locale={locale}
              />
            </ListProduct.Item>
          )
        }}
      />
      <Pagination {...pagination} hideOnSinglePage onChange={handlePaginationChange} />
    </FavoriteContainer>
  )
}

export default Favorite
