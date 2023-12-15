import CollapseComponent from '@/components/common/collapse'
import { Text700Styled } from '@/components/styled'
import { LANG_KEY } from '@/constants/common'
import { timeFormat } from '@/constants/format'
import NSBService from '@/services/NSB.service'
import dayjs from '@/utils/dayjs'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import { Col, Collapse, FormInstance, Row, Spin, Tooltip } from 'antd'
import _isEmpty from 'lodash/isEmpty'
import React, { useCallback, useEffect, useState } from 'react'
import EmptyData from '../../../../components/empty-data'
import { renderDay } from '../../../../util'
import { MatchListContainerStyled } from './styled'
import SiteLoading from '@/components/site-loading'
import NormalMatchItem from '../../containers/normal-match-item'
import { TYPE_BET } from '@/containers/bet/constants'
const { Panel } = Collapse

type Props = {
  form: FormInstance
}

const NormalMatchList: React.FC<Props> = ({ form }) => {
  const [matchList, setMatchList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getBetMatchList = useCallback(async () => {
    try {
      setLoading(true)
      const response = await NSBService.getGlobalMatchList({
        langKey: LANG_KEY.OTHER,
        methodBet: TYPE_BET.BET_NORMAL
      })

      setMatchList(response?.data)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setLoading(false)
      showMessage({ error: getError(error) })
    }
  }, [])

  useEffect(() => {
    getBetMatchList()
  }, [getBetMatchList])

  return (
    <Spin spinning={loading} indicator={<SiteLoading />}>
      <MatchListContainerStyled>
        {_isEmpty(matchList) ? (
          <EmptyData />
        ) : (
          <CollapseComponent>
            {matchList?.map((panel: any, index: number) => {
              const customFormatDate = 'YYYY年MM月DD日'
              const keyIndex = String(index + 1)
              const { dataMatch, tournamentId, tournamentName, startDateTime, endDateTime } = panel || {}
              const getDateStart = dayjs(startDateTime).format(customFormatDate)
              const getTimeStart = dayjs(startDateTime).format(timeFormat)
              const currentDayStart = dayjs(startDateTime).day()

              const getDateEnd = dayjs(endDateTime).format(customFormatDate)
              const getTimeEnd = dayjs(endDateTime).format(timeFormat)
              const currentDayEnd = dayjs(endDateTime).day()

              const calendarDateTime = endDateTime
                ? `${tournamentName} - ${getDateStart}（${renderDay(
                    String(currentDayStart)
                  )}）${getTimeStart} - ${getDateEnd}（${renderDay(String(currentDayEnd))}）${getTimeEnd}`
                : `${tournamentName} - ${getDateStart}（${renderDay(String(currentDayStart))}）${getTimeStart}`

              return (
                <React.Fragment key={tournamentId}>
                  {!_isEmpty(dataMatch) && (
                    <Panel
                      header={
                        <Tooltip title={calendarDateTime}>
                          <Text700Styled className='text-nowrap-1 w-fit-content'>{calendarDateTime}</Text700Styled>
                        </Tooltip>
                      }
                      key={keyIndex}
                    >
                      <Row align='middle' gutter={[24, 24]}>
                        {dataMatch?.map((match: any) => (
                          <Col span={24} key={match?.matchId}>
                            <NormalMatchItem form={form} match={match} />
                          </Col>
                        ))}
                      </Row>
                    </Panel>
                  )}
                </React.Fragment>
              )
            })}
          </CollapseComponent>
        )}
      </MatchListContainerStyled>
    </Spin>
  )
}

export default NormalMatchList
