import Container from '@/components/container'
import { Progress } from 'antd'
import styled from 'styled-components'

export const MatchDetailContainerStyled = styled(Container)`
  @media screen and (max-width: 1199px) {
    padding: 0 16px 16px 16px;
  }
`

export const DivChildStyled = styled.div<{ maxWidth: number; bgColor: boolean; padding?: string }>`
  max-width: ${(props: any) => props.maxWidth}px;
  background-color: ${(props: any) => (props.bgColor ? props.theme.token.colorBg3th : 'unset')};
  padding: ${(props: any) => (props.padding ? props.padding : 'unset')};

  &.col-bet-right {
    .ant-tabs > .ant-tabs-nav {
      margin-bottom: 21px;
      padding-left: 25px;
      padding-right: 25px;

      .ant-tabs-nav-list {
        .ant-tabs-tab {
          &:nth-child(2) {
            margin-left: 48px;
          }

          &:nth-child(3) {
            margin-left: 48px;
          }
        }
      }

      .ant-tabs-tab-btn {
        font-size: 16px;
      }
    }

    .ant-divider {
      background-color: ${(props: any) => props.theme.token.colorBg4th};
      margin: 0;
    }
  }
`

export const TimeTakesPlaceStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: 4px;
  margin-bottom: 14px;
  padding-left: 35px;

  @media screen and (max-width: 767px) {
    padding-left: 30px;
    margin-bottom: 16px;
  }

  .date-time {
    font-size: 16px;
    line-height: 23px;

    @media screen and (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
    }
  }
`

export const MatchFighterStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 118px;

  .fighter-vs {
    font-size: 20px;
    line-height: 29px;
  }
`

export const NoDataStyled = styled.div`
  margin-top: 32px;
`

export const BetDetailContainerStyled = styled.div<{ calculatedValue: any }>`
  position: relative;
  margin-top: 16px;
  margin-bottom: 32px;

  @media screen and (max-width: 1199px) {
    position: relative;
    margin-top: 16px;
    margin-bottom: 63px;

    .bet-slip-mobile {
      position: fixed;
      z-index: 99;
      transition: bottom 0.5s ease;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
    }

    .active {
      bottom: 0;
    }

    .un-active {
      bottom: -100vh;
    }
  }

  .divider-detail {
    margin: 32px 0;
  }

  iframe {
    display: block;
    width: 740px;
    height: 416px;
    margin: 0 auto;
    margin-top: 32px;

    @media screen and (max-width: 767px) {
      width: 343px;
      height: 193px;
      margin: 0 auto;
      margin-top: 18px;
    }
  }
`

export const BetListRowStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 30px;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    gap: 16px;
  }
`

export const BetSlipStyled = styled.div<{ scroll: any }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 52px;
  padding: 0 14px;
  z-index: 999;
  background-color: ${({ scroll }: any) => (String(scroll) === 'true' ? '#6F7D95' : '#de1d43')};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const RightColStyled = styled.div`
  flex: 1;
  width: 740px;

  @media screen and (max-width: 767px) {
    width: 100%;

    .count-time {
      font-size: 24px;
      line-height: normal;
    }

    .count-name {
      font-size: 14px;
      line-height: normal;
    }
  }

  .bread-crumb {
    display: flex;
    align-items: center;
    gap: 14px;
    width: fit-content;

    @media screen and (max-width: 1199px) {
      gap: 6px;
    }

    .match-name-status {
      display: flex;
      align-items: center;
      gap: 8px;

      @media screen and (max-width: 1199px) {
        gap: 6px;
      }

      .match-name {
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        word-break: break-all;

        @media screen and (max-width: 1199px) {
          font-size: 16px;
          font-weight: 700;
          line-height: 26px;
        }
      }
    }
  }

  .bread-crumb.no-start-date {
    margin-bottom: 14px;
  }
`

export const LeftColStyled = styled.div`
  @media screen and (min-width: 1200px) {
    width: 430px;
    position: sticky;
    top: 95px;
  }

  @media screen and (max-width: 1199px) {
    width: 100%;
  }
`

export const MatchFighterImgStyled = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: #000;

  & > img {
    position: unset !important;
    width: unset !important;
    height: unset !important;
  }

  /* @media screen and (max-width: 575px) {
    width: 343px;
    height: 128px;
  } */

  @media screen and (max-width: 1199px) {
    margin: 0 auto;
    margin-bottom: 16px;
  }
`

export const TicketsProcessStyled = styled.div`
  margin-bottom: 16px;

  .ant-progress {
    margin-bottom: unset;
  }

  .ant-progress-inner {
    border-radius: 8px !important;
  }
`

export const ProcessContentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    font-size: 16px;
    line-height: 23px;

    @media screen and (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
    }
  }
`

export const PlayerProcessStyled = styled.div`
  margin-bottom: 24px;

  .ant-progress {
    margin-bottom: unset;
  }

  .ant-progress-inner {
    border-radius: 8px !important;
  }
`

export const SponsorInfoStyled = styled.div`
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    align-items: center;
  }
`

export const SponsorInfoItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
`

export const ProgressStyled = styled(Progress)`
  & > .ant-progress-outer {
    height: 10px !important;
  }
  .ant-progress-success-bg {
    background-color: ${({ theme }: any) => theme.token.colorPrimary};
  }
`

export const SponsorTotalMoneyStyled = styled.div`
  margin-top: 14px;
  text-align: center;

  .sponsor-money {
    font-size: 30px;
    line-height: 43.44px;

    @media screen and (max-width: 767px) {
      font-size: 24px;
    }
  }

  .sponsor-desc {
    font-size: 16px;
    line-height: 23.17px;

    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
`

export const RowSponsorStyled = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 1199px) {
    .sponsor-item {
      display: flex;
      justify-content: center;
    }
  }
`

export const RowListSponsorStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
