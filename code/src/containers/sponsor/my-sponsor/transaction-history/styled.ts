import button from '@/components/common/button'
import CollapseComponent from '@/components/common/collapse'
import { Modal } from 'antd'
import styled from 'styled-components'

export const TransactionHistoryWrapperStyled = styled.div`
  @media screen and (max-width: 1199px) {
    .bread-crumb-mobile {
      .title-transaction {
        color: #183b56;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 26px;
        margin-bottom: 16px;
      }
    }
  }
`

export const SponsorTransactionHistoryStyled = styled.div`
  width: 100%;
  & .title {
    margin-bottom: 24px !important;

    @media screen and (max-width: 1199px) {
      font-size: 16px;
      line-height: normal;
      margin-bottom: 10px !important;
    }
  }
  .amount-value {
    font-weight: 700;
    color: ${(props) => props.theme.token.colorText};
  }
  .total {
    text-align: right;
    color: #2969df;
    font-size: 18px;
    font-weight: 700;
    margin: 8px 0;

    @media screen and (max-width: 1199px) {
      font-size: 16px;
    }
  }
  .checkbox-text {
    color: ${(props) => props.theme.token.colorText};
  }
  .type-tournament {
    color: ${(props) => props.theme.token.colorPrimary};
  }
  .type-match {
    color: #2969df;
  }
  .status-processing,
  .status-rejected,
  .status-cancelled_transferring,
  .status-cancelled_transferred,
  .status-fail {
    color: #ea1313;
  }
  .status-completed {
    color: #1cce66;
  }
  .status-approved {
    color: #2969df;
  }
  .status-requesting {
    color: #ffa928;
  }
  .title-note {
    font-size: 10px;
    display: block;
  }

  .policy {
    margin-bottom: 8px !important;
  }
`

export const ButtonStyled = styled(button)<{ match?: boolean; isActive?: boolean }>`
  min-width: 266px;
  height: 46px;
  font-weight: 400;
  font-size: 16px;
  margin: 32px auto 42px;
  &:disabled {
    border: none;
  }
`
export const PolicyModal = styled(Modal)`
  background: #fff;
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  .ant-modal-content {
    padding: 32px 0;
    max-height: 90vh;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1199px) {
      padding: 32px 14px;
    }

    .ant-modal-header {
      margin-bottom: 22px;

      @media screen and (max-width: 1199px) {
        margin-bottom: 16px;
      }

      padding: 0 44px;
      .ant-modal-title {
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        color: ${(props) => props.theme.token.colorText};

        @media screen and (max-width: 1199px) {
          font-size: 18px;
        }
      }
    }
    .ant-modal-body {
      overflow: hidden auto;
      padding: 0 28px 0 44px;

      @media screen and (max-width: 1199px) {
        padding: 0;
      }

      .policy-content {
        color: #000000;
        font-size: 16px;
      }
    }
    .ant-modal-footer {
      margin-top: 32px;
      padding: 0 44px;

      @media screen and (max-width: 1199px) {
        margin-top: 22px;
        padding: 0;
        display: flex;
        align-items: center;
      }

      button.ant-btn {
        height: 46px;
        min-width: 181px;
        font-weight: 400;
        font-size: 16px;
      }
    }
  }
`
export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  row-gap: 16px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 12px;
  }

  .group {
    width: 160px;
    margin-right: 16px;
    &:nth-child(2) {
      width: 240px;
    }

    @media screen and (max-width: 1199px) {
      width: unset;
      flex: 1;
    }
  }

  .button {
    align-self: flex-end;

    @media screen and (max-width: 1199px) {
      & > button {
        width: 100px !important;
        height: 40px;
      }
    }
  }

  @media screen and (max-width: 1199px) {
    .payment-search {
      margin-right: 7px;

      .ant-select-selector {
        height: 40px !important;

        .ant-select-selection-item {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`

// mobile

export const TransactionHistoryCollapseStyled = styled(CollapseComponent)`
  .ant-collapse-header {
    background-color: unset !important;
    justify-content: start;
    padding: 0 !important;
    gap: 8px !important;
    width: fit-content;
  }

  .ant-collapse-header-text {
    width: fit-content;
    display: block;
    flex: unset !important;
    margin: 0 !important;
    color: #183b56;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .ant-collapse-content {
    margin-top: 10px !important;
  }
`

export const SearchGroupMobileStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .group {
    margin-right: 0;

    .ant-select-selector {
      height: 40px !important;

      .ant-select-selection-item {
        display: flex;
        align-items: center;
      }
    }

    .ant-picker {
      min-height: 40px !important;
    }
  }

  .first-condition-group {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .second-condition-group {
    width: 100% !important;

    .ant-picker {
      width: 100%;
    }
  }

  .third-condition-group {
    display: flex;
    align-items: center;
    gap: 7px;
  }
`
