import Layout from '@/app/layout'
import CollapseComponent from '@/components/common/collapse'
import EditorViewer from '@/components/common/editor-viewer'
import Image from '@/components/common/image'
import Container from '@/components/container'
import {
  Text11th500Styled,
  Text2th400Styled,
  Text2th500Styled,
  Text2th700Styled,
  Text500Styled,
  Text5th500Styled,
  Text700Styled
} from '@/components/styled'
import { dateFormat, dateFormatJP, dateTimeReverseFormat } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import SponsorAds from '@/containers/bet/components/sponsor-ads'
import { useWindowSize } from '@/hooks/useWindowResize'
import { Col, Collapse, Row, Tooltip } from 'antd'
import dayjs from '@/utils/dayjs'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  BodyIndexColStyled,
  FighterBodyIndexStyled,
  FighterDescStyled,
  FighterDetailColLeftStyled,
  FighterDetailColRightStyled,
  FighterDetailContainerStyled,
  FighterDetailRowStyled,
  FighterDetailSponsorStyled,
  FighterDetailStyled,
  FighterImgStyled,
  FighterInfoDescStyled,
  FighterInfoGeneralImgMobileStyled,
  FighterInfoGeneralImgStyled,
  FighterInfoGeneralMobileStyed,
  FighterInfoGeneralStyed,
  FighterLabelStatusStyled,
  FighterMobileStyled,
  FighterStyled,
  MatchHistoryMobileStyled,
  MatchHistoryResultStyled,
  MatchHistoryStyled,
  NewsHistoryImgStyled,
  NewsHistoryInfoStyled,
  NewsHistoryStyled,
  PairBodyIndexStyled,
  SeemoreBtnStyled
} from './styled'
import YouTube from '@/components/youtube-player'
import getYouTubeVideoId from '@/utils/getYoutubeVideoId'

const { Panel } = Collapse

type Props = {
  fighterDetail: any
}

