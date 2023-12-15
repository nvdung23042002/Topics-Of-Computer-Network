import { Text3th400Styled, Text500Styled, Text700Styled } from '@/components/styled'
import { BET_FREE_STATUS, STORAGE_KEY } from '@/constants/common'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectBet, setCartItems, setDeleteObjTicketsEnter, setDeleteObjTicketsPayment } from '@/redux/bet/slice'
import storage from '@/utils/storage'
import { FormInstance, Tooltip } from 'antd'
import cx from 'classnames'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import React, { useLayoutEffect, useState } from 'react'
import { BetTableStyled } from './styled'
import useCheckAuth from '@/hooks/useCheckAuth'

type Props = {
  betPoolDTO: any
  matchId: any
  oddsFt1: number
  oddsFt2: number
  oddsDraw: number
  startDate: any
  isMatchStoppedBet: boolean
  form: FormInstance
  matchName: string
  totalTicketsFt1: number
  totalTicketsDraw: number
  totalTicketsFt2: number
  totalMoneySponsor: number
  maxTickets: number
  freeBet: string
  sponsorTournament: any
  isMatchStoppedFreeBet: boolean
  activeBet: string
  listSponsor: any
}

const BetTableCustom: React.FC<Props> = ({
  betPoolDTO,
  matchId,
  oddsFt1,
  oddsFt2,
  oddsDraw,
  startDate,
  isMatchStoppedBet,
  form,
  matchName,
  totalTicketsFt1,
  totalTicketsDraw,
  totalTicketsFt2,
  totalMoneySponsor,
  maxTickets,
  freeBet,
  sponsorTournament,
  isMatchStoppedFreeBet,
  activeBet,
  listSponsor
}) => {
  const dispatch = useAppDispatch()
  const [rowKey, setRowKey] = useState<any>([])
  const { objTicketsEnter, objTicketsPayment, cartItems } = useAppSelector(selectBet)
  const isTypeBetWinLost = betPoolDTO?.[0]?.typeBet === 'WINNER'
  const { checkAuth } = useCheckAuth()
  const isTypeBet1X2 = betPoolDTO.length === 3
  const isBetFree = freeBet === BET_FREE_STATUS.ON
  const isActiveBet = activeBet === 'ON'
  const isNotSponsor = _isEmpty(listSponsor)
  const isAllNotRankSponsor = listSponsor?.every((item: any) => !item.rank)

  useLayoutEffect(() => {
    const getListRowKey = cartItems?.map((item: any) => item?.votedId)
    setRowKey(getListRowKey)
  }, [cartItems.length])

  const totalTicketsBet = (is1x2: boolean, totalTickets1: number, totalTicketsDraw: number, totalTickets2: number) => {
    if (is1x2) {
      return Number(totalTickets1 + totalTicketsDraw + totalTickets2 || 0)
    }

    return Number(totalTickets1 + totalTickets2 || 0)
  }

  const isQtyLimitReached =
    totalTicketsBet(isTypeBet1X2, totalTicketsFt1, totalTicketsDraw, totalTicketsFt2) >= maxTickets

  const handleClick = (customCommonId: string, votedInfo: any, cartItems: any[], odds: number) => {
    if (!isActiveBet) return

    if (isBetFree && isMatchStoppedFreeBet) return

    if (!isBetFree && (isQtyLimitReached || isMatchStoppedBet || isAllNotRankSponsor || isNotSponsor)) return

    checkAuth()

    const isExitsCommonId = rowKey?.includes(customCommonId)
    if (isExitsCommonId) {
      const newRowKeyArr = rowKey?.filter((item: any) => item !== customCommonId)
      setRowKey(newRowKeyArr)

      const cloneArr = _cloneDeep(cartItems)
      const newArr = cloneArr?.filter(
        (item: any) => `${item?.optionBet?.toLowerCase()}-${item?.commonId}` !== customCommonId
      )
      const updatedCartItems = [...newArr]

      form.setFieldsValue({
        [`tickets-amount-${votedInfo?.votedId}`]: '',
        [`expect-payment-${votedInfo?.votedId}`]: '0',
        [`odds-${votedInfo?.votedId}}`]: odds
      })

      const newObjTicketsEnter = { ...objTicketsEnter }
      delete newObjTicketsEnter[`${votedInfo?.votedId}`]
      dispatch(setDeleteObjTicketsEnter(newObjTicketsEnter))

      const newObjTicketsPayment = { ...objTicketsPayment }
      delete newObjTicketsPayment[`${votedInfo?.votedId}`]
      dispatch(setDeleteObjTicketsPayment(newObjTicketsPayment))

      storage('local').set(STORAGE_KEY.CART_ITEMS, updatedCartItems)
      dispatch(setCartItems(updatedCartItems))
      return
    }

    setRowKey((prev: any) => [...prev, customCommonId])

    const updatedCartItems = [...cartItems, votedInfo]
    storage('local').set(STORAGE_KEY.CART_ITEMS, updatedCartItems)
    dispatch(setCartItems(updatedCartItems))
  }

  return (
    <BetTableStyled>
      <table border={1}>
        <thead>
          <tr>
            <th colSpan={betPoolDTO?.length}>
              <Text700Styled>{isTypeBetWinLost ? 'Winner' : '1x2'}</Text700Styled>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <Tooltip title={betPoolDTO?.[0].fullNameKanji}>
                <Text3th400Styled className='text-nowrap-1'>{betPoolDTO?.[0].fullNameKanji}</Text3th400Styled>
              </Tooltip>
            </th>
            {!isTypeBetWinLost ? (
              <>
                <th>
                  <Tooltip title='ドロー'>
                    <Text3th400Styled className='text-nowrap-1'>ドロー</Text3th400Styled>
                  </Tooltip>
                </th>
                <th>
                  <Tooltip title={betPoolDTO?.[2]?.fullNameKanji}>
                    <Text3th400Styled className='text-nowrap-1'>{betPoolDTO?.[2]?.fullNameKanji}</Text3th400Styled>
                  </Tooltip>
                </th>
              </>
            ) : (
              <th>
                <Tooltip title={betPoolDTO?.[1]?.fullNameKanji}>
                  <Text3th400Styled className='text-nowrap-1'>{betPoolDTO?.[1]?.fullNameKanji}</Text3th400Styled>
                </Tooltip>
              </th>
            )}
          </tr>
          <tr>
            <th
              className={cx('odds un-active', {
                active: rowKey?.includes(`match-${betPoolDTO?.[0]?.commonId}`),
                disable: isActiveBet
                  ? isBetFree
                    ? isMatchStoppedFreeBet
                    : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                  : true
              })}
              onClick={() => {
                const votedInfo = {
                  startDate,
                  optionBetId: matchId,
                  odds: oddsFt1,
                  chosenOne: betPoolDTO?.[0]?.fullNameKanji,
                  typeBet: isTypeBetWinLost ? 'Winner' : '1x2',
                  votedId: `match-${betPoolDTO?.[0]?.commonId}`,
                  commonId: betPoolDTO?.[0]?.commonId,
                  betName: matchName,
                  totalTickets: totalTicketsFt1,
                  totalMoneySponsor,
                  optionBet: 'MATCH',
                  freeBet,
                  sponsorList: sponsorTournament,
                  maxTicket: maxTickets
                }
                handleClick(`match-${betPoolDTO?.[0]?.commonId}`, votedInfo, cartItems, oddsFt1)
              }}
            >
              <Text500Styled>{oddsFt1?.toLocaleString('en-US')}</Text500Styled>
            </th>
            {!(betPoolDTO?.[0]?.typeBet === 'WINNER') ? (
              <React.Fragment>
                <th
                  className={cx('odds un-active', {
                    active: rowKey?.includes(`match-${betPoolDTO?.[1]?.commonId}`),
                    disable: isActiveBet
                      ? isBetFree
                        ? isMatchStoppedFreeBet
                        : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                      : true
                  })}
                  onClick={() => {
                    const votedInfo = {
                      startDate,
                      optionBetId: matchId,
                      odds: oddsDraw,
                      chosenOne: 'ドロー',
                      typeBet: isTypeBetWinLost ? 'Winner' : '1x2',
                      votedId: `match-${betPoolDTO?.[1]?.commonId}`,
                      commonId: betPoolDTO?.[1]?.commonId,
                      betName: matchName,
                      totalTickets: totalTicketsDraw,
                      totalMoneySponsor,
                      optionBet: 'MATCH',
                      freeBet,
                      sponsorList: sponsorTournament,
                      maxTicket: maxTickets
                    }

                    handleClick(`match-${betPoolDTO?.[1]?.commonId}`, votedInfo, cartItems, oddsDraw)
                  }}
                >
                  <Text500Styled>{oddsDraw?.toLocaleString('en-US')}</Text500Styled>
                </th>
                <th
                  className={cx('odds un-active', {
                    active: rowKey?.includes(`match-${betPoolDTO?.[2]?.commonId}`),
                    disable: isActiveBet
                      ? isBetFree
                        ? isMatchStoppedFreeBet
                        : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                      : true
                  })}
                  onClick={() => {
                    const votedInfo = {
                      startDate,
                      optionBetId: matchId,
                      odds: oddsFt2,
                      chosenOne: betPoolDTO?.[2]?.fullNameKanji,
                      typeBet: isTypeBetWinLost ? 'Winner' : '1x2',
                      votedId: `match-${betPoolDTO?.[2]?.commonId}`,
                      commonId: betPoolDTO?.[2]?.commonId,
                      betName: matchName,
                      totalTickets: totalTicketsFt2,
                      totalMoneySponsor,
                      optionBet: 'MATCH',
                      freeBet,
                      sponsorList: sponsorTournament,
                      maxTicket: maxTickets
                    }

                    handleClick(`match-${betPoolDTO?.[2]?.commonId}`, votedInfo, cartItems, oddsFt2)
                  }}
                >
                  <Text500Styled>{oddsFt2?.toLocaleString('en-US')}</Text500Styled>
                </th>
              </React.Fragment>
            ) : (
              <th
                className={cx('odds un-active', {
                  active: rowKey?.includes(`match-${betPoolDTO?.[1]?.commonId}`),
                  disable: isActiveBet
                    ? isBetFree
                      ? isMatchStoppedFreeBet
                      : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                    : true
                })}
                onClick={() => {
                  const votedInfo = {
                    startDate,
                    optionBetId: matchId,
                    odds: oddsFt2,
                    chosenOne: betPoolDTO?.[1]?.fullNameKanji,
                    typeBet: isTypeBetWinLost ? 'Winner' : '1x2',
                    votedId: `match-${betPoolDTO[1].commonId}`,
                    commonId: betPoolDTO?.[1]?.commonId,
                    betName: matchName,
                    totalTickets: totalTicketsFt2,
                    totalMoneySponsor,
                    optionBet: 'MATCH',
                    freeBet,
                    sponsorList: sponsorTournament,
                    maxTicket: maxTickets
                  }

                  handleClick(`match-${betPoolDTO?.[1]?.commonId}`, votedInfo, cartItems, oddsFt2)
                }}
              >
                <Text500Styled>{oddsFt2?.toLocaleString('en-US')}</Text500Styled>
              </th>
            )}
          </tr>
        </tbody>
      </table>
    </BetTableStyled>
  )
}

export default BetTableCustom
