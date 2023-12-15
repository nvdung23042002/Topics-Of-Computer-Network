import styled from 'styled-components'
import Table from '@/components/common/table'

export const TransactionHistoryContainer = styled.div`
  margin-top: 32px;
  width: 100%;
`
export const PaginationGroup = styled.div`
  margin-top: 16px;
`
export const TableStyled = styled(Table)`
  .status-fail {
    color: #c81a1a;
  }
  .status-offering {
    color: #dfa819;
  }
  .status-success {
    color: #05a532;
  }
  .status-new {
    color: #27add8;
  }
  .event-text {
    font-size: 14px;
    font-weight: 500;
    color: #2969df;
  }
  span {
    color: #6f7d95;
  }
  .link {
    color: #1677ff;
  }
`
