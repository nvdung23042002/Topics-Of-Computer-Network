import container from '@/components/container'
import styled from 'styled-components'
import { rotate, translateDown, translateUp } from '@/components/animations/styled'
import AboutUsImage from '@/assets/images/home/about-us.png'

export const AboutUsStyled = styled.div`
  background-color: #fff;
  padding: 100px 0 95px;
  overflow: hidden;
  @media screen and (max-width: 775px) {
    padding: 26px 0;
  }
`
export const ContainerStyled = styled(container)`
  display: flex;
  column-gap: 100px;
  row-gap: 40px;
  justify-content: center;
  .title {
    font-size: 34px;
    margin-bottom: 38px !important;
    &.mobile {
      display: none;
    }
  }
  div.ant-typography {
    font-size: 18px;
  }

  .image-box {
    position: relative;
    max-width: 564px;
    min-width: 564px;
    max-height: 401px;
    border-radius: 9px;
    border: 4px solid #d6e5e9;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${AboutUsImage.src});
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.1);
    flex: 1;

    .eth-about,
    .ticket-about,
    .vector-about-1,
    .vector-about-2 {
      position: absolute !important;
    }

    .eth-about {
      top: 25px;
      right: 0;
      width: 78px;
      height: auto;
      @media screen and (min-width: 776px) {
        animation: ${translateUp(0, 22, 'translateX(36px) scaleX(-1) rotate(-15.04deg)')} 1.2s linear infinite
          alternate-reverse;
      }
    }

    .ticket-about {
      bottom: 25px;
      left: 0;
      width: 86px;
      height: auto;
      @media screen and (min-width: 776px) {
        animation: ${translateDown(0, 22, 'translateX(-46px)')} 1.2s linear infinite alternate-reverse;
      }
    }

    .vector-about-1 {
      top: 0;
      left: 0;
      width: 65px;
      height: 65px;
      @media screen and (min-width: 776px) {
        animation: ${rotate(0, 22, 'translate(-50%, -50%)')} 1.2s linear infinite alternate-reverse;
      }
    }

    .vector-about-2 {
      bottom: 0;
      right: 0;
      width: 72px;
      height: 72px;
      @media screen and (min-width: 776px) {
        animation: ${rotate(0, -22, 'translate(50%, 50%)')} 1.2s linear infinite alternate-reverse;
      }
    }
  }

  @media screen and (max-width: 1439px) {
    column-gap: 60px;
    row-gap: 32px;
    padding: 0 36px 0 16px;
    .title {
      font-size: 28px;
      margin-bottom: 30px !important;
      .hight-light {
        height: 27px;
      }
    }
    div.ant-typography {
      font-size: 16px;
    }
    .image-box {
      min-width: 42vw;
      max-height: calc(401 / 564 * 42vw);
    }
  }
  @media screen and (max-width: 995px) {
    column-gap: 32px;
    row-gap: 24px;
    .image-box {
      min-width: 45vw;
      max-height: calc(401 / 564 * 45vw);
      .eth-about {
        top: 25px;
        right: 0;
        transform: translateX(35px) scaleY(0.7) scaleX(-0.7) rotate(-15.04deg);
      }

      .ticket-about {
        bottom: 25px;
        left: 0;
        width: 86px;
        height: auto;
        transform: translateX(-46px) scale(0.7);
      }

      .vector-about-1 {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%) scale(0.7);
      }

      .vector-about-2 {
        bottom: 0;
        right: 0;
        transform: translate(50%, 50%) scale(0.7);
      }
    }
  }
  @media screen and (max-width: 775px) {
    column-gap: 32px;
    row-gap: 24px;
    flex-wrap: wrap-reverse;
    padding: 0 16px;
    .title {
      display: none;
      font-size: 18px;
      margin-bottom: 6px !important;
      .hight-light {
        height: 20px;
        margin-left: -10px;
      }
      &.mobile {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
    div.ant-typography {
      font-size: 14px;
    }
    .image-box {
      max-width: 60vw;
      height: calc(401 / 564 * 60vw);
      max-height: unset;
    }
  }
  @media screen and (max-width: 576px) {
    .image-box {
      max-width: 80vw;
      height: calc(401 / 564 * 80vw);
    }
  }
`
