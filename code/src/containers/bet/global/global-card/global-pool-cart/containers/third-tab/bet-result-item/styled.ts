import styled from 'styled-components'

export const BetResultItemStyled = styled.div<{ isBetWin: any; isBetCancel: any }>`
  padding: 15px 18px;
  border: 2px solid
    ${({ isBetWin, theme, isBetCancel }) =>
      String(isBetCancel) === 'true'
        ? '#FFA928'
        : String(isBetWin) === 'true'
        ? theme.token.colorSecondary
        : theme.token.colorPrimary};
  background-color: ${({ theme, isBetWin, isBetCancel }: any) =>
    String(isBetCancel) === 'true'
      ? '#F9FCEA'
      : String(isBetWin) === 'true'
      ? theme.token.colorBg9th
      : theme.token.colorBg10th};
  border-radius: 10px;
  position: relative;

  @media screen and (max-width: 1199px) {
    padding: 15px 18px 15px 8px;
  }

  .bet-id {
    margin-bottom: 8px;
  }
`

export const BetResultMatchNameStyled = styled.div`
  margin-bottom: 8px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 6px;
  }

  & > div {
    width: fit-content;
    word-break: break-all;
  }
`

export const BetResultOddsResultStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 4px;
  white-space: nowrap;
  @media screen and (max-width: 1199px) {
    margin-bottom: 6px;
  }

  .odds {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

export const BetResultStatusStyled = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 3px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 6px;
  }

  .chosen-one {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`

export const BetResultStyled = styled.div`
  display: flex;
  align-items: center;
`

export const BetCancelStyled = styled.div`
  width: fit-content;
  color: #fff;
  background-color: #ffa928;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 2px 15px;
  height: auto;
  border-radius: 3px;
  margin-bottom: 8px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 6px;
  }
`

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
  margin-bottom: 8px;
`
