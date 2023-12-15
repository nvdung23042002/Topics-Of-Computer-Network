import styled from 'styled-components'
import container from '@/components/container'
import typography from '@/components/common/typography'
import { Tabs } from 'antd'
import { RadioGroup, RadioButton } from '@/components/common/radio'

export const ContainerStyled = styled(container)`
  margin-top: 50px;
`
export const TitleStyled = styled(typography.Title)`
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
`
export const TabsStyled = styled(Tabs)``
export const RadioButtonGroupStyled = styled(RadioGroup)`
  background-color: transparent;
  border-radius: 999px;
  padding: 4px;
  margin: 0 auto;
  &.beds {
    width: 100%;
    max-width: 325px;
    display: flex;
  }
`
export const RadioButtonStyled = styled(RadioButton)`
  &.ant-radio-button-wrapper {
    background-color: transparent;
    border-radius: 999px;
    line-height: unset;
    span:not(.ant-radio-button) {
      font-size: 16px;
      font-weight: 500;
      color: #183b56;
    }
    padding-inline: unset;
    text-align: center;
    display: inline-block;
    &:first-child {
      width: 113px;
      padding: 10px 0px;
    }
    &:last-child {
      width: calc(100% - 113px);
      padding: 10px 0px;
    }
  }
  &.ant-radio-button-wrapper-checked {
    background-color: #de1d43;
    span:not(.ant-radio-button) {
      color: #ffffff;
    }
  }
  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {
    border-color: transparent;
  }
  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    border-color: transparent;
  }
`
export const HeaderStyled = styled.div`
  margin-bottom: 15px;
`
