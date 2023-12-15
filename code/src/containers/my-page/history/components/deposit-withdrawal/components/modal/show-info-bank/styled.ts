import table from '@/components/common/table'
import typography from '@/components/common/typography'
import { Button, Modal } from 'antd'
import styled from 'styled-components'

export const ContainerStyled = styled.div`
  padding: 30px 77px;
  .ant-popover-content {
    .ant-popconfirm-buttons button {
      height: fit-content;
    }
  }
  .btn-delete {
    span {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #ffff;
    }
  }
  .text-nowrap-1 {
    display: inline-block;
  }
  .text-b {
    font-weight: 700;
    font-size: 14px;
  }
  @media screen and (max-width: 575px) {
    padding: 22px;
  }
`
export const TitleStyled = styled(typography.Title)`
  &.ant-typography {
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
  }
  text-align: center;
  margin-top: 12px;
  margin-bottom: 32px !important;
  @media screen and (max-width: 575px) {
    margin-bottom: 22px !important;
    &.ant-typography {
      font-size: 18px;
    }
  }
`
export const TextStyled = styled(typography.Text)`
  &.ant-typography {
    color: #183b56;
  }
`
export const ButtonSubmitStyled = styled(Button)`
  min-width: 178px;
  height: 46px;
  font-size: 18px;
  font-weight: 400;
  background-color: ${(props) => (props.type === 'primary' ? props.theme.token.colorPrimary : '#ffffff')} !important;
  color: ${(props) => (props.type === 'primary' ? '#ffffff' : props.theme.token.colorBorder)} !important;
  border-color: ${(props) =>
    props.type === 'primary' ? props.theme.token.colorPrimary : props.theme.token.colorBorder} !important;
  &:not(:first-child) {
    margin-left: 8px;
  }
  &:disabled {
    opacity: 0.5;
  }
  &.ant-btn-text.btn-show-menu {
    border-color: transparent !important;
    width: fit-content;
    min-width: fit-content;
    padding: 0px;
    height: fit-content;
  }
  @media screen and (max-width: 786px) {
    min-width: 140px;
    font-size: 14px;
    height: 40px;
  }
  @media screen and (max-width: 575px) {
    &.ant-btn {
      font-size: 14px;
      height: fit-content;
      span {
        padding: 8px 0px;
      }
    }
  }
`

export const ButtonGroupStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 37px;
`

export const TableStyled = styled(table)`
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background-color: #fff;
  }
  .ant-table-tbody > tr.ant-table-row {
    span {
      white-space: nowrap;
      display: inline-block;
      &.account_name,
      &.bank-name,
      &.branch-name {
        max-width: 200px;
        white-space: break-spaces;
        width: max-content;
      }
    }
  }
  min-height: 100px;
  .ant-table-cell {
    border: unset;
    background: #fff;
    padding: 8px !important;
    &.name-crypto {
      padding-right: 22px !important;
      font-size: 16px;
      font-weight: 700;
    }

    &.public-address {
      padding-right: 29px !important;
      font-size: 14px;
      line-height: 24px;
    }

    &.action {
      text-align: end;
    }
  }

  .ant-table-thead {
    .ant-table-cell {
      background: #fff;
      border: unset;
      color: #183b56;
      font-size: 16px !important;
      font-weight: 700 !important;
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom: unset;
  }
  .ant-table-wrapper {
    height: 100%;

    .ant-spin-nested-loading {
      height: 100%;

      .ant-spin-container {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;

        .ant-table {
          flex: auto;
          overflow: hidden;

          .ant-table-container {
            height: 100%;
            display: flex;
            flex-flow: column nowrap;

            .ant-table-header {
              flex: none;
            }

            .ant-table-body {
              flex: auto;
              overflow: scroll;
            }
          }
        }

        .ant-table-pagination {
          flex: none;
        }
      }
    }
  }
`
export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    overflow: hidden;
  }
`

export const ButtonIcon = styled(Button)`
  width: 68px;
`

export const ButtonStyled = styled(Button)`
  height: 35px;
  width: 100px;
  &.ant-btn-primary:disabled {
    opacity: 0.7;
    background-color: ${(props) => props.theme.token.colorPrimary};
    border-color: ${(props) => props.theme.token.colorPrimary};
  }
`
