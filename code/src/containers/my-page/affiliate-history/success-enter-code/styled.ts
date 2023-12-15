import styled from 'styled-components'
import { Layout as LayoutAnt, Button } from 'antd'

export const LayoutAntStyled = styled(LayoutAnt)`
  min-height: 100vh;
  background: #e9ecef;
  .title {
    margin-top: 20px;
    margin-bottom: 50px !important;
  }
`
export const SuccessEnterCodeContainer = styled.div`
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

export const ButtonStyled = styled(Button)<{ type?: string }>`
  min-width: 168px;
  height: 52px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
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
  @media screen and (max-width: 575px) {
    height: 46px;
    min-width: 200px;
  }
`
export const ButtonGroupStyled = styled.div`
  margin-top: 43px;
`
