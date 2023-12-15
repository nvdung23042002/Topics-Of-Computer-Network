import CloseIcon from '@/components/icons/CloseIcon'
import ErrorIcon from '@/components/icons/ErrorIcon'
import WarringIcon from '@/components/icons/WarringIcon'
import { Text2th700Styled, Text3th400Styled, Text400Styled, Text500Styled, Text700Styled } from '@/components/styled'
import { BET_FREE_STATUS, STORAGE_KEY } from '@/constants/common'
import { dateTimeReverseFormat } from '@/constants/format'
import { REGEX_INT } from '@/constants/regex'
import { getTotalNotItemFree } from '@/containers/bet/util'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectAuth } from '@/redux/auth/slice'
import {
  selectBet,
  setDeleteNormalObjTicketsEnter,
  setDeleteNormalObjTicketsPayment,
  setNormalCartItems,
  setNormalObjTicketsEnter,
  setNormalObjTicketsPayment
} from '@/redux/bet/slice'
import dayjs from '@/utils/dayjs'
import storage from '@/utils/storage'
import { Col, Form, Input, Row, Tooltip } from 'antd'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import React, { useLayoutEffect, useState } from 'react'
import {
  BetFreeStyled,
  BetMatchItemStyled,
  CloseIconStyled,
  DateTimeStyled,
  FighterBetedStyled,
  FighterNameStyled,
  FighterStyled,
  MatchStyled,
  RefundStyled,
  TicketsCountStyled,
  WarningBetFree,
  WarningOverQtyStyled
} from './styled'

type Props = {
  item: any
  form: any
}

