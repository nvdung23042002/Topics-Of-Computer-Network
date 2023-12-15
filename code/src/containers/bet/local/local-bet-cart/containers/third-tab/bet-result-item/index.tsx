import {
  Text11th400Styled,
  Text11th700Styled,
  Text400Styled,
  Text700Styled,
  TextPrimary700Styled
} from '@/components/styled'
import { BET_FREE_STATUS } from '@/constants/common'
import { useAppSelector } from '@/hooks/store'
import { selectAuth } from '@/redux/auth/slice'
import { Tooltip } from 'antd'
import { useTranslation } from 'next-i18next'
import React from 'react'
import {
  BetCancelStyled,
  BetFreeStyled,
  BetResultItemStyled,
  BetResultMatchNameStyled,
  BetResultOddsResultStyled,
  BetResultStatusStyled,
  BetResultStyled
} from './styled'

type Props = {
  item: any
}

const BetResultItem: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation(['common', 'bet-list', 'cart'])
  const { rate } = useAppSelector(selectAuth)
  const priceRateJPY = Number(rate?.TICKET_TO_JPY)
  const { chosenOne, odds, betStatus, ticketQuantity, betUserId, matchName, freeBet } = item || {}
  const isBetWin = betStatus === 'WIN'
  const isBetCancel = betStatus === 'CANCELLED'
  const isFreeBet = freeBet === BET_FREE_STATUS.ON

  return (
    <BetResultItemStyled isBetWin={isBetWin} isBetCancel={isBetCancel}>
      {!isBetCancel && isFreeBet && (
        <BetFreeStyled>
          {t('BET_FREE', {
            ns: 'cart'
          })}
        </BetFreeStyled>
      )}
      {isBetCancel && (
        <BetCancelStyled>
          {t('CANCEL', {
            ns: 'cart'
          })}
        </BetCancelStyled>
      )}
      <Text700Styled className='bet-id'>
        {t('BET_ID', {
          ns: 'cart'
        })}
        ：{betUserId}
      </Text700Styled>
      <BetResultMatchNameStyled>
        <Tooltip title={matchName}>
          <Text400Styled className='text-nowrap-1'>{matchName}</Text400Styled>
        </Tooltip>
      </BetResultMatchNameStyled>
      {!isBetCancel && (
        <>
          <BetResultStatusStyled>
            <Text400Styled>
              {t('TEAM_WIN', {
                ns: 'cart'
              })}
              :
            </Text400Styled>
            <Tooltip title={chosenOne}>
              <Text700Styled className='chosen-one'>{chosenOne}</Text700Styled>
            </Tooltip>
          </BetResultStatusStyled>
          <BetResultOddsResultStyled>
            <div>
              {t('ODDS', {
                ns: 'cart'
              })}
              ：
            </div>
            <Tooltip title={odds?.toLocaleString('en-US')}>
              <Text700Styled className='odds'>{odds?.toLocaleString('en-US')}</Text700Styled>
            </Tooltip>
          </BetResultOddsResultStyled>
          {isBetWin ? (
            <BetResultStyled>
              <Text11th700Styled>
                WIN：{(ticketQuantity * odds * Number(priceRateJPY))?.toLocaleString('en-US')}
                {t('CIRCLE')}
              </Text11th700Styled>
              <Text11th400Styled>
                （
                {t('NUMBER_OF_BETS', {
                  ns: 'cart'
                })}
                ：{ticketQuantity?.toLocaleString('en-US')}
                {t('NUMBER', {
                  ns: 'cart'
                })}
                ）
              </Text11th400Styled>
            </BetResultStyled>
          ) : (
            <BetResultStyled>
              <TextPrimary700Styled>
                LOST：{ticketQuantity?.toLocaleString('en-US')}
                {t('NUMBER', {
                  ns: 'cart'
                })}
              </TextPrimary700Styled>
            </BetResultStyled>
          )}
        </>
      )}
    </BetResultItemStyled>
  )
}

export default BetResultItem
