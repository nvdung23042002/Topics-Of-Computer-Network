import button from '@/components/common/button'
import bgImage from '@/assets/images/home/nsb-intro-bg.png'
import styled from 'styled-components'
import container from '@/components/container'
import { translateDown, translateLeft, translateRight } from '@/components/animations/styled'

export const NSBIntroStyled = styled.div`
  background-image: url(${bgImage.src});
  background-repeat: no-repeat;
  background-position: 50% 100%;
  background-size: cover;
  padding: 150px 0 0;
  margin: 0 auto;
  height: 900px;
  overflow: hidden;

  @media screen and (max-width: 1439px) {
  }
  @media screen and (max-width: 995px) {
    padding: 0;
  }
  @media screen and (max-width: 576px) {
    height: unset;
    padding-bottom: 20px;
  }
`

export const ContainerStyled = styled(container)`
  display: flex;
  overflow: hidden;
  /* flex-wrap: wrap-reverse; */

  .title-box {
    padding-left: 119px;
    & .title {
      font-size: 34px;
      line-height: normal;
      color: #ffffff;
      margin-top: 70px;
    }
    & > .join-btn {
      margin-top: 50px;
    }
  }
  .icon {
    flex-grow: 1;
    text-align: right;
    height: 650px;
    & > svg {
      overflow: initial;
      width: 660px;
      height: 700px;
    }
    .nsb-phone {
      @media screen and (min-width: 775px) {
        animation: ${translateRight(0, -83)} 3s linear infinite alternate-reverse;
      }
    }
    .nsb-coin-3 {
      @media screen and (min-width: 776px) {
        animation: ${translateDown(0, -80)} 3s linear infinite alternate-reverse;
      }
    }
    .nsb-coin-4 {
      @media screen and (min-width: 776px) {
        animation: ${translateDown(0, 80)} 3s linear infinite alternate-reverse;
      }
    }
    .nsb-coin-5 {
      @media screen and (min-width: 776px) {
        animation: ${translateDown(0, -60)} 3s linear infinite alternate-reverse;
      }
    }
    .nsb-coin-6 {
      @media screen and (min-width: 776px) {
        animation: ${translateDown(0, -60)} 3s linear infinite alternate-reverse;
      }
    }
    .nsb-coin-7 {
      @media screen and (min-width: 776px) {
        animation: ${translateDown(0, 40)} 3s linear infinite alternate-reverse;
      }
    }
  }

  @media screen and (max-width: 1439px) {
    .title-box {
      padding-left: calc(80 / 1440 * 100vw);
      & .title {
        font-size: 28px;
        line-height: normal;
      }
    }
    .icon {
      & > svg {
        width: 60vw;
      }
    }
  }
  @media screen and (max-width: 995px) {
    align-items: center;
    flex-wrap: wrap;
    .title-box {
      padding: 20px 40px !important;
      padding-left: 20px;
      text-align: center;
      & > .join-btn {
        margin-top: 36px;
      }
    }
    .icon {
      text-align: center;
      height: 460px;
      & > svg {
        height: 520px;
      }
    }
    @media screen and (max-width: 775px) {
      .title-box {
        padding: 20px !important;
        & .title {
          font-size: 18px;
          line-height: normal;
          margin-top: 16px;
        }
        & > .join-btn {
          font-size: 16px;
          height: 40px;
          font-weight: 500;
        }
      }
      .icon {
        text-align: center;
        height: 544px;
        & > svg {
          width: 90vw;
          height: 550px;
        }
      }
    }
    @media screen and (max-width: 576px) {
      .icon {
        text-align: center;
        height: 430px;
        & > svg {
          width: 100vw;
          height: 500px;
        }
      }
    }
    @media screen and (max-width: 374px) {
      .icon {
        text-align: center;
        height: 400px;
      }
    }
  }
`
export const ButtonStyled = styled(button)`
  min-width: 196px;
  height: 50px;
  font-weight: 700;
  font-size: 18px;
`
export const SlideStyled = styled.div`
  padding: 0 12px;
  display: flex;
  column-gap: 80px;
  min-width: 100vw;
  width: max-content;
  transform: translateX(100vw);
  animation: ${translateLeft('100vw', '100%')} 50s infinite linear;
  .image {
    display: flex !important;
    justify-content: center;
    align-items: center;
    height: 90px;
    pointer-events: none;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    img {
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .image-4 img {
    height: 55px;
  }
  .image-5 img {
    height: 80px;
  }
  .image-6 img {
    height: 90px;
  }
`
