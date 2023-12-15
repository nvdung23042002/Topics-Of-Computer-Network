import button from '@/components/common/button'
import DropDown from '@/components/dropdown'
import { MEDIA_SCREEN } from '@/constants/common'
import styled from 'styled-components'
export const UserInfoStyled = styled.div<{ disabled: boolean }>`
  display: flex;
  min-width: 100px;
  max-width: 350px;
  position: relative;
  align-items: center;
  border: 1px #c5bfbf solid;
  border-radius: 32px;
  height: 44px;
  width: fit-content;
  cursor: ${(props) => (props.disabled ? 'unset' : 'pointer')};
  &.noBorder {
    border: none;
  }
  .ant-typography {
    padding: 0 16px 0 8px;
  }
  & > img,
  & > span > svg {
    min-width: 44px;
    max-width: 44px;
    height: 44px;
    margin-top: -1px;
    margin-right: -1px;
    border-radius: 50%;
    align-self: stretch;
  }
  @media screen and (min-width: 1440px) {
    .ant-typography {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
  &.mobile {
    max-width: 100%;
    margin-left: auto;
  }

  @media screen and (min-width: 1199px) {
    .ant-typography {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`

export const MobileBtnStyled = styled.div`
  display: none;
  @media screen and (max-width: ${MEDIA_SCREEN.LARGE_SIZE}px) {
    display: block;
    position: absolute;
    width: calc(100% - 48px);
    bottom: 16px;
  }
`

export const MySponsorButton = styled(button)`
  border-color: transparent !important;
  font-weight: bold;
  border-radius: 28px;
  background-color: ${(props) => props.theme.token.colorPrimary} !important;
  color: #ffffff !important;
  height: 44px;
  &:hover,
  &:active,
  &:focus {
    opacity: 0.8;
  }
  &.desktop-button {
    min-width: 128px;
  }
  &.mobile-button {
    width: 100%;
  }
`
export const LoginButton = styled(button)`
  font-weight: bold;
  border-radius: 28px;
  border-color: transparent !important;
  background-color: #f1f1f1 !important;
  color: ${(props) => props.theme.token.colorPrimary} !important;
  height: 44px;
  &:hover,
  &:active,
  &:focus {
    opacity: 0.8;
  }

  &.desktop-button {
    min-width: 128px;
  }
  &.mobile-button {
    width: 100%;
  }
`
export const DropDownStyled = styled(DropDown)`
  /* max-width: 280px; */
  @media screen and (min-width: ${MEDIA_SCREEN.LARGE_SIZE + 1}px) {
    .name {
      color: #fff !important;
    }
  }
  .address {
    color: #0052ff;
    line-height: 16px;
  }
`
export const DropDownContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 20px 20px 16px;
  overflow: hidden;
  .user-info {
    display: flex;
    align-items: center;
    &-detail {
      margin-left: 10px;
      flex-grow: 1;
      svg {
        color: ${(props) => props.theme.token.colorText};
      }
    }
    .ant-typography {
      &:first-child {
        font-weight: 700;
        font-size: 16px;
      }
      color: ${(props) => props.theme.token.colorText};
    }
  }
  .ant-dropdown-menu {
    padding: 0;
    box-shadow: none;
    .ant-dropdown-menu-item {
      height: 40px;
      .anticon.ant-dropdown-menu-item-icon {
        &,
        svg {
          width: 24px;
        }
      }
      .ant-dropdown-menu-title-content {
        font-weight: 500;
      }
    }
  }
`
