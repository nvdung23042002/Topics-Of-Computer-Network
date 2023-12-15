import SiteLoading from '@/components/site-loading'
import { Text2th700Styled, Text3th400Styled, Text400Styled, TextPrimary700Styled } from '@/components/styled'
import { BET_FREE_STATUS, STORAGE_KEY } from '@/constants/common'
import { dateTimeReverseFormat } from '@/constants/format'
import { REGEX_REMOVE_COMMA } from '@/constants/regex'
import { AppRoutes } from '@/constants/routes'
import { getTotal, getTotalNotItemFree } from '@/containers/bet/util'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import useModal from '@/hooks/useModal'
import { selectAuth } from '@/redux/auth/slice'
import { selectBet, setCartItems, setDeleteObjTicketsEnter, setDeleteObjTicketsPayment } from '@/redux/bet/slice'
import { globalPoolBettingPayment } from '@/redux/bet/thunk'
import dayjs from '@/utils/dayjs'
import storage from '@/utils/storage'
import { Col, Divider, Form, Row, Spin, Tooltip } from 'antd'
import cx from 'classnames'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BetCartNoDataStyled, PaymentBtnStyled, TotalBetStyled, TotalMoneyPaymentStyled } from '../../styled'
import BetMatchItem from './bet-match-item'
import {
  BetCardContentStyled,
  BuyTicketBtnStyled,
  ControlBtnGroupStyled,
  CustomFirstColStyled,
  CustomRowStyled,
  CustomSecondColStyled
} from './styled'
import ModalAds from '@/containers/bet/components/modal-ads'

