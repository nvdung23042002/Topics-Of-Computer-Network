import { Text11th900Styled, Text400Styled, Text700Styled } from '@/components/styled'
import SponsorBronze from '@/containers/bet/components/sponsor-item/sponsor-bronze'
import SponsorGold from '@/containers/bet/components/sponsor-item/sponsor-gold'
import SponsorPlatium from '@/containers/bet/components/sponsor-item/sponsor-platium'
import SponsorSilver from '@/containers/bet/components/sponsor-item/sponsor-silver'
import { useWindowSize } from '@/hooks/useWindowResize'
import { Divider } from 'antd'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useEffect, useState } from 'react'
import StartTournamentCountdown from './StartTournamentCountdown'
import {
  RowListSponsorStyled,
  RowSponsorStyled,
  SponsorBetInfoItemStyled,
  SponsorBetInfoStyled,
  SponsorBetStyled,
  SponsorTotalMoneyStyled
} from './styled'
import { FIREBASE } from '@/constants/firebase'
import { FireStoreService } from '@/services/FireStore.service'
import _cloneDeep from 'lodash/cloneDeep'

type Props = {
  listSponsorshipRank: any
  startDateTime: any
  betId: any
  collectionName: string
  namePage: 'TOURNAMENT' | 'MATCH' | 'MATCH_DETAIL'
  optionSponsor?: string
  isShowDivider?: boolean
  totalTicketsBetedExternal?: number | undefined
  templateSponsorDTOS?: any
}

