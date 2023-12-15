import { Button } from 'antd'

import styled from 'styled-components'

export const ButtonStyled = styled(Button)`
  padding: 4px 12px;
  &:focus {
    outline-color: transparent !important;
  }

  &.hidden-icon {
    .ant-btn-icon {
      display: none;
    }
  }

  &.ant-btn-text:disabled {
    opacity: 0.5;
  }

  &.ant-btn-primary:disabled {
    opacity: 0.5;
    color: #ffffff;
    background-color: ${(props) => props.theme.token.colorPrimary};
    box-shadow: inherit;
  }
`
