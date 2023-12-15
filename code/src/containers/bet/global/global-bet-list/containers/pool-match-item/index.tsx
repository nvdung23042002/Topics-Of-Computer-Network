import Image from '@/components/common/image'
import {
  Text11th700Styled,
  Text12th500Styled,
  Text400Styled,
  Text500Styled,
  Text6th500Styled,
  Text700Styled,
  Text7th500Styled,
  Text8th500Styled,
  TextPrimary700Styled
} from '@/components/styled'
import { BET_FREE_STATUS, MATCH_STATUS, STORAGE_KEY } from '@/constants/common'
import { FIREBASE } from '@/constants/firebase'
import { dateTimeVirguleFormat } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import MatchStatus from '@/containers/bet/components/match-status'
import SponsorBet from '@/containers/bet/components/sponsor-bet'
import { calcTicketsBeted } from '@/containers/bet/util'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { useWindowSize } from '@/hooks/useWindowResize'
import { selectBet, setCartItems, setDeleteObjTicketsEnter, setDeleteObjTicketsPayment } from '@/redux/bet/slice'
// import { FireStoreService } from '@/services/FireStore.service'
import dayjs from '@/utils/dayjs'
import storage from '@/utils/storage'
import { FormInstance, Tooltip } from 'antd'
import cx from 'classnames'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import {
  BetFreeStyled,
  MatchContentStyled,
  MatchFighterDrawStyled,
  MatchFighterImgStyled,
  MatchFighterInfoStyled,
  MatchFighterInfoWrapperStyled,
  MatchFighterStyled,
  MatchInfoStyled,
  MatchItemStyled,
  MatchItemWrapperStyled,
  MatchMobileContentStyled,
  MatchNameStyled,
  MatchTicketsCountStyled,
  MatchTicketsCountWrapperStyled,
  MobileContentBottomStyled,
  MobileContentTopStyled,
  MobileFirstFighterStyled,
  MobileSecondFighterStyled,
  ProgressWrapperMobileStyled
} from './styled'
import useCheckAuth from '@/hooks/useCheckAuth'
import { BetTicketsChart } from '@/containers/bet/components/bet-tickets-chart'
import { FireStoreService } from '@/services/FireStore.service'

type Props = {
  match: any
  form: FormInstance
}

export enum FIGHTER {
  FIRST_FIGHTER = 1,
  SECOND_FIGHTER = 2
}

