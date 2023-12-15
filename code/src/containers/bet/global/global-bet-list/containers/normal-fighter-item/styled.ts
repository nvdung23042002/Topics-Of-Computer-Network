import styled from 'styled-components'

export const TournamentsFighterStyled = styled.div<{
  isActiveBet: any
  isTournamentStoppedBet: any
  isTypeTournament: any
}>`
  width: 241px;

  @media screen and (max-width: 575px) {
    width: 168px;
  }

  border: 1px solid
    ${({ theme, isActiveBet, isTournamentStoppedBet, isTypeTournament }: any) =>
      isTypeTournament
        ? String(isActiveBet) === 'true'
          ? String(isTournamentStoppedBet) === 'true'
            ? theme.token.colorPrimary
            : theme.token.colorBorder2th
          : theme.token.colorPrimary
        : theme.token.colorBorder2th};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  overflow: hidden;

  .fighter-info {
    padding: 0 12px 12px 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .fighter-name {
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-style: italic;
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;

    @media screen and (max-width: 1199px) {
      font-size: 14px;
      line-height: normal;
    }
  }

  .odds {
    width: 102px;
    padding: 7px;
    height: auto;
    border: 1px solid ${({ theme }: any) => theme.token.colorBorder2th};
    text-align: center;
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

export const TournamentsFighterImgStyled = styled.div`
  width: 140px;
  height: 168px;
`

export const TournamentsFighterImgWrapperStyled = styled.div`
  background-color: #141414;
  width: 100%;
  display: flex;
  justify-content: center;
`
