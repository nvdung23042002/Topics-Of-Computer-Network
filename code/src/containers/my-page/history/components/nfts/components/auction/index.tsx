import React, { useCallback, useEffect, useState } from 'react'
import { AuctionContainer, ButtonGroupStyled, ListProduct } from './styled'
import Button from '../../common/button'
import Pagination from '@/components/common/pagination'
import { TypePagination } from '@/types'
import { useRouter } from 'next/router'
import HistoryService from '@/services/History.service'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import { ProductAuction } from '@/services/dto/history'
import { useAppSelector } from '@/hooks/store'
import { useTranslation } from 'next-i18next'
import useModal from '@/hooks/useModal'
import Product from '@/components/product'
import Config from '@/config'
import { cancelAuction } from '../../utils'

const Auction = () => {
  const [pagination, setPagination] = useState<TypePagination>({ current: 1, pageSize: 6, total: 0 })
  const [dataSource, setDataSource] = useState<any>([])
  const handlePaginationChange = (page: number) => {
    setPagination({ ...pagination, current: page })
  }
  const privateKeyUser = useAppSelector((state) => state.auth?.user?.privateKey)
  const [loading, setLoading] = useState(false)
  const { locale } = useRouter()
  const { t } = useTranslation('history')
  const { closeModal, openModal } = useModal()
  const fetchData = useCallback(async (query) => {
    setLoading(true)
    try {
      const data = await HistoryService.getMyAuction(query)
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

  const handleCancelAuction = async (id, auctionId, amount) => {
    try {
      setLoading(true)
      const contractTransactionHashId = await cancelAuction(Config.RPC_END_POINT, privateKeyUser, amount)
      await HistoryService.cancelBid({ productId: id, id: auctionId, contractTransactionHashId })
      openModal({
        title: t('CANCEL_AUCTION_SUCCESS'),
        type: 'notification',
        onOk: () => {
          closeModal()
          fetchData({ langKey: locale?.toUpperCase() ?? 'JA', limit: pagination.pageSize, page: pagination.current })
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      showMessage({ error: t(t(error?.message ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
    }
  }
  const handelConfirmCancelAuction = async (id, auctionId, amount) => {
    openModal({
      type: 'confirmation',
      title: t('CONFIRM', { ns: 'common' }),
      content: t('MESSAGE_CONFIRM_CANCEL_AUCTION'),
      onOk: () => {
        closeModal()
        handleCancelAuction(id, auctionId, amount)
      },
      okText: t('CONFIRM', { ns: 'common' }) as string,
      onCancel: () => {
        closeModal()
      }
    })
  }
  return (
    <AuctionContainer>
      <ListProduct
        grid={{ gutter: 0, xs: 2, sm: 2, lg: 3, md: 3, xl: 3, xxl: 3 }}
        dataSource={dataSource}
        loading={loading}
        renderItem={(item: ProductAuction, index) => {
          return (
            <ListProduct.Item key={index}>
              <Product
                id={item.id.toString()}
                status={item.status?.toUpperCase() ?? ''}
                src={item?.imageUrl}
                collectionName={item?.categoryName ?? ''}
                name={item?.name}
                priceETH={item?.bidPrice}
                wishCount={item?.wishCount ?? 0}
                price={item?.bidYenPrice}
                locale={locale}
              />
              <ButtonGroupStyled>
                <Button
                  theme='CANCEL'
                  className='button-action'
                  type='primary'
                  onClick={() => {
                    handelConfirmCancelAuction(item.id.toString(), item?.auctionId, item?.bidPrice.toString())
                  }}
                >
                  {t('CANCEL_AUCTION')}
                </Button>
              </ButtonGroupStyled>
            </ListProduct.Item>
          )
        }}
      />
      <Pagination {...pagination} hideOnSinglePage onChange={handlePaginationChange} />
    </AuctionContainer>
  )
}

export default Auction
