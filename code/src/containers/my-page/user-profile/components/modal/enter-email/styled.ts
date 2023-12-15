import button from '@/components/common/button'
import Input from '@/components/common/form/Input'
import { Modal } from 'antd'
import styled from 'styled-components'

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
  @media screen and (max-width: 575px) {
    padding: 10px;
  }
`
export const TitleForm = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
  margin-bottom: 32px;
`
export const ButtonActionGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  @media screen and (max-width: 575px) {
    margin-top: 20px;
    margin-bottom: 10px;
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
`
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
export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    overflow: hidden;
  }
`
