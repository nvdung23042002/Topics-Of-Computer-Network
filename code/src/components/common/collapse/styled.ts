import CollapseDropdownIcon from '@/components/icons/CollapseDropdownIcon'
import { Collapse } from 'antd'
import styled from 'styled-components'

export const CollapseStyled = styled(Collapse)`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .ant-collapse-item > .ant-collapse-header {
    background-color: ${({ theme }: any) => theme.token.colorBg2th};
    border-radius: 5px !important;
    flex-direction: row-reverse;
    padding: 11px 10px;

    .ant-collapse-expand-icon {
      padding-inline-end: unset;
    }

    .ant-collapse-header-text {
      font-size: 16px;
      line-height: 23px;

      .w-fit-content {
        width: fit-content;
      }
    }
  }

  .ant-collapse-content {
    margin-top: 5px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
  }

  .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    padding-block: 0;
  }
`

export const RightOutlinedStyled = styled(CollapseDropdownIcon)<{ active: string }>`
  svg {
    transform: ${({ active }: any) => {
      return active === 'true' ? `rotate(360deg)` : `rotate(270deg)`
    }};
  }
`
