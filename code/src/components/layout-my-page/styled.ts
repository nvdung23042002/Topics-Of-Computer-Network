import styled from 'styled-components'
import container from '../container'
import { Drawer } from 'antd'
import typography from '../common/typography'
export const ContainerLayoutMyPage = styled(container)`
  display: flex;
  /* padding: 0 5px; */
  max-width: 1200px;
  margin: 40px auto;
  position: relative;
  min-height: inherit;
  gap: 91px;
  @media screen and (max-width: 1024px) {
    gap: 30px;
    padding: 0 16px;
  }
  @media screen and (max-width: 575px) {
    padding: 0 16px;
    margin-top: 0px;
  }
  @media screen and (max-width: 991px) {
    margin-top: 16px;
  }
`
export const Sider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 178px;
  .nav-link {
    display: flex;
    gap: 10px;
    align-items: center;
    color: #6f7d95;
    span {
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      white-space: nowrap;
      @media screen and (max-width: 575px) {
        font-size: 18px;
      }
    }
  }
  .nav-link.active {
    color: ${(props) => props.theme.token.colorPrimary};

    span {
      font-weight: 700;
    }
  }
  @media screen and (max-width: 575px) {
    display: none;
    &.mobile {
      display: flex;
    }
  }
  @media screen and (max-width: 991px) {
    display: none;
    &.mobile {
      display: flex;
    }
  }
`
export const ButtonLogout = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
  }
  &:hover {
    opacity: 0.7;
  }
`
export const Content = styled.div`
  flex: 1;
  /* margin-left: 92px; */
  min-height: 100vh;
  overflow-x: hidden;
  @media screen and (max-width: 1025px) {
    margin-left: 24px;
  }
  @media screen and (max-width: 991px) {
    width: 100%;
    margin-left: 0px;
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
    margin-left: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
`
export const DrawerStyled = styled(Drawer)`
  .ant-drawer-header {
    /* border-bottom: none; */
    padding: 25px 15px;
    padding-right: 10px !important;

    & > .ant-drawer-header-title {
      justify-content: flex-end;
      flex-direction: row-reverse;
      align-items: center;
      .ant-drawer-close {
        margin-inline-end: 0;
      }
    }
  }
  .ant-drawer-body {
    padding: 0px 22px;
    text-align: center;
    position: relative;
  }

  .desktop-button {
    display: none;
  }
`
export const HeaderMenuStyled = styled.div``
export const TitleStyled = styled(typography.Title)`
  &.menu-title {
    text-align: left;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
  }
`
