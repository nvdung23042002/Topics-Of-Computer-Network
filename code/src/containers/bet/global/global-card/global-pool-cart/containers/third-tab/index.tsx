import SiteLoading from '@/components/site-loading'
import { Text3th400Styled, Text400Styled, TextPrimary700Styled } from '@/components/styled'
import { BET_ITEM_STATUS } from '@/constants/common'
import { AppRoutes } from '@/constants/routes'
import { useAppSelector } from '@/hooks/store'
import { selectAuth } from '@/redux/auth/slice'
import NSBService from '@/services/NSB.service'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import { Col, Divider, Row, Spin, Tooltip } from 'antd'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BetCartNoDataStyled, MyBetBtnStyled, TotalBetStyled, TotalMoneyPaymentStyled } from '../../styled'
import { CustomRowStyled, CustomSecondColStyled } from '../first-tab/styled'
import BetResultItem from './bet-result-item'
import { BetCardResultContentStyled, ScrollParentCartItemsResultStyled } from './styled'
import { TYPE_BET } from '@/containers/bet/constants'

const ThirdTab: React.FC = () => {
  const { t } = useTranslation(['common', 'cart'])
  const router = useRouter()
  const { isAuthenticated } = useAppSelector(selectAuth) || {}

  const [hasMore, setHasMore] = useState<boolean>(true)
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 4
  })

  const [cartItemsResult, setCartItemsResult] = useState<any>([])
  const [cartItemsResultInfo, setCartItemsResultInfo] = useState<any>({
    total: 0,
    sumTickets: 0,
    sumActualAmount: 0
  })
  const [loading, setLoading] = useState<boolean>(false)

  const getCartItem = useCallback(async () => {
    if (isAuthenticated) {
      setLoading(true)
      try {
        const response = await NSBService.getGlobalMyBetProcessTab({
          status: `${BET_ITEM_STATUS.COMPLETED_TRANSFERRED},${BET_ITEM_STATUS.CANCELLED_TRANSFERRED}`,
          page: pagination.page,
          limit: pagination.limit,
          methodBet: TYPE_BET.BET_POOL
        })

        setCartItemsResult((prevState: any) => {
          return [...prevState, ...response.data.result]
        })

        setCartItemsResultInfo({
          total: response.data.total || 0,
          sumTickets: response.data.sumTicket || 0,
          sumActualAmount: response.data.sumActualAmount || 0
        })

        setLoading(false)
      } catch (error) {
        setLoading(false)
        const msg = error?.response?.data?.message
        showMessage({ error: msg })
        throw getError(error)
      }
    }
  }, [isAuthenticated, pagination.page, pagination.limit])

  useEffect(() => {
    getCartItem()
  }, [getCartItem])

  const fetchMoreData = () => {
    if (cartItemsResult.length >= cartItemsResultInfo.total) {
      setHasMore(false)
      return
    }

    setTimeout(() => {
      setPagination((state) => ({
        ...state,
        page: state.page + 1
      }))
    }, 500)
  }

  return (
    <Spin spinning={loading} indicator={<SiteLoading width={50} />}>
      <Divider />
      <BetCardResultContentStyled>
        {_isEmpty(cartItemsResult) ? (
          <BetCartNoDataStyled className='text-center'>
            <Text3th400Styled
              dangerouslySetInnerHTML={
                {
                  __html: t('NOT_ITEM_BET', {
                    ns: 'cart'
                  })
                } as any
              }
            />
          </BetCartNoDataStyled>
        ) : (
          <CustomRowStyled>
            <ScrollParentCartItemsResultStyled id='scroll-result-id'>
              <InfiniteScroll
                dataLength={cartItemsResult.length || 0}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={''}
                scrollableTarget='scroll-result-id'
              >
                <Row gutter={[20, 20]}>
                  {cartItemsResult?.map((item: any) => {
                    return (
                      <Col span={24} key={`POOL-result-${item?.betUserId}`}>
                        <BetResultItem item={item} />
                      </Col>
                    )
                  })}
                </Row>
              </InfiniteScroll>
            </ScrollParentCartItemsResultStyled>
            <CustomSecondColStyled>
              <TotalBetStyled>
                <Text400Styled className=''>
                  {t('TOTAL_TICKETS_BET', {
                    ns: 'cart'
                  })}
                </Text400Styled>
                <div className='total-tickets-bet-win'>
                  <Tooltip title={`${cartItemsResultInfo?.sumTickets?.toLocaleString('en-US')} ${t('NUMBER_TICKETS')}`}>
                    <Text400Styled>
                      {cartItemsResultInfo?.sumTickets?.toLocaleString('en-US')} {t('NUMBER_TICKETS')}
                    </Text400Styled>
                  </Tooltip>
                </div>
              </TotalBetStyled>
              <TotalMoneyPaymentStyled>
                <TextPrimary700Styled>
                  {t('TOTAL_RESULT_MONEY', {
                    ns: 'cart'
                  })}
                </TextPrimary700Styled>
                <div className='value'>
                  <Tooltip title={`${cartItemsResultInfo?.sumActualAmount?.toLocaleString('en-US')} ${t('CIRCLE')}`}>
                    <TextPrimary700Styled>
                      {cartItemsResultInfo?.sumActualAmount?.toLocaleString('en-US')} {t('CIRCLE')}
                    </TextPrimary700Styled>
                  </Tooltip>
                </div>
              </TotalMoneyPaymentStyled>
              <MyBetBtnStyled
                type='primary'
                onClick={() =>
                  router.push({
                    pathname: AppRoutes.tradingHistory,
                    query: {
                      activeTab: 'FINISHED_BET'
                    }
                  })
                }
              >
                {t('MY_BETS', {
                  ns: 'cart'
                })}
              </MyBetBtnStyled>
            </CustomSecondColStyled>
          </CustomRowStyled>
        )}
      </BetCardResultContentStyled>
    </Spin>
  )
}

export default ThirdTab
