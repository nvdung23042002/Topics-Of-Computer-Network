import CollapseComponent from '@/components/common/collapse'
import SiteLoading from '@/components/site-loading'
import { Text700Styled } from '@/components/styled'
import { FIREBASE } from '@/constants/firebase'
import { timeFormat } from '@/constants/format'
import NSBService from '@/services/NSB.service'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import { Collapse, FormInstance, Spin, Tooltip } from 'antd'
import dayjs from 'dayjs'
import _isEmpty from 'lodash/isEmpty'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import EmptyData from '../../../../components/empty-data'
import SponsorBet from '../../../../components/sponsor-bet'
import { renderDay } from '../../../../util'
import { FightersTitleStyled, FightersWrapper, TournamentsFighterListStyled, TournamentsListStyled } from './styled'
import PoolFighterItem from '../../containers/pool-fighter-item'
import { TYPE_BET, TYPE_TOURNAMENT } from '@/containers/bet/constants'

const { Panel } = Collapse

type Props = {
  form: FormInstance
}

const PoolTournamentsList: React.FC<Props> = ({ form }) => {
  const [tournamentsList, setTournamentsList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getTournaments = useCallback(async () => {
    try {
      setLoading(true)
      const response = await NSBService.GetGlobalTournaments({
        methodBet: TYPE_BET.BET_POOL
      })
      setTournamentsList(response?.data)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
      showMessage({ error: getError(error) })
    }
  }, [])

  useEffect(() => {
    getTournaments()
  }, [getTournaments])

  return (
    <Spin spinning={loading} indicator={<SiteLoading />}>
      <TournamentsListStyled>
        {_isEmpty(tournamentsList) ? (
          <EmptyData />
        ) : (
          <CollapseComponent>
            {tournamentsList?.map((panel: any, index: number) => {
              const keyIndex = String(index + 1)
              const {
                tournamentId,
                startDateTime,
                tournamentName,
                listFighter,
                listSponsorshipRank,
                activeBet,
                templateSponsorDTOS,
                endDateTime,
                typeTournament
              } = panel
              const isNotSponsor = _isEmpty(listSponsorshipRank)
              const customFormatDate = 'YYYY年MM月DD日'
              const getDateStart = dayjs(startDateTime).format(customFormatDate)
              const getTimeStart = dayjs(startDateTime).format(timeFormat)
              const currentDayStart = dayjs(startDateTime).day()

              const getDateEnd = dayjs(endDateTime).format(customFormatDate)
              const getTimeEnd = dayjs(endDateTime).format(timeFormat)
              const currentDayEnd = dayjs(endDateTime).day()

              const calendarDateTime = endDateTime
                ? `${tournamentName} 大会 - ${getDateStart}（${renderDay(
                    String(currentDayStart)
                  )}）${getTimeStart} - ${getDateEnd}（${renderDay(String(currentDayEnd))}）${getTimeEnd}`
                : `${tournamentName} 大会 - ${getDateStart}（${renderDay(String(currentDayStart))}）${getTimeStart}`

              const isTypeTournament = typeTournament === TYPE_TOURNAMENT.CHAMPIONSHIPS

              return (
                <React.Fragment key={tournamentId}>
                  <Panel
                    header={
                      <Tooltip title={calendarDateTime}>
                        <Text700Styled className='text-nowrap-1 w-fit-content'>{calendarDateTime}</Text700Styled>
                      </Tooltip>
                    }
                    key={keyIndex}
                  >
                    {isTypeTournament && !_isEmpty(listSponsorshipRank) && (
                      <SponsorBet
                        listSponsorshipRank={listSponsorshipRank}
                        startDateTime={startDateTime}
                        betId={tournamentId}
                        collectionName={FIREBASE.TOURNAMENT_GLOBAL_ID}
                        namePage='TOURNAMENT'
                        templateSponsorDTOS={templateSponsorDTOS}
                      />
                    )}
                    {!_isEmpty(listFighter) && (
                      <FightersWrapper>
                        <FightersTitleStyled>
                          <Text700Styled>選手</Text700Styled>
                        </FightersTitleStyled>
                        <TournamentsFighterListStyled>
                          {listFighter?.map((item: any) => (
                            <Fragment key={item?.fighterId}>
                              <PoolFighterItem
                                item={item}
                                form={form}
                                startDateTime={startDateTime}
                                tournamentId={tournamentId}
                                tournamentName={tournamentName}
                                templateSponsorDTOS={templateSponsorDTOS}
                                activeBet={activeBet}
                                isNotSponsor={isNotSponsor}
                                isTypeTournament={isTypeTournament}
                              />
                            </Fragment>
                          ))}
                        </TournamentsFighterListStyled>
                      </FightersWrapper>
                    )}
                  </Panel>
                </React.Fragment>
              )
            })}
          </CollapseComponent>
        )}
      </TournamentsListStyled>
    </Spin>
  )
}

export default PoolTournamentsList
