import DropDown from '@/components/dropdown'
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
    flex: 1;
  }
  & > img {
    background: #000;
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
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  @media screen and (min-width: 1199px) {
    height: 44px;
    .ant-typography {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`
export const DropDownStyled = styled(DropDown)`
  max-width: 280px;
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
        width: 24px;
      }
    }
  }
`
