/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Layout from '@/app/layout'
import Image from '@/components/common/image'
import Countdown from '@/components/countdown'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import CalendarIcon from '@/components/icons/CalendarIcon'
import NoData from '@/components/no-data'
import {
  Text12th500Styled,
  Text2th700Styled,
  Text500Styled,
  Text7th500Styled,
  Text8th500Styled
} from '@/components/styled'
import YouTube from '@/components/youtube-player'
import { MATCH_STATUS } from '@/constants/common'
import { FIREBASE } from '@/constants/firebase'
import { dateTimeReverseFormat } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import { useWindowSize } from '@/hooks/useWindowResize'
import { FireStoreService } from '@/services/FireStore.service'
import dayjs from '@/utils/dayjs'
import getYouTubeVideoId from '@/utils/getYoutubeVideoId'
import { Divider, Form, Tooltip } from 'antd'
import cx from 'classnames'
import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import BetSlide from '../../components/bet-slide'
import BetTableCustom from '../../components/bet-table'
import MatchStatus from '../../components/match-status'
import SponsorBet from '../../components/sponsor-bet'
import ArrowBottom from '../../icons/ArrowBottom'
import ArrowTop from '../../icons/ArrowTop'
import { calcTicketsBeted } from '../../util'
import LocalBetCart from '../global-card'
import {
  BetDetailContainerStyled,
  BetListRowStyled,
  BetSlipStyled,
  LeftColStyled,
  MatchDetailContainerStyled,
  MatchFighterImgStyled,
  NoDataStyled,
  ProcessContentStyled,
  ProgressStyled,
  RightColStyled,
  TicketsProcessStyled,
  TimeTakesPlaceStyled
} from './styled'

type Props = {
  matchDetail: any
}

