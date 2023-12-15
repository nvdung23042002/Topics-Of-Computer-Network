import container from '@/components/container'
import styled from 'styled-components'
import {
  scale,
  translateLeftBounceString,
  translateRightBounceString,
  translateUpBounceString
} from '@/components/animations/styled'

export const TicketStyled = styled.div`
  background-color: #f6faff;
  padding: 96px 0 0;
  overflow: hidden;
  @media screen and (max-width: 1279px) {
    padding: 50px 0 0;
  }
  @media screen and (max-width: 775px) {
    padding: 36px 0 0;
  }
`
export const ContainerStyled = styled(container)`
  height: 100%;
  & > .title {
    font-size: 34px;
    line-height: normal;
    text-align: center;
    margin-bottom: 50px !important;
    .sub-title {
      margin-top: 8px;
      font-size: 16px;
      line-height: normal;
      display: block;
    }
  }

  .content-box {
    & > div:nth-child(1),
    & > div:nth-child(2) {
      display: grid;
      align-items: stretch;
      justify-content: space-between;
      gap: 16px 56px;
    }
    & > div:nth-child(1) {
      grid-template-columns: calc(362 / 1200 * 100%) calc(362 / 1200 * 100%) calc(362 / 1200 * 100%);
    }
    & > div:nth-child(2) {
      margin-top: 56px;
      grid-template-columns: calc(362 / 1200 * 100%) calc(362 / 1200 * 100%);
    }
  }

  .icon {
    display: flex;
    justify-content: center;
    column-gap: 10px;
    position: relative;
    width: 442.387px;
    height: 318.207px;
    margin: -180px auto 0;
    &-bg {
      position: absolute;
      top: -85px;
      & > .icon-main:not(.animate) {
        transform: scale(0.027);
      }
      & > .icon-main.animate {
        animation: ${scale(0, 1)} 1.2s ease-out;
      }
    }
    &-character {
      position: absolute;
      &.icon-main:not(.animate) {
        transform: translateY(50vw);
      }
      &.icon-main.animate {
        animation: ${translateUpBounceString('50vw', '0px')} 1.2s ease-out;
      }
    }
    &-left {
      position: relative;
      height: fit-content;
      & > .icon-main:not(.animate):not(.icon-character) {
        transform: translateX(-100vw);
      }
      & > .icon-main.animate:not(.icon-character) {
        animation: ${translateLeftBounceString('-100vw', '0px')} 1.2s ease-out;
      }

      .icon-character {
        right: 0px;
        bottom: 5px;
      }
    }
    &-right {
      position: relative;
      height: fit-content;
      margin-top: -5px;
      & > .icon-main:not(.animate):not(.icon-character) {
        transform: translateX(100vw);
      }
      & > .icon-main.animate:not(.icon-character) {
        animation: ${translateRightBounceString('100vw', '0px')} 1.2s ease-out;
      }

      .icon-character {
        left: 0px;
        bottom: -4px;
      }
    }
  }

  .icon-bottom {
    position: relative;
    width: 100%;
    .icon-main {
      width: 100%;
      height: auto;
      &:not(.animate) {
        transform: translateX(50vw);
      }
      &.animate {
        animation: ${translateUpBounceString('50vw', '0px')} 1.2s ease-out;
      }
    }
  }

  @media screen and (max-width: 1439px) {
    & > .title {
      font-size: 28px;
      .sub-title {
        font-size: 16px;
      }
      .hight-light {
        height: 27px;
      }
    }
  }
  @media screen and (max-width: 1279px) {
    padding: 0 16px;
    .content-box {
      & > div:nth-child(1),
      & > div:nth-child(2) {
        gap: 16px 32px;
      }
    }
    .icon {
      transform: scale(0.9);
      margin: -225px auto 0;
    }
  }
  @media screen and (max-width: 1024px) {
    .content-box {
      & > div:nth-child(1),
      & > div:nth-child(2) {
        gap: 16px 24px;
      }
    }
    .icon {
      transform: scale(0.7);
      margin: -250px auto 0;
    }
  }
  @media screen and (max-width: 890px) {
    .icon {
      transform: scale(0.6);
      margin: -275px auto 0;
    }
  }
  @media screen and (max-width: 775px) {
    & > .title {
      font-size: 18px;
      margin-bottom: 24px !important;
      .sub-title {
        font-size: 14px;
      }
      .hight-light {
        height: 20px;
      }
    }
    .content-box {
      & > div:nth-child(1),
      & > div:nth-child(2) {
        gap: 16px;
        grid-template-columns: 100%;
      }
      & > div:nth-child(2) {
        margin-top: 16px;
      }
    }
    .icon {
      transform: scale(0.9);
      margin: 85px auto -20px;
    }
  }
  @media screen and (max-width: 577px) {
    .icon {
      transform: scale(0.75);
      margin: 50px auto -40px;
    }
  }
  @media screen and (max-width: 450px) {
    .icon {
      transform: scale(0.7) translateX(-8vw);
      margin: 20px auto -40px;
    }
  }
  @media screen and (max-width: 400px) {
    .icon {
      transform: scale(0.7) translateX(-16vw);
    }
  }
  @media screen and (max-width: 360px) {
    .icon {
      transform: scale(0.6) translateX(-27vw);
    }
  }
  @media screen and (max-width: 330px) {
    .icon {
      transform: scale(0.6) translateX(-40vw);
    }
  }
`
