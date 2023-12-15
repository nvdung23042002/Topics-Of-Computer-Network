import styled from 'styled-components'
import FighterDetailBanner from '@/assets/images/fighter-detail-banner.png'
import FighterDetailBannerMobile from '@/assets/images/fighter-detail-banner-mobile.png'

import SeemoreBtn from '@/components/common/button'
import { Col, Row } from 'antd'

export const FighterDetailStyled = styled.div`
  margin-top: 40px;
  margin-bottom: 64px;

  .match-history-collapse {
    margin-bottom: 25px;

    @media screen and (max-width: 992px) {
      margin-bottom: 8px;
    }

    .show-more-btn {
      text-align: center;
    }
  }

  .video-history-collapse {
    margin-bottom: 25px;

    @media screen and (max-width: 992px) {
      margin-bottom: 8px;

      .ant-collapse-content {
        .ant-col {
          text-align: center;
        }
      }

      iframe {
        width: 343px !important;
        height: 193px !important;
      }
    }
  }

  @media screen and (max-width: 1199px) {
    margin-top: 16px;
    margin-bottom: 32px;

    .news-history-collapse {
      .ant-collapse-content-box {
        .ant-row {
          gap: 5px !important;
        }
      }
    }
  }

  .see-more {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const FighterInfoGeneralStyed = styled.div`
  width: 100%;
  height: 375px;
  border-radius: 10px;
  background-image: url(${FighterDetailBanner.src});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-content: center;
  gap: 40px;
  padding: 0 42px;
`

export const FighterDetailContainerStyled = styled.div`
  @media screen and (max-width: 1199px) {
    padding: 0 16px 16px 16px;
  }
`

export const FighterDetailRowStyled = styled(Row)`
  column-gap: 31px;
  row-gap: 31px;
  flex-wrap: nowrap;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    column-gap: 32px;
    row-gap: 32px;
  }
