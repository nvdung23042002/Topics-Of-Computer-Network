import typography from '@/components/common/typography'
import styled from 'styled-components'
import button from '@/components/common/button'
import { Descriptions, Form, Modal } from 'antd'
import { RadioButton, RadioGroup } from '@/components/common/radio'

export const ModalStyled = styled(Modal)`
  border-radius: 20px;
  overflow: hidden;
`
export const ModalBodyStyled = styled.div`
  padding: 20px;
  .form-content {
    display: flex;
    margin-top: 10px;
    & > div {
      flex: 1;
    }
    & > div:first-child {
      padding-right: 31px;
    }
    & > div:last-child {
      padding-left: 22px;
      border-left: 1px solid rgba(111, 125, 149, 0.2);
    }
  }
  .three-arrow-right-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(calc(-50% + 4px));
    color: ${(props) => props.theme.token.colorTextBlue};
  }
  .choose-currency {
    display: flex;
    justify-content: space-between;
    & > span {
      font-weight: 500;
      font-size: 16px;
      color: #183b56;
    }
    margin-bottom: 30px;
  }
  .button-group {
    margin: 30px 0px;
  }
  .color-blue {
    color: #2969df;
  }
  .checkbox {
    font-size: 12px;
    font-weight: 400;
    color: #6f7d95;
  }
`
export const DescriptionsStyled = styled(Descriptions)`
  margin-bottom: 50px;
  &.ant-descriptions .ant-descriptions-row > td {
    padding-bottom: 5px;
  }
  &.ant-descriptions .ant-descriptions-row > td.last-child-top {
    padding-bottom: 50px;
  }
  .ant-descriptions-item-container {
    .ant-descriptions-item-label {
      width: 40%;
    }
    .ant-descriptions-item-content {
    }
  }
  .divider-description {
    margin: 12px 0;
    background: rgba(41, 45, 51, 0.5);
  }
`
export const RadioGroupChooseCurrency = styled(RadioGroup)`
  display: flex;
  gap: 10px;
`
export const RadioButtonCurrency = styled(RadioButton)`
  border-radius: 6px;
`
export const ButtonStyled = styled(button)`
  &.ant-btn-primary:disabled {
    color: #fff;
    background-color: ${(props) => props.theme.token.colorPrimary};
    box-shadow: 0 2px 0 rgba(5, 255, 72, 0.06);
    opacity: 0.3;
    border-color: transparent;
  }
  width: 100%;
  border-radius: 999px;
  height: fit-content;
  padding: 0;
  span {
    padding: 10px 0;
  }
`
export const TitleStyled = styled(typography.Title)`
  &.ant-typography {
    font-size: 20px;
    font-weight: 600;
    line-height: normal;
  }
`
export const ButtonSubmit = styled(button)`
  &.ant-btn-primary:disabled {
    color: #fff;
    background-color: ${(props) => props.theme.token.colorPrimary};
    box-shadow: 0 2px 0 rgba(5, 255, 72, 0.06);
    opacity: 0.7;
    border-color: transparent;
  }
  padding: 0;
  height: fit-content;
  border-radius: 999px;
  span {
    padding: 10px 0;
  }
  max-width: 156px;
`
export const ButtonCancel = styled(button)`
  &.ant-btn-default:disabled {
    opacity: 0.7;
    border-color: transparent;
  }
  padding: 0;
  height: fit-content;
  border-radius: 999px;
  span {
    padding: 10px 0;
  }
  max-width: 152px;
`
export const FormStyled = styled(Form)`
  .label {
    font-size: 16px;
    font-weight: 500;
    color: #183b56;
  }
  .ant-form-item {
    margin-bottom: 16px;
  }
  .action {
    display: flex;
    justify-content: center;
    margin-top: 75px;
    gap: 8px;
    .btn-action {
      flex: 1;
    }
  }
`
