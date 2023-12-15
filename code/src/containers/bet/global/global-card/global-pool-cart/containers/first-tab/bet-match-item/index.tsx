import CloseIcon from '@/components/icons/CloseIcon'
import ErrorIcon from '@/components/icons/ErrorIcon'
import WarringIcon from '@/components/icons/WarringIcon'
import { Text2th700Styled, Text3th400Styled, Text400Styled, Text500Styled, Text700Styled } from '@/components/styled'
import { BET_FREE_STATUS, STORAGE_KEY } from '@/constants/common'
import { FIREBASE } from '@/constants/firebase'
import { dateTimeReverseFormat } from '@/constants/format'
import { REGEX_INT } from '@/constants/regex'
import { getTotalNotItemFree, truncatedNumber } from '@/containers/bet/util'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectAuth } from '@/redux/auth/slice'
import {
  selectBet,
  setCartItems,
  setDeleteObjTicketsEnter,
  setDeleteObjTicketsPayment,
  setObjTicketsEnter,
  setObjTicketsPayment
} from '@/redux/bet/slice'
import { FireStoreService } from '@/services/FireStore.service'
import dayjs from '@/utils/dayjs'
import storage from '@/utils/storage'
import { Col, Form, Input, Row, Tooltip } from 'antd'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useLayoutEffect, useState } from 'react'
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
  const { objTicketsEnter, objTicketsPayment } = useAppSelector(selectBet)
  const { user, rate } = useAppSelector(selectAuth)
  const cartItems = storage('local').get(STORAGE_KEY.CART_ITEMS) || []
  const [countTickets, setCountTickets] = useState<number>(0)
  const {
    optionBetId,
    commonId,
    chosenOne,
    odds,
    typeBet,
    votedId,
    betName,
    totalTickets,
    totalMoneySponsor,
    optionBet,
    freeBet,
    startDate,
    ticketAmount,
    expectOddsInput,
    expectPaymentInput
  } = item || {}

  const [oddsItem, setOddsItem] = useState<number>(odds)
  const priceRateJPY = Number(rate?.TICKET_TO_JPY)

  const [sponsorMoney, setSponsorMoney] = useState<number>(() => {
    return Number(totalMoneySponsor || 0)
  })
  const [oddsView, setOddsView] = useState<any>(0)
  const [totalTicketsBet, setTotalTicketsBet] = useState<number>(Number(totalTickets || 0))
  const isFreeBet = freeBet === BET_FREE_STATUS.ON

  useLayoutEffect(() => {
    if (ticketAmount) {
      form.setFieldValue(`tickets-amount-${votedId}`, ticketAmount)
      dispatch(
        setObjTicketsEnter({
          ...objTicketsEnter,
          [`${votedId}`]: Number(ticketAmount)
        })
      )
    }

    if (expectPaymentInput) {
      form.setFieldValue(`expect-payment-${votedId}`, expectPaymentInput)

      dispatch(
        setObjTicketsPayment({
          ...objTicketsPayment,
          [`${votedId}`]: parseInt(String(expectPaymentInput))
        })
      )
    }

    if (expectOddsInput) setOddsView(expectOddsInput)
  }, [])

  useEffect(() => {
    let timeOutOddsCartItem: any
    let timeOutTotalTicketsBetedFighter: any
    let timeOutSponsor: any

    if (optionBet === 'MATCH') {
      timeOutOddsCartItem = FireStoreService.getInstance().listenTimeOutOddsFighter(
        FIREBASE.MATCH_GLOBAL_ID,
        commonId,
        (snapshot) => {
          const data = snapshot.data()
          const ticketsAmountInput = form.getFieldValue(`tickets-amount-${votedId}`)

          if (!ticketsAmountInput) {
            form.setFieldsValue({
              [`odds-${votedId}`]: Number(data?.odds || 0)
            })
            setOddsView(Number(data?.odds || 0))
          } else {
            const expectOdds =
              sponsorMoney / ((Number(totalTicketsBet || 0) + Number(ticketsAmountInput || 0)) * Number(priceRateJPY))

            const truncatedExpectOdds = parseFloat(String(truncatedNumber(expectOdds, 2)))

            const expectPayment = Number(ticketsAmountInput || 0) * Number(priceRateJPY) * truncatedExpectOdds

            setOddsView(Number(expectOdds || 0))
            form.setFieldsValue({
              [`expect-payment-${votedId}`]: parseInt(String(expectPayment))?.toLocaleString('en-US'),
              [`odds-${votedId}`]: ticketsAmountInput
                ? truncatedExpectOdds?.toLocaleString('en-US')
                : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
            })
          }

          setOddsItem(Number(data?.odds || 0))
        }
      )
    } else {
      timeOutOddsCartItem = FireStoreService.getInstance().listenTimeOutOddsFighter(
        FIREBASE.TOURNAMENT_GLOBAL_ID,
        optionBetId,
        (snapshot) => {
          const data = snapshot?.data()?.data || []
          const getItem = data?.filter((item: any) => item?.commonIdTournament === commonId)
          const ticketsAmountInput = form.getFieldValue(`tickets-amount-${votedId}`)
          if (!ticketsAmountInput) {
            form.setFieldsValue({
              [`odds-${votedId}`]: Number(getItem?.[0]?.odds || 0)
            })

            setOddsView(Number(getItem?.[0]?.odds || 0))
          } else {
            const expectOdds =
              sponsorMoney / ((Number(totalTicketsBet || 0) + Number(ticketsAmountInput || 0)) * Number(priceRateJPY))

            const truncatedExpectOdds = parseFloat(String(truncatedNumber(expectOdds, 2)))

            const expectPayment = Number(ticketsAmountInput || 0) * Number(priceRateJPY) * truncatedExpectOdds

            setOddsView(Number(expectOdds || 0))
            form.setFieldsValue({
              [`expect-payment-${votedId}`]: parseInt(String(expectPayment))?.toLocaleString('en-US'),
              [`odds-${votedId}`]: ticketsAmountInput
                ? truncatedExpectOdds?.toLocaleString('en-US')
                : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
            })
          }

          setOddsItem(Number(getItem?.[0]?.odds || 0))
        }
      )
    }

    if (optionBet === 'MATCH') {
      timeOutSponsor = FireStoreService.getInstance().listentimeOutSponsor(
        FIREBASE.MATCH_GLOBAL_ID,
        optionBetId,
        (snapshot) => {
          const data = snapshot.data()
          const { match } = data || {}
          const sponsorMoney = Number(match?.[0]?.totalFund || 0)
          const ticketsAmountInput = form.getFieldValue(`tickets-amount-${votedId}`)
          const expectOdds = Number(ticketsAmountInput || 0)
            ? sponsorMoney / ((Number(totalTicketsBet || 0) + Number(ticketsAmountInput || 0)) * Number(priceRateJPY))
            : 0

          const truncatedExpectOdds = parseFloat(String(truncatedNumber(expectOdds, 2)))

          const expectPayment = Number(ticketsAmountInput || 0)
            ? Number(ticketsAmountInput || 0) * Number(priceRateJPY) * truncatedExpectOdds
            : 0

          form.setFieldsValue({
            [`expect-payment-${votedId}`]: parseInt(String(expectPayment))?.toLocaleString('en-US'),
            [`odds-${votedId}`]: ticketsAmountInput
              ? truncatedExpectOdds?.toLocaleString('en-US')
              : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
          })

          setOddsView(() => {
            return ticketsAmountInput
              ? truncatedExpectOdds?.toLocaleString('en-US')
              : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
          })

          dispatch(
            setObjTicketsPayment({
              ...objTicketsPayment,
              [`${votedId}`]: parseInt(String(expectPayment))
            })
          )

          setSponsorMoney(sponsorMoney)
        }
      )
    } else {
      timeOutSponsor = FireStoreService.getInstance().listentimeOutSponsor(
        FIREBASE.TOURNAMENT_GLOBAL_ID,
        optionBetId,
        (snapshot) => {
          const data = snapshot.data()
          const { totalFund } = data || {}
          const sponsorMoney = Number(totalFund || 0)
          const ticketsAmountInput = form.getFieldValue(`tickets-amount-${votedId}`)
          const expectOdds = Number(ticketsAmountInput || 0)
            ? sponsorMoney / ((Number(totalTicketsBet || 0) + Number(ticketsAmountInput || 0)) * Number(priceRateJPY))
            : 0

          const truncatedExpectOdds = parseFloat(String(truncatedNumber(expectOdds, 2)))

          const expectPayment = Number(ticketsAmountInput || 0)
            ? Number(ticketsAmountInput || 0) * Number(priceRateJPY) * truncatedExpectOdds
            : 0

          form.setFieldsValue({
            [`expect-payment-${votedId}`]: parseInt(String(expectPayment))?.toLocaleString('en-US'),
            [`odds-${votedId}`]: ticketsAmountInput
              ? truncatedExpectOdds?.toLocaleString('en-US')
              : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
          })

          setOddsView(() => {
            return ticketsAmountInput
              ? truncatedExpectOdds?.toLocaleString('en-US')
              : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
          })

          dispatch(
            setObjTicketsPayment({
              ...objTicketsPayment,
              [`${votedId}`]: parseInt(String(expectPayment))
            })
          )

          setSponsorMoney(sponsorMoney)
        }
      )
    }

    if (optionBet === 'MATCH') {
      timeOutTotalTicketsBetedFighter = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfMatch(
        commonId,
        (snapshot) => {
          const data = snapshot.data()
          const ticketsAmountInput = form.getFieldValue(`tickets-amount-${votedId}`)
          const expectOdds =
            sponsorMoney / ((Number(data?.totalTicket || 0) + Number(ticketsAmountInput || 0)) * Number(priceRateJPY))

          const truncatedExpectOdds = parseFloat(String(truncatedNumber(expectOdds, 2)))

          const expectPayment = Number(ticketsAmountInput || 0)
            ? Number(ticketsAmountInput || 0) * Number(priceRateJPY) * truncatedExpectOdds
            : 0

          form.setFieldsValue({
            [`expect-payment-${votedId}`]: parseInt(String(expectPayment))?.toLocaleString('en-US'),
            [`odds-${votedId}`]: ticketsAmountInput
              ? truncatedExpectOdds?.toLocaleString('en-US')
              : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
          })

          setOddsView(() => {
            return ticketsAmountInput
              ? truncatedExpectOdds?.toLocaleString('en-US')
              : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
          })

          dispatch(
            setObjTicketsPayment({
              ...objTicketsPayment,
              [`${votedId}`]: parseInt(String(expectPayment))
            })
          )

          setTotalTicketsBet(Number(data?.totalTicket || 0))
        }
      )
    } else {
      timeOutTotalTicketsBetedFighter = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfTournament(
        optionBetId,
        (snapshot) => {
          const data = snapshot.data()?.data || []
          const getItem = data?.filter((item: any) => item?.commonIdTournament === commonId)
          const ticketsAmountInput = form.getFieldValue(`tickets-amount-${votedId}`)

          const expectOdds =
            sponsorMoney /
            ((Number(getItem?.[0]?.sumTicket || 0) + Number(ticketsAmountInput || 0)) * Number(priceRateJPY))

          const truncatedExpectOdds = parseFloat(String(truncatedNumber(expectOdds, 2)))

          const expectPayment = Number(ticketsAmountInput || 0)
            ? Number(ticketsAmountInput || 0) * Number(priceRateJPY) * truncatedExpectOdds
            : 0

          form.setFieldsValue({
            [`expect-payment-${votedId}`]: parseInt(String(expectPayment))?.toLocaleString('en-US'),
            [`odds-${votedId}`]: ticketsAmountInput
              ? truncatedExpectOdds?.toLocaleString('en-US')
              : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
          })

          setOddsView(() => {
            return ticketsAmountInput
              ? truncatedExpectOdds?.toLocaleString('en-US')
              : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
          })

          dispatch(
            setObjTicketsPayment({
              ...objTicketsPayment,
              [`${votedId}`]: parseInt(String(expectPayment))
            })
          )

          setTotalTicketsBet(Number(getItem?.[0]?.sumTicket || 0))
        }
      )
    }

    return () => {
      timeOutOddsCartItem()
      timeOutSponsor()
      timeOutTotalTicketsBetedFighter()
    }
  }, [])

  const handleChangeCountTickets = (e: any) => {
    const inputValue = e.target.value

    if (REGEX_INT.test(inputValue) || inputValue === '') {
      const cloneCartItem = [...cartItems]

      let expectOdds: any
      let expectPayment: any
      let truncatedExpectOdds: any

      if (isFreeBet) {
        expectOdds = 0
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
        expectOdds = inputValue
          ? sponsorMoney / ((Number(totalTicketsBet || 0) + Number(inputValue || 0)) * Number(priceRateJPY))
          : oddsItem

        truncatedExpectOdds = parseFloat(String(truncatedNumber(expectOdds, 2)))

        expectPayment = inputValue ? Number(inputValue || 0) * Number(priceRateJPY) * truncatedExpectOdds : 0

        for (let i = 0; i < cloneCartItem.length; i++) {
          if (cloneCartItem[i].votedId === votedId) {
            cloneCartItem[i]['ticketAmount'] = inputValue || 0
            cloneCartItem[i]['expectOddsInput'] = truncatedExpectOdds
            cloneCartItem[i]['expectPaymentInput'] = expectPayment
            break
          }
        }
      }

      storage('local').set(STORAGE_KEY.CART_ITEMS, cloneCartItem)
      dispatch(setCartItems(cloneCartItem))

      setCountTickets(inputValue)
      form.setFieldsValue({
        [`tickets-amount-${votedId}`]: inputValue,
        [`expect-payment-${votedId}`]: parseInt(expectPayment)?.toLocaleString('en-US'),
        [`odds-${votedId}`]: inputValue
          ? truncatedExpectOdds?.toLocaleString('en-US')
          : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
      })

      setOddsView(() => {
        return inputValue
          ? truncatedExpectOdds?.toLocaleString('en-US')
          : parseFloat(String(truncatedNumber(oddsItem, 2)))?.toLocaleString('en-US')
      })

      dispatch(
        setObjTicketsEnter({
          ...objTicketsEnter,
          [`${votedId}`]: Number(inputValue)
        })
      )

      dispatch(
        setObjTicketsPayment({
          ...objTicketsPayment,
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
    const cloneCartItem = [...cartItems]
    const updatedCartItems = cloneCartItem.filter((item) => item?.votedId !== votedId)
    storage('local').set(STORAGE_KEY.CART_ITEMS, updatedCartItems)
    dispatch(setCartItems(updatedCartItems))

    const newObjTicketsEnter = _cloneDeep(objTicketsEnter)
    delete newObjTicketsEnter[votedId]
    dispatch(setDeleteObjTicketsEnter(newObjTicketsEnter))

    const newObjTicketsPayment = _cloneDeep(objTicketsPayment)
    delete newObjTicketsPayment[votedId]
    dispatch(setDeleteObjTicketsPayment(newObjTicketsPayment))

    form.setFieldsValue({
      [`tickets-amount-${votedId}`]: '',
      [`expect-payment-${votedId}`]: '0',
      [`odds-${votedId}`]: oddsItem
    })

    setOddsView(oddsItem)
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
          <Tooltip title={oddsView}>
            <Text2th700Styled className='odds-view-content'>{oddsView}</Text2th700Styled>
          </Tooltip>
          <Form.Item name={`odds-${votedId}`} hidden={true}>
            <Input readOnly defaultValue={oddsItem?.toLocaleString('en-US') || 0} />
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
          {getTotalNotItemFree(cartItems, objTicketsEnter) > (user?.totalTicket || 0) && (
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
