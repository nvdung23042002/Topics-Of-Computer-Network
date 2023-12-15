import styled from 'styled-components'
import Table from '@/components/common/table'

export const WithDrawalTableContainer = styled.div`
  margin-top: 24px;
  min-height: 300px;
`
export const PaginationGroup = styled.div`
  margin-top: 16px;
`
export const TableStyled = styled(Table)`
  .color-waring {
    color: #ffa928;
  }
  span {
    color: #6f7d95;
  }
  .history-id {
    color: #2969df;
    cursor: pointer;
  }
`
export const ButtonText = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  display: inline-block;
`
