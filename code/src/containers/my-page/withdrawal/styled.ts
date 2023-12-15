import Input from '@/components/common/form/Input'
import Radio, { RadioGroup } from '@/components/common/radio'
import typography from '@/components/common/typography'
import { Button, Select } from 'antd'
import styled from 'styled-components'
import InputNumberForm from '@/components/common/form/Number'
export const TitleStyled = styled(typography.Title)`
  &.title-modal.ant-typography {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 0 !important;
  }

  &.ant-typography {
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
  }
  margin-bottom: 30px !important;
  @media screen and (max-width: 991px) {
    &.title-mobile {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    &.title {
      display: none;
    }
  }
`
export const InputStyled = styled(Input)`
  max-width: 560px;
  /* background-color: #fff; */
  &.ant-input {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    padding: 11px 15px;
    border-radius: 999px;
    border-color: #c5bfbf;
  }
  &.ant-input-disabled {
    color: #183b56;
  }
  &.error {
    color: #ea1313;
  }
  &.ant-input:hover {
    border-color: #ea1313;
  }
  &.ant-input-disabled:hover {
    border-color: #c5bfbf;
  }
  &.ant-input:focus {
    border-color: #eb4460;
    box-shadow: unset;
  }
`
export const ContainerForm = styled.div`
  /* max-width: 560px; */
  .label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #6f7d95;
  }
  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #6f7d95;
  }
  .input-number {
    .ant-input {
      background: #f1f1f1;
    }
  }
  .amount-form-item {
    margin-bottom: 10px;
  }
  .payment-method {
    padding-top: 16px;
  }
  .last-child {
    .ant-form-item-control-input {
      padding-bottom: 0;
    }
    &.ant-form-item-with-help .ant-form-item-explain {
      margin-top: 0px;
    }
  }
  .ant-form-item-control-input {
    padding-bottom: 16px;
  }
  .ant-form-item-with-help .ant-form-item-explain {
    margin-top: -16px;
  }
  .ant-form-item {
    margin-bottom: 0px;
    .ant-form-item-explain-error {
      padding-left: 12px;
    }
  }
`
export const ButtonStyled = styled(Button)`
  min-width: 178px;
  height: 46px;
  font-size: 16px;
  font-weight: 400;
  background-color: ${(props) => (props.type === 'primary' ? props.theme.token.colorPrimary : '#ffffff')} !important;
  color: ${(props) => (props.type === 'primary' ? '#ffffff' : props.theme.token.colorBorder)} !important;
  border-color: ${(props) =>
    props.type === 'primary' ? props.theme.token.colorPrimary : props.theme.token.colorBorder} !important;
  &:not(:first-child) {
    margin-left: 8px;
  }
  &:disabled {
    opacity: 0.5;
  }
  &.ant-btn-text.btn-show-menu {
    border-color: transparent !important;
    width: fit-content;
    min-width: fit-content;
    padding: 0px;
    height: fit-content;
  }
  @media screen and (max-width: 786px) {
    min-width: 178px;
    font-size: 14px;
    height: 40px;
  }
  @media screen and (max-width: 575px) {
    &.ant-btn {
      font-size: 14px;
      height: 40px;
    }
  }
`
export const ButtonGroup = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 16px;
  max-width: 560px;
`
export const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  &.flex-row {
    flex-direction: row;
  }
`
export const RadioCustomStyled = styled(Radio)`
  .label {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #183b56;
  }
`
export const ContainerSubFrom = styled.div`
  margin-left: 24px;
  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div {
      flex: 1;
    }
  }
  .label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #6f7d95;
  }
  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #6f7d95;
  }
  .first-form-item {
    position: relative;
    .btn-choose-info-bank,
    .btn-choose-info-crypto {
      position: absolute;
      top: 28px;
      left: 560px;
      &.ant-btn {
        height: 46px;
        padding: 0;
        font-weight: 500;
        span {
          padding: 7px 0px;
        }
      }
    }
    @media screen and (max-width: 800px) {
      .btn-choose-info-bank,
      .btn-choose-info-crypto {
        position: static;
        margin-left: 0px;
        &.ant-btn {
          height: fit-content;
          font-size: 14px;
          /* padding: 0; */
        }
      }
      .btn-choose-info-bank {
        margin-bottom: 16px;
      }
    }
  }
  .btn-choose-info-bank,
  .btn-choose-info-crypto {
    margin-left: 8px;
  }
`
export const SelectStyled = styled(Select)`
  max-width: 560px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  .ant-select-selector {
    border-radius: 999px;
    padding: 8px 15px !important;
    height: fit-content !important;
    .ant-select-selection-item {
      font-size: 14px;
      font-weight: 500;
      line-height: 30px;
    }
  }
  .ant-select-arrow {
    color: #183b56;
  }
`
export const MessageSendSuccess = styled.div`
  font-size: 18px;
  color: #183b56;
  font-weight: 500;
  line-height: 24px;
  & > div {
    text-align: center;
  }
  & > div:last-child {
    & > span:first-child {
      color: #2969df;
    }
  }
`
export const InputNumberStyled = styled(InputNumberForm)`
  max-width: 560px;
  &.ant-input-number:hover {
    border-color: #eb4460;
  }
  &.ant-input-number-focused {
    box-shadow: unset;
    border-color: #eb4460;
  }
`
export const HeaderMenuStyled = styled.div`
  /* margin-top: 16px;
  margin-bottom: 16px; */
  margin-bottom: 10px;
  .ant-typography {
    display: flex;
    align-items: center;
    span {
      font-size: 18px;
      padding: 0px;
      &.icon {
        padding-right: 0px;
      }
      &:nth-child(2) {
        padding-right: 10px;
      }
    }
    margin-bottom: 0px !important;
  }
  &.mobile {
    display: none;
    /* .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    } */
  }
  &.tablet {
    display: none;
    /* .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    } */
  }
  .btn-show-menu {
    width: fit-content;
    &.ant-btn-text:not(:disabled):active {
      background-color: transparent;
    }
    &.ant-btn:not(:disabled):focus-visible {
      outline: 4px solid transparent;
    }
  }

  @media screen and (max-width: 991px) {
    .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    }
    &.tablet,
    &.mobile {
      display: block;
    }
  }
  @media screen and (max-width: 575px) {
    .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    }
  }
`
export const ButtonIconStyled = styled(Button)`
  --font-size: 24px;
  width: fit-content;
  height: fit-content;
  padding: 0;
  box-sizing: border-box;
  border-color: transparent;
  box-shadow: unset;
  border-radius: 50%;
  background-color: transparent;
  .icon {
    padding: 0.25rem;
    font-size: var(--font-size);
    & svg {
      width: 24px;
      height: 24px;
    }
  }
`
