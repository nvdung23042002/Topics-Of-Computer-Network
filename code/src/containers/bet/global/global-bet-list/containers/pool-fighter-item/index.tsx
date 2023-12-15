/* eslint-disable react-hooks/exhaustive-deps */
import Image from '@/components/common/image'
import { Text9th800Styled, TextPrimary700Styled } from '@/components/styled'
import { STORAGE_KEY } from '@/constants/common'
import { FIREBASE } from '@/constants/firebase'
import { AppRoutes } from '@/constants/routes'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectBet, setCartItems, setDeleteObjTicketsEnter, setDeleteObjTicketsPayment } from '@/redux/bet/slice'
import { FireStoreService } from '@/services/FireStore.service'
import dayjs from '@/utils/dayjs'
import storage from '@/utils/storage'
import { FormInstance, Tooltip } from 'antd'
import cx from 'classnames'
import _cloneDeep from 'lodash/cloneDeep'
import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TournamentsFighterImgStyled, TournamentsFighterImgWrapperStyled, TournamentsFighterStyled } from './styled'
import useCheckAuth from '@/hooks/useCheckAuth'
type Props = {
  item: any
  form: FormInstance
  startDateTime: any
  tournamentId: any
  tournamentName: string
  templateSponsorDTOS: any
  activeBet: string
  isNotSponsor: boolean
  isTypeTournament: boolean
}

const PoolFighterItem: React.FC<Props> = ({
  item,
  form,
  startDateTime,
  tournamentId,
  tournamentName,
  templateSponsorDTOS,
  activeBet,
  isNotSponsor,
  isTypeTournament
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { objTicketsEnter, objTicketsPayment, cartItems } = useAppSelector(selectBet)
  const [rowKey, setRowKey] = useState<any>([])
  const [odds, setOdds] = useState<number>(item?.odds || 0)
  const [totalTicketsBeted, setTotalTicketsBeted] = useState<number>(0)
  const [sponsorMoney, setSponsorMoney] = useState<number>(0)
  const [maxTickets, setMaxTickets] = useState<number>(0)
  const [totalTicketsBetedAllFighter, setTotalTicketsBetedAllFighter] = useState<number>(0)

  const currentDate = dayjs()
  const tournamentDate = dayjs(startDateTime).subtract(1, 'minute')
  const isTournamentStoppedBet = !tournamentDate.isAfter(currentDate)
  const isQtyLimitReached = totalTicketsBetedAllFighter >= maxTickets

  const isActiveBet = activeBet === 'ON'
  const { checkAuth } = useCheckAuth()

  useLayoutEffect(() => {
    const getListRowKey = cartItems?.map((item: any) => item?.votedId)
    setRowKey(getListRowKey)
  }, [cartItems.length])

  useEffect(() => {
    const timeOutOddsFighter = FireStoreService.getInstance().listenTimeOutOddsFighter(
      FIREBASE.TOURNAMENT_GLOBAL_ID,
      tournamentId,
      (snapshot) => {
        const data = snapshot.data()?.data || []
        const getItem = data?.filter((ft: any) => ft?.commonIdTournament === item?.commonIdTournament)
        const totalTicketsBetedAll = data?.reduce(
          (accumulator: any, current: any) => accumulator + current.sumTicket,
          0
        )
        setOdds(Number(getItem?.[0]?.odds || 0))
        setTotalTicketsBeted(Number(getItem?.[0]?.sumTicket || 0))
        setTotalTicketsBetedAllFighter(Number(totalTicketsBetedAll))
      }
    )

    const timeOutSponsor = FireStoreService.getInstance().listentimeOutSponsor(
      FIREBASE.TOURNAMENT_GLOBAL_ID,
      tournamentId,
      (snapshot) => {
        const data = snapshot.data()
        const totalFund = parseFloat(data?.totalFund)
        setSponsorMoney(totalFund || 0)
        setMaxTickets(Number(data?.totalTicket || 0))
      }
    )

    return () => {
      timeOutOddsFighter()
      timeOutSponsor()
    }
  }, [])

  const handleClick = (customCommonId: string, votedInfo: any, cartItems: any[], odds: number) => {
    if (!isActiveBet) return

    if (isNotSponsor) return

    if (isTournamentStoppedBet) return

    if (isQtyLimitReached) return

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
    <TournamentsFighterStyled
      className='hover'
      key={item?.fighterId}
      onClick={() => router.push(AppRoutes.fightersDetail(item?.fighterId))}
      isNotSponsor={isNotSponsor}
      isActiveBet={isActiveBet}
      isTournamentStoppedBet={isTournamentStoppedBet}
      isQtyLimitReached={isQtyLimitReached}
      isTypeTournament={isTypeTournament}
    >
      <TournamentsFighterImgWrapperStyled>
        <TournamentsFighterImgStyled>
          <Image src={item.avatar} alt='Fighter' fill={true} objectFit='cover' />
        </TournamentsFighterImgStyled>
      </TournamentsFighterImgWrapperStyled>
      <div className='fighter-info'>
        <Tooltip title={item?.fullNameKanji}>
          <Text9th800Styled className='fighter-name text-nowrap-1'>{item?.fullNameKanji}</Text9th800Styled>
        </Tooltip>
        {isTypeTournament && (
          <Tooltip title={odds?.toLocaleString('en-US')}>
            <TextPrimary700Styled
              className={cx('odds hover', {
                active: rowKey?.includes(`tournament-${item?.commonIdTournament}`),
                disable: isActiveBet ? isNotSponsor || isTournamentStoppedBet || isQtyLimitReached : true
              })}
              onClick={(e) => {
                e.stopPropagation()
                const votedInfo = {
                  startDate: startDateTime,
                  optionBetId: tournamentId,
                  odds,
                  chosenOne: item?.fullNameKanji,
                  typeBet: 'Champion',
                  votedId: `tournament-${item?.commonIdTournament || 0}`,
                  commonId: item?.commonIdTournament,
                  betName: tournamentName,
                  totalTickets: totalTicketsBeted,
                  totalMoneySponsor: sponsorMoney,
                  optionBet: 'TOURNAMENT',
                  freeBet: 'OFF',
                  sponsorList: templateSponsorDTOS,
                  maxTicket: maxTickets
                }
                handleClick(`tournament-${item?.commonIdTournament}`, votedInfo, cartItems, odds)
              }}
            >
              {odds?.toLocaleString('en-US') || 0}
            </TextPrimary700Styled>
          </Tooltip>
        )}
      </div>
    </TournamentsFighterStyled>
  )
}

export default PoolFighterItem
