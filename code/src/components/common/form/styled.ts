import { Checkbox, DatePicker, Input, InputNumber, Radio, Select, TimePicker } from 'antd'
import styled from 'styled-components'

export const LabelStyled = styled.label`
  text-align: left;
  display: block;
  height: 24px;
  line-height: 24px;
  margin-bottom: 4px;
  margin-right: 16px;
  white-space: nowrap;
  font-weight: 500;
  color: ${(props) => props.theme.token.colorText3th};
`
export const InputStyled = styled(Input)`
  min-height: 46px;
  border-radius: 33px;
  padding: 4px 14px;
`

export const PasswordStyled = styled(Input.Password)`
  min-height: 46px;
  border-radius: 33px;
  padding: 4px 14px;
  input::placeholder {
    font-size: initial !important;
  }
  input[type='password'] {
    font: small-caption;
  }
  .ant-input-suffix svg {
    width: 20px;
    height: 18px;
    color: ${(props) => props.theme.token.colorText};
  }
`

export const NumberStyled = styled(InputNumber)`
  width: 100%;
  border-radius: 33px;
  overflow: hidden;
  border-color: #c5bfbf;
  .ant-input-number-input {
    min-height: 46px;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
`

export const CheckBoxStyled = styled(Checkbox)`
  color: ${(props) => props.theme.token.colorBorder};
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #fff !important;
  }
  .ant-checkbox .ant-checkbox-inner:after {
    border-color: ${(props) => props.theme.token.colorPrimary} !important;
  }
`

export const RadioGroupStyled = styled(Radio.Group)``

export const RadioStyled = styled(Radio)`
  &.ant-radio-wrapper .ant-radio-checked .ant-radio-inner {
    background-color: #fff !important;
  }
  &.ant-radio-wrapper .ant-radio-inner::after {
    background-color: ${(props) => props.theme.token.colorPrimary} !important;
  }
`

export const RadioButtonStyled = styled(Radio.Button)``

export const SelectStyled = styled(Select)`
  text-align: left;
  width: 100%;
  .ant-select-selector {
    height: 46px !important;
    border-radius: 33px;
    border-color: ${(props) => props.theme.token.colorBorder};
    .ant-select-selection-search .ant-select-selection-search-input {
      height: 100%;
    }
    .ant-select-selection-item,
    .ant-select-selection-placeholder {
      line-height: 44px;
    }
  }
`

export const OptionStyled = styled(Select.Option)``

export const AlertContent = styled.span`
  color: ${(props) => props.theme.token.colorCancel};
`

export const TextAreaStyled = styled(Input.TextArea)`
  border-radius: 10px;
  border: none;
  textarea {
    border-radius: 10px;
  }
  &.ant-input-textarea-show-count {
    & .ant-input-data-count {
      font-size: 10px !important;
      bottom: 0px;
      right: 4px;
    }
    &[disabled] .ant-input-data-count {
      color: ${(props) => props.theme.textColor};
    }
    &.ant-input-affix-wrapper-status-error .ant-input-data-count {
      color: ${(props) => props.theme.error};
    }
    &:hover .ant-input-data-count,
    &.ant-input-affix-wrapper-focused .ant-input-data-count {
      color: ${(props) => props.theme.primary};
    }
  }
`
export const RangePickerStyled = styled(DatePicker.RangePicker)`
  border-color: #c5bfbf;
  min-height: 46px;
  border-radius: 33px;
  width: 100%;
  &:hover .ant-picker-suffix {
    visibility: hidden;
  }
`
export const DatePickerStyled = styled(DatePicker)`
  min-height: 46px;
  border-radius: 33px;
  width: 100%;
  &.ant-picker .ant-picker-clear {
    right: 26px;
  }
  /* .ant-picker-dropdown .ant-picker-cell::before {
    top: 30%;
  } */
`
export const TimePickerStyled = styled(TimePicker)`
  border-radius: 33px;
  min-height: 46px;
  width: 100%;
`

export const FileStyled = styled.div`
  height: 46px;
  padding: 8px 8px;
  border-radius: 33px;
  background-color: #efefef;
  display: flex;
  align-items: center;
  input[type='file'] {
    display: none;
  }
  .button-file {
    cursor: pointer;
    margin-right: 4px;
    border-radius: 19px;
    height: 30px;
    background: #fff;
    color: ${(props) => props.theme.token.colorText};
    border: 1px solid ${(props) => props.theme.token.colorText};
  }

  .file-name {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(100% - 150px);
  }
`
export const SelectCountriesStyled = styled(SelectStyled)`
  width: 150px !important;
  margin-right: 4px;
  & + .ant-select-dropdown {
    width: 350px !important;
    max-width: 90vw;
    .ant-select-item {
      text-align: left !important;
    }
  }
`
