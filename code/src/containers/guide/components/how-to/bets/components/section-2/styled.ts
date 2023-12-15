import styled from 'styled-components'

export const SectionStyled = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 60px;

  @media screen and (max-width: 575px) {
    margin-bottom: 32px;
  }
`

export const NameStyled = styled.div`
  color: #de1d43;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */

  margin-bottom: 15px;

  @media screen and (max-width: 575px) {
    font-size: 16px;
  }
`

export const DescriptionStyled = styled.div`
  color: #6f7d95;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 575px) {
    font-size: 14px;
  }
`

export const WrapPurchaseStyled = styled.div`
  display: flex;
  margin-top: 30px;
  align-items: center;

  @media screen and (max-width: 575px) {
    margin-top: 20px;
    display: block;
  }
`

export const Purchase1Styled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  .img {
    width: 134px;
    height: 134px;
    border-radius: 5px;
    border: 1px solid #ddeaf3;

    img {
      padding: 14px;
      border-radius: 5px;
    }
  }

  @media screen and (max-width: 575px) {
    align-items: center;

    .img {
      width: 100px;
      height: 100px;
    }
  }
`

export const Purchase2Styled = styled.div`
  display: flex;
  width: calc(40% - 134px);

  @media screen and (max-width: 575px) {
    width: 100%;
    justify-content: center;
  }
`

export const TransferStyled = styled.div`
  position: relative;
  width: 100%;

  .content-dot {
    width: max-content;
    margin: 0px auto;
    color: #183b56;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    top: -24px;
    left: 0;
    position: absolute;
    transform: translate(100%, 0%);
  }

  @media screen and (max-width: 575px) {
    position: relative;
    width: 100%;
    padding-left: calc(50% - 8px);
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;

    .content-dot {
      position: initial;
      font-size: 14px;
      transform: initial;
      margin: initial;
      margin-left: 10px;
    }
  }
`

export const Purchase3Styled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 60%;

  .img {
    height: 306px;
    max-height: 306px;
  }

  @media screen and (max-width: 575px) {
    width: 100%;

    .img {
      height: 152px;
      max-height: max-content;
      width: 100%;
    }
  }
`
