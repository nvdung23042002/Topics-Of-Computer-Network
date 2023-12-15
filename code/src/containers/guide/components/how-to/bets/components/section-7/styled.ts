import styled from 'styled-components'

export const SectionStyled = styled.div`
  width: 100%;
`

export const TitleStyled = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  padding: 9px 0px;
  background: #de1d43;
  color: #fff;

  margin-bottom: 35px;
`

export const WrapSponsorPartialStyled = styled.div`
  .item {
    &:first-child {
      margin-top: 36px;
    }

    margin-top: 60px;
  }

  @media screen and (max-width: 575px) {
    .item {
      &:first-child {
        margin-top: 32px;
      }

      margin-top: 15px;
    }
  }
`

export const SponsorPartial1Styled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  &.last {
    margin-bottom: 90px;
  }

  @media screen and (max-width: 575px) {
    flex-direction: column;
  }
`

export const SponsorPartial2Styled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 575px) {
    flex-direction: column-reverse;
  }
`

export const SponsorPartialContentStyled = styled.div`
  width: calc((100% - 120px) / 2);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    color: #de1d43;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .content {
    margin-top: 15px;
    color: #6f7d95;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media screen and (max-width: 575px) {
    width: 100%;

    .title {
      font-size: 16px;
      text-align: center;
      margin: 14px 0;
    }
    .content {
      font-size: 14px;
      text-align: center;
      margin-top: 0;
    }
  }
`

export const ImageStyled = styled.div`
  width: calc((100% - 120px) / 2);
  height: 314px;

  @media screen and (max-width: 575px) {
    height: 210px;
    width: 100%;
  }
`

export const LineStyled = styled.div`
  border-top: 1px solid #6f7d95;
  opacity: 0.5;
  background: #ddeaf3;
  margin: 36px auto;
`
