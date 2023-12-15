import styled, { createGlobalStyle } from 'styled-components'
import { Button, Card } from 'antd'
import typography from '@/components/common/typography'
import { IconButton } from '@/components/common/typography/styled'
import Container from '@/components/container'
import Input from '@/components/common/form/Input'

export const ButtonStyled = styled(Button)<{ type?: string }>`
  min-width: 148px;
  height: 46px;
  font-size: 14px;
  font-weight: 700;
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
  .ant-btn.ant-btn-round {
    padding-inline-start: 60px;
    padding-inline-end: 60px;
  }
`
export const ButtonChangePassword = styled(Button)`
  min-width: 148px;
  height: 46px;
  font-size: 14px;
  font-weight: 500;
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

  @media screen and (max-width: 1199px) {
    width: 100% !important;
  }
`
export const Title = styled(typography.Title)`
  .ant-typography {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  }
`
export const Header = styled.div`
  margin-bottom: 25px;

  @media screen and (max-width: 1199px) {
    text-align: center;
    margin-bottom: 46px;
  }
`
export const DeleteButtonIcon = styled(IconButton)`
  background-color: #fff;
  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));
  .icon {
    color: #ea1313;
  }
  &.ant-btn-text:not(:disabled):hover {
    background-color: #fff;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));
  }
`
export const CardAvatar = styled(Card)`
  position: relative;
  .delete-avatar {
    position: absolute;
    right: 40px;
  }
  width: fit-content;
  .ant-card-body {
    padding: 0px;
  }
  .container {
    padding: 30px;
  }
`
export const ContainerEditProfile = styled(Container)`
  margin-top: 40px;
  margin-bottom: 40px;
  min-height: 100vh;
  @media screen and (max-width: 1199px) {
    margin-top: 0;
    padding: 16px;

    .upload-logo-sponsor {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
    }
  }

  .group-btn {
    @media screen and (max-width: 1199px) {
      display: flex;
      flex-direction: column-reverse;
      gap: 16px;

      .submit-btn {
        display: flex;
        gap: 11px;

        & > button {
          flex: 1;
        }

        & > button:nth-child(2) {
          margin: 0;
        }
      }
    }
  }

  .form-container {
    display: flex;
    gap: 50px;

    @media screen and (max-width: 1199px) {
      flex-direction: column;
      gap: 28px;
    }
  }
  .btn-set-new-password {
    width: fit-content;
    min-width: 191px;
  }
`
export const GlobalSetting = createGlobalStyle`
  .ant-layout {
    background: #ffffff !important;
  }

`
export const InputStyled = styled(Input)``
