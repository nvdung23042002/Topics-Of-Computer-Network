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
import { dateTimeVirguleFormat } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import { BetTicketsChart } from '@/containers/bet/components/bet-tickets-chart'
import MatchStatus from '@/containers/bet/components/match-status'
import { renderTypeBet } from '@/containers/bet/util'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import useCheckAuth from '@/hooks/useCheckAuth'
import { useWindowSize } from '@/hooks/useWindowResize'
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

type Props = {
  match: any
  form: FormInstance
}

export enum FIGHTER {
  FIRST_FIGHTER = 1,
  SECOND_FIGHTER = 2
}

const NormalMatchItem: React.FC<Props> = ({ match, form }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation(['common', 'bet-list'])
  const [rowKey, setRowKey] = useState<any>([])
  const { checkAuth } = useCheckAuth()
  const { normalObjTicketsEnter, normalObjTicketsPayment, normalCartItems } = useAppSelector(selectBet)
  const { startDate, matchId, betNormal, matchStatus, matchName, freeBet, endDate, activeBet } = match || {}
  const betNormalDto: any[] = Object.values(betNormal)?.filter((bet: any) => !_isEmpty(bet))
  const representBet = betNormalDto[0]
  const isThreeBet = representBet?.length === 3

  const [totalTicketsFt1, setTotalTicketsFt1] = useState<number>(0)
  const [totalTicketsDraw, setTotalTicketsDraw] = useState<number>(0)
  const [totalTicketsFt2, setTotalTicketsFt2] = useState<number>(0)

  const isBetFree = freeBet === BET_FREE_STATUS.ON
  const oddsFt1 = representBet?.[0]?.odds || 0
  const oddsDraw = isThreeBet ? representBet?.[1]?.odds || 0 : 0
  const oddsFt2 = isThreeBet ? representBet?.[2]?.odds || 0 : representBet?.[1]?.odds || 0
  const matchDateTimeStated = startDate && dayjs(startDate).format(dateTimeVirguleFormat)
  const currentDate = dayjs()
  const matchDate = dayjs(match?.startDate).subtract(1, 'minute')
  const isMatchStoppedBet = startDate && !matchDate.isAfter(currentDate)
  const isMatchStoppedFreeBet = endDate && !dayjs(endDate).isAfter(currentDate)
  const isActiveBet = activeBet === 'ON'
  const { width } = useWindowSize()
  const isMaxWidth767 = width <= 767

  useLayoutEffect(() => {
    const getListRowKey = normalCartItems?.map((item: any) => item?.votedId)
    setRowKey(getListRowKey)
  }, [normalCartItems.length])

  useEffect(() => {
    const timeOutTotalTickets = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfNormalMatch(
      matchId,
      (snapshot) => {
        const { data } = snapshot.data() || {}

        const totalTicketsFt1 = data?.find(
          (item: any) => item?.betSettingId === representBet?.[0]?.commonId
        )?.totalTicket
        const totalTicketsDraw = isThreeBet
          ? data?.find((item: any) => item?.betSettingId === representBet?.[1]?.commonId)?.totalTicket
          : 0
        const totalTicketsFt2 = isThreeBet
          ? data?.find((item: any) => item?.betSettingId === representBet?.[2]?.commonId)?.totalTicket || 0
          : data?.find((item: any) => item?.betSettingId === representBet?.[1]?.commonId)?.totalTicket || 0

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
    <MatchItemWrapperStyled>
      <MatchNameStyled>
        <Tooltip title={matchName}>
          <div className='text-nowrap-1'>{matchName}</div>
        </Tooltip>
        {!_isEmpty(betNormalDto) && <div className='bet-count'>+{betNormalDto?.length}</div>}
      </MatchNameStyled>
      <MatchItemStyled
        className='hover'
        isActiveBet={isActiveBet}
        isBetFree={isBetFree}
        isMatchStoppedFreeBet={isMatchStoppedFreeBet}
        isMatchStoppedBet={isMatchStoppedBet}
        onClick={() => router.push(AppRoutes.betDetail(matchId))}
      >
        {isBetFree && <BetFreeStyled>{t('BET_FREE')}</BetFreeStyled>}
        {!isMaxWidth767 ? (
          <>
            <MatchFighterImgStyled>
              <Image src={representBet?.[0]?.imageUrl} alt='Fighter Image' fill={true} objectFit='cover' />
            </MatchFighterImgStyled>
            <MatchContentStyled>
              <MatchInfoStyled>
                <Text500Styled className='start-time'>
                  {matchStatus === MATCH_STATUS.LIVE && <MatchStatus matchStatus={MATCH_STATUS.LIVE} />}
                  {matchDateTimeStated}
                </Text500Styled>
                <MatchTicketsCountWrapperStyled>
                  <MatchTicketsCountStyled>
                    <Text7th500Styled>
                      {totalTicketsFt1?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text7th500Styled>
                    <BetTicketsChart
                      isThreeBet={isThreeBet}
                      totalTicketsFt1={totalTicketsFt1}
                      totalTicketsFt2={totalTicketsFt2}
                      totalTicketsDraw={totalTicketsDraw}
                    />
                    <Text8th500Styled>
                      {totalTicketsFt2?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text8th500Styled>
                  </MatchTicketsCountStyled>
                  {isThreeBet && (
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
                <MatchFighterInfoStyled isTypeBet1X2={isThreeBet}>
                  <MatchFighterStyled>
                    <Tooltip title={String(representBet?.[0]?.fullNameKanji)?.toUpperCase()}>
                      <TextPrimary700Styled className='fighter-name text-nowrap-1'>
                        {representBet?.[0]?.fullNameKanji}
                      </TextPrimary700Styled>
                    </Tooltip>
                    <Tooltip title={oddsFt1?.toLocaleString('en-US')}>
                      <Text700Styled
                        className={cx('odds hover', {
                          active: rowKey?.includes(`match-${representBet?.[0]?.commonId}`),
                          disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                        })}
                        onClick={(e) => {
                          e.stopPropagation()
                          const votedInfo = {
                            startDate,
                            optionBetId: matchId,
                            odds: oddsFt1,
                            chosenOne: representBet?.[0].fullNameKanji,
                            typeBet: renderTypeBet(representBet?.[0]?.typeBet, t),
                            votedId: `match-${representBet?.[0]?.commonId}`,
                            commonId: representBet?.[0]?.commonId,
                            betName: matchName,
                            totalTickets: totalTicketsFt1,
                            optionBet: 'MATCH',
                            freeBet
                          }
                          handleClick(`match-${representBet?.[0]?.commonId}`, votedInfo, normalCartItems, oddsFt1)
                        }}
                      >
                        {oddsFt1?.toLocaleString('en-US')}
                      </Text700Styled>
                    </Tooltip>
                  </MatchFighterStyled>
                  {isThreeBet ? (
                    <Fragment>
                      <MatchFighterDrawStyled>
                        <Text6th500Styled className='bet-type'>
                          {renderTypeBet(representBet?.[0]?.typeBet, t)}
                        </Text6th500Styled>
                        <Text12th500Styled className='bet-type-draw'>ドロー</Text12th500Styled>
                        <Tooltip title={oddsDraw}>
                          <Text700Styled
                            className={cx('odds hover', {
                              active: rowKey?.includes(`match-${representBet?.[1].commonId}`),
                              disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                            })}
                            onClick={(e) => {
                              e.stopPropagation()
                              const votedInfo = {
                                startDate,
                                optionBetId: matchId,
                                odds: oddsDraw,
                                chosenOne: 'ドロー',
                                typeBet: renderTypeBet(representBet?.[1]?.typeBet, t),
                                votedId: `match-${representBet?.[1]?.commonId}`,
                                commonId: representBet?.[1]?.commonId,
                                betName: matchName,
                                totalTickets: totalTicketsDraw,
                                optionBet: 'MATCH',
                                freeBet
                              }
                              handleClick(`match-${representBet?.[1].commonId}`, votedInfo, normalCartItems, oddsDraw)
                            }}
                          >
                            {oddsDraw}
                          </Text700Styled>
                        </Tooltip>
                      </MatchFighterDrawStyled>
                      <MatchFighterStyled>
                        <Tooltip title={String(representBet?.[2]?.fullNameKanji)?.toUpperCase()}>
                          <Text11th700Styled className='fighter-name text-nowrap-1'>
                            {representBet?.[2]?.fullNameKanji}
                          </Text11th700Styled>
                        </Tooltip>
                        <Tooltip title={oddsFt2.toLocaleString('en-US')}>
                          <Text700Styled
                            className={cx('odds hover', {
                              active: rowKey?.includes(`match-${representBet?.[2].commonId}`),
                              disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                            })}
                            onClick={(e) => {
                              e.stopPropagation()
                              const votedInfo = {
                                startDate,
                                optionBetId: matchId,
                                odds: oddsFt2,
                                chosenOne: representBet?.[2].fullNameKanji,
                                typeBet: renderTypeBet(representBet?.[2]?.typeBet, t),
                                votedId: `match-${representBet?.[2]?.commonId}`,
                                commonId: representBet?.[2]?.commonId,
                                betName: matchName,
                                totalTickets: totalTicketsFt2,
                                optionBet: 'MATCH',
                                freeBet
                              }
                              handleClick(`match-${representBet?.[2].commonId}`, votedInfo, normalCartItems, oddsFt2)
                            }}
                          >
                            {oddsFt2.toLocaleString('en-US')}
                          </Text700Styled>
                        </Tooltip>
                      </MatchFighterStyled>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Text6th500Styled className='bet-type'>
                        {renderTypeBet(representBet?.[0]?.typeBet, t)}
                      </Text6th500Styled>
                      <MatchFighterStyled>
                        <Tooltip title={String(representBet?.[1]?.fullNameKanji)?.toUpperCase()}>
                          <Text11th700Styled className='fighter-name text-nowrap-1'>
                            {representBet?.[1]?.fullNameKanji}
                          </Text11th700Styled>
                        </Tooltip>
                        <Tooltip title={oddsFt2?.toLocaleString('en-US')}>
                          <Text700Styled
                            className={cx('odds hover', {
                              active: rowKey?.includes(`match-${representBet?.[1]?.commonId}`),
                              disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                            })}
                            onClick={(e) => {
                              e.stopPropagation()
                              const votedInfo = {
                                startDate,
                                optionBetId: matchId,
                                odds: oddsFt2,
                                chosenOne: representBet?.[1]?.fullNameKanji,
                                typeBet: renderTypeBet(representBet?.[1]?.typeBet, t),
                                votedId: `match-${representBet?.[1]?.commonId}`,
                                commonId: representBet?.[1]?.commonId,
                                betName: matchName,
                                totalTickets: totalTicketsFt2,
                                optionBet: 'MATCH',
                                freeBet
                              }
                              handleClick(`match-${representBet?.[1]?.commonId}`, votedInfo, normalCartItems, oddsFt2)
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
                src={isThreeBet ? representBet?.[2]?.imageUrl : representBet?.[1]?.imageUrl}
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
              </MatchInfoStyled>
            </MobileContentTopStyled>
            <MobileContentBottomStyled>
              <MobileFirstFighterStyled>
                <MatchFighterImgStyled>
                  <Image src={representBet?.[0]?.imageUrl} alt='Fighter Image' fill={true} objectFit='cover' />
                </MatchFighterImgStyled>
                <Tooltip title={String(representBet?.[0]?.fullNameKanji)?.toUpperCase()}>
                  <TextPrimary700Styled className='fighter-name text-nowrap-1'>
                    {representBet?.[0]?.fullNameKanji}
                  </TextPrimary700Styled>
                </Tooltip>
                <Tooltip title={oddsFt1?.toLocaleString('en-US')}>
                  <Text700Styled
                    className={cx('odds hover', {
                      active: rowKey?.includes(`match-${representBet?.[0]?.commonId}`),
                      disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                    })}
                    onClick={(e) => {
                      e.stopPropagation()
                      const votedInfo = {
                        startDate,
                        optionBetId: matchId,
                        odds: oddsFt1,
                        chosenOne: representBet?.[0].fullNameKanji,
                        typeBet: renderTypeBet(representBet?.[0]?.typeBet, t),
                        votedId: `match-${representBet?.[0]?.commonId}`,
                        commonId: representBet?.[0]?.commonId,
                        betName: matchName,
                        totalTickets: totalTicketsFt1,
                        optionBet: 'MATCH',
                        freeBet
                      }
                      handleClick(`match-${representBet?.[0]?.commonId}`, votedInfo, normalCartItems, oddsFt1)
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
                      isThreeBet={isThreeBet}
                      totalTicketsFt1={totalTicketsFt1}
                      totalTicketsFt2={totalTicketsFt2}
                      totalTicketsDraw={totalTicketsDraw}
                    />
                    <Text8th500Styled>
                      {totalTicketsFt2?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text8th500Styled>
                  </MatchTicketsCountStyled>
                  {isThreeBet && (
                    <Text12th500Styled className='tickets-bet-draw'>
                      {totalTicketsDraw?.toLocaleString('en-US')}
                      {t('NUMBER_TICKETS')}
                    </Text12th500Styled>
                  )}
                </div>
                <div>
                  <Text400Styled className='chart-desc'>
                    {t('GRAPH_NUMBER_OF_VOTE', {
                      ns: 'bet-list'
                    })}
                  </Text400Styled>
                  {isThreeBet ? (
                    <MatchFighterDrawStyled>
                      <Text6th500Styled className='bet-type'>
                        {renderTypeBet(representBet?.[0]?.typeBet, t)}
                      </Text6th500Styled>
                      <Text12th500Styled className='bet-type-draw'>ドロー</Text12th500Styled>
                      <Tooltip title={oddsDraw}>
                        <Text700Styled
                          className={cx('odds hover', {
                            active: rowKey?.includes(`match-${representBet?.[1].commonId}`),
                            disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                          })}
                          onClick={(e) => {
                            e.stopPropagation()
                            const votedInfo = {
                              startDate,
                              optionBetId: matchId,
                              odds: oddsDraw,
                              chosenOne: 'ドロー',
                              typeBet: renderTypeBet(representBet?.[1]?.typeBet, t),
                              votedId: `match-${representBet?.[1]?.commonId}`,
                              commonId: representBet?.[1]?.commonId,
                              betName: matchName,
                              totalTickets: totalTicketsDraw,
                              optionBet: 'MATCH',
                              freeBet
                            }
                            handleClick(`match-${representBet?.[1].commonId}`, votedInfo, normalCartItems, oddsDraw)
                          }}
                        >
                          {oddsDraw}
                        </Text700Styled>
                      </Tooltip>
                    </MatchFighterDrawStyled>
                  ) : (
                    <div className='empty-win-lost'>
                      <Text500Styled className='winner'>{renderTypeBet(representBet?.[0]?.typeBet, t)}</Text500Styled>
                      <div className='empty'></div>
                    </div>
                  )}
                </div>
              </ProgressWrapperMobileStyled>
              <MobileSecondFighterStyled>
                <MatchFighterImgStyled>
                  <Image
                    src={isThreeBet ? representBet?.[2]?.imageUrl : representBet?.[1]?.imageUrl}
                    alt='Fighter Image'
                    fill={true}
                    objectFit='cover'
                  />
                </MatchFighterImgStyled>
                <Tooltip
                  title={
                    isThreeBet
                      ? String(representBet?.[2]?.fullNameKanji)?.toUpperCase()
                      : String(representBet?.[1]?.fullNameKanji)?.toUpperCase()
                  }
                >
                  <Text11th700Styled className='fighter-name text-nowrap-1'>
                    {isThreeBet ? representBet?.[2]?.fullNameKanji : representBet?.[1]?.fullNameKanji}
                  </Text11th700Styled>
                </Tooltip>
                {isThreeBet ? (
                  <Tooltip title={oddsFt2.toLocaleString('en-US')}>
                    <Text700Styled
                      className={cx('odds hover', {
                        active: rowKey?.includes(`match-${representBet?.[2].commonId}`),
                        disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                      })}
                      onClick={(e) => {
                        e.stopPropagation()
                        const votedInfo = {
                          startDate,
                          optionBetId: matchId,
                          odds: oddsFt2,
                          chosenOne: representBet?.[2].fullNameKanji,
                          typeBet: renderTypeBet(representBet?.[2]?.typeBet, t),
                          votedId: `match-${representBet?.[2]?.commonId}`,
                          commonId: representBet?.[2]?.commonId,
                          betName: matchName,
                          totalTickets: totalTicketsFt2,
                          optionBet: 'MATCH',
                          freeBet
                        }
                        handleClick(`match-${representBet?.[2].commonId}`, votedInfo, normalCartItems, oddsFt2)
                      }}
                    >
                      {oddsFt2.toLocaleString('en-US')}
                    </Text700Styled>
                  </Tooltip>
                ) : (
                  <Tooltip title={oddsFt2?.toLocaleString('en-US')}>
                    <Text700Styled
                      className={cx('odds hover', {
                        active: rowKey?.includes(`match-${representBet?.[1]?.commonId}`),
                        disable: isActiveBet ? (isBetFree ? isMatchStoppedFreeBet : isMatchStoppedBet) : true
                      })}
                      onClick={(e) => {
                        e.stopPropagation()
                        const votedInfo = {
                          startDate,
                          optionBetId: matchId,
                          odds: oddsFt2,
                          chosenOne: representBet?.[1]?.fullNameKanji,
                          typeBet: renderTypeBet(representBet?.[1]?.typeBet, t),
                          votedId: `match-${representBet?.[1]?.commonId}`,
                          commonId: representBet?.[1]?.commonId,
                          betName: matchName,
                          totalTickets: totalTicketsFt2,
                          optionBet: 'MATCH',
                          freeBet
                        }
                        handleClick(`match-${representBet?.[1]?.commonId}`, votedInfo, normalCartItems, oddsFt2)
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

export default NormalMatchItem
