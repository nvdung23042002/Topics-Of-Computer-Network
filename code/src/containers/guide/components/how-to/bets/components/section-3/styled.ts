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

  @media screen and (max-width: 575px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`

export const WrapMatchStyled = styled.div``

export const Match1Styled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 575px) {
    display: block;
  }
`

export const Match2Styled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 60px;

  @media screen and (max-width: 575px) {
    margin-top: 25px;
    flex-direction: column-reverse;
  }
`

export const MatchContentStyled = styled.div`
  width: calc((100% - 120px) / 2);

  .title {
    color: #de1d43;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 25px;
  }

  .content {
    .list {
      list-style: auto;
      padding-left: 18px;

      li {
        color: #6f7d95;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .text {
      color: #6f7d95;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  @media screen and (max-width: 575px) {
    width: 100%;

    .title {
      font-size: 16px;
      margin-top: 15px;
      margin-bottom: 10px;
    }

    .content {
      .list {
        margin: 0;

        li {
          font-size: 14px;
        }
      }
      .text {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
`

export const ImageStyled = styled.div`
  width: calc((100% - 120px) / 2);
  height: 314px;

  @media screen and (max-width: 575px) {
    width: 100%;
    height: 222px;
  }
`
