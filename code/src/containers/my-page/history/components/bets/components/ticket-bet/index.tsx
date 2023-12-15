import React from 'react'
import { BottomContent, ContainerTicketBet, DividerStyled, RateStyled, TopContent } from './styled'
import StatusTicket from './components/status'
import { IBetResult } from '@/services/dto/history'
import dayjs from '@/utils/dayjs'
import BigNumber, { BNToFormat } from '@/utils/bigNumber'
import { useTranslation } from 'next-i18next'
import { TYPE_BET } from '../../constants'
import { dateTimeReverseLineFormat } from '@/constants/format'
import Typography from '@/components/common/typography'
type TicketBetProps = IBetResult & {
  tab: 'CURRENTLY_BETTING' | 'FINISHED_BET'
}
const TicketBet = (props: TicketBetProps) => {
  const formatOdds = (odds: number) => {
    const oddsNumber = BigNumber(odds ?? 0)
    const decimalPart = oddsNumber.decimalPlaces(2)
    return BNToFormat(decimalPart)
  }
  const { t } = useTranslation('history')
  return (
    <ContainerTicketBet>
      <TopContent>
        <div>
          <Typography.Text className='match-name' title={props.matchName}>
            {props.matchName}
          </Typography.Text>
          <div className='date-time'>{dayjs(props.betDateTime).format(dateTimeReverseLineFormat)} </div>
        </div>
        <div>
          <div className='name-winner'>
            <span className='label' title={t(TYPE_BET[props.typeBet] ?? '') as string}>
              {t(TYPE_BET[props.typeBet] ?? '')}
            </span>
            <span> - </span>
            <span className='name' title={props.chosenOne}>
              {props.chosenOne}
            </span>
          </div>
          <RateStyled>{formatOdds(props.odds)}</RateStyled>
        </div>
      </TopContent>
      <DividerStyled />
      <BottomContent>
        <div>
          <div className='table-info-ticket'>
            <div className='item'>
              <div className='label'>{t('ODDS')}</div>
              <div className='value' style={{ textAlign: 'left' }} title={formatOdds(props.oddsExpected)}>
                {formatOdds(props.oddsExpected)}
              </div>
            </div>
            <div className='item'>
              <div className='label'>{t('NUMBER_OF_BETS')}</div>
              <div className='value'>
                {BNToFormat(props.ticketQuantity)}
                {t('TICKET', { ns: 'common' })}
              </div>
            </div>
            <div className='item'>
              <div className='label'>{t('REFUND_AMOUNT')}</div>
              <div
                className='value'
                style={{
                  textAlign: `${props.tab === 'CURRENTLY_BETTING' || props.actualAmount === null ? 'start' : 'end'}`
                }}
              >
                {props.tab === 'CURRENTLY_BETTING' || props.actualAmount === null
                  ? `-${t('YEN', { ns: 'common' })}`
                  : `${BNToFormat(props.actualAmount)} ${t('YEN', { ns: 'common' })}`}
              </div>
            </div>
          </div>
          {/* <DescriptionsStyled column={3} layout='vertical'>
            <Descriptions.Item label='オッズ'>{Number(props?.oddsExpected ?? 0).toPrecision(2)}</Descriptions.Item>
            <Descriptions.Item label='ベット数'>{BNToFormat(props.ticketQuantity)}</Descriptions.Item>
            <Descriptions.Item label='支払い戻し金額'>{BNToFormat(props.expectedAmount)} 円</Descriptions.Item>
          </DescriptionsStyled> */}
        </div>
        <div>
          <StatusTicket
            status={props.freeBet == 'ON' && props.tab == 'FINISHED_BET' ? 'FREE_BET' : (props.betStatus as any)}
          />
        </div>
      </BottomContent>
    </ContainerTicketBet>
  )
}

export default TicketBet