const SponsorBet: React.FC<Props> = ({
  listSponsorshipRank,
  startDateTime,
  betId,
  namePage,
  optionSponsor,
  collectionName,
  isShowDivider = true,
  totalTicketsBetedExternal,
  templateSponsorDTOS
}) => {
  const { t } = useTranslation(['common', 'bet-list'])
  const [listSponsor, setListSponsor] = useState<any[]>([...listSponsorshipRank])
  const [totalTicketsBeted, setTotalTicketsBeted] = useState<number>(0)
  const [totalMaxTickets, setTotalMaxTickets] = useState<number>(0)
  const totalSponsorMoney = listSponsor?.reduce((accumulator: any, current: any) => accumulator + current.fund, 0)
  const isMatchDetail = namePage === 'MATCH_DETAIL'
  const { width } = useWindowSize()
  const isMaxWidth767 = width <= 767
  const isMaxWidth1199 = width <= 1199

  useEffect(() => {
    let timeOutSponsor: any

    if (collectionName === FIREBASE.MATCH_ID) {
      timeOutSponsor = FireStoreService.getInstance().listentimeOutSponsor(collectionName, betId, (snapshot) => {
        const data = snapshot.data()
        const { sponsor, match } = data || {}
        const maxTickets = match?.[0]?.maxTicket
        const cloneSponsorTournament = _cloneDeep(listSponsor)

        const sponsorArr = cloneSponsorTournament
          ?.map((item: any) => {
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
          ?.filter((sponsor: any) => sponsor.rank)

        setListSponsor(sponsorArr || [])
        setTotalMaxTickets(Number(maxTickets))
      })
    } else {
      timeOutSponsor = FireStoreService.getInstance().listentimeOutSponsor(collectionName, betId, (snapshot) => {
        const data = snapshot.data()
        const { sponsor, totalTicket } = data || {}
        const cloneSponsorTournament = _cloneDeep(listSponsor)

        const sponsorArr = cloneSponsorTournament
          ?.map((item: any) => {
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
          ?.filter((sponsor: any) => sponsor.rank)

        setListSponsor(sponsorArr || [])
        setTotalMaxTickets(Number(totalTicket))
      })
    }

    return () => {
      timeOutSponsor()
    }
  }, [])

  useEffect(() => {
    let timeOutTotalTicketsBetedFighter: any
    if (collectionName === FIREBASE.MATCH_ID) {
      setTotalTicketsBeted(totalTicketsBetedExternal || 0)
    } else {
      timeOutTotalTicketsBetedFighter = FireStoreService.getInstance().listentimeOutTicketsBetedFighterOfTournament(
        betId,
        (snapshot) => {
          const data = snapshot.data().data || []
          const totalTicketsBeted =
            data?.reduce((accumulator: any, current: any) => accumulator + current.sumTicket, 0) || 0
          setTotalTicketsBeted(totalTicketsBeted)
        }
      )
    }

    return () => {
      if (collectionName !== FIREBASE.MATCH_ID) {
        timeOutTotalTicketsBetedFighter()
      }
    }
  }, [totalTicketsBetedExternal])

  const Row = useCallback(({ items, itemSize }: any) => {
    return (
      <RowSponsorStyled>
        {items?.map((item: any, index: any) => {
          const templateData = templateSponsorDTOS?.find(
            (tp: any) => Number(tp?.id) === Number(item?.sponsorHomepageId)
          )

          return (
            <div className='sponsor-item' key={index} style={{ flex: itemSize }}>
              {renderSponsor(itemSize, item?.rank, item, templateData)}
            </div>
          )
        })}
      </RowSponsorStyled>
    )
  }, [])

  const renderSizeSponsor = useCallback(
    (listSponsor: any) => {
      const listSponsorSort = listSponsor?.sort((a: any, b: any) => {
        const priority = ['GOLD', 'SILVER', 'BRONZE']
        if (a?.rank !== b?.rank) {
          return priority.indexOf(a?.rank) - priority.indexOf(b?.rank)
        } else {
          return b?.fund - a?.fund
        }
      })

      const itemsPerRow = 3

      const getItemSize = (numItemsInRow: any) => {
        switch (numItemsInRow) {
          case 1:
            return 3
          case 2:
            return 2
          default:
            return 1
        }
      }

      const rows: any = []

      if (!(namePage === 'MATCH_DETAIL')) {
        if (isMaxWidth1199) {
          for (let i = 0; i < listSponsorSort.length; i++) {
            const rowItems = [listSponsorSort[i]]
            const itemSize = isMaxWidth767 ? 1 : getItemSize(rowItems.length)
            rows.push(<Row key={i} items={rowItems} itemSize={itemSize} />)
          }
        } else {
          for (let i = 0; i < listSponsorSort.length; i += itemsPerRow) {
            const rowItems = listSponsorSort.slice(i, i + itemsPerRow)
            const itemSize = getItemSize(rowItems.length)
            rows.push(<Row key={i} items={rowItems} itemSize={itemSize} />)
          }
        }
      } else {
        for (let i = 0; i < listSponsorSort.length; i++) {
          const rowItems = [listSponsorSort[i]]
          const itemSize = isMaxWidth767 ? 1 : getItemSize(rowItems.length)
          rows.push(<Row key={i} items={rowItems} itemSize={itemSize} />)
        }
      }

      return <RowListSponsorStyled isMatchDetail={isMatchDetail}>{rows}</RowListSponsorStyled>
    },
    [isMaxWidth767, isMaxWidth1199, namePage]
  )

  const renderSponsor = useCallback((itemSize: any, rankSponsor: string, item: any, templateData: any) => {
    const sponsors = {
      GOLD: <SponsorGold sponsor={item} itemSize={itemSize} templateData={templateData} />,
      SILVER: <SponsorSilver sponsor={item} itemSize={itemSize} templateData={templateData} />,
      PLATINUM: <SponsorPlatium sponsor={item} itemSize={itemSize} templateData={templateData} />,
      BRONZE: <SponsorBronze sponsor={item} itemSize={itemSize} templateData={templateData} />
    }

    return sponsors[rankSponsor]
  }, [])

  const totalTicketsLeft = (totalMaxTickets: number, totalTicketsBeted: number) => {
    return Number(totalMaxTickets) - Number(totalTicketsBeted)
  }

  const renderSponsorTotalMoney = () => {
    if (
      namePage === 'TOURNAMENT' ||
      namePage === 'MATCH' ||
      (namePage === 'MATCH_DETAIL' && !(optionSponsor === 'SINGLE_SPONSOR'))
    ) {
      return (
        <SponsorTotalMoneyStyled>
          <Text11th900Styled className='sponsor-money'>
            {totalSponsorMoney?.toLocaleString('en-US')} {t('CIRCLE')}
          </Text11th900Styled>
          <Text400Styled className='sponsor-desc'>
            {t('TOTAL_SPONSORSHIP', {
              ns: 'bet-list'
            })}
          </Text400Styled>
        </SponsorTotalMoneyStyled>
      )
    } else {
      return null
    }
  }

  return (
    <SponsorBetStyled>
      {renderSizeSponsor(listSponsor)}
      {renderSponsorTotalMoney()}
      <SponsorBetInfoStyled>
        <SponsorBetInfoItemStyled>
          <Text400Styled>{t('VOTES')}:</Text400Styled>
          <Text700Styled>{totalTicketsBeted?.toLocaleString('en-US')}</Text700Styled>
        </SponsorBetInfoItemStyled>
        <SponsorBetInfoItemStyled>
          <Text400Styled>{t('MAX_VOTE')}:</Text400Styled>
          <Text700Styled>{totalMaxTickets?.toLocaleString('en-US')}</Text700Styled>
        </SponsorBetInfoItemStyled>
        <SponsorBetInfoItemStyled>
          <Text400Styled>{t('NUMBER_VOTE_LEFT')}:</Text400Styled>
          <Text700Styled>{totalTicketsLeft(totalMaxTickets, totalTicketsBeted)?.toLocaleString('en-US')}</Text700Styled>
        </SponsorBetInfoItemStyled>
        {!isMatchDetail && startDateTime && (
          <SponsorBetInfoItemStyled>
            <Text400Styled>{t('TIME_TO_GAME')}:</Text400Styled>
            <StartTournamentCountdown startDateTime={startDateTime} />
          </SponsorBetInfoItemStyled>
        )}
      </SponsorBetInfoStyled>
      {isShowDivider && <Divider />}
    </SponsorBetStyled>
  )
}

export default SponsorBet