`

export const FighterDetailColLeftStyled = styled(Col)`
  flex: 1;
  width: 740px;

  @media screen and (max-width: 1199px) {
    width: 100%;

    .ant-collapse-header {
      height: 38px;
      display: flex;
      align-items: center !important;

      .ant-collapse-header-text {
        font-size: 12px !important;
        line-height: normal !important;
      }

      .ant-collapse-expand-icon {
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`

export const FighterDetailColRightStyled = styled(Col)``

export const FighterInfoGeneralImgStyled = styled.div`
  width: 251px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

export const FighterInfoDescStyled = styled.div`
  flex: 1;
  padding: 28px 0;

  .fighter-name {
    width: fit-content;
    font-size: 46px;
    margin-bottom: 2px;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  .fighter-name-kanji {
    width: fit-content;
    font-size: 32px;
    margin-bottom: 2px;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  .score {
    font-size: 32px;
    margin-bottom: 49px;
    line-height: normal;
  }
`

export const FighterBodyIndexStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 107px;
`

export const BodyIndexColStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`

export const PairBodyIndexStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;

  @media screen and (max-width: 1199px) {
    gap: 11px;
    margin-bottom: 4px;
  }

  .label {
    min-width: 100px;
    font-size: 20px;
    line-height: normal;

    @media screen and (max-width: 1199px) {
      font-size: 13px;
      line-height: normal;
      width: 65px;
    }
  }

  .value {
    max-width: 180px;
    font-size: 20px;
    line-height: normal;

    @media screen and (max-width: 1199px) {
      max-width: 140px;
      font-size: 13px;
      line-height: normal;
    }
  }
`

export const FighterDescStyled = styled.p`
  margin-top: 32px;
  margin-bottom: 32px;

  @media screen and (max-width: 1199px) {
    & > * {
      font-size: 14px;
      line-height: normal;
    }
  }

  img {
    width: 100% !important;
    height: auto !important;
  }
`

export const FighterDetailSponsorStyled = styled.div`
  margin-top: 32px;

  @media screen and (max-width: 1199px) {
    margin-top: 0;
  }
`

export const MatchHistoryStyled = styled.div`
  width: 100%;
  height: 152px;
  padding: 0 16px;
  border-radius: 5px;
  border: 1px solid #e5e3e3;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FighterStyled = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
`

export const FighterImgStyled = styled.div`
  position: relative;
  width: 122px;
  height: 150px;
  display: flex;
  align-items: flex-end;

  @media screen and (max-width: 1199px) {
    width: 82px;
    height: 126px;
  }
`

export const FighterLabelStatusStyled = styled.div`
  margin-bottom: 9px;

  .lose {
    width: 58px;
    padding: 1px 0;
    height: auto;
    background-color: ${({ theme }: any) => theme.token.colorBg12th};
    text-align: center;
    font-size: 18px;
    line-height: 26.06px;

    @media screen and (max-width: 1199px) {
      width: unset;
      min-width: 44px;
      font-size: 14px;
      line-height: normal;
    }
  }

  .win {
    width: 58px;
    padding: 1px 0;
    height: auto;
    background-color: ${({ theme }: any) => theme.token.colorPrimary};
    text-align: center;
    font-size: 18px;
    line-height: 26.06px;

    @media screen and (max-width: 1199px) {
      width: unset;
      min-width: 44px;
      font-size: 14px;
      line-height: normal;
    }
  }

  .draw {
    width: 58px;
    padding: 1px 0;
    height: auto;
    background-color: ${({ theme }: any) => theme.token.colorSecondary};
    text-align: center;
    font-size: 18px;
    line-height: 26.06px;

    @media screen and (max-width: 1199px) {
      width: unset;
      min-width: 44px;
      font-size: 14px;
      line-height: normal;
      padding: 0;
    }
  }
`

export const MatchHistoryResultStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .match-name {
    margin-bottom: 4px;
  }

  .fighter-vs {
    margin-bottom: 8px;
    font-size: 18px;
    line-height: 26.06px;
  }
`

export const NewsHistoryStyled = styled.div`
  position: relative;
  padding: 24px;
  border-radius: 15px;
  border: 1px solid ${({ theme }: any) => theme.token.colorBorder3th};
  display: flex;
  row-gap: 22px;
  column-gap: 22px;
  align-items: stretch;

  @media screen and (max-width: 1199px) {
    padding: 4px 6px;
    gap: 6px;
  }
`

export const NewsHistoryImgStyled = styled.div`
  width: 300px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 1;

  @media screen and (max-width: 1199px) {
    width: 158px;
    height: 96px;
  }
`

export const NewsHistoryInfoStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .bet-sport {
    margin-bottom: 9px;

    @media screen and (max-width: 1199px) {
      margin-bottom: 1px;
      font-size: 12px;
      line-height: normal;
    }
  }

  .news-title {
    font-size: 20px;
    line-height: 28.96px;
    margin-bottom: 9px;

    @media screen and (max-width: 1199px) {
      font-size: 12px;
      line-height: normal;
      letter-spacing: -0.5px;
      -webkit-line-clamp: 3 !important;
      margin-bottom: 0;
    }
  }

  .news-release-date {
    font-size: 12px;
    margin-bottom: 35px;
    @media screen and (max-width: 1199px) {
      font-size: 10px;
      margin: 0;
      letter-spacing: 1px;
      line-height: normal;
    }
  }
`

export const NewsHistoryLinkStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  div {
    font-size: 16px;
    line-height: 23.17px;
  }

  svg {
    path {
      stroke: ${(props: any) => props.theme.token.colorText11th};
    }
  }
`

export const SeemoreBtnStyled = styled(SeemoreBtn)`
  margin-top: 16px;
  background-color: ${({ theme }: any) => theme.token.colorPrimary};
  padding: 10px 25px;
  height: auto;
  border-radius: 100px;
  border: none;
  box-shadow: none;

  @media screen and (max-width: 1199px) {
    width: 168px;
    margin-top: 11px;
    font-size: 14px;
    line-height: normal;
    padding: 9px 0;
  }
`

// mobile
export const FighterInfoGeneralMobileStyed = styled.div`
  width: 375px;
  height: 267px;
  background-image: url(${FighterDetailBannerMobile.src});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 auto;

  .top-content {
    padding: 16px 16px 0 16px;

    .fighter-name {
      font-size: 20px;
      line-height: normal;
      margin-bottom: 2px;
      word-break: break-all;
      width: fit-content;
    }

    .fighter-name-kanji {
      font-size: 18px;
      line-height: normal;
      margin-bottom: 7px;
      width: fit-content;
    }
  }

  .bottom-content {
    display: flex;
    align-items: start;
    gap: 12px;

    .body-index {
      .score {
        margin-bottom: 10px;
        font-size: 18px;
        line-height: normal;
      }
    }
  }
`

export const FighterInfoGeneralImgMobileStyled = styled.div`
  width: 128px;
  height: 185px;
  margin-left: 7px;
`

export const MatchHistoryMobileStyled = styled.div`
  width: 100%;
  height: 178px;
  padding: 8px 8px 0 8px;
  border-radius: 5px;
  border: 1px solid #e5e3e3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .fighter-result {
    display: flex;
    justify-content: space-between;
  }

  .match-general {
    text-align: center;

    .match-name,
    .fighter-vs {
      font-size: 12px;
      line-height: normal;
    }

    .match-name {
      margin-bottom: 2px;
    }
  }
`

export const FighterMobileStyled = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
`
