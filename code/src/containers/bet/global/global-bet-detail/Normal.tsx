/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Layout from '@/app/layout'
import Image from '@/components/common/image'
import Countdown from '@/components/countdown'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import CalendarIcon from '@/components/icons/CalendarIcon'
import NoData from '@/components/no-data'
import { Text2th700Styled, Text500Styled } from '@/components/styled'
import YouTube from '@/components/youtube-player'
import { BET_FREE_STATUS, MATCH_STATUS } from '@/constants/common'
import { dateTimeReverseFormat } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import { useWindowSize } from '@/hooks/useWindowResize'
import dayjs from '@/utils/dayjs'
import getYouTubeVideoId from '@/utils/getYoutubeVideoId'
import { Form, Spin, Tooltip } from 'antd'
import cx from 'classnames'
// import _cloneDeep from 'lodash/cloneDeep'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import BetTableCustomNormal from '../../components/bet-table-normal'
import MatchStatus from '../../components/match-status'
import ArrowBottom from '../../icons/ArrowBottom'
import ArrowTop from '../../icons/ArrowTop'
import NormalBetCart from '../global-card/global-normal-card'
import {
  BetDetailContainerStyled,
  BetListRowStyled,
  BetSlipStyled,
  LeftColStyled,
  MatchDetailContainerStyled,
  MatchFighterImgStyled,
  NoDataStyled,
  RightColStyled,
  TimeTakesPlaceStyled
} from './styled'
import NSBService from '@/services/NSB.service'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import { TYPE_BET } from '../../constants'
import SiteLoading from '@/components/site-loading'

const GlobalNormalBetDetail: React.FC = () => {
  const { t } = useTranslation(['common', 'bet-list'], { useSuspense: false })
  const router = useRouter()
  const { locale } = router
  const { matchId }: any = router.query
  const [form] = Form.useForm()
  const ref = useRef<any>(null)
  const { width, height } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const [matchDetail, setMatchDetail] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const getMatchDetail = useCallback(async () => {
    try {
      setLoading(true)

      const langKey = locale?.toLocaleUpperCase() ?? 'JA'
      const response = await NSBService.getMatchDetailGlobal({
        matchId,
        langKey,
        methodBet: TYPE_BET.BET_NORMAL
      })
      setMatchDetail(response?.data)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
      showMessage({ error: getError(error) })
    }
  }, [])

  useEffect(() => {
    getMatchDetail()
  }, [getMatchDetail])

  const { matchName, matchStatus, imageUrl, startDate, matchLink, endDate, freeBet, activeBet } = matchDetail || {}
  const matchLinkVID = matchLink ? getYouTubeVideoId(matchLink) : undefined
  const isBetFree = freeBet === BET_FREE_STATUS.ON
  const isActiveBet = activeBet === 'ON'
  const matchDateTimeStated = startDate && dayjs(startDate).format(dateTimeReverseFormat)
  const [hideCountdown, setHideCountdown] = useState<boolean>(true)
  const [scroll, setScroll] = useState<boolean>(false)

  useEffect(() => {
    setHideCountdown(false)
  }, [])

  const targetDate = startDate && (Date.parse(startDate) || 0)

  return (
    <Layout>
      <MatchDetailContainerStyled maxWidth={1200}>
        <Spin spinning={loading} indicator={<SiteLoading />}>
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
                <MatchFighterImgStyled>
                  <Image src={imageUrl} fill={true} alt='match-banner' />
                </MatchFighterImgStyled>
                {!hideCountdown && startDate && <Countdown targetDate={targetDate} />}

                <React.Fragment>
                  {_isEmpty(matchDetail?.betNormal) ? (
                    <NoDataStyled>
                      <NoData text='No bets available' />
                    </NoDataStyled>
                  ) : (
                    Object.keys(matchDetail?.betNormal)?.map((betKey: any, betIndex: number) =>
                      matchDetail?.betNormal?.[betKey]?.length ? (
                        <BetTableCustomNormal
                          key={betIndex}
                          betNormal={matchDetail?.betNormal?.[betKey]}
                          matchId={matchId}
                          form={form}
                          startDate={startDate}
                          endDate={endDate}
                          isActiveBet={isActiveBet}
                          isBetFree={isBetFree}
                          freeBet={freeBet}
                          matchName={matchName}
                        />
                      ) : (
                        ''
                      )
                    )
                  )}
                </React.Fragment>
                {matchLinkVID && <YouTube videoId={matchLinkVID} />}
              </RightColStyled>
              <LeftColStyled>
                {isMaxWidth1199 ? (
                  <>
                    <div ref={ref} className={cx('bet-slip-mobile', scroll ? 'active' : 'un-active')}>
                      <NormalBetCart form={form} />
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
                  <NormalBetCart form={form} />
                )}
              </LeftColStyled>
            </BetListRowStyled>
          </BetDetailContainerStyled>
        </Spin>
      </MatchDetailContainerStyled>
    </Layout>
  )
}

export default GlobalNormalBetDetail
