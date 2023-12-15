import Container from '@/components/container'
import { Tabs } from 'antd'
import styled from 'styled-components'

export const GlobalTabsWrapperStyled = styled.div``

export const GlobalBetContainerStyled = styled(Container)`
  @media screen and (max-width: 1199px) {
    padding: 0 16px 16px 16px;
  }
`

export const TabsStyled = styled(Tabs)`
  .ant-tabs-nav {
    &::before {
      display: none;
    }

    .ant-tabs-nav-wrap {
      .ant-tabs-nav-list {
        .ant-tabs-tab {
          color: #6f7d95;
          font-size: 24px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          padding-bottom: 5px;
        }

        .ant-tabs-ink-bar {
          background: transparent;
        }
      }
    }
  }
`

export const BetContainerStyled = styled(Container)`
  @media screen and (max-width: 1199px) {
    padding: 0 16px 16px 16px;
  }
`

export const TypeBetStyled = styled.div`
  margin-bottom: 32px;

  .type-bet {
    width: fit-content;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: #de1d43;
    border-bottom: 2px solid #de1d43;
  }
`

export const BetListDivChildStyled = styled.div<{ maxWidth: number; bgColor: boolean; padding?: string }>`
  max-width: ${(props: any) => props.maxWidth}px;
  background-color: ${(props: any) => (props.bgColor ? props.theme.token.colorBg3th : 'unset')};
  padding: ${(props: any) => (props.padding ? props.padding : 'unset')};
`

export const BetListContainerStyled = styled.div`
  margin-top: 16px;
  margin-bottom: 32px;

  @media screen and (max-width: 1199px) {
    position: relative;
    margin-top: 16px;
    /* margin-bottom: 63px; */

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

export const BetListRowStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 30px;
  position: relative;

  @media screen and (max-width: 1199px) {
    display: block;
  }
`

export const RightColStyled = styled.div`
  flex: 1;

  .col-wrap {
    flex: 1;
    @media screen and (min-width: 1200px) {
      /* min-height: 500px;
      max-height: calc(100vh - 212px);
      overflow-x: hidden;
      overflow-y: auto; */

      &::-webkit-scrollbar {
        width: 15px;
      }

      &::-webkit-scrollbar-thumb {
        border: 5px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        border-radius: 9999px;
        background-color: #aaaaaa;
      }
    }

    @media screen and (max-width: 1199px) {
      width: 100%;
    }
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

export const BetListTitleStyled = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tournaments-title {
    font-size: 24px;
    line-height: 35px;

    @media screen and (max-width: 1199px) {
      font-size: 16px;
      line-height: normal;
    }
  }

  .poolbet-tab-name {
    font-size: 18px;
    line-height: 26px;

    @media screen and (max-width: 1199px) {
      font-size: 16px;
      line-height: normal;
    }
  }
`
// @media screen and (min-width: 1200px) {
//   .ant-tabs-content-holder {
//     min-height: 300px;
//     max-height: 70vh;
//     overflow-y: auto;
//     overflow-x: hidden;

//     &::-webkit-scrollbar {
//       width: 15px;
//     }

//     &::-webkit-scrollbar-thumb {
//       border: 5px solid rgba(0, 0, 0, 0);
//       background-clip: padding-box;
//       border-radius: 9999px;
//       background-color: #aaaaaa;
//     }
//   }
// }
