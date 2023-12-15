import button from '@/components/common/button'
import Input from '@/components/common/form/Input'
import { Button, Modal } from 'antd'
import styled from 'styled-components'

export const InputStyled = styled(Input)`
  border-radius: 999px;
  padding: 11px 14px;
  font-size: 16px;
  font-weight: 500;
  &.ant-input[disabled] {
    color: #183b56;
    border-color: #c5bfbf;
  }
`
export const ContainerForm = styled.div`
  padding: 20px;
  label {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #6f7d95;
  }
  .ant-form-item-label {
    padding: 5px;
    .label {
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: #6f7d95;
    }
  }
  .attention {
    margin-top: 6px;
    font-size: 11px;
    font-weight: 400;
    line-height: 16px;
    color: #6f7d95;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .btn-resend-code {
    margin-top: 24px;
    &.ant-btn-primary:disabled {
      background-color: #2969df;
      border-color: #2969df;
      opacity: 0.7;
      color: #ffff;
    }
  }
  .btn-submit {
    margin-top: 32px;
  }
  @media screen and (max-width: 575px) {
    padding: 10px;
    .btn-submit {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .btn-resend-code {
      margin-top: 12px;
    }
  }
`
export const ButtonSubmit = styled(button)`
  height: 46px;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  width: 168px;
  border-radius: 999px;
  &.ant-btn-primary:disabled {
    border-color: ${(props) => props.theme.token.colorPrimary};
  }
`
export const ButtonStyled = styled(Button)`
  /* color: #ffffff; */
  height: 46px;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  width: 168px;
  border-radius: 999px;
`
export const ButtonActionGroup = styled.div`
  display: flex;
  justify-content: center;
`
export const TitleForm = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  margin-bottom: 32px;
  margin-top: 12px;
  @media screen and (max-width: 575px) {
    margin-bottom: 24px;
  }
`
export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    overflow: hidden;
  }
`
