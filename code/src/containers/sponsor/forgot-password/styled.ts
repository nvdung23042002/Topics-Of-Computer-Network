import styled from 'styled-components'
import { Layout as LayoutAnt, Button } from 'antd'

export const LayoutAntStyled = styled(LayoutAnt)`
  min-height: 100vh;
  background: #e9ecef;

  .title {
    font-size: 30px;
    margin-top: 30px;
    letter-spacing: -1px;
  }

  @media screen and (max-width: 775px) {
    .title {
      font-size: 26px;
      margin-top: 46px !important;
      letter-spacing: 0px;
    }
  }
`
export const ButtonStyled = styled(Button)<{ type?: string }>`
  min-width: 148px;
  height: 52px;
  font-size: 14px;
  font-weight: 700;
  background-color: ${(props) => (props.type === 'primary' ? props.theme.token.colorPrimary : '#ffffff')} !important;
  color: ${(props) => (props.type === 'primary' ? '#ffffff' : props.theme.token.colorText)} !important;
  border-color: ${(props) =>
    props.type === 'primary' ? props.theme.token.colorPrimary : props.theme.token.colorText} !important;
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
export const ForgotPasswordContainer = styled.div`
  background-color: #fff;
  width: calc(100% - 20px);
  max-width: 580px;
  text-align: center;
  padding: 55px 55px 40px;
  @media screen and (min-width: 571px) {
    margin: 20vh auto 0;
  }
  @media screen and (max-width: 570px) {
    flex: 1;
    padding: 15vh 16px;
    width: 100%;
    min-height: 100%;
  }
`
export const ContainerForm = styled.div`
  margin-top: 45px;
  .input-attention {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #6f7d95;
  }
  label {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    color: #6f7d95;
  }
  .action-container {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`
