import styled from 'styled-components'

export const SectionStyled = styled.div`
  width: 100%;
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
    padding: 9px 30px;
  }
`

export const WrapSOStyled = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: auto;

  @media screen and (max-width: 991px) {
    width: 100%;
    overflow: auto;
    display: inline-flex;
  }
`

export const SOStyled = styled.div`
  flex: 0 0 160px;
  border: 1px solid #bfd4e4;
  border-radius: 6px;
  background-color: #f2f7f9;

  display: flex;
  flex-direction: column;

  .step {
    background-color: #bfd4e4;
    margin-top: 18px;
    color: #183b56;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    padding: 5px 0;

    span {
      color: #de1d43;
      font-weight: 700;
    }
  }

  .content {
    width: 86px;
    height: 86px;

    margin: 0px auto;
    margin-top: 24px;
    background-color: #ffffff;
    border-radius: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    color: #183b56;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    margin-top: 22px;
    margin-bottom: 30px;
  }

  &:last-child {
    margin-right: 0;
  }

  &.none-style {
    flex: 0 0 265px;
    border: none;
    border-radius: none;
    background-color: transparent;

    .step {
      opacity: 0;
    }
  }

  @media screen and (max-width: 991px) {
    flex: 0 0 116px;
    margin-right: 20px;

    .step {
      font-size: 14px;
      margin-top: 12px;
    }

    .content {
      height: 62px;
      width: 62px;

      margin-top: 18px;
    }

    .text {
      margin-top: 12px;
      margin-bottom: 12px;
    }

    &.none-style {
      flex: 0 0 205px;
    }
  }
`
