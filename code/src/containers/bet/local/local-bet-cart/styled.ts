import ButtonCommon from '@/components/common/button'
import styled from 'styled-components'

export const BetCartStyled = styled.div<{ maxWidth: number; bgColor: boolean; padding?: string }>`
  max-width: ${(props: any) => props.maxWidth}px;
  background-color: ${(props: any) => (props.bgColor ? props.theme.token.colorBg5th : 'unset')};
  border-radius: 10px;
  border: 1px solid ${(props: any) => props.theme.token.colorBorder3th};
  /* margin-bottom: 24px; */
  max-height: calc(100vh - 128px);
  .ant-tabs,
  .ant-tabs-content,
  .ant-tabs-tabpane,
  .ant-spin-nested-loading,
  .ant-spin-container {
    height: 100% !important;
  }

  @media screen and (max-width: 1199px) {
    min-height: unset;
    max-height: unset;
    height: 100%;
    margin-bottom: 60px;
    width: 100%;
    max-width: unset;

    .ant-tabs,
    .ant-tabs-content,
    .ant-tabs-tabpane,
    .ant-spin-nested-loading,
    .ant-spin-container {
      height: 100% !important;
    }
  }

  .ant-divider {
    background-color: ${(props: any) => props.theme.token.colorBg4th};
    margin: 0;
    opacity: 0.5;
  }

  &.col-bet-right {
    .ant-tabs > .ant-tabs-nav {
      margin-bottom: 21px;
      padding-left: 40px;
      padding-right: 40px;

      @media screen and (max-width: 1199px) {
        padding-left: 20px;
        padding-right: 20px;
      }

      .ant-tabs-nav-list {
        width: 100%;
        justify-content: space-between;

        .ant-tabs-tab {
          padding-top: 30px;
          padding-bottom: 5px;

          @media screen and (max-width: 1199px) {
            padding-top: 20px;
          }

          &:nth-child(2) {
            margin-left: 48px;

            @media screen and (max-width: 1199px) {
              margin: 0;
            }
          }

          &:nth-child(3) {
            margin-left: 45px;

            @media screen and (max-width: 1199px) {
              margin: 0;
            }
          }
        }
      }

      .ant-tabs-tab-btn {
        font-size: 16px;
        line-height: normal;

        @media screen and (max-width: 1199px) {
          font-size: 14px;
          line-height: normal;
        }
      }
    }
  }
`

export const BetCartNoDataStyled = styled.div`
  font-size: 18px;
  line-height: 26px;
  opacity: 0.5;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PaymentBtnStyled = styled(ButtonCommon)`
  width: 100%;
  height: 34px;
  background-color: ${(props: any) => props.theme.token.colorPrimary};
  border-color: ${(props: any) => props.theme.token.colorPrimary};
  border-radius: 2px;
  font-size: 16px;
  line-height: 23px;

  @media screen and (max-width: 1199px) {
    font-size: 14px;
    line-height: normal;
    margin-bottom: 18px;
  }

  &:disabled {
    background-color: ${(props: any) => props.theme.token.colorPrimary};
    border-color: ${(props: any) => props.theme.token.colorPrimary};
    opacity: 0.5;
  }

  span {
    color: ${(props: any) => props.theme.token.colorText2th};
  }
`

export const TotalBetStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

  & > * {
    font-size: 16px;
    line-height: 23px;

    @media screen and (max-width: 1199px) {
      font-size: 14px;
      line-height: normal;
    }
  }

  .total-tickets-left,
  .total-tickets-bet,
  .total-tickets-owned,
  .total-tickets-bet-win {
    width: 180px;
    display: flex;
    justify-content: end;
    overflow: hidden;
    white-space: nowrap;

    & > div {
      display: inline-block;
      vertical-align: top;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`

export const TotalMoneyPaymentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;

  .value {
    width: 180px;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    justify-content: end;

    & > div {
      display: inline-block;
      vertical-align: top;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  & > * {
    font-size: 18px;
    line-height: 26px;

    @media screen and (max-width: 1199px) {
      font-size: 16px;
      line-height: normal;
    }
  }
`

export const MyBetBtnStyled = styled(ButtonCommon)`
  width: 100%;
  margin-top: 3px;
  border-radius: 2px;
  padding-top: 5px;
  padding-bottom: 6px;
  height: auto;

  @media screen and (max-width: 1199px) {
    margin-bottom: 18px;
    padding: 0;
    height: 34px;
  }
`
