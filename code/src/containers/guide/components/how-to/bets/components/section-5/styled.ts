import styled from 'styled-components'

export const SectionStyled = styled.div`
  width: 100%;
  margin-bottom: 60px;
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

export const WrapSOPartialStyled = styled.div`
  .item {
    margin-top: 60px;
  }

  @media screen and (max-width: 575px) {
    .item {
      margin-top: 24px;
    }
  }
`

export const SOPartial1Styled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 575px) {
    display: block;
  }
`

export const SOPartial2Styled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 575px) {
    flex-direction: column-reverse;
  }
`

export const SOPartialContentStyled = styled.div`
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
      margin-top: 15px;
      text-align: center;
    }

    .content {
      font-size: 14px;
      margin-top: 15px;
      text-align: center;
    }
  }
`

export const ImageStyled = styled.div`
  width: calc((100% - 120px) / 2);
  height: 314px;

  @media screen and (max-width: 575px) {
    width: 100%;
    height: 240px;
  }
`
