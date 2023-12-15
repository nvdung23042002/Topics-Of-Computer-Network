import { MatchStyled } from './styled'
import Card from '../../card'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { addCart } from '@/redux/sponsor/slice'
import CollapseComponent from '@/components/common/collapse'
import { Collapse } from 'antd'
import { Text700Styled } from '@/components/styled'
import { useEffect, useMemo } from 'react'
import { getSponsorMatchThunk } from '@/redux/sponsor/thunk'
import { dateTimeDayFormatJP, timeFormat } from '@/constants/format'
import dayjs from '@/utils/dayjs'
import { SponsorMatch } from '@/services/dto/sponsor'
import SiteLoading from '@/components/site-loading'
import showMessage from '@/utils/showMessage'

const { Panel } = Collapse

const MatchList = () => {
  // const [activeKey, setActiveKey] = useState<string[]>(['1'])
  const list = useAppSelector((state) => state.sponsor?.cart.list)
  const tournamentMatchs = useAppSelector((state) => state.sponsor.tournamentMatchList)
  const matchLoading = useAppSelector((state) => state.sponsor.matchLoading)
  const sponsorId = useAppSelector((state) => state.authSponsor.sponsorProfile?.sponsorId)
  const dispatch = useAppDispatch()
  const addMatches = (data: SponsorMatch) => {
    dispatch(
      addCart({
        id: data.matchId,
        optionSponsor: data.optionSponsorMatch ?? 'MULTI_SPONSOR',
        date: data.date,
        sponsorAmount: 0,
        sponsorshipName: data.matchName ?? '',
        typeSponsor: 'MATCH'
      })
    )
  }

  const tournamentMatchList = useMemo(
    () =>
      tournamentMatchs.map((tournament) => {
        return {
          ...tournament,
          sponsorMatchs: tournament.sponsorMatchs?.map((match) => ({
            ...match,
            selected: list?.findIndex((item) => item.id === match.matchId && item.typeSponsor === 'MATCH') !== -1
          }))
        }
      }),
    [list, tournamentMatchs]
  )

  useEffect(() => {
    dispatch(getSponsorMatchThunk(null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MatchStyled>
      {matchLoading ? (
        <div className='p-relative' style={{ minHeight: 100 }}>
          <SiteLoading width={50} />
        </div>
      ) : (
        <CollapseComponent
          destroyInactivePanel
          // activeKey={activeKey}
          // onChange={(key) => {
          //   setActiveKey(key.slice(-1))
          // }}
        >
          {tournamentMatchList?.map((tournament, index) => (
            <Panel
              header={
                <Text700Styled id={`tournament-panel-${(index + 1).toString()}`} className='text-nowrap-1'>
                  {tournament.tournamentName}
                </Text700Styled>
              }
              key={(index + 1).toString()}
            >
              {tournament.sponsorMatchs?.map((item) => {
                const startTime = item.startDatetime ? dayjs(item.startDatetime) : undefined
                const endTime = item.endDatetime ? dayjs(item.endDatetime) : undefined
                const isSame = startTime?.startOf('D').isSame(endTime?.startOf('D'))
                const date = isSame
                  ? `${startTime?.format(dateTimeDayFormatJP ?? '')}${endTime ? `-${endTime?.format(timeFormat)}` : ''}`
                  : startTime || endTime
                  ? `${startTime && !endTime ? '開始 ' : ''}${startTime?.format(dateTimeDayFormatJP) ?? ''}${`${
                      startTime && endTime ? ' - ' : `${endTime ? `終了 ` : ''}`
                    }${endTime?.format(dateTimeDayFormatJP) ?? ''}`}`
                  : ''
                const isDisabled =
                  dayjs().isAfter(startTime?.subtract(1, 'm')) ||
                  (item.optionSponsorMatch === 'SINGLE_SPONSOR' && item.listSponsor?.length > 0
                    ? !item.listSponsor?.some((sponsor) => sponsor.sponsorId === sponsorId)
                    : false)

                return (
                  <Card
                    key={`match-card-${item.matchId}`}
                    id={`match-card-${item.matchId}`}
                    selected={item.selected}
                    fighter1Avatar={item.fighterAvatar1}
                    fighter2Avatar={item.fighterAvatar2}
                    fighter1Name={item.fighterKanjiName1}
                    fighter2Name={item.fighterKanjiName2}
                    content={item.content}
                    listSponsor={item.listSponsor}
                    date={date}
                    type={item.optionSponsorMatch ?? 'MULTI_SPONSOR'}
                    // name={tournament.tournamentName}
                    match
                    background={item.matchImageUrl}
                    disabled={isDisabled}
                    onClick={() => {
                      if (!item.selected) {
                        if (dayjs().isAfter(startTime?.subtract(1, 'm'))) {
                          showMessage({ error: 'この1分後は対戦カードが開催されますので、操作不可になります。' })
                        }
                        if (!isDisabled) {
                          addMatches({ ...item, date })
                        }
                      }
                    }}
                  />
                )
              })}
            </Panel>
          ))}
        </CollapseComponent>
      )}
    </MatchStyled>
  )
}

export default MatchList
