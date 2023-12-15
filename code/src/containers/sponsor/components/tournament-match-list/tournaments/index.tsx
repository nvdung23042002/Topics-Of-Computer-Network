import { TournamentStyled } from './styled'
import Card from '../../card'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { addCart } from '@/redux/sponsor/slice'
import { SponsorTournament } from '@/services/dto/sponsor'
import { useEffect, useMemo } from 'react'
import dayjs from '@/utils/dayjs'
import { getSponsorTournamentThunk } from '@/redux/sponsor/thunk'
import { dateTimeDayFormatJP, timeFormat } from '@/constants/format'
import SiteLoading from '@/components/site-loading'
import showMessage from '@/utils/showMessage'

const TournamentList = () => {
  const list = useAppSelector((state) => state.sponsor?.cart.list)
  const tournaments = useAppSelector((state) => state.sponsor.tournamentList)
  const tournamentLoading = useAppSelector((state) => state.sponsor.tournamentLoading)
  const sponsorId = useAppSelector((state) => state.authSponsor.sponsorProfile?.sponsorId)
  const dispatch = useAppDispatch()

  const addTournament = (data: SponsorTournament) => {
    dispatch(
      addCart({
        id: data.tournamentId,
        optionSponsor: data.optionSponsorTournament ?? 'MULTI_SPONSOR',
        date: data.date,
        sponsorAmount: 0,
        sponsorshipName: data.tournamentName ?? '',
        typeSponsor: 'TOURNAMENT'
      })
    )
  }

  const tournamentList = useMemo(
    () =>
      tournaments.map((tournament) => {
        return {
          ...tournament,
          selected:
            list?.findIndex((item) => item.id === tournament.tournamentId && item.typeSponsor === 'TOURNAMENT') !== -1
        }
      }),
    [list, tournaments]
  )

  useEffect(() => {
    dispatch(getSponsorTournamentThunk(null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TournamentStyled>
      {tournamentLoading ? (
        <div className='p-relative' style={{ minHeight: 100 }}>
          <SiteLoading width={50} />
        </div>
      ) : (
        tournamentList?.map((item) => {
          const startTime = dayjs(item.startDatetime)
          const endTime = item.endDatetime ? dayjs(item.endDatetime) : undefined
          const isSame = startTime.startOf('D').isSame(endTime?.startOf('D'))
          const date = isSame
            ? `${startTime.format(dateTimeDayFormatJP)}${endTime ? `-${endTime?.format(timeFormat)}` : ''}`
            : `${endTime ? '' : '開始 '}${startTime.format(dateTimeDayFormatJP)}${
                endTime ? ` - ${endTime?.format(dateTimeDayFormatJP)}` : ''
              }`
          const isDisabled =
            dayjs().isAfter(startTime.subtract(1, 'm')) ||
            (item.optionSponsorTournament === 'SINGLE_SPONSOR' && item.listSponsor?.length > 0
              ? !item.listSponsor?.some((sponsor) => sponsor.sponsorId === sponsorId)
              : false)
          return (
            <Card
              id={`tournament-card-${item.tournamentId}`}
              key={`tournament-card-${item.tournamentId}`}
              selected={item.selected}
              content={item.content}
              name={item.tournamentName}
              date={date}
              type={item.optionSponsorTournament ?? 'MULTI_SPONSOR'}
              listSponsor={item.listSponsor}
              background={item.tournamentImageUrl}
              onClick={() => {
                if (!item.selected) {
                  if (dayjs().isAfter(startTime.subtract(1, 'm'))) {
                    showMessage({ error: 'この1分後は大会が開催されますので、操作不可になります。' })
                  }
                  if (!isDisabled) {
                    addTournament({ ...item, date })
                  }
                }
              }}
              disabled={isDisabled}
            />
          )
        })
      )}
    </TournamentStyled>
  )
}

export default TournamentList