const FirstTab = React.forwardRef((props: any, ref: any) => {
  const { t } = useTranslation(['common', 'cart', 'success-message'])
  const router = useRouter()
  const { matchId, activeTab } = router.query || {}
  const form = props.form
  const dispatch = useAppDispatch()
  const { openModal, closeModal } = useModal()
  const { objTicketsEnter, objTicketsPayment, cartItems, isFetchCartItemsPaid, loading } = useAppSelector(selectBet)
  const { isAuthenticated, user } = useAppSelector(selectAuth)
  const [visible, setVisible] = useState<boolean>(false)
  const [sponsorAdsList, setSponsorAdsList] = useState<any>([])
  const userProfile = useAppSelector((state) => state.auth.userProfile)
  const { accountLevel } = userProfile || {}

  const isEnoughLevel = accountLevel > 0

  useEffect(() => {
    if (isAuthenticated) {
      const cartItemsStorage = storage('local').get(STORAGE_KEY.CART_ITEMS) || []
      const currentDate = Date.parse(dayjs().format(dateTimeReverseFormat))
      const newCartItems = cartItemsStorage?.filter((item: any) => {
        const dateItems = item?.startDate && dayjs(item?.startDate).subtract(1, 'minute').format(dateTimeReverseFormat)

        return item?.startDate ? Date.parse(dateItems) > currentDate : true
      })

      dispatch(setCartItems(newCartItems))
      storage('local').set(STORAGE_KEY.CART_ITEMS, newCartItems)

      return
    }

    dispatch(setCartItems([]))
  }, [isAuthenticated])

  const handlePayment = () => {
    closeModal()
    const transformedArrayTicketsNoEmpty = Object.entries(form.getFieldsValue()).map(([key, value]: any) => ({
      name: key,
      value: parseFloat(value?.replace(REGEX_REMOVE_COMMA, '') || 0)
    }))

    const newObjTicketsEnter = _cloneDeep(objTicketsEnter)
    const newObjTicketsPayment = _cloneDeep(objTicketsPayment)

    const newCartItems = cartItems?.map((item) => {
      for (let i = 0; i < transformedArrayTicketsNoEmpty.length; i++) {
        if (transformedArrayTicketsNoEmpty[i]?.name?.includes(`tickets-amount-${item.votedId}`)) {
          delete newObjTicketsEnter[item.votedId]
          delete newObjTicketsPayment[item.votedId]

          item = {
            ...item,
            ticketQuantity: Number(transformedArrayTicketsNoEmpty[i]?.value || 0)
          }
        }

        if (transformedArrayTicketsNoEmpty[i]?.name?.includes(`expect-payment-${item.votedId}`)) {
          item = {
            ...item,
            expectedAmount: Number(transformedArrayTicketsNoEmpty[i]?.value || 0)
          }
        }

        if (transformedArrayTicketsNoEmpty[i]?.name?.includes(`odds-${item.votedId}`)) {
          item = {
            ...item,
            odds: Number(transformedArrayTicketsNoEmpty[i]?.value || 0)
          }
        }
      }
      return item
    })

    const cartItemsValid = newCartItems?.filter((item) => {
      if (item?.freeBet === BET_FREE_STATUS.ON) {
        return true
      } else {
        return item?.ticketQuantity
      }
    })

    const cartItemsinValid = newCartItems?.filter((item) => !item?.ticketQuantity)

    dispatch(
      globalPoolBettingPayment({
        cartItemsValid,
        cartItemsinValid,
        callbackPaymentSuccess,
        newObjTicketsEnter,
        newObjTicketsPayment
      })
    )
  }

  const callbackPaymentSuccess = (newObjTicketsEnter: any, newObjTicketsPayment: any, cartItemsValid: any) => {
    const mergedSponsors = {}

    cartItemsValid.forEach((entry: any) => {
      entry.sponsorList.forEach((sponsor: any) => {
        const sponsorId = sponsor.id
        if (!mergedSponsors[sponsorId]) {
          mergedSponsors[sponsorId] = sponsor
        }
      })
    })

    const mergedSponsorList = Object.values(mergedSponsors)?.filter((item: any) => item)
    setSponsorAdsList(mergedSponsorList)

    openModal({
      type: 'notification',
      title: t('BET_CONFIRM', {
        ns: 'cart'
      }),
      subContent: (
        <div
          dangerouslySetInnerHTML={
            {
              __html: t('BET_SUCCESS', {
                ns: 'success-message'
              })
            } as any
          }
        />
      ),
      onOk: () => {
        closeModal()
        !_isEmpty(mergedSponsorList) && onOpenModal()
      }
    })

    if (isFetchCartItemsPaid) {
      ref.current.init()
    }

    dispatch(setDeleteObjTicketsEnter(newObjTicketsEnter))
    dispatch(setDeleteObjTicketsPayment(newObjTicketsPayment))
    form.resetFields()
  }

  const onOpenModal = () => {
    setVisible(true)
  }

  const onCloseModal = () => {
    setVisible(false)
    setSponsorAdsList([])
  }

  return (
    <Spin spinning={loading} indicator={<SiteLoading width={50} />}>
      <Divider />
      {visible && <ModalAds onCancel={onCloseModal} contentModal={sponsorAdsList} />}
      <BetCardContentStyled>
        {_isEmpty(cartItems) || !isAuthenticated ? (
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
          <Form
            initialValues={{}}
            form={form}
            onFinish={() =>
              openModal({
                type: 'confirmation',
                theme: 'info',
                title: t('BET_CONFIRM', {
                  ns: 'cart'
                }),
                subContent: t('BET_CONFIRM_SUB_CONTENT', {
                  ns: 'cart'
                }),
                onOk: handlePayment,
                onCancel: closeModal
              })
            }
          >
            <CustomRowStyled>
              <CustomFirstColStyled className='item-list'>
                <Row gutter={[20, 20]} justify='space-between'>
                  {cartItems?.map((item: any) => {
                    return (
                      <Col span={24} key={item?.votedId}>
                        <BetMatchItem item={item} form={form} />
                      </Col>
                    )
                  })}
                </Row>
              </CustomFirstColStyled>
              {!_isEmpty(cartItems) && user?.totalTicket && (
                <CustomSecondColStyled>
                  <TotalBetStyled>
                    <Text400Styled>
                      {t('TOTAL_BET', {
                        ns: 'cart'
                      })}
                    </Text400Styled>
                    <div className='total-tickets-owned'>
                      <Tooltip
                        title={`${Number(user?.totalTicket || 0)?.toLocaleString('en-US') || 0} ${t('NUMBER_TICKETS')}`}
                      >
                        <Text400Styled>
                          {Number(user?.totalTicket || 0)?.toLocaleString('en-US') || 0} {t('NUMBER_TICKETS')}
                        </Text400Styled>
                      </Tooltip>
                    </div>
                  </TotalBetStyled>
                  <TotalBetStyled>
                    <Text400Styled>
                      {t('TOTAL_TICKETS_BET', {
                        ns: 'cart'
                      })}
                    </Text400Styled>
                    <div className='total-tickets-bet'>
                      <Tooltip
                        title={`${getTotalNotItemFree(cartItems, objTicketsEnter)?.toLocaleString('en-US')} ${t(
                          'NUMBER_TICKETS'
                        )}`}
                      >
                        <Text400Styled
                          className={cx({
                            error: getTotalNotItemFree(cartItems, objTicketsEnter) > (user?.totalTicket || 0)
                          })}
                        >
                          {getTotalNotItemFree(cartItems, objTicketsEnter)?.toLocaleString('en-US')}{' '}
                          {t('NUMBER_TICKETS')}
                        </Text400Styled>
                      </Tooltip>
                    </div>
                  </TotalBetStyled>
                  <TotalBetStyled>
                    <Text400Styled>
                      {t('TICKETS_LEFT', {
                        ns: 'cart'
                      })}
                    </Text400Styled>
                    <div className='total-tickets-left'>
                      <Tooltip
                        title={`${(
                          (user?.totalTicket || 0) - Number(getTotalNotItemFree(cartItems, objTicketsEnter))
                        )?.toLocaleString('en-US')} ${t('NUMBER_TICKETS')}`}
                      >
                        <Text400Styled
                          className={cx({
                            error: getTotalNotItemFree(cartItems, objTicketsEnter) > (user?.totalTicket || 0)
                          })}
                        >
                          {(
                            (user?.totalTicket || 0) - Number(getTotalNotItemFree(cartItems, objTicketsEnter))
                          )?.toLocaleString('en-US')}{' '}
                          {t('NUMBER_TICKETS')}
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
                      <Tooltip title={`${getTotal(objTicketsPayment)?.toLocaleString('en-US')} ${t('CIRCLE')}`}>
                        <TextPrimary700Styled>
                          {getTotal(objTicketsPayment)?.toLocaleString('en-US')} {t('CIRCLE')}
                        </TextPrimary700Styled>
                      </Tooltip>
                    </div>
                  </TotalMoneyPaymentStyled>
                  <ControlBtnGroupStyled>
                    <BuyTicketBtnStyled
                      disabled={!isAuthenticated || !isEnoughLevel}
                      onClick={() => {
                        router.push({
                          pathname: AppRoutes.ticketPurchase,
                          query: {
                            activeTab: 2,
                            redirectType: matchId
                              ? 'MATCH_DETAIL'
                              : Number(activeTab) === 2
                              ? 'BET_MATCH'
                              : 'BET_TOURNAMENT',
                            matchId: matchId ?? 0
                          }
                        })
                      }}
                    >
                      {t('TICKET_PURCHASE', {
                        ns: 'common'
                      })}
                    </BuyTicketBtnStyled>
                    <PaymentBtnStyled
                      htmlType='submit'
                      disabled={
                        !isAuthenticated ||
                        getTotal(objTicketsEnter) === 0 ||
                        (user?.totalTicket || 0) < getTotalNotItemFree(cartItems, objTicketsEnter) ||
                        user?.totalTicket === 0
                      }
                    >
                      <Text2th700Styled>{t('CONFIRM')}</Text2th700Styled>
                    </PaymentBtnStyled>
                  </ControlBtnGroupStyled>
                </CustomSecondColStyled>
              )}
            </CustomRowStyled>
          </Form>
        )}
      </BetCardContentStyled>
    </Spin>
  )
})

export default FirstTab
