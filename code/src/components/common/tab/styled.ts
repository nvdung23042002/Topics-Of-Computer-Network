import { Tabs } from 'antd'
import styled from 'styled-components'

export const TabStyled = styled(Tabs)<{ isBorderBottom: boolean }>`
  & > .ant-tabs-nav::before {
    border-bottom: ${({ theme, isBorderBottom }: any) =>
      isBorderBottom ? `1px solid ${theme.token.colorBorder}` : 'none'};
  }

  .ant-tabs-tab {
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: ${(props: any) => props.theme.token.colorText3th};

    &:nth-child(2) {
      margin-left: 55px;
    }
  }
`
