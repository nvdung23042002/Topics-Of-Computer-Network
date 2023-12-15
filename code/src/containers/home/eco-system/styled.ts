import button from '@/components/common/button'
import container from '@/components/container'
import styled from 'styled-components'
import { translateDown, translateLeft, translateRight, translateUp } from '@/components/animations/styled'

export const EcoSystemStyled = styled.div`
  background-color: #fff;
  padding: 100px 0 128px;
  @media screen and (max-width: 1439px) {
    padding: 60px 0 60px;
  }
  @media screen and (max-width: 995px) {
    padding: 40px 0 40px;
  }
  @media screen and (max-width: 775px) {
    padding: 24px 0 38px;
  }
`
export const ContainerStyled = styled(container)`
  & > .title {
    font-size: 34px;
    text-align: center;
    margin-bottom: 68px !important;
  }

  .box {
    display: flex;
    align-items: center;
    gap: 40px 128px;
    &:not(:last-child) {
      margin-bottom: 130px;
    }
    .image {
      max-width: 536px;
      width: calc(50vw - 64px);
      height: 100%;
      svg {
        width: 100%;
        max-height: calc(50vw - 64px);
        overflow: initial;
      }
      .translate-down-73 {
        @media screen and (min-width: 776px) {
          animation: ${translateDown(0, 73)} 3s linear infinite alternate-reverse;
        }
      }
      .translate-down-71 {
        @media screen and (min-width: 776px) {
          animation: ${translateDown(0, 71)} 3s linear infinite alternate-reverse;
        }
      }
      .translate-up-20 {
        @media screen and (min-width: 776px) {
          animation: ${translateUp(0, 20)} 3s linear infinite alternate-reverse;
        }
      }
      .translate-up-40 {
        @media screen and (min-width: 776px) {
          animation: ${translateUp(0, 40)} 3s linear infinite alternate-reverse;
        }
      }
      .translate-up-90 {
        @media screen and (min-width: 776px) {
          animation: ${translateUp(0, 90)} 3s linear infinite alternate-reverse;
        }
      }
      .translate-down-40 {
        @media screen and (min-width: 776px) {
          animation: ${translateDown(0, 40)} 3s linear infinite alternate-reverse;
        }
      }
      .translate-down-60 {
        @media screen and (min-width: 776px) {
          animation: ${translateDown(0, 60)} 3s linear infinite alternate-reverse;
        }
      }
      .translate-left-30 {
        @media screen and (min-width: 776px) {
          animation: ${translateLeft(0, 40)} 3s linear infinite alternate-reverse;
        }
      }
      .translate-right-40 {
        @media screen and (min-width: 776px) {
          animation: ${translateRight(0, 40)} 3s linear infinite alternate-reverse;
        }
      }
    }
    .content {
      flex: 1;
      & > .title {
        font-size: 34px;
      }
      & > .sub-title {
        margin: 32px 0;
        font-size: 18px;
      }
      .icon-box {
        color: ${(props) => props.theme.token.colorText};
        display: flex;
        align-items: center;
        margin-bottom: 32px;
        svg {
          width: 80px;
          height: 80px;
        }
        & > .title {
          font-size: 24px;
          margin-left: 14px;
        }
      }
    }
    &:nth-child(odd) {
      flex-direction: row-reverse;
    }
  }

  @media screen and (max-width: 1439px) {
    padding: 0 16px;
    & > .title {
      font-size: 28px;
      margin-bottom: 40px !important;
      .hight-light {
        height: 27px;
      }
    }
    .box {
      gap: 40px 100px;
      &:not(:last-child) {
        margin-bottom: 100px;
      }
      .content {
        & > .title {
          font-size: 28px;
        }
        & > .sub-title {
          font-size: 16px;
        }
        .icon-box {
          & > .title {
            font-size: 20px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 995px) {
    .box {
      gap: 40px 60px;
      &:not(:last-child) {
        margin-bottom: 60px;
      }
    }
  }

  @media screen and (max-width: 775px) {
    & > .title {
      font-size: 18px;
      margin-bottom: 16px !important;
      .hight-light {
        height: 20px;
      }
    }
    .box {
      gap: 40px;
      &:not(:last-child) {
        margin-bottom: 40px;
      }

      .content {
        & > .title {
          font-size: 18px;
        }
        & > .sub-title {
          margin: 8px 0 20px;
          font-size: 14px;
        }
        .icon-box {
          margin-bottom: 8px;
          svg {
            width: 40px;
            height: 40px;
          }
          & > .title {
            font-size: 16px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    .box {
      flex-wrap: wrap;
      gap: 24px;
      .image {
        width: 100%;
        svg {
          max-height: 343px;
        }
      }
      .content {
        width: 100%;
        text-align: center;
        & > .ant-typography {
          text-align: left;
        }
      }
    }
  }
`

export const ButtonStyled = styled(button)`
  min-width: 169px;
  height: 44px;
  font-weight: 400;
  font-size: 16px;
  @media screen and (max-width: 775px) {
    height: 40px;
  }
`