const PoolMatchItem: React.FC<Props> = ({ match, form }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation(['common', 'bet-list'])
  const [rowKey, setRowKey] = useState<any>([])
  const { checkAuth } = useCheckAuth()
  const { objTicketsEnter, objTicketsPayment, cartItems } = useAppSelector(selectBet)
  const {
    startDate,
    matchId,
    betPoolDTO,
    maxTicket,
    sponsorPrice,
    matchStatus,
    matchName,
    freeBet,
    endDate,
    activeBet,
    templateSponsorDTOS,
    listSponsorshipRank
  } = match || {}

  const isBetFree = freeBet === BET_FREE_STATUS.ON
  // match is type bet 1x2 will be 3 item
  const isTypeBet1X2 = betPoolDTO?.length === 3
  const [oddsFt1, setOddsFt1] = useState<number>(betPoolDTO?.[0]?.odds)
  const [oddsDraw, setOddsDraw] = useState<number>(() => {
    if (isTypeBet1X2) {
      return betPoolDTO?.[1]?.odds
    }

    return 0
  })
  const [oddsFt2, setOddsFt2] = useState<number>(() => {
    if (isTypeBet1X2) {
      return betPoolDTO?.[2]?.odds
    }

    return betPoolDTO?.[1]?.odds
  })
  const [totalTicketsFt1, setTotalTicketsFt1] = useState<number>(betPoolDTO?.[0]?.totalTicket)
  const [totalTicketsDraw, setTotalTicketsDraw] = useState<number>(() => {
    if (isTypeBet1X2) {
      return betPoolDTO?.[1]?.totalTicket
    }

    return 0
  })
  const [totalTicketsFt2, setTotalTicketsFt2] = useState<number>(() => {
    if (isTypeBet1X2) {
      return betPoolDTO?.[2]?.totalTicket
    }

    return betPoolDTO?.[1]?.totalTicket
  })
  const [sponsorMoney, setSponsorMoney] = useState<number>(sponsorPrice || 0)
  const [maxTickets, setMaxTickets] = useState<number>(maxTicket)

  const matchDateTimeStated = startDate && dayjs(startDate).format(dateTimeVirguleFormat)
  const currentDate = dayjs()
  const matchDate = dayjs(match?.startDate).subtract(1, 'minute')
  // ends after 5 minutes of the start of the match
  const isMatchStoppedBet = startDate && !matchDate.isAfter(currentDate)
  // after the end of the whole game free bet
  const isMatchStoppedFreeBet = endDate && !dayjs(endDate).isAfter(currentDate)
  const isActiveBet = activeBet === 'ON'
  const isNotSponsor = _isEmpty(listSponsorshipRank)
  const isAllNotRankSponsor = listSponsorshipRank?.every((item: any) => !item.rank)

  const { width } = useWindowSize()
  const isMaxWidth767 = width <= 767

  useEffect(() => {
    let timeOutOddsDraw: any
    let timeOutOddsFt2: any
    let timeOutTotalTicketsDraw: any
    let timeOutTotalTicketsFt2: any

    const timeOutOddsFt1 = FireStoreService.getInstance().listenTimeOutOddsFighter(
      FIREBASE.MATCH_GLOBAL_ID,
      betPoolDTO[0]?.commonId,
      (snapshot) => {
        const data = snapshot.data()
        setOddsFt1(Number(data?.odds || 0))
      }
    )

    if (isTypeBet1X2) {
      timeOutOddsDraw = FireStoreService.getInstance().listenTimeOutOddsFighter(
        FIREBASE.MATCH_GLOBAL_ID,
        betPoolDTO?.[1]?.commonId,
        (snapshot) => {
          const data = snapshot.data()
          setOddsDraw(Number(data?.odds || 0))
        }
      )

      timeOutOddsFt2 = FireStoreService.getInstance().listenTimeOutOddsFighter(
        FIREBASE.MATCH_GLOBAL_ID,
        betPoolDTO?.[2]?.commonId,
        (snapshot) => {
          const data = snapshot.data()
          setOddsFt2(Number(data?.odds || 0))
        }
      )
    } else {
      timeOutOddsFt2 = FireStoreService.getInstance().listenTimeOutOddsFighter(
        FIREBASE.MATCH_GLOBAL_ID,
        betPoolDTO?.[1]?.commonId,
        (snapshot) => {
          const data = snapshot.data()
          setOddsFt2(Number(data?.odds || 0))
        }
      )
    }

    const timeOutTotalTicketsFt1 = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfMatch(
      betPoolDTO?.[0]?.commonId,
      (snapshot) => {
        const data = snapshot.data()
        setTotalTicketsFt1(Number(data?.totalTicket || 0))
      }
    )

    if (isTypeBet1X2) {
      timeOutTotalTicketsDraw = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfMatch(
        betPoolDTO?.[1]?.commonId,
        (snapshot) => {
          const data = snapshot.data()
          setTotalTicketsDraw(Number(data?.totalTicket || 0))
        }
      )

      timeOutTotalTicketsFt2 = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfMatch(
        betPoolDTO?.[2]?.commonId,
        (snapshot) => {
          const data = snapshot.data()
          setTotalTicketsFt2(Number(data?.totalTicket || 0))
        }
      )
    } else {
      timeOutTotalTicketsFt2 = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfMatch(
        betPoolDTO?.[1]?.commonId,
        (snapshot) => {
          const data = snapshot.data()
          setTotalTicketsFt2(Number(data?.totalTicket || 0))
        }
      )
    }

    const timeOutSponsor = FireStoreService.getInstance().listentimeOutSponsor(
      FIREBASE.MATCH_GLOBAL_ID,
      matchId,
      (snapshot) => {
        const data = snapshot.data()
        const { match } = data || {}
        const sponsorMoney = parseFloat(match?.[0]?.totalFund || 0)
        const maxTickets = Number(match?.[0]?.maxTicket) || 0

        setSponsorMoney(sponsorMoney)
        setMaxTickets(maxTickets)
      }
    )

    return () => {
      if (isTypeBet1X2) {
        timeOutOddsDraw()
        timeOutTotalTicketsDraw()
      }

      timeOutOddsFt1()
      timeOutOddsFt2()
      timeOutTotalTicketsFt1()
      timeOutTotalTicketsFt2()
      timeOutSponsor()
    }
  }, [])

  useLayoutEffect(() => {
    const getListRowKey = cartItems?.map((item: any) => item?.votedId)
    setRowKey(getListRowKey)
  }, [cartItems.length])

  const totalTicketsBeted = calcTicketsBeted(isTypeBet1X2, totalTicketsFt1, totalTicketsDraw, totalTicketsFt2)

  const isQtyLimitReached = totalTicketsBeted >= maxTickets

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
    <MatchItemWrapperStyled>
      <MatchNameStyled>
        <Tooltip title={matchName}>
          <div className='text-nowrap-1'>{matchName}</div>
        </Tooltip>
      </MatchNameStyled>
      {!_isEmpty(listSponsorshipRank) && (
        <div className='sponsor-bet'>
          <SponsorBet
            listSponsorshipRank={listSponsorshipRank}
            startDateTime={startDate}
            betId={matchId}
            collectionName={FIREBASE.MATCH_GLOBAL_ID}
            namePage='MATCH'
            isShowDivider={false}
            totalTicketsBetedExternal={totalTicketsBeted}
            templateSponsorDTOS={templateSponsorDTOS}
          />
        </div>
      )}
      <MatchItemStyled
        className='hover'
        isActiveBet={isActiveBet}
        isNotSponsor={isNotSponsor}
        isAllNotRankSponsor={isAllNotRankSponsor}
        isBetFree={isBetFree}
        isMatchStoppedFreeBet={isMatchStoppedFreeBet}
        isMatchStoppedBet={isMatchStoppedBet}
        isQtyLimitReached={isQtyLimitReached}
        onClick={() => router.push(AppRoutes.betDetailGlobal(matchId, 1))}
      >
        {isBetFree && <BetFreeStyled>{t('BET_FREE')}</BetFreeStyled>}
        {!isMaxWidth767 ? (
          <>
            <MatchFighterImgStyled>
              <Image src={betPoolDTO?.[0]?.imageUrl} alt='Fighter Image' fill={true} objectFit='cover' />
            </MatchFighterImgStyled>
            <MatchContentStyled>
              <MatchInfoStyled>
                <Text500Styled className='start-time'>
                  {matchStatus === MATCH_STATUS.LIVE && <MatchStatus matchStatus={MATCH_STATUS.LIVE} />}
                  {matchDateTimeStated}
                </Text500Styled>
                <Text700Styled className='sponsor-money'>{`${t('SPONSOR_MONEY', {
                  ns: 'bet-list'
                })}: ${isBetFree ? '-' : sponsorMoney?.toLocaleString('en-US')} ${t('CIRCLE')}`}</Text700Styled>
                <Text700Styled className='player-qty'>
                  {t('MAX_NUMBER_OF_TICKETS_USED', {
                    ns: 'bet-list'
                  })}
                  : {totalTicketsBeted?.toLocaleString('en-US')}/{isBetFree ? '-' : maxTickets?.toLocaleString('en-US')}
                </Text700Styled>
                <MatchTicketsCountWrapperStyled>
                  <MatchTicketsCountStyled>
                    <Text7th500Styled>
                      {totalTicketsFt1?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text7th500Styled>
                    <BetTicketsChart
                      isThreeBet={isTypeBet1X2}
                      totalTicketsFt1={totalTicketsFt1}
                      totalTicketsFt2={totalTicketsFt2}
                      totalTicketsDraw={totalTicketsDraw}
                    />
                    <Text8th500Styled>
                      {totalTicketsFt2?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text8th500Styled>
                  </MatchTicketsCountStyled>
                  {isTypeBet1X2 && (
                    <Text12th500Styled className='tickets-bet-draw'>
                      {totalTicketsDraw?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text12th500Styled>
                  )}
                </MatchTicketsCountWrapperStyled>
              </MatchInfoStyled>
              <MatchFighterInfoWrapperStyled>
                <Text400Styled className='chart-desc'>
                  {t('GRAPH_NUMBER_OF_VOTE', {
                    ns: 'bet-list'
                  })}
                </Text400Styled>
                <MatchFighterInfoStyled isTypeBet1X2={isTypeBet1X2}>
                  <MatchFighterStyled>
                    <Tooltip title={String(betPoolDTO?.[0]?.fullNameKanji)?.toUpperCase()}>
                      <TextPrimary700Styled className='fighter-name text-nowrap-1'>
                        {betPoolDTO?.[0]?.fullNameKanji}
                      </TextPrimary700Styled>
                    </Tooltip>
                    <Tooltip title={oddsFt1?.toLocaleString('en-US')}>
                      <Text700Styled
                        className={cx('odds hover', {
                          active: rowKey?.includes(`match-${betPoolDTO?.[0]?.commonId}`),
                          disable: isActiveBet
                            ? isBetFree
                              ? isMatchStoppedFreeBet
                              : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                            : true
                        })}
                        onClick={(e) => {
                          e.stopPropagation()
                          const votedInfo = {
                            startDate,
                            optionBetId: matchId,
                            odds: oddsFt1,
                            chosenOne: betPoolDTO?.[0].fullNameKanji,
                            typeBet: isTypeBet1X2 ? '1x2' : 'Winner',
                            votedId: `match-${betPoolDTO?.[0]?.commonId}`,
                            commonId: betPoolDTO?.[0]?.commonId,
                            betName: matchName,
                            totalTickets: totalTicketsFt1,
                            totalMoneySponsor: sponsorMoney,
                            optionBet: 'MATCH',
                            freeBet,
                            sponsorList: templateSponsorDTOS,
                            maxTicket: maxTickets
                          }
                          handleClick(`match-${betPoolDTO?.[0]?.commonId}`, votedInfo, cartItems, oddsFt1)
                        }}
                      >
                        {oddsFt1?.toLocaleString('en-US')}
                      </Text700Styled>
                    </Tooltip>
                  </MatchFighterStyled>
                  {isTypeBet1X2 ? (
                    <Fragment>
                      <MatchFighterDrawStyled>
                        <Text12th500Styled className='bet-type-draw'>ドロー</Text12th500Styled>
                        <Tooltip title={oddsDraw}>
                          <Text700Styled
                            className={cx('odds hover', {
                              active: rowKey?.includes(`match-${betPoolDTO?.[1].commonId}`),
                              disable: isActiveBet
                                ? isBetFree
                                  ? isMatchStoppedFreeBet
                                  : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                                : true
                            })}
                            onClick={(e) => {
                              e.stopPropagation()
                              const votedInfo = {
                                startDate,
                                optionBetId: matchId,
                                odds: oddsDraw,
                                chosenOne: 'ドロー',
                                typeBet: '1x2',
                                votedId: `match-${betPoolDTO?.[1]?.commonId}`,
                                commonId: betPoolDTO?.[1]?.commonId,
                                betName: matchName,
                                totalTickets: totalTicketsDraw,
                                totalMoneySponsor: sponsorMoney,
                                optionBet: 'MATCH',
                                freeBet,
                                sponsorList: templateSponsorDTOS,
                                maxTicket: maxTickets
                              }
                              handleClick(`match-${betPoolDTO?.[1].commonId}`, votedInfo, cartItems, oddsDraw)
                            }}
                          >
                            {oddsDraw}
                          </Text700Styled>
                        </Tooltip>
                      </MatchFighterDrawStyled>
                      <MatchFighterStyled>
                        <Tooltip title={String(betPoolDTO?.[2]?.fullNameKanji)?.toUpperCase()}>
                          <Text11th700Styled className='fighter-name text-nowrap-1'>
                            {betPoolDTO?.[2]?.fullNameKanji}
                          </Text11th700Styled>
                        </Tooltip>
                        <Tooltip title={oddsFt2.toLocaleString('en-US')}>
                          <Text700Styled
                            className={cx('odds hover', {
                              active: rowKey?.includes(`match-${betPoolDTO?.[2].commonId}`),
                              disable: isActiveBet
                                ? isBetFree
                                  ? isMatchStoppedFreeBet
                                  : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                                : true
                            })}
                            onClick={(e) => {
                              e.stopPropagation()
                              const votedInfo = {
                                startDate,
                                optionBetId: matchId,
                                odds: oddsFt2,
                                chosenOne: betPoolDTO?.[2].fullNameKanji,
                                typeBet: '1x2',
                                votedId: `match-${betPoolDTO?.[2]?.commonId}`,
                                commonId: betPoolDTO?.[2]?.commonId,
                                betName: matchName,
                                totalTickets: totalTicketsFt2,
                                totalMoneySponsor: sponsorMoney,
                                optionBet: 'MATCH',
                                freeBet,
                                sponsorList: templateSponsorDTOS,
                                maxTicket: maxTickets
                              }
                              handleClick(`match-${betPoolDTO?.[2].commonId}`, votedInfo, cartItems, oddsFt2)
                            }}
                          >
                            {oddsFt2.toLocaleString('en-US')}
                          </Text700Styled>
                        </Tooltip>
                      </MatchFighterStyled>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Text6th500Styled className='bet-type'>Winner</Text6th500Styled>
                      <MatchFighterStyled>
                        <Tooltip title={String(betPoolDTO?.[1]?.fullNameKanji)?.toUpperCase()}>
                          <Text11th700Styled className='fighter-name text-nowrap-1'>
                            {betPoolDTO?.[1]?.fullNameKanji}
                          </Text11th700Styled>
                        </Tooltip>
                        <Tooltip title={oddsFt2?.toLocaleString('en-US')}>
                          <Text700Styled
                            className={cx('odds hover', {
                              active: rowKey?.includes(`match-${betPoolDTO?.[1]?.commonId}`),
                              disable: isActiveBet
                                ? isBetFree
                                  ? isMatchStoppedFreeBet
                                  : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                                : true
                            })}
                            onClick={(e) => {
                              e.stopPropagation()
                              const votedInfo = {
                                startDate,
                                optionBetId: matchId,
                                odds: oddsFt2,
                                chosenOne: betPoolDTO?.[1]?.fullNameKanji,
                                typeBet: 'Winner',
                                votedId: `match-${betPoolDTO?.[1]?.commonId}`,
                                commonId: betPoolDTO?.[1]?.commonId,
                                betName: matchName,
                                totalTickets: totalTicketsFt2,
                                totalMoneySponsor: sponsorMoney,
                                optionBet: 'MATCH',
                                freeBet,
                                sponsorList: templateSponsorDTOS,
                                maxTicket: maxTickets
                              }
                              handleClick(`match-${betPoolDTO?.[1]?.commonId}`, votedInfo, cartItems, oddsFt2)
                            }}
                          >
                            {oddsFt2?.toLocaleString('en-US')}
                          </Text700Styled>
                        </Tooltip>
                      </MatchFighterStyled>
                    </Fragment>
                  )}
                </MatchFighterInfoStyled>
              </MatchFighterInfoWrapperStyled>
            </MatchContentStyled>
            <MatchFighterImgStyled>
              <Image
                src={isTypeBet1X2 ? betPoolDTO?.[2]?.imageUrl : betPoolDTO?.[1]?.imageUrl}
                alt='Fighter Image'
                fill={true}
                objectFit='cover'
              />
            </MatchFighterImgStyled>
          </>
        ) : (
          <MatchMobileContentStyled>
            <MobileContentTopStyled>
              <MatchInfoStyled>
                <Text500Styled className='start-time'>
                  {matchStatus === MATCH_STATUS.LIVE && <MatchStatus matchStatus={MATCH_STATUS.LIVE} />}
                  {matchDateTimeStated}
                </Text500Styled>
                <Text700Styled className='sponsor-money'>{`${t('SPONSOR_MONEY', {
                  ns: 'bet-list'
                })}: ${isBetFree ? '-' : sponsorMoney?.toLocaleString('en-US')} ${t('CIRCLE')}`}</Text700Styled>
                <Text700Styled className='player-qty'>
                  {t('MAX_NUMBER_OF_TICKETS_USED', {
                    ns: 'bet-list'
                  })}
                  : {totalTicketsBeted?.toLocaleString('en-US')}/{isBetFree ? '-' : maxTickets?.toLocaleString('en-US')}
                </Text700Styled>
              </MatchInfoStyled>
            </MobileContentTopStyled>
            <MobileContentBottomStyled>
              <MobileFirstFighterStyled>
                <MatchFighterImgStyled>
                  <Image src={betPoolDTO?.[0]?.imageUrl} alt='Fighter Image' fill={true} objectFit='cover' />
                </MatchFighterImgStyled>
                <Tooltip title={String(betPoolDTO?.[0]?.fullNameKanji)?.toUpperCase()}>
                  <TextPrimary700Styled className='fighter-name text-nowrap-1'>
                    {betPoolDTO?.[0]?.fullNameKanji}
                  </TextPrimary700Styled>
                </Tooltip>
                <Tooltip title={oddsFt1?.toLocaleString('en-US')}>
                  <Text700Styled
                    className={cx('odds hover', {
                      active: rowKey?.includes(`match-${betPoolDTO?.[0]?.commonId}`),
                      disable: isActiveBet
                        ? isBetFree
                          ? isMatchStoppedFreeBet
                          : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                        : true
                    })}
                    onClick={(e) => {
                      e.stopPropagation()
                      const votedInfo = {
                        startDate,
                        optionBetId: matchId,
                        odds: oddsFt1,
                        chosenOne: betPoolDTO?.[0].fullNameKanji,
                        typeBet: isTypeBet1X2 ? '1x2' : 'Winner',
                        votedId: `match-${betPoolDTO?.[0]?.commonId}`,
                        commonId: betPoolDTO?.[0]?.commonId,
                        betName: matchName,
                        totalTickets: totalTicketsFt1,
                        totalMoneySponsor: sponsorMoney,
                        optionBet: 'MATCH',
                        freeBet,
                        sponsorList: templateSponsorDTOS,
                        maxTicket: maxTickets
                      }
                      handleClick(`match-${betPoolDTO?.[0]?.commonId}`, votedInfo, cartItems, oddsFt1)
                    }}
                  >
                    {oddsFt1?.toLocaleString('en-US')}
                  </Text700Styled>
                </Tooltip>
              </MobileFirstFighterStyled>
              <ProgressWrapperMobileStyled>
                <div>
                  <MatchTicketsCountStyled className='progress'>
                    <Text7th500Styled>
                      {totalTicketsFt1?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text7th500Styled>
                    <BetTicketsChart
                      isThreeBet={isTypeBet1X2}
                      totalTicketsFt1={totalTicketsFt1}
                      totalTicketsFt2={totalTicketsFt2}
                      totalTicketsDraw={totalTicketsDraw}
                    />
                    <Text8th500Styled>
                      {totalTicketsFt2?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text8th500Styled>
                  </MatchTicketsCountStyled>
                  {isTypeBet1X2 && (
                    <Text12th500Styled className='tickets-bet-draw'>
                      {totalTicketsDraw?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text12th500Styled>
                  )}
                </div>
                <div>
                  <Text400Styled className='chart-desc'>参加者の投票数別グラフ</Text400Styled>
                  {isTypeBet1X2 ? (
                    <MatchFighterDrawStyled>
                      <Text12th500Styled className='bet-type-draw'>ドロー</Text12th500Styled>
                      <Tooltip title={oddsDraw}>
                        <Text700Styled
                          className={cx('odds hover', {
                            active: rowKey?.includes(`match-${betPoolDTO?.[1].commonId}`),
                            disable: isActiveBet
                              ? isBetFree
                                ? isMatchStoppedFreeBet
                                : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                              : true
                          })}
                          onClick={(e) => {
                            e.stopPropagation()
                            const votedInfo = {
                              startDate,
                              optionBetId: matchId,
                              odds: oddsDraw,
                              chosenOne: 'ドロー',
                              typeBet: '1x2',
                              votedId: `match-${betPoolDTO?.[1]?.commonId}`,
                              commonId: betPoolDTO?.[1]?.commonId,
                              betName: matchName,
                              totalTickets: totalTicketsDraw,
                              totalMoneySponsor: sponsorMoney,
                              optionBet: 'MATCH',
                              freeBet,
                              sponsorList: templateSponsorDTOS,
                              maxTicket: maxTickets
                            }
                            handleClick(`match-${betPoolDTO?.[1].commonId}`, votedInfo, cartItems, oddsDraw)
                          }}
                        >
                          {oddsDraw}
                        </Text700Styled>
                      </Tooltip>
                    </MatchFighterDrawStyled>
                  ) : (
                    <div className='empty-win-lost'>
                      <Text500Styled className='winner'>Winner</Text500Styled>
                      <div className='empty'></div>
                    </div>
                  )}
                </div>
              </ProgressWrapperMobileStyled>
              <MobileSecondFighterStyled>
                <MatchFighterImgStyled>
                  <Image
                    src={isTypeBet1X2 ? betPoolDTO?.[2]?.imageUrl : betPoolDTO?.[1]?.imageUrl}
                    alt='Fighter Image'
                    fill={true}
                    objectFit='cover'
                  />
                </MatchFighterImgStyled>
                <Tooltip
                  title={
                    isTypeBet1X2
                      ? String(betPoolDTO?.[2]?.fullNameKanji)?.toUpperCase()
                      : String(betPoolDTO?.[1]?.fullNameKanji)?.toUpperCase()
                  }
                >
                  <Text11th700Styled className='fighter-name text-nowrap-1'>
                    {isTypeBet1X2 ? betPoolDTO?.[2]?.fullNameKanji : betPoolDTO?.[1]?.fullNameKanji}
                  </Text11th700Styled>
                </Tooltip>
                {isTypeBet1X2 ? (
                  <Tooltip title={oddsFt2.toLocaleString('en-US')}>
                    <Text700Styled
                      className={cx('odds hover', {
                        active: rowKey?.includes(`match-${betPoolDTO?.[2].commonId}`),
                        disable: isActiveBet
                          ? isBetFree
                            ? isMatchStoppedFreeBet
                            : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                          : true
                      })}
                      onClick={(e) => {
                        e.stopPropagation()
                        const votedInfo = {
                          startDate,
                          optionBetId: matchId,
                          odds: oddsFt2,
                          chosenOne: betPoolDTO?.[2].fullNameKanji,
                          typeBet: '1x2',
                          votedId: `match-${betPoolDTO?.[2]?.commonId}`,
                          commonId: betPoolDTO?.[2]?.commonId,
                          betName: matchName,
                          totalTickets: totalTicketsFt2,
                          totalMoneySponsor: sponsorMoney,
                          optionBet: 'MATCH',
                          freeBet,
                          sponsorList: templateSponsorDTOS,
                          maxTicket: maxTickets
                        }
                        handleClick(`match-${betPoolDTO?.[2].commonId}`, votedInfo, cartItems, oddsFt2)
                      }}
                    >
                      {oddsFt2.toLocaleString('en-US')}
                    </Text700Styled>
                  </Tooltip>
                ) : (
                  <Tooltip title={oddsFt2?.toLocaleString('en-US')}>
                    <Text700Styled
                      className={cx('odds hover', {
                        active: rowKey?.includes(`match-${betPoolDTO?.[1]?.commonId}`),
                        disable: isActiveBet
                          ? isBetFree
                            ? isMatchStoppedFreeBet
                            : isMatchStoppedBet || isQtyLimitReached || isNotSponsor || isAllNotRankSponsor
                          : true
                      })}
                      onClick={(e) => {
                        e.stopPropagation()
                        const votedInfo = {
                          startDate,
                          optionBetId: matchId,
                          odds: oddsFt2,
                          chosenOne: betPoolDTO?.[1]?.fullNameKanji,
                          typeBet: 'Winner',
                          votedId: `match-${betPoolDTO?.[1]?.commonId}`,
                          commonId: betPoolDTO?.[1]?.commonId,
                          betName: matchName,
                          totalTickets: totalTicketsFt2,
                          totalMoneySponsor: sponsorMoney,
                          optionBet: 'MATCH',
                          freeBet,
                          sponsorList: templateSponsorDTOS,
                          maxTicket: maxTickets
                        }
                        handleClick(`match-${betPoolDTO?.[1]?.commonId}`, votedInfo, cartItems, oddsFt2)
                      }}
                    >
                      {oddsFt2?.toLocaleString('en-US')}
                    </Text700Styled>
                  </Tooltip>
                )}
              </MobileSecondFighterStyled>
            </MobileContentBottomStyled>
          </MatchMobileContentStyled>
        )}
      </MatchItemStyled>
    </MatchItemWrapperStyled>
  )
}

export default PoolMatchItem
