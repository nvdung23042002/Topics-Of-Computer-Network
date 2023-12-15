import styled from 'styled-components'

export const SponsorTotalMoneyStyled = styled.div`
  margin-top: 14px;
  text-align: center;

  .sponsor-money {
    font-size: 30px;
    line-height: 43.44px;

    @media screen and (max-width: 767px) {
      font-size: 24px;
      line-height: normal;
    }
  }

  .sponsor-desc {
    font-size: 16px;
    line-height: 23.17px;

    @media screen and (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
    }
  }
`

export const SponsorBetInfoStyled = styled.div`
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 6px;
  }
`

export const SponsorBetInfoItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`

export const SponsorBetStyled = styled.div``

export const RowSponsorStyled = styled.div`
  display: flex;
  gap: 20px;

  .sponsor-item {
    display: flex;
    justify-content: center;
  }
`

export const RowListSponsorStyled = styled.div<{ isMatchDetail: any }>`
  display: flex;
  flex-direction: column;
  gap: ${({ isMatchDetail }: any) => (String(isMatchDetail) === 'true' ? '5px' : '20px')};

  @media screen and (max-width: 1199px) {
    gap: 5px;
  }
`
