import {
  Text12th500Styled,
  Text3th400Styled,
  Text500Styled,
  Text700Styled,
  Text7th500Styled,
  Text8th500Styled
} from '@/components/styled'
import { STORAGE_KEY } from '@/constants/common'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import useCheckAuth from '@/hooks/useCheckAuth'
import {
  selectBet,
  setDeleteNormalObjTicketsEnter,
  setDeleteNormalObjTicketsPayment,
  setNormalCartItems
} from '@/redux/bet/slice'
import { FireStoreService } from '@/services/FireStore.service'
import dayjs from '@/utils/dayjs'
import storage from '@/utils/storage'
import { FormInstance, Tooltip } from 'antd'
import cx from 'classnames'
import _cloneDeep from 'lodash/cloneDeep'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BetTicketsLineChart } from '../bet-tickets-chart'
import { BetTableStyled, ProcessContentStyled, TicketsProcessStyled } from './styled'
import { renderTypeBet } from '../../util'

type Props = {
  betNormal: any
  matchId: any
  form: FormInstance
  startDate: string
  endDate: string
  isActiveBet: boolean
  isBetFree: boolean
  freeBet: string
  matchName: string
}

const BetTableCustomNormal: React.FC<Props> = ({
  betNormal,
  matchId,
  form,
  startDate,
  endDate,
  isActiveBet,
  isBetFree,
  freeBet,
  matchName
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [rowKey, setRowKey] = useState<any>([])
  const { normalObjTicketsEnter, normalObjTicketsPayment, normalCartItems } = useAppSelector(selectBet)
  const typeBet = renderTypeBet(betNormal?.[0]?.typeBet, t)
  const { checkAuth } = useCheckAuth()
  const isThreeBet = betNormal?.length === 3
  const currentDate = dayjs()
  const matchDate = dayjs(startDate).subtract(1, 'minute')
  const isMatchStoppedBet = startDate && !matchDate.isAfter(currentDate)
  const isMatchStoppedFreeBet = endDate && !dayjs(endDate).isAfter(currentDate)
  const oddsFt1 = betNormal?.[0]?.odds
  const oddsDraw = isThreeBet ? betNormal?.[1]?.odds : 0
  const oddsFt2 = isThreeBet ? betNormal?.[2]?.odds : betNormal?.[1]?.odds

  const [totalTicketsFt1, setTotalTicketsFt1] = useState<number>(0)
  const [totalTicketsDraw, setTotalTicketsDraw] = useState<number>(0)
  const [totalTicketsFt2, setTotalTicketsFt2] = useState<number>(0)

  useLayoutEffect(() => {
    const getListRowKey = normalCartItems?.map((item: any) => item?.votedId)
    setRowKey(getListRowKey)
  }, [normalCartItems.length])

  // event firebase
  useEffect(() => {
    const timeOutTotalTickets = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfNormalMatch(
      matchId,
      (snapshot) => {
        const { data } = snapshot.data() || {}

        const totalTicketsFt1 = data?.find((item: any) => item?.betSettingId === betNormal?.[0]?.commonId)?.totalTicket
        const totalTicketsDraw = isThreeBet
          ? data?.find((item: any) => item?.betSettingId === betNormal?.[1]?.commonId)?.totalTicket
          : 0
        const totalTicketsFt2 = isThreeBet
          ? data?.find((item: any) => item?.betSettingId === betNormal?.[2]?.commonId)?.totalTicket || 0
          : data?.find((item: any) => item?.betSettingId === betNormal?.[1]?.commonId)?.totalTicket || 0

        totalTicketsFt1 && setTotalTicketsFt1(totalTicketsFt1)
        totalTicketsDraw && setTotalTicketsDraw(totalTicketsDraw)
        totalTicketsFt2 && setTotalTicketsFt2(totalTicketsFt2)
      }
    )

    return () => {
      timeOutTotalTickets()
    }
  }, [])

  const handleClick = (customCommonId: string, votedInfo: any, normalCartItems: any[], odds: number) => {
    if (!isActiveBet) return

    if (isBetFree && isMatchStoppedFreeBet) return

    if (!isBetFree && isMatchStoppedBet) return

    checkAuth()

    const isExitsCommonId = rowKey?.includes(customCommonId)
    if (isExitsCommonId) {
      const newRowKeyArr = rowKey?.filter((item: any) => item !== customCommonId)
      setRowKey(newRowKeyArr)

      const cloneArr = _cloneDeep(normalCartItems)
      const newArr = cloneArr?.filter(
        (item: any) => `${item?.optionBet?.toLowerCase()}-${item?.commonId}` !== customCommonId
      )
      const updatedCartItems = [...newArr]

      form.setFieldsValue({
        [`tickets-amount-${votedInfo?.votedId}`]: '',
        [`expect-payment-${votedInfo?.votedId}`]: '0',
        [`odds-${votedInfo?.votedId}}`]: odds
      })

      const newObjTicketsEnter = { ...normalObjTicketsEnter }
      delete newObjTicketsEnter[`${votedInfo?.votedId}`]
      dispatch(setDeleteNormalObjTicketsEnter(newObjTicketsEnter))

      const newObjTicketsPayment = { ...normalObjTicketsPayment }
      delete newObjTicketsPayment[`${votedInfo?.votedId}`]
      dispatch(setDeleteNormalObjTicketsPayment(newObjTicketsPayment))

      storage('local').set(STORAGE_KEY.NORMAL_CART_ITEMS, updatedCartItems)
      dispatch(setNormalCartItems(updatedCartItems))
      return
    }

    setRowKey((prev: any) => [...prev, customCommonId])

    const updatedCartItems = [...normalCartItems, votedInfo]
    storage('local').set(STORAGE_KEY.NORMAL_CART_ITEMS, updatedCartItems)
    dispatch(setNormalCartItems(updatedCartItems))
  }

  return (
    <>
      <TicketsProcessStyled>
        <BetTicketsLineChart
          isThreeBet={isThreeBet}
          totalTicketsFt1={totalTicketsFt1}
          totalTicketsFt2={totalTicketsFt2}
          totalTicketsDraw={totalTicketsDraw}
        />
        <ProcessContentStyled>
          <Text7th500Styled>
            {totalTicketsFt1} {t('NUMBER_TICKETS')}
          </Text7th500Styled>

          {isThreeBet && (
            <Text12th500Styled>
              {totalTicketsDraw} {t('NUMBER_TICKETS')}
            </Text12th500Styled>
          )}

          <Text8th500Styled>
            {totalTicketsFt2} {t('NUMBER_TICKETS')}
          </Text8th500Styled>
        </ProcessContentStyled>
      </TicketsProcessStyled>
      <BetTableStyled>
        <table border={1}>
          <thead>
            <tr>
              <th colSpan={betNormal?.length}>
                <Text700Styled>{typeBet}</Text700Styled>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Tooltip title={betNormal?.[0]?.fullNameKanji}>
                  <Text3th400Styled className='text-nowrap-1'>{betNormal?.[0]?.fullNameKanji}</Text3th400Styled>
                </Tooltip>
              </th>
              {isThreeBet ? (
                <>
                  <th>
                    <Tooltip title='ドロー'>
                      <Text3th400Styled className='text-nowrap-1'>ドロー</Text3th400Styled>
                    </Tooltip>
                  </th>
                  <th>
                    <Tooltip title={betNormal?.[2]?.fullNameKanji}>
                      <Text3th400Styled className='text-nowrap-1'>{betNormal?.[2]?.fullNameKanji}</Text3th400Styled>
                    </Tooltip>
                  </th>
                </>
              ) : (
                <th>
                  <Tooltip title={betNormal?.[1]?.fullNameKanji}>
                    <Text3th400Styled className='text-nowrap-1'>{betNormal?.[1]?.fullNameKanji}</Text3th400Styled>
                  </Tooltip>
                </th>
              )}
            </tr>
            <tr>
              <th
                className={cx('odds un-active', {
                  active: rowKey?.includes(`match-${betNormal?.[0]?.commonId}`),
                  disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                })}
                onClick={() => {
                  const votedInfo = {
                    startDate,
                    optionBetId: matchId,
                    odds: oddsFt1,
                    chosenOne: betNormal?.[0]?.fullNameKanji,
                    typeBet: renderTypeBet(betNormal?.[0]?.typeBet, t),
                    votedId: `match-${betNormal?.[0]?.commonId}`,
                    commonId: betNormal?.[0]?.commonId,
                    betName: matchName,
                    totalTickets: totalTicketsFt1,
                    optionBet: 'MATCH',
                    freeBet
                  }
                  handleClick(`match-${betNormal?.[0]?.commonId}`, votedInfo, normalCartItems, oddsFt1)
                }}
              >
                <Text500Styled>{oddsFt1?.toLocaleString('en-US')}</Text500Styled>
              </th>
              {isThreeBet ? (
                <React.Fragment>
                  <th
                    className={cx('odds un-active', {
                      active: rowKey?.includes(`match-${betNormal?.[1]?.commonId}`),
                      disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                    })}
                    onClick={() => {
                      const votedInfo = {
                        startDate,
                        optionBetId: matchId,
                        odds: oddsDraw,
                        chosenOne: 'ドロー',
                        typeBet: renderTypeBet(betNormal?.[1]?.typeBet, t),
                        votedId: `match-${betNormal?.[1]?.commonId}`,
                        commonId: betNormal?.[1]?.commonId,
                        betName: matchName,
                        totalTickets: totalTicketsDraw,
                        optionBet: 'MATCH',
                        freeBet
                      }

                      handleClick(`match-${betNormal?.[1]?.commonId}`, votedInfo, normalCartItems, oddsDraw)
                    }}
                  >
                    <Text500Styled>{oddsDraw?.toLocaleString('en-US')}</Text500Styled>
                  </th>
                  <th
                    className={cx('odds un-active', {
                      active: rowKey?.includes(`match-${betNormal?.[2]?.commonId}`),
                      disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                    })}
                    onClick={() => {
                      const votedInfo = {
                        startDate,
                        optionBetId: matchId,
                        odds: oddsFt2,
                        chosenOne: betNormal?.[2]?.fullNameKanji,
                        typeBet: renderTypeBet(betNormal?.[2]?.typeBet, t),
                        votedId: `match-${betNormal?.[2]?.commonId}`,
                        commonId: betNormal?.[2]?.commonId,
                        betName: matchName,
                        totalTickets: totalTicketsFt2,
                        optionBet: 'MATCH',
                        freeBet
                      }

                      handleClick(`match-${betNormal?.[2]?.commonId}`, votedInfo, normalCartItems, oddsFt2)
                    }}
                  >
                    <Text500Styled>{oddsFt2?.toLocaleString('en-US')}</Text500Styled>
                  </th>
                </React.Fragment>
              ) : (
                <th
                  className={cx('odds un-active', {
                    active: rowKey?.includes(`match-${betNormal?.[1]?.commonId}`),
                    disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                  })}
                  onClick={() => {
                    const votedInfo = {
                      startDate,
                      optionBetId: matchId,
                      odds: oddsFt2,
                      chosenOne: betNormal?.[1]?.fullNameKanji,
                      typeBet: renderTypeBet(betNormal?.[1]?.typeBet, t),
                      votedId: `match-${betNormal[1].commonId}`,
                      commonId: betNormal?.[1]?.commonId,
                      betName: matchName,
                      totalTickets: totalTicketsFt2,
                      optionBet: 'MATCH',
                      freeBet
                    }

                    handleClick(`match-${betNormal?.[1]?.commonId}`, votedInfo, normalCartItems, oddsFt2)
                  }}
                >
                  <Text500Styled>{oddsFt2?.toLocaleString('en-US')}</Text500Styled>
                </th>
              )}
            </tr>
          </tbody>
        </table>
      </BetTableStyled>
    </>
  )
}

export default BetTableCustomNormal