const BetMatchItem: React.FC<Props> = ({ item, form }) => {
  const { t } = useTranslation(['common', 'cart', 'error-message'])
  const dispatch = useAppDispatch()
  const { normalObjTicketsEnter, normalObjTicketsPayment } = useAppSelector(selectBet)
  const { user, rate } = useAppSelector(selectAuth)
  const normalCartItems = storage('local').get(STORAGE_KEY.NORMAL_CART_ITEMS) || []
  const [countTickets, setCountTickets] = useState<number>(0)
  const { chosenOne, odds, typeBet, votedId, betName, freeBet, startDate, ticketAmount, expectPaymentInput } =
    item || {}

  const priceRateJPY = Number(rate?.TICKET_TO_JPY)
  const isFreeBet = freeBet === BET_FREE_STATUS.ON

  useLayoutEffect(() => {
    if (ticketAmount) {
      form.setFieldValue(`tickets-amount-${votedId}`, ticketAmount)
      dispatch(
        setNormalObjTicketsEnter({
          ...normalObjTicketsEnter,
          [`${votedId}`]: Number(ticketAmount)
        })
      )
    }

    if (expectPaymentInput) {
      form.setFieldValue(`expect-payment-${votedId}`, expectPaymentInput)

      dispatch(
        setNormalObjTicketsPayment({
          ...normalObjTicketsPayment,
          [`${votedId}`]: parseInt(String(expectPaymentInput))
        })
      )
    }
  }, [])

  const handleChangeCountTickets = (e: any) => {
    const inputValue = e.target.value

    if (REGEX_INT.test(inputValue) || inputValue === '') {
      const cloneCartItem = [...normalCartItems]

      let expectPayment: any

      if (isFreeBet) {
        expectPayment = 0
        for (let i = 0; i < cloneCartItem.length; i++) {
          if (cloneCartItem[i].votedId === votedId) {
            cloneCartItem[i]['ticketAmount'] = inputValue || 0
            cloneCartItem[i]['expectOddsInput'] = 0
            cloneCartItem[i]['expectPaymentInput'] = 0
            break
          }
        }
      } else {
        expectPayment = inputValue ? Number(inputValue || 0) * Number(priceRateJPY) * odds : 0

        for (let i = 0; i < cloneCartItem.length; i++) {
          if (cloneCartItem[i].votedId === votedId) {
            cloneCartItem[i]['ticketAmount'] = inputValue || 0
            cloneCartItem[i]['expectOddsInput'] = odds
            cloneCartItem[i]['expectPaymentInput'] = expectPayment
            break
          }
        }
      }

      storage('local').set(STORAGE_KEY.NORMAL_CART_ITEMS, cloneCartItem)
      dispatch(setNormalCartItems(cloneCartItem))

      setCountTickets(inputValue)
      form.setFieldsValue({
        [`tickets-amount-${votedId}`]: inputValue,
        [`expect-payment-${votedId}`]: parseInt(expectPayment)?.toLocaleString('en-US')
      })

      dispatch(
        setNormalObjTicketsEnter({
          ...normalObjTicketsEnter,
          [`${votedId}`]: Number(inputValue)
        })
      )

      dispatch(
        setNormalObjTicketsPayment({
          ...normalObjTicketsPayment,
          [`${votedId}`]: parseInt(String(expectPayment))
        })
      )
    } else {
      form.setFieldsValue({
        [`tickets-amount-${votedId}`]: countTickets === 0 || _isEmpty(countTickets) ? '' : countTickets
      })
    }
  }

  const removeFromCart = (votedId: string) => {
    const cloneCartItem = [...normalCartItems]
    const updatedCartItems = cloneCartItem.filter((item) => item?.votedId !== votedId)
    storage('local').set(STORAGE_KEY.NORMAL_CART_ITEMS, updatedCartItems)
    dispatch(setNormalCartItems(updatedCartItems))

    const newObjTicketsEnter = _cloneDeep(normalObjTicketsEnter)
    delete newObjTicketsEnter[votedId]
    dispatch(setDeleteNormalObjTicketsEnter(newObjTicketsEnter))

    const newObjTicketsPayment = _cloneDeep(normalObjTicketsPayment)
    delete newObjTicketsPayment[votedId]
    dispatch(setDeleteNormalObjTicketsPayment(newObjTicketsPayment))

    form.setFieldsValue({
      [`tickets-amount-${votedId}`]: '',
      [`expect-payment-${votedId}`]: '0',
      [`odds-${votedId}`]: odds
    })
  }

  return (
    <BetMatchItemStyled>
      <CloseIconStyled onClick={() => removeFromCart(votedId)}>
        <CloseIcon className='close-icon' />
      </CloseIconStyled>
      {isFreeBet && (
        <BetFreeStyled>
          {t('BET_FREE', {
            ns: 'cart'
          })}
        </BetFreeStyled>
      )}
      {startDate && (
        <DateTimeStyled>
          <Text700Styled>{dayjs(startDate).format(dateTimeReverseFormat)}</Text700Styled>
        </DateTimeStyled>
      )}
      <MatchStyled>
        <FighterStyled>
          <FighterNameStyled>
            <Tooltip title={betName}>
              <Text500Styled className='text-nowrap-1'>{betName}</Text500Styled>
            </Tooltip>
          </FighterNameStyled>
        </FighterStyled>
      </MatchStyled>
      <FighterBetedStyled className='rounder-2'>
        <div className='choose-one'>
          <Text2th700Styled>{typeBet}</Text2th700Styled>
          <Text2th700Styled>{' - '}</Text2th700Styled>
          <Tooltip title={chosenOne}>
            <Text2th700Styled className='choose-one-name text-nowrap-1'>{chosenOne}</Text2th700Styled>
          </Tooltip>
        </div>
        <div className='odds-view'>
          <Tooltip title={odds}>
            <Text2th700Styled className='odds-view-content'>{odds}</Text2th700Styled>
          </Tooltip>
          <Form.Item name={`odds-${votedId}`} hidden={true}>
            <Input readOnly defaultValue={odds?.toLocaleString('en-US') || 0} />
          </Form.Item>
        </div>
      </FighterBetedStyled>
      <TicketsCountStyled>
        <Form.Item name={`tickets-amount-${votedId}`}>
          <Input
            inputMode='numeric'
            pattern='[0-9]*'
            suffix={t('NUMBER_TICKETS')}
            placeholder='0'
            onChange={handleChangeCountTickets}
          />
        </Form.Item>
      </TicketsCountStyled>
      <RefundStyled>
        <Text400Styled>
          {t('REFUND_EXPECT', {
            ns: 'cart'
          })}
        </Text400Styled>
        <Row align='middle' gutter={5}>
          <Col>
            <Form.Item className='expect-payment' name={`expect-payment-${votedId}`}>
              <Input defaultValue={0} readOnly />
            </Form.Item>
          </Col>
          <Col>
            <Text500Styled>{t('CIRCLE')}</Text500Styled>
          </Col>
        </Row>
      </RefundStyled>
      <Text3th400Styled className='ticket-unit text-right'>
        (１{t('NUMBER_TICKETS')}＝{Number(priceRateJPY)?.toLocaleString('en-US')}
        {t('CIRCLE')})
      </Text3th400Styled>
      {!isFreeBet && (
        <>
          {getTotalNotItemFree(normalCartItems, normalObjTicketsEnter) > (user?.totalTicket || 0) && (
            <WarningOverQtyStyled>
              <ErrorIcon />
              <Text400Styled className='waining-content'>
                {t('MORE_THEN_TICKETS', {
                  ns: 'error-message'
                })}
              </Text400Styled>
            </WarningOverQtyStyled>
          )}
        </>
      )}
      {isFreeBet && (
        <WarningBetFree>
          <WarringIcon />
          <div className='warning-text'>
            {t('BET_WARNING_FREE_BET', {
              ns: 'cart'
            })}
          </div>
        </WarningBetFree>
      )}
    </BetMatchItemStyled>
  )
}

export default BetMatchItem
