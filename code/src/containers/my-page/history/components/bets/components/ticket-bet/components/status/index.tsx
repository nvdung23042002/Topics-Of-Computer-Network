import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

type Props = {
  status: 'PENDING' | 'WIN' | 'LOSE' | 'NEW' | 'PROGRESS' | 'CANCELLED' | 'FREE_BET'
}
const StatusTicketStyled = styled.div`
  padding: 4px 10px;
  padding-right: 9px;
  border-radius: 999px;
  color: #fff;
  width: fit-content;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`

const StatusTicket = ({ status }: Props) => {
  const { t } = useTranslation('history')
  const statusEnum = {
    PENDING: <StatusTicketStyled style={{ backgroundColor: '#1C6FEC' }}>{t(status)}</StatusTicketStyled>,
    WIN: <StatusTicketStyled style={{ backgroundColor: '#1C6FEC' }}>{t(status)}</StatusTicketStyled>,
    LOSE: <StatusTicketStyled style={{ backgroundColor: '#DE1D43' }}>{t(status)}</StatusTicketStyled>,
    NEW: <StatusTicketStyled style={{ backgroundColor: '#1C6FEC' }}>{t(status)}</StatusTicketStyled>,
    PROGRESS: <StatusTicketStyled style={{ backgroundColor: '#1C6FEC' }}>{t(status)}</StatusTicketStyled>,
    CANCELLED: <StatusTicketStyled style={{ backgroundColor: '#FFA928' }}>{t(status)}</StatusTicketStyled>,
    FREE_BET: <StatusTicketStyled style={{ backgroundColor: '#4D8CFF' }}>{t(status)}</StatusTicketStyled>
  }
  return statusEnum[status]
}

export default StatusTicket
