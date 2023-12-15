import SiteLoading from '@/components/site-loading'
import { Text3th400Styled, Text400Styled, TextPrimary700Styled } from '@/components/styled'
import { BET_ITEM_STATUS } from '@/constants/common'
import { AppRoutes } from '@/constants/routes'
import { TYPE_BET } from '@/containers/bet/constants'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectAuth } from '@/redux/auth/slice'
import { selectBet, setCartItemsPaid } from '@/redux/bet/slice'
import { getPoolCartItemSecond } from '@/redux/bet/thunk'
import { Col, Divider, Row, Spin, Tooltip } from 'antd'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BetCartNoDataStyled, MyBetBtnStyled, TotalBetStyled, TotalMoneyPaymentStyled } from '../../styled'
import { CustomRowStyled, CustomSecondColStyled } from '../first-tab/styled'
import BetPaidItem from './bet-paid-item'
import { BetCardPaidContentStyled, ScrollParentCartItemsPaidStyled } from './styled'

const SecondTab = React.forwardRef((props: any, ref: any) => {
  const { t } = useTranslation(['common', 'cart'])
  const router = useRouter()
  const childRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector(selectAuth)
  const { cartItemsPaid, cartItemsPaidLoading, cartItemsPaidTotal, sumTicket, sumExpectedAmount } =
    useAppSelector(selectBet) || {}
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 4,
    refresh: true
  })

  useImperativeHandle(
    ref,
    () => ({
      scrollToTopElement: () => {
        setHasMore(false)
        setTimeout(() => {
          const node = document.querySelector('#scroll-id-paid')
          if (node) {
            node.scrollTo(0, 0)
            setHasMore(true)
          }
        }, 0)
      },
      init: () => {
        setPagination({
          page: 1,
          limit: 4,
          refresh: true
        })
      }
    }),

    []
  )

  useEffect(() => {
    ;(async () => {
      if (pagination.refresh) {
        if (isAuthenticated) {
          await dispatch(
            getPoolCartItemSecond({
              status: `${BET_ITEM_STATUS.NEW},${BET_ITEM_STATUS.COMPLETED_TRANSFERRING},${BET_ITEM_STATUS.CANCELLED_TRANSFERRING}`,
              page: pagination.page,
              limit: pagination.limit,
              methodBet: TYPE_BET.BET_POOL,
              isSecondaryFetch: pagination.page === 1
            })
          )

          setPagination((prev: any) => ({ ...prev, refresh: false }))
        } else {
          dispatch(setCartItemsPaid([]))
        }
      }
    })()
  }, [isAuthenticated, user?.userId, pagination.page, pagination.limit, pagination.refresh])

  const fetchMoreData = () => {
    if (cartItemsPaid.length >= cartItemsPaidTotal) {
      setHasMore(false)
      return
    }

    setTimeout(() => {
      setPagination((state) => ({
        ...state,
        page: state.page + 1,
        refresh: true
      }))
    }, 500)
  }

  return (
    <Spin spinning={cartItemsPaidLoading} indicator={<SiteLoading width={50} />}>
      <Divider />
      <BetCardPaidContentStyled>
        {_isEmpty(cartItemsPaid) ? (
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
            <ScrollParentCartItemsPaidStyled id='scroll-id-paid' ref={childRef}>
              <InfiniteScroll
                dataLength={cartItemsPaid.length || 0}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={''}
                scrollableTarget='scroll-id-paid'
              >
                <Row gutter={[20, 20]}>
                  {cartItemsPaid?.map((item: any) => {
                    return (
                      <Col span={24} key={`POOL-paid-${item?.betUserId}`}>
                        <BetPaidItem item={item} />
                      </Col>
                    )
                  })}
                </Row>
              </InfiniteScroll>
            </ScrollParentCartItemsPaidStyled>
            <CustomSecondColStyled>
              <TotalBetStyled>
                <Text400Styled>
                  {t('TOTAL_TICKETS_BET', {
                    ns: 'cart'
                  })}
                </Text400Styled>
                <div className='total-tickets-owned'>
                  <Tooltip title={`${sumTicket?.toLocaleString('en-US') || 0} ${t('NUMBER_TICKETS')}`}>
                    <Text400Styled>
                      {sumTicket?.toLocaleString('en-US') || 0} {t('NUMBER_TICKETS')}
                    </Text400Styled>
                  </Tooltip>
                </div>
              </TotalBetStyled>
              <TotalMoneyPaymentStyled>
                <TextPrimary700Styled>
                  {t('TOTAL_REFUND_MONEY', {
                    ns: 'cart'
                  })}
                </TextPrimary700Styled>
                <div className='value'>
                  <Tooltip title={`${sumExpectedAmount?.toLocaleString('en-US') || 0} ${t('CIRCLE')}`}>
                    <TextPrimary700Styled>
                      {sumExpectedAmount?.toLocaleString('en-US') || 0} {t('CIRCLE')}
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
                      activeTab: 'CURRENTLY_BETTING'
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
      </BetCardPaidContentStyled>
    </Spin>
  )
})

export default SecondTab
