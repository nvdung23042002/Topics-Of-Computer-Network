import typography from '@/components/common/typography'
import { Button, Tabs } from 'antd'
import styled from 'styled-components'

export const TabsStyled = styled(Tabs)`
  &.ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 75px;
  }
  &.ant-tabs .ant-tabs-tab {
    font-size: 18px;
    font-weight: 500;
  }
  &.ant-tabs .ant-tabs-tab-active {
    font-weight: 700;
  }
  @media screen and (max-width: 768px) {
    &.ant-tabs .ant-tabs-tab + .ant-tabs-tab {
      margin: 0 0 0 24px;
    }
    &.ant-tabs .ant-tabs-tab {
      padding: 8px 0px;
      font-size: 14px;
      font-weight: 500;
    }
  }
`
export const ContainerTable = styled.div`
  margin-top: 16px;
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
  }
  &.tablet {
    display: none;
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
export const ButtonStyled = styled(Button)`
  min-width: 178px;
  height: 46px;
  font-size: 18px;
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
      height: fit-content;
    }
  }
`

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
    }
    &.title {
      display: none;
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
