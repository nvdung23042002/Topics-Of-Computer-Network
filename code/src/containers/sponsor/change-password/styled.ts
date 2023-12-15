import { Button } from 'antd'
import styled from 'styled-components'

export const ButtonStyled = styled(Button)<{ type?: string }>`
  min-width: 148px;
  height: 52px;
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
  @media screen and (max-width: 570px) {
    height: 40px;
    &:not(:first-child) {
      margin-left: 0px;
    }
  }
`

export const LoginContainerStyled = styled.div`
  background-color: #fff;
  width: calc(100% - 20px);
  max-width: 580px;
  text-align: center;
  padding: 55px 55px 40px;

  & h1.ant-typography {
    font-size: 30px;
    margin: 30px 0 16px 0 !important;
  }

  @media screen and (max-width: 775px) {
    & h1.ant-typography {
      font-size: 26px;
      margin: 46px 0 36px 0 !important;
    }
  }
  @media screen and (min-width: 571px) {
    margin: 20vh auto 0;
  }
  @media screen and (max-width: 570px) {
    flex: 1;
    padding: 15vh 16px;
    width: 100%;
    min-height: 100%;
  }

  .link-to-register {
    color: ${(props) => props.theme.token.colorPrimary};
  }
  .link-to-forgot {
    color: ${(props) => props.theme.token.colorText};
    float: right;
    font-weight: 500;
  }
  .input-attention {
    font-size: 12px;
    position: absolute;
    bottom: -20px;
    left: 0;
  }
  .remember-me-container {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .ant-form-item {
      margin-bottom: 0;
    }
    span {
      flex: 1;
      text-align: left;
    }
  }
`
