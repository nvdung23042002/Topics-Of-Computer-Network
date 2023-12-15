import styled from 'styled-components'

export const BetFreeStyled = styled.div`
  position: absolute;
  top: 9px;
  left: 8px;
  color: #fff;
  background-color: #4d8cff;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 2px 7px;
  height: auto;
  border-radius: 3px;
`

export const MatchItemWrapperStyled = styled.div`
  margin-top: 12px;

  @media screen and (max-width: 1199px) {
    margin-top: 4px;
  }

  .sponsor-bet {
    margin-bottom: 14px;
  }
`

export const MatchItemStyled = styled.div<{
  isActiveBet: any
  isBetFree: any
  isMatchStoppedFreeBet: any
  isMatchStoppedBet: any
}>`
  position: relative;
  border: 1px solid
    ${({ theme, isActiveBet, isBetFree, isMatchStoppedFreeBet, isMatchStoppedBet }: any) =>
      String(isActiveBet) === 'true'
        ? (
            String(isBetFree) === 'true'
              ? String(isMatchStoppedFreeBet) === 'true'
              : String(isMatchStoppedBet) === 'true'
          )
          ? theme.token.colorPrimary
          : theme.token.colorBorder2th
        : theme.token.colorPrimary};
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 8px;
  width: 100%;
  height: 268px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: 303px;
  }
`

export const MatchNameStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 11px 10px;
  border-radius: 5px;
  background: #f1f6ff;
  margin-bottom: 8px;

  .bet-count {
    white-space: nowrap;
  }

  & > div {
    width: fit-content;
    word-break: break-all;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
`

export const MatchFighterImgStyled = styled.div`
  position: relative;
  width: 140px;
  height: 210px;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  @media screen and (max-width: 767px) {
    width: 82px;
    height: 136px;
  }
`

export const MatchContentStyled = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const MatchInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .start-time {
    font-size: 14px;
    line-height: 20.27px;
    display: flex;
    align-items: center;
    gap: 3px;
    margin-bottom: 16px;

    @media screen and (max-width: 767px) {
      font-size: 12px;
      line-height: normal;
    }
  }

  .sponsor-money {
    font-size: 14px;
    line-height: 20.27px;

    @media screen and (max-width: 767px) {
      font-size: 12px;
      line-height: normal;
    }
  }

  .player-qty {
    font-size: 14px;
    line-height: 20.27px;
    margin-bottom: 8px;

    @media screen and (max-width: 767px) {
      margin-bottom: 0;
      font-size: 12px;
      line-height: normal;
    }
  }

  .odds {
    min-width: 102px;
    background-color: red;
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tickets-left-and-date {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 767px) {
    .max-tickets {
      font-size: 12px;
      line-height: normal;
    }
  }
`

export const MatchFighterInfoStyled = styled.div<{ isTypeBet1X2: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: ${({ isTypeBet1X2 }: any) => (isTypeBet1X2 ? 'flex-end' : 'flex-start')};
  justify-content: space-between;

  .fighter-vs {
    font-size: 45px;
    line-height: 61px;
    font-style: italic;
    text-transform: uppercase;
  }

  .bet-type {
    font-size: 16px;
    line-height: 25px;
  }
`

export const MatchTicketsCountStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 767px) {
    gap: 4px;
  }

  & > * {
    font-size: 12px;
    line-height: 17px;
  }
`

export const MatchFighterStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .bet-type {
    font-size: 16px;
    line-height: 25px;
  }

  .fighter-name {
    width: 102px;
    font-size: 18px;
    line-height: 25px;
    text-transform: uppercase;
    font-style: italic;
    text-align: center;
  }

  .odds {
    width: 102px;
    padding: 7px;
    height: auto;
    text-align: center;
    border: 1px solid ${({ theme }: any) => theme.token.colorBorder4th};
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (min-width: 1200px) {
      &:hover {
        background-color: #ffeeee;
        border-color: transparent;
      }
    }
  }

  .odds.active {
    background-color: ${({ theme }: any) => theme.token.colorPrimary};
    color: ${({ theme }: any) => theme.token.colorText2th};
    border-color: transparent;
  }

  .odds.disable {
    cursor: default !important;
    background-color: #e5e3e3;
    opacity: 0.5;
  }
`

export const MatchFighterDrawStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .tickets-bet-draw {
    font-size: 12px;
    line-height: 17.38px;
    margin-bottom: 3px;
  }

  .bet-type-draw {
    font-size: 16px;
    margin-bottom: 4px;

    @media screen and (max-width: 767px) {
      font-size: 12px;
      line-height: normal;
    }
  }

  .odds {
    width: 102px;
    padding: 7px;
    height: auto;
    text-align: center;
    border: 1px solid ${({ theme }: any) => theme.token.colorBorder4th};
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (min-width: 1200px) {
      &:hover {
        background-color: #ffeeee;
        border-color: transparent;
      }
    }
  }

  .odds.active {
    background-color: ${({ theme }: any) => theme.token.colorPrimary};
    color: ${({ theme }: any) => theme.token.colorText2th};
    border-color: transparent;
  }

  .odds.disable {
    cursor: default !important;
    background-color: #e5e3e3;
    opacity: 0.5;
  }
`

export const MatchFighterInfoWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .chart-desc {
    font-size: 12px;
    line-height: normal;
  }
`

export const MatchTicketsCountWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2px;

  .tickets-bet-draw {
    font-size: 12px;
    line-height: 17.38px;
    margin-bottom: 3px;
  }
`

// mobile

export const MatchMobileContentStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`
export const MobileContentTopStyled = styled.div``
export const MobileContentBottomStyled = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .odds {
    width: 70px;
    padding: 7px;
    height: auto;
    text-align: center;
    border: 1px solid ${({ theme }: any) => theme.token.colorBorder4th};
    font-size: 12px;
    line-height: normal;
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media screen and (min-width: 1200px) {
      &:hover {
        background-color: #ffeeee;
        border-color: transparent;
      }
    }
  }

  .odds.active {
    background-color: ${({ theme }: any) => theme.token.colorPrimary};
    color: ${({ theme }: any) => theme.token.colorText2th};
    border-color: transparent;
  }

  .odds.disable {
    cursor: default !important;
    background-color: #e5e3e3;
    opacity: 0.5;
  }
`
export const MobileFirstFighterStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .fighter-name {
    width: 70px;
    text-align: center;
    font-size: 14px;
    line-height: normal;
    text-transform: uppercase;
    font-style: italic;
  }
`

export const ProgressWrapperMobileStyled = styled.div`
  height: 100%;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .progress {
    margin-bottom: 4px;
  }

  .tickets-bet-draw {
    font-size: 12px;
    line-height: normal;
    text-align: center;
  }

  .empty-win-lost {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    .winner {
      font-size: 12px;
      line-height: normal;
    }

    .empty {
      width: 70px;
      height: 33px;
    }
  }

  .chart-desc {
    font-size: 12px;
    line-height: normal;
    margin-bottom: 10px;
  }
`

export const MobileSecondFighterStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: end;

  .fighter-name {
    width: 70px;
    text-align: center;
    font-size: 14px;
    line-height: normal;
    text-transform: uppercase;
    font-style: italic;
  }
`
