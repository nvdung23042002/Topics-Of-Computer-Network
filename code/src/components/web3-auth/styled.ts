import { Input, Modal } from 'antd'
import styled from 'styled-components'
import button from '../common/button'
import { LoginType } from '.'
export const ContainerLogin = styled.div`
  margin: auto;
  max-width: 420px;
`
export const ModalStyled = styled(Modal)`
  position: relative;
  &.process .ant-modal-header,
  &.process .ant-modal-close {
    visibility: hidden;
  }
  .ant-modal-content {
    padding: 0;
    text-align: center;
    min-height: 533px;
    .ant-modal-header {
      background-color: #f6faff;
      padding: 13px 0;
      margin-bottom: 0;
      .ant-modal-title {
        font-size: 18px;
      }
    }
    .ant-modal-body {
      padding: 16px;
      .login-policy {
        color: #a8aeba;
      }
      .ant-typography + h5.ant-typography {
        margin-top: 16px;
        font-size: 16px;
      }

      .button-group {
        margin: 32px auto 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
      }
      .ant-btn:enabled {
        color: #ffffff;

        &.google {
          background-color: #045afc;
          width: 100%;
          height: 50px;
        }
        &.facebook {
          flex-grow: 1;
          background-color: #1877f2;
          height: 60px;
        }
        &.twitter {
          flex-grow: 1;
          background-color: #03a9f4;
          height: 60px;
        }
        &.discord {
          flex-grow: 1;
          background-color: #5865f2;
          height: 60px;
        }
      }
      .ant-divider {
        color: #a8aeba;
        font-weight: 400;
        &.ant-divider .ant-divider-inner-text {
          padding: 0 34px;
        }
        &.ant-divider-horizontal.ant-divider-with-text::before,
        &.ant-divider-horizontal.ant-divider-with-text::after {
          border-block-start-color: #a8aeba;
        }
      }
      .ant-form-item-explain-error {
        text-align: left;
        font-size: 14px;
      }
    }
  }
`

export const InputSendMailStyled = styled(Input)`
  border-radius: 999px;
  border-color: #e5e3e3;
  font-weight: 400;
  font-size: 16px;
  height: 50px;
  .ant-input-prefix {
    margin: 0px 10px;
  }
`

export const ButtonSubmit = styled(button)`
  width: 100%;
  height: 50px;
  &:disabled {
    border-color: transparent;
  }
`

export const ProcessingStyled = styled.div`
  transition: visibility 400ms ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px 40px;
  width: 100%;
  span.ant-typography {
    font-size: 16px;
  }
`
export const SocialIconStyled = styled.div<{
  type?: LoginType
}>`
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: ${(props) => props.theme.borderRadius ?? 8}px;
  background-color: ${(props: any) =>
    ({
      google: '#045afc',
      facebook: '#1877f2',
      twitter: '#03a9f4',
      discord: '#5865f2',
      email_passwordless: '#045afc'
    }[props?.type ?? 'google'])};
`
