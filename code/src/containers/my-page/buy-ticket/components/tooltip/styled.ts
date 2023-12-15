import { Tooltip } from 'antd'
import styled from 'styled-components'

export const TooltipStyled = styled(Tooltip)`
  .ant-tooltip-inner {
    white-space: nowrap;
    width: 100%;
    min-width: fit-content;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px; /* 150% */
  }
  .ant-tooltip-content {
    min-width: fit-content;
  }
  .ant-tooltip-placement-bottom {
    min-width: fit-content;
  }
  .ant-tooltip-placement-top {
    min-width: fit-content;
  }
  @media screen and (max-width: 991px) {
    .ant-tooltip-content {
      margin-left: 20px;
    }
    .ant-tooltip-inner {
      white-space: break-spaces;
    }
  }
`
