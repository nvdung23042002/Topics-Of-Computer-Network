import { Progress } from 'antd'
import styled from 'styled-components'

export const BetTicketsChartStyled = styled(Progress)`
  margin: 0;

  .ant-progress-inner {
    border-radius: 5px !important;
    width: 80px !important;
    height: 80px !important;

    @media screen and (max-width: 767px) {
      width: 56px !important;
      height: 56px !important;
    }
  }

  .ant-progress-circle-path:nth-child(3) {
    stroke: #1677ff !important;
  }
`

export const BetTicketsLineChartStyled = styled(Progress)`
  & > .ant-progress-outer {
    height: 10px !important;
  }

  .ant-progress-success-bg {
    background-color: ${({ theme }: any) => theme.token.colorPrimary};
  }
`
