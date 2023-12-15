import typography from '@/components/common/typography'
import { Divider } from 'antd'
import styled from 'styled-components'

export const HeaderTitle = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  padding: 9px 0px;
  background: #de1d43;
  color: #fff;

  @media screen and (max-width: 575px) {
    font-size: 16px;
  }
`
export const ContainerStyled = styled.div`
  margin-top: 30px;

  @media screen and (max-width: 575px) {
    margin-top: 25px;
    padding: 0 15px;
  }
`
export const ContainerContent = styled.div`
  margin-top: 30px;

  @media screen and (max-width: 575px) {
    margin-top: 14px;
  }
`
export const TitleStyled = styled(typography.Title)`
  &.title-content {
    &.ant-typography {
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      color: #de1d43;
      text-align: center;
    }
  }

  @media screen and (max-width: 575px) {
    &.title-content {
      &.ant-typography {
        font-size: 16px;
      }
    }
  }
`
export const ImageGuide = styled.div`
  position: relative;
  /* & > span {
    position: absolute;
    top: 35%;
    left: 15%;
    font-size: 16px;
    font-weight: 900;
    color: #183b56;
  } */
`
export const ContainerSubTitle = styled.div`
  margin-top: 16px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  color: #6f7d95;

  & > p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 150% */
    color: #6f7d95;
    margin: 0px;
  }

  @media screen and (max-width: 575px) {
    font-size: 14px;
    margin-top: 14px;
    & > p {
      font-size: 14px;
    }
  }
`
export const DividerStyled = styled(Divider)`
  &.ant-divider-horizontal {
    margin: 36px 0;
  }
  &.ant-divider {
    opacity: 0.5;
    border-block-start: 1px solid #6f7d95;
    background: #ddeaf3;
  }
`
export const ContainerContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-bottom: 60px;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .image {
      width: calc((100% - 120px) / 2);
    }

    .content-guide {
      width: calc((100% - 120px) / 2);

      .sub-content {
        text-align: start;
      }

      .title-content {
        text-align: start;
      }
    }
  }

  @media screen and (max-width: 575px) {
    gap: 20px;
    margin-bottom: 44px;

    .item {
      flex-direction: column;

      .image {
        height: 210px;
        width: 100%;
      }

      .content-guide {
        width: 100%;

        .sub-content {
          text-align: center;
          margin-top: 0px;
          margin-bottom: 0px;
        }

        .title-content {
          text-align: center;
          margin-top: 15px;
        }
      }

      &:nth-child(even) {
        flex-direction: column-reverse;
      }
    }
  }
`

export const WrapPurchaseStyled = styled.div`
  display: flex;
  /* margin-top: 30px; */
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
    margin: 15px 0;
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
  }

  @media screen and (max-width: 575px) {
    width: max-content;

    .content-dot {
      position: absolute;
      transform: translate(25px, 50%);
      font-size: 14px;
      width: 125px;
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

export const LineStyled = styled.div`
  border-top: 1px solid rgba(111, 125, 149, 0.5);
  opacity: 0.5;
  background: rgba(111, 125, 149, 0.5);
  margin: 36px 0;

  @media screen and (max-width: 575px) {
    margin: 15px 0;
  }
`
