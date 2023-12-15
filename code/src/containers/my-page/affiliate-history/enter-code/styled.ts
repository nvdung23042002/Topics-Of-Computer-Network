import styled from 'styled-components'
import { Layout as LayoutAnt, Button } from 'antd'

export const LayoutAntStyled = styled(LayoutAnt)`
  min-height: 100vh;
  background: #e9ecef;
  .title {
    margin-top: 45px;
  }
`
export const EnterCodeContainer = styled.div`
  background-color: #fff;
  width: calc(100% - 20px);
  max-width: 580px;
  text-align: center;
  padding: 55px 55px 40px;
  @media screen and (max-width: 575px) {
    width: 100%;
    height: 100vh;
    padding: 40px 16px;
  }
`
export const ButtonStyled = styled(Button)`
  max-width: 272px;
  width: 100%;
  &.ant-btn {
    height: fit-content;
    padding: 0;
    border-radius: 999px;
  }
  span {
    padding: 11px 0px;
  }
  &.ant-btn-primary:disabled {
    border-color: ${(props) => props.theme.token.colorPrimary};
    background: ${(props) => props.theme.token.colorPrimary};
    color: #fff;
    opacity: 0.7;
  }
`
export const ContainerForm = styled.div`
  margin-top: 24px;
  .action-container {
    display: flex;
    justify-content: space-around;
    gap: 34px;
    margin-top: 16px;
    @media screen and (max-width: 575px) {
      gap: 10px;
    }
  }

  label {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    font-feature-settings: 'clig' off, 'liga' off;
    color: #6f7d95;
  }
  .ant-form-item-with-help .ant-form-item-explain {
    display: flex;
  }
`
