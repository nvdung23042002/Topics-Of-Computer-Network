import styled from 'styled-components'
import { Menu, Space } from 'antd'
export const LanguageGroupStyled = styled.div`
  cursor: pointer;
  &.ant-dropdown .ant-dropdown-menu {
    padding: 8px 12px;
  }
  :global(.ant-dropdown .test) {
    display: none;
  }
  li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child {
    padding: 0px;
    &:first-child {
      margin-bottom: 5px;
    }
    /* width: fit-content; */
    /* height: fit-content; */
  }
`
export const MenuLanguage = styled(Menu)``

export const MenuLabel = styled.div`
  display: flex;
  gap: 10px;
  padding: 5px 12px;
  border-radius: 4px;
  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #183b56;
  }
  &.active {
    background-color: rgba(0, 0, 0, 0.04);
  }
`
export const MenuLabelSelected = styled(Space)`
  transition: opacity 0.3s ease-in-out;
  width: 150px;
  &:hover {
    opacity: 0.7;
  }
  span {
    color: #183b56;
  }
  .ant-space-item:last-child {
    display: flex;
    align-items: center;
  }
`
