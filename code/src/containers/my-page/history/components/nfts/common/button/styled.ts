import { Button } from 'antd'
import styled from 'styled-components'

export const ButtonStyled = styled(Button)`
  &.ant-btn {
    height: fit-content;
    border-radius: 999px;
    width: 100%;
    padding: 0;
    span {
      font-size: 14px;
      font-weight: 500;
      padding: 6px 0px;
      &.anticon-spin {
        padding: 0px;
      }
    }
    &.ant-btn-primary {
      box-shadow: unset;
    }
    &.ant-btn-primary:disabled {
      border-color: transparent;
      color: #fff;
    }
    @media screen and (max-width: 575px) {
      span {
        font-size: 12px;
        font-weight: 500;
        padding: 4px 0px;
        &.anticon-spin {
          padding: 0px;
        }
      }
    }
    &.ant-btn-primary {
      box-shadow: unset;
    }
    @media screen and (max-width: 575px) {
      span {
        font-size: 12px;
        font-weight: 500;
        padding: 4px 0px;
      }
    }
  }
`
