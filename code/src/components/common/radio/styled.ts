import { Radio as RadioAnt } from 'antd'
import styled from 'styled-components'

export const RadioAntStyled = styled(RadioAnt)`
  /* display: none; */
  &.ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
    background-color: white;
    background-color: white;
  }
  &.ant-radio-wrapper .ant-radio-inner::after {
    background-color: ${(props) => props.theme.token.colorPrimary};
    width: 24px;
    height: 24px;
    margin-block-start: -12px;
    margin-inline-start: -12px;
    border-radius: 50%;
  }
`
export const RadioGroupStyled = styled(RadioAnt.Group)``
export const RadioButtonStyled = styled(RadioAnt.Button)`
  &.ant-radio-button-wrapper {
    height: fit-content;
    border: 1px solid transparent;
    background-color: #f1f1f1;
  }
  &.ant-radio-button-wrapper:not(:first-child)::before {
    background-color: transparent;
  }
`