const FighterDetail: React.FC<Props> = ({ fighterDetail }) => {
  const { t } = useTranslation(['fighter-detail', 'fighter-list'])
  const router = useRouter()
  const [matchHistoryList, setMatchHistoryList] = useState<any>([])
  const [newsList, setNewsList] = useState<any>([])
  const [isShowAllMatch, setIsShowAllMatch] = useState<boolean>(false)
  const [isShowAllNews, setIsShowAllNews] = useState<boolean>(false)

  const { fighterId } = router.query
  const { width } = useWindowSize()
  const isMaxWidth992 = width <= 992
  const isMaxWidth1199 = width <= 1199

  const {
    address,
    affiliation,
    avatar,
    dateOfBirth,
    description,
    fullNameKanji,
    fullNameRomaji,
    height,
    matchData,
    reach,
    tnew,
    totalDraw,
    totalLose,
    totalWin,
    weight,
    matchLink
  } = fighterDetail || {}

  const matchLinkVID = matchLink ? getYouTubeVideoId(matchLink) : undefined

  const conditionSort = (a: any, b: any) => {
    if (a?.fighterId === Number(fighterId) && b?.fighterId === Number(fighterId)) {
      return 0
    }

    if (a?.fighterId === Number(fighterId) && b?.fighterId !== Number(fighterId)) {
      return -1
    }

    if (a?.fighterId !== Number(fighterId) && b?.fighterId !== Number(fighterId)) {
      return 0
    }

    if (a?.fighterId !== Number(fighterId) && b?.fighterId === Number(fighterId)) {
      return 1
    }
  }

  const matchDataSort = matchData?.map((match: any) => {
    match?.result?.sort(conditionSort)

    return match
  })

  useEffect(() => {
    if (isShowAllMatch) {
      setMatchHistoryList(matchDataSort)
    } else {
      const newList = matchDataSort.slice(0, 5)
      setMatchHistoryList(newList)
    }
  }, [isShowAllMatch])

  useEffect(() => {
    if (isShowAllNews) {
      setNewsList(tnew)
    } else {
      const newList = tnew.slice(0, 5)
      setNewsList(newList)
    }
  }, [isShowAllNews])

  const renderFighterStatus = (status: string) => {
    const FIGHTER_STATUS = {
      WIN: <Text2th700Styled className='win'>{t('WIN')}</Text2th700Styled>,
      LOSE: <Text2th700Styled className='lose'>{t('LOSE')}</Text2th700Styled>,
      DRAW: <Text2th700Styled className='draw'>{t('DRAW')}</Text2th700Styled>
    }

    return FIGHTER_STATUS[status]
  }

  const formatWeight = (weight: number) => {
    if (Number.isInteger(weight)) {
      return `${weight}.0`
    }

    return weight
  }

  const renderMatchName = (matchName: string, ftName1: string, ftName2: string) => {
    const splitMatchName = matchName?.split(':')
    const groupMatchName = `${splitMatchName?.[0]} : ${ftName1} vs. ${ftName2}`
    return groupMatchName
  }

  return (
    <Layout>
      <Container maxWidth={1200}>
        <FighterDetailStyled>
          {isMaxWidth992 ? (
            <FighterInfoGeneralMobileStyed>
              <div className='top-content'>
                <Tooltip title={fullNameRomaji}>
                  <Text2th700Styled className='fighter-name text-nowrap-1'>{fullNameRomaji}</Text2th700Styled>
                </Tooltip>
                <Tooltip title={fullNameKanji}>
                  <Text2th500Styled className='fighter-name-kanji text-nowrap-1'>{fullNameKanji}</Text2th500Styled>
                </Tooltip>
              </div>
              <div className='bottom-content'>
                <FighterInfoGeneralImgMobileStyled>
                  <Image src={avatar} alt='Fighter' fill={true} objectFit='cover' />
                </FighterInfoGeneralImgMobileStyled>
                <div className='body-index'>
                  <Text2th400Styled className='score'>{`${totalWin}${t('WIN')} - ${totalLose}${t(
                    'LOSE'
                  )} - ${totalDraw}${t('DRAW')}`}</Text2th400Styled>
                  <PairBodyIndexStyled>
                    <Text2th400Styled className='label'>{t('ADDRESS')}：</Text2th400Styled>
                    <Tooltip title={address || '-'}>
                      <Text2th400Styled className='value text-nowrap-1'>{address || '-'}</Text2th400Styled>
                    </Tooltip>
                  </PairBodyIndexStyled>
                  <PairBodyIndexStyled>
                    <Text2th400Styled className='label'>
                      {t('DATE_OF_BIRTH', {
                        ns: 'fighter-list'
                      })}
                      ：
                    </Text2th400Styled>
                    <Tooltip title={dayjs(dateOfBirth)?.format(dateFormatJP) || '-'}>
                      <Text2th400Styled className='value text-nowrap-1'>
                        {dayjs(dateOfBirth)?.format(dateFormatJP) || '-'}
                      </Text2th400Styled>
                    </Tooltip>
                  </PairBodyIndexStyled>
                  <PairBodyIndexStyled>
                    <Text2th400Styled className='label'>{t('HEIGHT')}：</Text2th400Styled>
                    <Tooltip title={`${height || '-'}cm`}>
                      <Text2th400Styled className='value text-nowrap-1'>{height || '-'}cm</Text2th400Styled>
                    </Tooltip>
                  </PairBodyIndexStyled>
                  <PairBodyIndexStyled>
                    <Text2th400Styled className='label'>{t('REACH')}：</Text2th400Styled>
                    <Tooltip title={`${reach || '-'}cm`}>
                      <Text2th400Styled className='value text-nowrap-1'>{reach || '-'}cm</Text2th400Styled>
                    </Tooltip>
                  </PairBodyIndexStyled>
                  <PairBodyIndexStyled>
                    <Text2th400Styled className='label'>{t('WEIGHT')}：</Text2th400Styled>
                    <Tooltip title={`${formatWeight(weight) || '-'}kg`}>
                      <Text2th400Styled className='value text-nowrap-1'>
                        {formatWeight(weight) || '-'}kg
                      </Text2th400Styled>
                    </Tooltip>
                  </PairBodyIndexStyled>
                  <PairBodyIndexStyled>
                    <Text2th400Styled className='label'>{t('AFFILIATE')}：</Text2th400Styled>
                    <Tooltip title={affiliation || '-'}>
                      <Text2th400Styled className='value text-nowrap-1'>{affiliation || '-'}</Text2th400Styled>
                    </Tooltip>
                  </PairBodyIndexStyled>
                </div>
              </div>
            </FighterInfoGeneralMobileStyed>
          ) : (
            <FighterInfoGeneralStyed>
              <FighterInfoGeneralImgStyled>
                <Image src={avatar} alt='Fighter' fill={true} objectFit='cover' />
              </FighterInfoGeneralImgStyled>
              <FighterInfoDescStyled>
                <Tooltip title={fullNameRomaji}>
                  <Text2th700Styled className='fighter-name'>{fullNameRomaji}</Text2th700Styled>
                </Tooltip>
                <Tooltip title={fullNameKanji}>
                  <Text2th500Styled className='fighter-name-kanji'>{fullNameKanji}</Text2th500Styled>
                </Tooltip>
                <Text2th400Styled className='score'>{`${totalWin}${t('WIN')} - ${totalLose}${t(
                  'LOSE'
                )} - ${totalDraw}${t('DRAW')}`}</Text2th400Styled>
                <FighterBodyIndexStyled>
                  <BodyIndexColStyled>
                    <PairBodyIndexStyled>
                      <Text2th400Styled className='label'>{t('ADDRESS')}：</Text2th400Styled>
                      <Tooltip title={address || '-'}>
                        <Text2th400Styled className='value text-nowrap-1'>{address || '-'}</Text2th400Styled>
                      </Tooltip>
                    </PairBodyIndexStyled>
                    <PairBodyIndexStyled>
                      <Text2th400Styled className='label'>
                        {t('DATE_OF_BIRTH', {
                          ns: 'fighter-list'
                        })}
                        ：
                      </Text2th400Styled>
                      <Tooltip title={dayjs(dateOfBirth)?.format(dateFormatJP) || '-'}>
                        <Text2th400Styled className='value text-nowrap-1'>
                          {dayjs(dateOfBirth)?.format(dateFormatJP) || '-'}
                        </Text2th400Styled>
                      </Tooltip>
                    </PairBodyIndexStyled>
                    <PairBodyIndexStyled>
                      <Text2th400Styled className='label'>{t('HEIGHT')}：</Text2th400Styled>
                      <Tooltip title={`${height || '-'}cm`}>
                        <Text2th400Styled className='value text-nowrap-1'>{height || '-'}cm</Text2th400Styled>
                      </Tooltip>
                    </PairBodyIndexStyled>
                  </BodyIndexColStyled>
                  <BodyIndexColStyled>
                    <PairBodyIndexStyled>
                      <Text2th400Styled className='label'>{t('REACH')}：</Text2th400Styled>
                      <Tooltip title={`${reach || '-'}cm`}>
                        <Text2th400Styled className='value text-nowrap-1'>{reach || '-'}cm</Text2th400Styled>
                      </Tooltip>
                    </PairBodyIndexStyled>
                    <PairBodyIndexStyled>
                      <Text2th400Styled className='label'>{t('WEIGHT')}：</Text2th400Styled>
                      <Tooltip title={`${formatWeight(weight) || '-'}kg`}>
                        <Text2th400Styled className='value text-nowrap-1'>
                          {formatWeight(weight) || '-'}kg
                        </Text2th400Styled>
                      </Tooltip>
                    </PairBodyIndexStyled>
                    <PairBodyIndexStyled>
                      <Text2th400Styled className='label'>{t('AFFILIATE')}：</Text2th400Styled>
                      <Tooltip title={affiliation || '-'}>
                        <Text2th400Styled className='value text-nowrap-1'>{affiliation || '-'}</Text2th400Styled>
                      </Tooltip>
                    </PairBodyIndexStyled>
                  </BodyIndexColStyled>
                </FighterBodyIndexStyled>
              </FighterInfoDescStyled>
            </FighterInfoGeneralStyed>
          )}
          <FighterDetailContainerStyled>
            <FighterDetailRowStyled wrap={false}>
              <FighterDetailColLeftStyled>
                <FighterDescStyled>
                  <EditorViewer content={description} />
                </FighterDescStyled>
                {!_isEmpty(matchHistoryList) && (
                  <CollapseComponent className='match-history-collapse'>
                    <Panel header={<Text700Styled>{t('MATCH_RECORD')}</Text700Styled>} key={'1'}>
                      {isMaxWidth1199 ? (
                        <Row gutter={[5, 5]}>
                          {matchHistoryList?.map((item: any) => (
                            <Col span={24} key={item?.matchId}>
                              <MatchHistoryMobileStyled
                                onClick={() => router.push(AppRoutes.betDetail(item?.matchId))}
                                className='hover'
                              >
                                <div className='match-general'>
                                  <Tooltip
                                    title={`${item?.tournamentName} ${dayjs(item?.startDate)?.format(
                                      dateTimeReverseFormat
                                    )}`}
                                  >
                                    <Text500Styled className='match-name text-nowrap-1'>
                                      {item?.tournamentName} {dayjs(item?.startDate)?.format(dateTimeReverseFormat)}
                                    </Text500Styled>
                                  </Tooltip>
                                  <Tooltip title={item?.matchName}>
                                    <Text700Styled className='fighter-vs text-nowrap-1'>
                                      {item?.matchName}
                                    </Text700Styled>
                                  </Tooltip>
                                </div>
                                <div className='fighter-result'>
                                  <FighterMobileStyled>
                                    <FighterImgStyled>
                                      <Image
                                        src={item?.result?.[0]?.imageUrl}
                                        alt='Fighter'
                                        fill={true}
                                        objectFit='cover'
                                      />
                                    </FighterImgStyled>
                                    <FighterLabelStatusStyled>
                                      {renderFighterStatus(item?.result?.[0]?.betStatus)}
                                    </FighterLabelStatusStyled>
                                  </FighterMobileStyled>
                                  <FighterMobileStyled>
                                    <FighterLabelStatusStyled>
                                      {renderFighterStatus(item?.result?.[1]?.betStatus)}
                                    </FighterLabelStatusStyled>
                                    <FighterImgStyled>
                                      <Image
                                        src={item?.result?.[1]?.imageUrl}
                                        alt='Fighter'
                                        fill={true}
                                        objectFit='cover'
                                      />
                                    </FighterImgStyled>
                                  </FighterMobileStyled>
                                </div>
                              </MatchHistoryMobileStyled>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <Row gutter={[10, 10]}>
                          {matchHistoryList?.map((item: any) => (
                            <Col span={24} key={item?.matchId}>
                              <MatchHistoryStyled
                                onClick={() => router.push(AppRoutes.betDetail(item?.matchId))}
                                className='hover'
                              >
                                <FighterStyled>
                                  <FighterImgStyled>
                                    <Image
                                      src={item?.result?.[0]?.imageUrl}
                                      alt='Fighter'
                                      fill={true}
                                      objectFit='cover'
                                    />
                                  </FighterImgStyled>
                                  <FighterLabelStatusStyled>
                                    {renderFighterStatus(item?.result?.[0]?.betStatus)}
                                  </FighterLabelStatusStyled>
                                </FighterStyled>
                                <MatchHistoryResultStyled>
                                  <Tooltip
                                    title={`${item?.tournamentName} ${dayjs(item?.startDate)?.format(
                                      dateTimeReverseFormat
                                    )}`}
                                  >
                                    <Text500Styled className='match-name text-nowrap-1'>
                                      {item?.tournamentName} {dayjs(item?.startDate)?.format(dateTimeReverseFormat)}
                                    </Text500Styled>
                                  </Tooltip>
                                  <Tooltip title={item?.matchName}>
                                    <Text700Styled className='fighter-vs text-nowrap-1'>
                                      {renderMatchName(
                                        item?.matchName,
                                        item?.result?.[0]?.fullNameKanji,
                                        item?.result?.[1]?.fullNameKanji
                                      )}
                                    </Text700Styled>
                                  </Tooltip>
                                </MatchHistoryResultStyled>
                                <FighterStyled>
                                  <FighterLabelStatusStyled>
                                    {renderFighterStatus(item?.result?.[1]?.betStatus)}
                                  </FighterLabelStatusStyled>
                                  <FighterImgStyled>
                                    <Image
                                      src={item?.result?.[1]?.imageUrl}
                                      alt='Fighter'
                                      fill={true}
                                      objectFit='cover'
                                    />
                                  </FighterImgStyled>
                                </FighterStyled>
                              </MatchHistoryStyled>
                            </Col>
                          ))}
                        </Row>
                      )}
                      {matchDataSort?.length > 5 && (
                        <div className='show-more-btn'>
                          <SeemoreBtnStyled onClick={() => setIsShowAllMatch((prevState: boolean) => !prevState)}>
                            <Text2th400Styled>{t(isShowAllMatch ? 'SEE_LESS' : 'SEE_MORE')}</Text2th400Styled>
                          </SeemoreBtnStyled>
                        </div>
                      )}
                    </Panel>
                  </CollapseComponent>
                )}
                {matchLinkVID && (
                  <CollapseComponent className='video-history-collapse'>
                    <Panel header={<Text700Styled>{t('MATCH_VIDEO')}</Text700Styled>} key={'1'}>
                      {matchLinkVID && <YouTube videoId={matchLinkVID} />}
                    </Panel>
                  </CollapseComponent>
                )}
                {!_isEmpty(tnew) && (
                  <CollapseComponent className='news-history-collapse'>
                    <Panel header={<Text700Styled>{t('RELATED_ARTICLE')}</Text700Styled>} key={'1'}>
                      <Row gutter={[10, 10]}>
                        {newsList?.map((item: any) => (
                          <Col span={24} key={item?.newId}>
                            <NewsHistoryStyled>
                              <NewsHistoryImgStyled className='hover'>
                                <Image
                                  src={item?.image}
                                  fill={true}
                                  alt='News'
                                  objectFit='cover'
                                  onClick={() => router.push(AppRoutes.newsDetail(item?.newId))}
                                />
                              </NewsHistoryImgStyled>
                              <NewsHistoryInfoStyled>
                                <div>
                                  <Text11th500Styled className='bet-sport'>
                                    {t(item?.newsType, { ns: 'common' })}
                                  </Text11th500Styled>
                                  <Tooltip title={item?.titleNews}>
                                    <Text700Styled
                                      className='news-title text-nowrap-2 hover'
                                      onClick={() => router.push(AppRoutes.newsDetail(item?.newId))}
                                    >
                                      {item?.titleNews}
                                    </Text700Styled>
                                  </Tooltip>
                                </div>
                                <Text5th500Styled className='news-release-date'>
                                  {dayjs(item?.updateAt).format(dateFormat)}
                                </Text5th500Styled>
                              </NewsHistoryInfoStyled>
                            </NewsHistoryStyled>
                          </Col>
                        ))}
                        {tnew?.length > 5 && (
                          <Col span={24} className='see-more'>
                            <SeemoreBtnStyled onClick={() => setIsShowAllNews((prevState: boolean) => !prevState)}>
                              <Text2th400Styled>{t(isShowAllNews ? 'SEE_LESS' : 'SEE_MORE')}</Text2th400Styled>
                            </SeemoreBtnStyled>
                          </Col>
                        )}
                      </Row>
                    </Panel>
                  </CollapseComponent>
                )}
              </FighterDetailColLeftStyled>
              <FighterDetailColRightStyled>
                <FighterDetailSponsorStyled>
                  <SponsorAds />
                </FighterDetailSponsorStyled>
              </FighterDetailColRightStyled>
            </FighterDetailRowStyled>
          </FighterDetailContainerStyled>
        </FighterDetailStyled>
      </Container>
    </Layout>
  )
}

export default FighterDetail
