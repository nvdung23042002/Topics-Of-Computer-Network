import container from '@/components/container'
import styled from 'styled-components'

export const AdvertisingAreaStyled = styled.div`
  background-color: #fff;
  padding: 42px 0 130px;
  overflow: hidden;
  @media screen and (max-width: 1439px) {
    padding: 42px 4px 130px;
  }
  @media screen and (max-width: 995px) {
    padding: 36px 4px 100px;
  }
  @media screen and (max-width: 775px) {
    padding: 32px 4px 42px;
  }
`
export const ContainerStyled = styled(container)<{ lineBannerTime: number }>`
  position: relative;
  min-height: 300px;
  .title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 78px !important;
  }

  .banner-item {
    margin: 0 12px;
    height: 218px;
    &.single-item img {
      max-width: 588px;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%);
    }
  }
  @media screen and (max-width: 1439px) {
    .title {
      font-size: 28px;
      margin-bottom: 60px !important;
      .hight-light {
        height: 27px;
      }
    }
  }
  @media screen and (max-width: 995px) {
    min-height: 218px;
    .title {
      margin-bottom: 40px !important;
    }
    .banner-item {
      height: calc(218 / 588 * (50vw - 80px));
      &.single-item img {
        max-width: calc(50vw - 80px);
      }
    }
  }
  @media screen and (max-width: 775px) {
    min-height: 200px;
    .title {
      font-size: 18px;
      margin-bottom: 16px !important;
      .hight-light {
        height: 20px;
      }
    }
    .banner-item {
      height: calc(218 / 588 * (50vw - 70px));
      &.single-item img {
        max-width: calc(50vw - 70px);
      }
    }
  }
  @media screen and (max-width: 576px) {
    min-height: 150px;
    .banner-item {
      height: calc(218 / 588 * (100vw - 32px));
      &.single-item img {
        max-width: unset;
      }
    }
  }
`
