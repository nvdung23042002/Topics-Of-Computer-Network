import styled from 'styled-components'

export const BetFreeStyled = styled.div`
  width: fit-content;
  color: #fff;
  background-color: #4d8cff;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 2px 7px;
  height: auto;
  border-radius: 3px;
  margin-bottom: 15px;
`

export const BetPaidItemStyled = styled.div`
  padding: 15px 18px;
  border: 1px solid ${(props: any) => props.theme.token.colorBorder3th};
  background-color: ${(props: any) => props.theme.token.colorBgLayout};
  border-radius: 10px;
  position: relative;

  @media screen and (max-width: 1199px) {
    padding: 15px 18px 15px 8px;
  }

  .bet-id {
    margin-bottom: 8px;
  }
`

export const MatchPaidStyled = styled.div`
  margin-bottom: 8px;

  & > div {
    width: fit-content;
    word-break: break-all;
  }

  @media screen and (max-width: 1199px) {
    margin-bottom: 6px;
  }
`

export const FighterBetedPaidStyled = styled.div`
  margin-bottom: 8px;

  & > div {
    width: fit-content;
  }

  @media screen and (max-width: 1199px) {
    margin-bottom: 6px;
  }

  & > * {
    font-size: 16px;
  }
`

export const OddBetedPaidStyled = styled.div`
  display: flex;
  align-items: center;
`

export const TicketsBetedPaidStyled = styled.div`
  display: flex;
  align-items: center;
`

export const TicketsCountPaidStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 7px;

  .ant-input-affix-wrapper {
    height: 38px;
    border-radius: 2px;
  }

  .ant-form-item {
    margin: 0;
    width: 100%;
  }
`

export const RefundPaidStyled = styled.div`
  display: flex;
  align-items: center;
`
