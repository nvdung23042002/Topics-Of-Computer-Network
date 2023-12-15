import styled from 'styled-components'
import Table from '@/components/common/table'

export const NewRegisteredTableContainer = styled.div`
  min-height: 300px;
  margin-top: 8px;
  .text-blue {
    color: #2969df;
    font-weight: 500;
  }
`
export const PaginationGroup = styled.div`
  margin-top: 16px;
`
export const TableStyled = styled(Table)`
  span {
    color: #6f7d95;
  }
  &.ant-table-wrapper .ant-table-thead > tr > th {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    color: #183b56;
  }
  .ant-table-column-title {
    width: fit-content;
    flex: unset;
  }
  .ant-table-column-sorters {
    justify-content: start;
  }
  .ant-table-cell {
    .sort {
      span {
        color: #183b56;
      }
    }
  }
`
