import { Table } from 'antd'
import styled, { css } from 'styled-components'

export const WrapComponent = styled.div`
  margin-top: 10px;
`

export const TableStyled = styled(Table)`
  .ant-table {
    .ant-table-content {
      .ant-table-thead {
        tr {
          .ant-table-cell {
            border: none;
            background-color: transparent;

            &::before {
              display: none;
            }
          }
        }
      }

      .ant-table-tbody {
        .ant-table-row {
          .ant-table-cell {
            border-color: #f1f1f1;
          }
        }
      }
    }
  }

  .ant-pagination.ant-table-pagination {
    margin: 22px auto 30px;
    justify-content: center;

    .ant-pagination-options {
      display: none;
    }
  }
`

const TextInColumnStyled = css`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const OrderCodeStyled = styled.div`
  color: #2969df;
  cursor: pointer;
  ${TextInColumnStyled}
`

export const TextStyled = styled.div`
  color: #6f7d95;
  ${TextInColumnStyled}

  &.success {
    color: #1cce66;
    font-weight: 500;
  }

  &.error {
    color: #ea1313;
    font-weight: 500;
  }

  &.inprogess {
    color: #2969df;
    font-weight: 500;
  }
`

export const FirstLastPaginationButtonStyled = styled.button`
  background-color: transparent;
  outline: none;
  border: none;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  height: 32px;
  width: 32px;
  padding: 0;

  &.rotate {
    transform: rotate(-180deg);
  }

  &.mr-8 {
    margin-right: 6px;
  }

  &:hover {
    transition: all 0.2s;
    background-color: rgba(0, 0, 0, 0.06);
  }

  &:disabled {
    &:hover {
      background-color: transparent;
      cursor: no-drop;
    }
  }

  @media screen and (max-width: 768px) {
    height: 24px;
    width: 24px;
  }
`
