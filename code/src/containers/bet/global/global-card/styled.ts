import { Tabs } from 'antd'
import styled from 'styled-components'

export const GlobalCardsWrapperStyled = styled.div``

export const TabsStyled = styled(Tabs)`
  > .ant-tabs-nav {
    border-radius: 10px 10px 0px 0px;
    background: rgba(111, 125, 149, 0.1);
    margin: 0;
    padding-bottom: 16px;
    border: 1px solid #d6e5e9;
    border-bottom: none;

    &::before {
      display: none;
    }

    .ant-tabs-nav-wrap {
      .ant-tabs-nav-list {
        .ant-tabs-tab {
          color: #6f7d95;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          padding-bottom: 5px;
        }
      }
    }
  }

  .col-bet-right {
    border-radius: 0 0 10px 10px !important;
    border-top: none;
  }
`