const GlobalPoolBetDetail: React.FC<Props> = ({ matchDetail }) => {
  const { t } = useTranslation(['common', 'bet-list'], { useSuspense: false })
  const router = useRouter()
  const { matchId }: any = router.query
  const [form] = Form.useForm()
  const ref = useRef<any>(null)
  const { width, height } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const {
    matchName,
    matchStatus,
    betPoolDTO,
    imageUrl,
    startDate,
    listSponsorshipRank,
    maxTicket,
    matchLink,
    freeBet,
    endDate,
    activeBet,
    templateSponsorDTOS
  } = matchDetail || {}

  const matchLinkVID = matchLink ? getYouTubeVideoId(matchLink) : undefined

  // state for firebase
  const [listSponsor, setListSponsor] = useState<any[]>(listSponsorshipRank)
  const matchDateTimeStated = startDate && dayjs(startDate).format(dateTimeReverseFormat)
  const isTypeBet1X2 = betPoolDTO?.[0]?.typeBet !== 'WINNER'
  const [hideCountdown, setHideCountdown] = useState<boolean>(true)
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
  const [maxTickets, setMaxTickets] = useState<number>(maxTicket)
  const [scroll, setScroll] = useState<boolean>(false)

  const currentDate = dayjs()
  const matchDate = dayjs(startDate).subtract(1, 'minute')
  const isMatchStoppedBet = startDate && !matchDate.isAfter(currentDate)
  const isMatchStoppedFreeBet = endDate && !dayjs(endDate).isAfter(currentDate)

  useEffect(() => {
    setHideCountdown(false)
  }, [])

  // event firebase
  useEffect(() => {
    let timeOutOddsFt1: any
    let timeOutOddsDraw: any
    let timeOutOddsFt2: any
    let timeOutSponsor: any
    let timeOutTotalTicketsFt1: any
    let timeOutTotalTicketsDraw: any
    let timeOutTotalTicketsFt2: any

    if (betPoolDTO) {
      timeOutOddsFt1 = FireStoreService.getInstance().listenTimeOutOddsFighter(
        FIREBASE.ID,
        betPoolDTO?.[0]?.commonId,
        (snapshot) => {
          const data = snapshot.data()
          setOddsFt1(Number(data?.odds || 0))
        }
      )

      if (isTypeBet1X2) {
        timeOutOddsDraw = FireStoreService.getInstance().listenTimeOutOddsFighter(
          FIREBASE.ID,
          betPoolDTO?.[1]?.commonId,
          (snapshot) => {
            const data = snapshot.data()
            setOddsDraw(Number(data?.odds || 0))
          }
        )

        timeOutOddsFt2 = FireStoreService.getInstance().listenTimeOutOddsFighter(
          FIREBASE.ID,
          betPoolDTO?.[2]?.commonId,
          (snapshot) => {
            const data = snapshot.data()
            setOddsFt2(Number(data?.odds || 0))
          }
        )
      } else {
        timeOutOddsFt2 = FireStoreService.getInstance().listenTimeOutOddsFighter(
          FIREBASE.ID,
          betPoolDTO?.[1]?.commonId,
          (snapshot) => {
            const data = snapshot.data()
            setOddsFt2(Number(data?.odds || 0))
          }
        )
      }

      timeOutTotalTicketsFt1 = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfMatch(
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

      timeOutSponsor = FireStoreService.getInstance().listentimeOutSponsor(FIREBASE.MATCH_ID, matchId, (snapshot) => {
        const data = snapshot.data()
        const { match, sponsor } = data || {}
        const cloneSponsorTournament = _cloneDeep(listSponsor)
        const sponsorArr = cloneSponsorTournament?.map((item: any) => {
          for (let i = 0; i < sponsor?.length; i++) {
            if (Number(sponsor?.[i]?.id) === item?.id) {
              item = {
                ...item,
                fund: parseFloat(sponsor?.[i]?.fund || 0),
                rank: sponsor?.[i]?.rank
              }
            }
          }

          return item
        })

        const filterSponsorArr = sponsorArr?.filter((item: any) => item?.rank)

        const maxTickets = Number(match?.[0]?.maxTicket) || 0
        setListSponsor(filterSponsorArr)
        setMaxTickets(maxTickets)
      })
    }

    return () => {
      if (betPoolDTO) {
        if (isTypeBet1X2) {
          timeOutOddsDraw()
          timeOutTotalTicketsDraw()
        }

        timeOutTotalTicketsFt1()
        timeOutTotalTicketsFt2()
        timeOutOddsFt1()
        timeOutOddsFt2()
        timeOutSponsor()
      }
    }
  }, [betPoolDTO, isTypeBet1X2, matchId])

  const totalTicketsBeted = calcTicketsBeted(isTypeBet1X2, totalTicketsFt1, totalTicketsDraw, totalTicketsFt2)

  const targetDate = startDate && (Date.parse(startDate) || 0)

  const totalMoneySponsor = () => {
    const totalMoney = listSponsor?.reduce((accumulator: any, current: any) => accumulator + current.fund, 0)

    return totalMoney || 0
  }

  return (
    <Layout>
      <MatchDetailContainerStyled maxWidth={1200}>
        <BetDetailContainerStyled calculatedValue={height}>
          <BetListRowStyled>
            <RightColStyled>
              <div
                onClick={() =>
                  router.push({
                    pathname: AppRoutes.betList,
                    query: {
                      activeTab: 2
                    }
                  })
                }
                className={cx('hover bread-crumb', {
                  'no-start-date': !startDate
                })}
              >
                <ArrowLeftIcon />
                <div className='match-name-status'>
                  {matchStatus === MATCH_STATUS.LIVE && <MatchStatus matchStatus={matchStatus} />}
                  <Tooltip title={matchName}>
                    <Text500Styled className='match-name text-nowrap-1'>{matchName}</Text500Styled>
                  </Tooltip>
                </div>
              </div>
              {startDate && (
                <TimeTakesPlaceStyled>
                  <CalendarIcon />
                  <Text500Styled className='date-time'>{matchDateTimeStated}</Text500Styled>
                </TimeTakesPlaceStyled>
              )}
              <BetSlide />
              <MatchFighterImgStyled>
                <Image src={imageUrl} fill={true} alt='match-banner' />
              </MatchFighterImgStyled>
              {!hideCountdown && startDate && <Countdown targetDate={targetDate} />}
              <TicketsProcessStyled>
                <ProgressStyled
                  percent={
                    isTypeBet1X2
                      ? ((totalTicketsDraw + totalTicketsFt1) /
                          (totalTicketsFt1 + totalTicketsDraw + totalTicketsFt2)) *
                        100
                      : (totalTicketsFt1 / (totalTicketsFt1 + totalTicketsFt2)) * 100
                  }
                  success={
                    isTypeBet1X2
                      ? {
                          percent: (totalTicketsFt1 / (totalTicketsFt1 + totalTicketsDraw + totalTicketsFt2)) * 100
                        }
                      : undefined
                  }
                  showInfo={false}
                  strokeLinecap='butt'
                  strokeColor={
                    isTypeBet1X2
                      ? !totalTicketsFt1 && !totalTicketsFt2 && !totalTicketsDraw
                        ? '#ccc'
                        : '#FFA928'
                      : !totalTicketsFt1 && !totalTicketsFt2
                      ? '#ccc'
                      : '#D80027'
                  }
                  trailColor={
                    isTypeBet1X2
                      ? !totalTicketsFt1 && !totalTicketsFt2 && !totalTicketsDraw
                        ? '#ccc'
                        : '#0052B4'
                      : !totalTicketsFt1 && !totalTicketsFt2
                      ? '#ccc'
                      : '#0052B4'
                  }
                />
                <ProcessContentStyled>
                  <Text7th500Styled>
                    {totalTicketsFt1} {t('NUMBER_TICKETS')}
                  </Text7th500Styled>
                  {isTypeBet1X2 && (
                    <Text12th500Styled>
                      {totalTicketsDraw} {t('NUMBER_TICKETS')}
                    </Text12th500Styled>
                  )}
                  <Text8th500Styled>
                    {totalTicketsFt2} {t('NUMBER_TICKETS')}
                  </Text8th500Styled>
                </ProcessContentStyled>
              </TicketsProcessStyled>
              {!_isEmpty(listSponsor) && (
                <SponsorBet
                  listSponsorshipRank={listSponsor}
                  startDateTime={startDate}
                  betId={matchId}
                  collectionName={FIREBASE.MATCH_ID}
                  namePage='MATCH_DETAIL'
                  optionSponsor='SINGLE_SPONSOR'
                  isShowDivider={false}
                  totalTicketsBetedExternal={totalTicketsBeted}
                  templateSponsorDTOS={templateSponsorDTOS}
                />
              )}

              <Divider className='divider-detail' />
              <React.Fragment>
                {_isEmpty(betPoolDTO) ? (
                  <NoDataStyled>
                    <NoData text='No bets available' />
                  </NoDataStyled>
                ) : (
                  <BetTableCustom
                    betPoolDTO={betPoolDTO}
                    matchId={matchId}
                    oddsFt1={oddsFt1}
                    oddsFt2={oddsFt2}
                    oddsDraw={oddsDraw}
                    startDate={startDate}
                    isMatchStoppedBet={isMatchStoppedBet}
                    form={form}
                    matchName={matchName}
                    totalTicketsFt1={totalTicketsFt1}
                    totalTicketsDraw={totalTicketsDraw}
                    totalTicketsFt2={totalTicketsFt2}
                    totalMoneySponsor={totalMoneySponsor()}
                    maxTickets={maxTickets}
                    freeBet={freeBet}
                    sponsorTournament={templateSponsorDTOS}
                    isMatchStoppedFreeBet={isMatchStoppedFreeBet}
                    activeBet={activeBet}
                    listSponsor={listSponsor}
                  />
                )}
              </React.Fragment>
              {matchLinkVID && <YouTube videoId={matchLinkVID} />}
            </RightColStyled>
            <LeftColStyled>
              {isMaxWidth1199 ? (
                <>
                  <div ref={ref} className={cx('bet-slip-mobile', scroll ? 'active' : 'un-active')}>
                    <LocalBetCart form={form} />
                  </div>
                  <BetSlipStyled onClick={() => setScroll((prevState: boolean) => !prevState)} scroll={scroll}>
                    <Text2th700Styled>
                      {scroll
                        ? t('HIDE_BET_SLIP', {
                            ns: 'bet-list'
                          })
                        : t('SHOW_BET_SLIP', {
                            ns: 'bet-list'
                          })}
                    </Text2th700Styled>
                    {scroll ? <ArrowBottom /> : <ArrowTop />}
                  </BetSlipStyled>
                </>
              ) : (
                <LocalBetCart form={form} />
              )}
            </LeftColStyled>
          </BetListRowStyled>
        </BetDetailContainerStyled>
      </MatchDetailContainerStyled>
    </Layout>
  )
}

export default GlobalPoolBetDetail
