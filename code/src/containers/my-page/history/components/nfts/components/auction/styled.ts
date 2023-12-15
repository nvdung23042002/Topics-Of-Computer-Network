import { List } from 'antd'
import styled from 'styled-components'

export const AuctionContainer = styled.div`
  margin-top: 16px;
`
export const ListProduct = styled(List)`
  margin-top: 16px;
  .ant-col {
    padding-left: 8px;
    padding-right: 8px;
  }
  @media screen and (max-width: 575px) {
    .ant-col {
      padding-left: 4px;
      padding-right: 4px;
    }
  }
`
export const ButtonGroupStyled = styled.div`
  display: flex;
  gap: 9px;
  margin-top: 6px;
`
