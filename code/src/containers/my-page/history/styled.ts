import { RadioGroup, RadioButton } from '@/components/common/radio'
import typography from '@/components/common/typography'
import { Button, Tabs } from 'antd'
import styled from 'styled-components'

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

    &.title-pc {
      display: none;
    }
  }
`
export const ContainerContent = styled.div`
  margin-top: 32px;
  @media screen and (max-width: 991px) {
    margin-top: 0px;
  }
`
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
  &.ant-tabs .ant-tabs-tab {
    padding: 8px 0px;
  }
  @media screen and (max-width: 575px) {
    &.ant-tabs .ant-tabs-tab + .ant-tabs-tab {
      margin: 0 0 0 24px;
    }
    &.ant-tabs .ant-tabs-tab {
      font-size: 14px;
      font-weight: 500;
    }
    &.ant-tabs .ant-tabs-tab-active {
      font-weight: 700;
    }
    &.ant-tabs .ant-tabs-tab {
      padding: 8px 0px;
    }
  }
`
export const RadioButtonGroupStyled = styled(RadioGroup)`
  background: #e0e7f3;
  border-radius: 999px;
  padding: 4px;
  margin: 0 auto;
  &.beds {
    width: 338px;
    max-width: 338px;
    display: flex;
    .ant-radio-button-wrapper {
      max-width: 165px;
    }
  }
  &.nfts {
    width: 728px;
    display: flex;
    max-width: 728px;
    .ant-radio-button-wrapper {
      max-width: 180px;
    }
  }
  @media screen and (max-width: 768px) {
    &.nfts {
      width: 100%;
      display: flex;
      max-width: 100%;
      justify-content: space-between;
      .ant-radio-button-wrapper {
        max-width: 200px;
      }
    }
  }
  @media screen and (max-width: 575px) {
    &.beds {
      width: 100%;
      max-width: 100%;
      display: flex;
      .ant-radio-button-wrapper {
        max-width: 50%;
      }
    }
    &.nfts {
      width: 100%;
      display: flex;
      max-width: 100%;
      justify-content: space-between;
      .ant-radio-button-wrapper {
        max-width: fit-content;
        padding: 0 10px;
      }
    }
  }
`
export const RadioButtonStyled = styled(RadioButton)`
  &.ant-radio-button-wrapper {
    background-color: transparent;
    border-radius: 999px;
    span:not(.ant-radio-button) {
      font-size: 14px;
      font-weight: 500;
      text-transform: capitalize;

      color: #6f7d95;
      @media screen and (max-width: 575px) {
        font-size: 11px;
      }
    }
    @media screen and (max-width: 575px) {
      height: 26px;
      line-height: 21px;
    }
    padding-inline: unset;
    text-align: center;
    flex: 1;
  }

  &.ant-radio-button-wrapper-checked {
    background-color: #fff;
    color: #183b56;
  }
  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {
    border-color: transparent;
  }
  &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    border-color: transparent;
  }
`
export const HeaderMenuStyled = styled.div`
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
