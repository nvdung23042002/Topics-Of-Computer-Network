import { Text400Styled, Text700Styled, TextPrimary500Styled } from '@/components/styled'
import { dateTimeReverseFormat } from '@/constants/format'
import dayjs from '@/utils/dayjs'
import { useTranslation } from 'next-i18next'
import React from 'react'
import {
  BetFreeStyled,
  BetPaidItemStyled,
  FighterBetedPaidStyled,
  MatchPaidStyled,
  TicketsBetedPaidStyled
} from './styled'
import { BET_FREE_STATUS } from '@/constants/common'
import { Tooltip } from 'antd'

type Props = {
  item: any
}

const BetPaidItem: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation(['common', 'bet-list', 'cart'])
  const { chosenOne, startDate, ticketQuantity, betUserId, typeBet, matchName, freeBet } = item || {}
  const isFreeBet = freeBet === BET_FREE_STATUS.ON

  const renderTypeBet = (type: string) => {
    const TYPE_BET = {
      X2: '1x2',
      WINNER: 'Winner',
      CHAMPION: 'Champion'
    }

    return TYPE_BET[type]
  }

  return (
    <BetPaidItemStyled>
      {isFreeBet && (
        <BetFreeStyled>
          {t('BET_FREE', {
            ns: 'cart'
          })}
        </BetFreeStyled>
      )}
      <Text700Styled className='bet-id'>
        {t('BET_ID', {
          ns: 'cart'
        })}
        ：{betUserId}
      </Text700Styled>
      {startDate && <Text400Styled>{dayjs(startDate).format(dateTimeReverseFormat)}</Text400Styled>}
      <MatchPaidStyled>
        <Tooltip title={matchName}>
          <Text400Styled className='text-nowrap-1'>{matchName}</Text400Styled>
        </Tooltip>
      </MatchPaidStyled>
      <FighterBetedPaidStyled>
        <Tooltip title={`${renderTypeBet(typeBet)} - ${chosenOne}`}>
          <TextPrimary500Styled className='text-nowrap-1'>
            {renderTypeBet(typeBet)} - {chosenOne}
          </TextPrimary500Styled>
        </Tooltip>
      </FighterBetedPaidStyled>
      <TicketsBetedPaidStyled>
        <span>
          {t('TICKETS', {
            ns: 'cart'
          })}
          ：
        </span>
        <Text700Styled>
          {ticketQuantity?.toLocaleString('en-US')}
          {t('NUMBER_TICKETS')}
        </Text700Styled>
      </TicketsBetedPaidStyled>
    </BetPaidItemStyled>
  )
}

export default BetPaidItem
