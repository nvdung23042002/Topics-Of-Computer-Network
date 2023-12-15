import { Table } from 'antd'
import styled from 'styled-components'

export const PaginationBox = styled.div`
  min-height: 55px;
  background: ${(props) => props.theme.main};
  display: flex;
  align-items: center;
  padding: 0 15px;
  justify-content: center;
  span {
    font-weight: bold;
  }
  /* &.table-pagination {
    border-bottom-left-radius: ${(props) => props.theme.borderRadius}px;
    border-bottom-right-radius: ${(props) => props.theme.borderRadius}px;
  } */
`

export const TableContainerStyled = styled.div`
  .ant-table-row:has(.ant-table-cell .ant-checkbox-wrapper-disabled) {
    .ant-table-cell:not(.ant-table-selection-column) {
      opacity: 0.6;
    }
  }
  .ant-table-cell {
    vertical-align: middle;
  }

  .ant-table-wrapper .ant-table-thead > tr > td,
  .ant-table-wrapper .ant-table-thead > tr > th {
    font-size: 14px;
    font-weight: 500;
    padding: 8px 12px;
    background: transparent;
    white-space: nowrap;

    &::before {
      visibility: hidden;
    }

    .sort {
      background: none;
      border: none;
      padding: 0;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      cursor: pointer;
      path {
        color: ${(props) => props.theme.colorTableBody};
        opacity: 0.3;
      }
    }
    .sort-asc {
      path:first-child {
        color: ${(props) => props.theme.textColor};
        opacity: 1;
      }
    }
    .sort-desc {
      path:last-child {
        color: ${(props) => props.theme.textColor};
        opacity: 1;
      }
    }
  }

  .ant-table-wrapper .ant-table-tbody > tr > td,
  .ant-table-wrapper .ant-table-tbody > tr > th {
    font-size: 14px;
    padding: 8px 12px;
    color: ${(props) => props.theme.colorTableBody};

    & .ant-btn:enabled {
      color: currentColor;
    }

    .button-link {
      font-size: 14px;
      background: none;
      border: none;
      width: max-content;
      font-family: 'Noto Sans JP', sans-serif;
      padding: 0;
      text-align: left;
      cursor: pointer;
      color: ${(props) => props.theme.link};
      &:hover {
        color: ${(props) => props.theme.linkHover};
      }
    }
  }
`

export const TableStyled = styled(Table)`
  min-height: 150px;
`
