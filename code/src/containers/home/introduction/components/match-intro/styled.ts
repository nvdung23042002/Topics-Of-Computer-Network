import button from '@/components/common/button'
import bgImage from '@/assets/images/home/match-intro-bg.png'
import styled from 'styled-components'
import container from '@/components/container'
import {
  translateDown,
  translateLeft,
  translateLeftBounceString,
  translateRightBounceString,
  translateUp,
  translateUpBounceString
} from '@/components/animations/styled'

export const MatchIntroStyled = styled.div<{ lineInfoTime: number }>`
  position: relative;
  overflow: hidden;
  margin: 32px auto 0;
  background-color: #020202;
  .line-info {
    margin-top: 32px;
    background-color: #ed8f2a;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    height: 40px;
    p {
      position: absolute;
      height: 100%;
      margin: 0;
      color: #000;
      text-align: center;
      line-height: 40px;
      transform: translateX(100vw);
      animation: ${translateLeft('100vw', '100%')} ${(props) => (props.lineInfoTime < 40 ? 40 : props.lineInfoTime)}s
        infinite linear;
    }
  }

  @media screen and (max-width: 1439px) {
  }
  @media screen and (max-width: 995px) {
    margin: 40px auto 0;
  }
  @media screen and (max-width: 775px) {
    margin: 20px auto 0;
    .line-info {
      font-size: 14px;
      height: 30px;
      p {
        line-height: 30px;
        animation-duration: ${(props) => (props.lineInfoTime < 25 ? 25 : props.lineInfoTime)}s;
      }
    }
  }
  @media screen and (max-width: 576px) {
    .line-info {
      font-size: 14px;
      height: 30px;
      p {
        line-height: 30px;
        animation-duration: ${(props) => (props.lineInfoTime < 15 ? 15 : props.lineInfoTime)}s;
      }
    }
  }
`
export const ContainerStyled = styled(container)`
  text-align: center;
  flex-wrap: wrap-reverse;
  background-image: url(${bgImage.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  height: 707px;
  background-color: #020202;

  .title-box {
    position: absolute;
    top: 28px;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    max-width: 1200px;
    & .title {
      font-size: 34px;
      color: #ffffff;
      line-height: normal;
      & > .hight-light {
        height: 34px;
      }
    }
  }
  .icon {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    flex-grow: 1;
    text-align: right;
    max-width: 1161px;
    margin: 70px auto 0;
    height: 707px;
    .match-intro-top-1 {
      &:not(.animate) {
        transform: translateY(-30px);
      }
      &.animate {
        animation: ${translateDown(-30, 0)} 1.2s ease-out;
      }
    }
    .match-intro-top-2 {
      &:not(.animate) {
        transform: translateY(0);
      }
      &.animate {
        animation: ${translateUp(0, 70)} 1.2s ease-out;
        transform: translateY(-70px);
      }
    }
    .match-intro-left {
      &:not(.animate) {
        transform: translateX(-100vw);
      }
      &.animate {
        animation: ${translateLeftBounceString('-100vw', '0px')} 1.2s ease-out;
      }
    }
    .match-intro-right {
      &:not(.animate) {
        transform: translateX(100vw);
      }
      &.animate {
        animation: ${translateRightBounceString('100vw', '0px')} 1.2s ease-out;
      }
    }
    .match-intro-1 {
      &:not(.animate) {
        transform: translateY(100vw);
      }
      &.animate {
        animation: ${translateUpBounceString('100vw', '0px')} 1.2s ease-out;
      }
    }
    svg {
      width: 100%;
      height: 649px;
      flex-grow: 1;
      overflow: initial;
      &.mobile {
        display: none;
      }
    }
  }
  @media screen and (max-width: 1439px) {
    background-position: 50% 50%;
    height: calc(707px - 10vw);
    .title-box {
      padding: 0 16px;
      & .title {
        font-size: 28px;
        & > .hight-light {
          height: 27px;
        }
      }
    }
    .icon {
      height: calc(707px - 10vw);
      padding: 0 20px;
      margin: 0 auto;
      svg {
        max-width: 1161px;
        height: calc(649px - 10vw);
      }
    }
  }
  @media screen and (max-width: 995px) {
    height: calc(707px - 20vw);

    .icon {
      height: calc(707px - 20vw);
      svg {
        height: calc(649px - 20vw);
      }
    }
  }
  @media screen and (max-width: 775px) {
    height: 400px;
    .title-box {
      & .title {
        padding: 0 20px;
        font-size: 18px;
        & > .hight-light {
          height: 20px;
        }
      }
    }
    .icon {
      height: 400px;
      padding: 0 20px;
      margin: 0 auto;
      svg {
        max-width: 1161px;
        height: 420px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    height: 300px;
    .icon {
      height: 300px;
      margin-top: 120px;

      svg {
        max-width: 100vw;
        height: 300px;
        &.desktop {
          display: none;
        }
        &.mobile {
          display: initial;
        }
      }
    }
  }
`

export const ButtonStyled = styled(button)`
  min-width: 196px;
  height: 50px;
  font-weight: 700;
  font-size: 18px;
  margin-top: 28px;
`

export const SlideStyled = styled.div<{ lineBannerTime: number }>`
  margin-top: 20px;
  margin-bottom: 40px;
  padding: 0 12px;
  display: flex;
  /* min-width: 100vw; */
  width: max-content;
  transform: translateX(100vw);
  animation: ${translateLeft('100vw', '100%')} ${(props) => (props.lineBannerTime < 35 ? 35 : props.lineBannerTime)}s
    infinite linear;
  .match-container {
    width: 508px;
    height: 258px;
    pointer-events: none;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    border-radius: 10px;
    overflow: hidden;
    margin: 0 12px;
    position: relative;
    .image-container {
      width: 100%;
      height: 206px;
      display: grid;
      justify-content: center;
      align-content: flex-end;
      grid-template-columns: 100%;
      grid-template-rows: calc(100% / 3) calc(100% / 3) calc(100% / 3);
    }
    .sponsors-list {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .match-name {
      padding: 0 4px;
      line-height: 26px;
      width: 100%;
      position: absolute;
      bottom: 0;
      font-size: 18px;
      font-weight: 700;
      background-color: #ed8f2a;
      color: #000;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media screen and (max-width: 775px) {
    margin-top: 16px;
    margin-bottom: 16px;
    animation-duration: ${(props) => (props.lineBannerTime < 25 ? 25 : props.lineBannerTime)}s;
    .match-container {
      width: calc(508 / 258 * 180px);
      height: 180px;
      .image-container {
        height: 144px;
      }
      .match-name {
        line-height: 18px;
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    animation-duration: ${(props) => (props.lineBannerTime < 15 ? 15 : props.lineBannerTime)}s;
    .match-container {
      width: calc(508 / 258 * 160px);
      height: 160px;
      .image-container {
        height: 132px;
      }
      .match-name {
        line-height: 14px;
        font-size: 12px;
      }
    }
  }
`
export const SponsorContainer = styled.div<{ index?: number }>`
  position: relative;
  overflow: hidden;
  margin: 8px;
  text-align: center;
  width: calc(100% / 7 - 16px);
  height: calc(100% - 16px);
  img {
    z-index: 1;
    max-height: 52px;
    max-width: 52px;
    border-radius: 50%;
  }
  @media screen and (max-width: 775px) {
    img {
      z-index: 1;
      max-height: 32px;
      max-width: 32px;
      border-radius: 50%;
    }
  }
`
