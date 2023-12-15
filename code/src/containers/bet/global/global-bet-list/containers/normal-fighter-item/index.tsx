/* eslint-disable react-hooks/exhaustive-deps */
import Image from '@/components/common/image'
import { Text9th800Styled, TextPrimary700Styled } from '@/components/styled'
import { STORAGE_KEY } from '@/constants/common'
import { AppRoutes } from '@/constants/routes'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import useCheckAuth from '@/hooks/useCheckAuth'
import {
  selectBet,
  setDeleteNormalObjTicketsEnter,
  setDeleteNormalObjTicketsPayment,
  setNormalCartItems
} from '@/redux/bet/slice'
import dayjs from '@/utils/dayjs'
import storage from '@/utils/storage'
import { FormInstance, Tooltip } from 'antd'
import cx from 'classnames'
import _cloneDeep from 'lodash/cloneDeep'
import { useRouter } from 'next/router'
import React, { useLayoutEffect, useState } from 'react'
import { TournamentsFighterImgStyled, TournamentsFighterImgWrapperStyled, TournamentsFighterStyled } from './styled'
type Props = {
  item: any
  form: FormInstance
  startDateTime: any
  tournamentId: any
  tournamentName: string
  activeBet: string
  isTypeTournament: boolean
}

const NormalFighterItem: React.FC<Props> = ({
  item,
  form,
  startDateTime,
  tournamentId,
  tournamentName,
  activeBet,
  isTypeTournament
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { normalObjTicketsEnter, normalObjTicketsPayment, normalCartItems } = useAppSelector(selectBet)
  const [rowKey, setRowKey] = useState<any>([])
  const odds = item?.odds || 0

  const currentDate = dayjs()
  const tournamentDate = dayjs(startDateTime).subtract(1, 'minute')
  const isTournamentStoppedBet = !tournamentDate.isAfter(currentDate)

  const isActiveBet = activeBet === 'ON'
  const { checkAuth } = useCheckAuth()

  useLayoutEffect(() => {
    const getListRowKey = normalCartItems?.map((item: any) => item?.votedId)
    setRowKey(getListRowKey)
  }, [normalCartItems.length])

  const handleClick = (customCommonId: string, votedInfo: any, normalCartItems: any[], odds: number) => {
    if (!isActiveBet) return

    if (isTournamentStoppedBet) return

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
    <TournamentsFighterStyled
      className='hover'
      key={item?.fighterId}
      onClick={() => router.push(AppRoutes.fightersDetail(item?.fighterId))}
      isActiveBet={isActiveBet}
      isTournamentStoppedBet={isTournamentStoppedBet}
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
                disable: isActiveBet ? isTournamentStoppedBet : true
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
                  optionBet: 'TOURNAMENT',
                  freeBet: 'OFF'
                }
                handleClick(`tournament-${item?.commonIdTournament}`, votedInfo, normalCartItems, odds)
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

export default NormalFighterItem
