import styled from 'styled-components'

export const SectionStyled = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 35px;
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

  @media screen and (max-width: 575px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`

export const WrapServiceStyled = styled.div`
  display: flex;

  @media screen and (max-width: 575px) {
    display: block;
  }
`

export const Service1Styled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 40%;

  .img {
    height: 311px;
    max-height: 311px;
  }

  @media screen and (max-width: 575px) {
    width: 100%;

    .img {
      height: 221px;
    }
  }
`

export const Service2Styled = styled.div`
  display: flex;
  width: 20%;

  @media screen and (max-width: 575px) {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`

export const TransferStyled = styled.div`
  position: relative;
  padding-top: 25%;
  width: 100%;

  .content-dot {
    width: max-content;
    margin: 0px auto;
    color: #183b56;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .row-dot {
    svg {
      width: 100%;
    }
  }

  @media screen and (max-width: 575px) {
    width: max-content;
    padding-top: 0;
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    margin-left: 50%;
    align-items: center;

    .content-dot {
      margin: 0;
      padding-left: 5px;
      font-weight: 500;
      font-size: 14px;
    }

    .row-dot {
      svg {
        width: initial;
      }
    }
  }
`

export const Service3Styled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 40%;

  .img {
    height: 311px;
    max-height: 311px;
  }

  @media screen and (max-width: 575px) {
    width: 100%;

    .img {
      height: 221px;
    }
  }
`

export const ServiceContentStyled = styled.div`
  margin-top: 25px;

  .title {
    color: #de1d43;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .content {
    color: #6f7d95;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media screen and (max-width: 575px) {
    margin-top: 15px;

    .title {
      margin-bottom: 5px;
      font-size: 16px;
    }

    .content {
      font-size: 14px;
    }
  }
`
