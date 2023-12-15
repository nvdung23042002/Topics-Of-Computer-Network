import Container from '@/components/container'
import styled from 'styled-components'
import Button from '@/components/common/button'
import { MEDIA_SCREEN } from '@/constants/common'

export const HeaderStyled = styled.header`
  padding: 20px 15px;
  background: transparent;
  position: absolute;
  width: 100%;
  .link_item {
    color: #ffffff;
  }

  @media screen and (max-width: ${MEDIA_SCREEN.LARGE_SIZE}px) {
    padding: 15px;
  }
  &.hidden {
    opacity: 0;
    top: 0;
    transform: translateY(-100px);
  }
  &.fixed {
    transform: translateY(0);
    position: sticky;
    opacity: 1;
    z-index: 10;
    top: 0;
    max-width: 100vw;
    border-bottom: none;
    /* box-shadow: 0px 0px 6px 0px #808080; */
    background-color: #000000;
    transition: transform 0.4s ease-in, opacity 0.4s ease;
  }
`
export const HeaderTopStyled = styled.div`
  display: none;
  @media screen and (min-width: ${MEDIA_SCREEN.LARGE_SIZE}px) {
    display: flex;
    align-items: center;
    gap: 8px 2vw;
  }
`

export const HeaderMenuStyled = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: ${MEDIA_SCREEN.LARGE_SIZE}px) {
    display: none;
  }
`
export const HeaderLeftStyled = styled.div`
  line-height: 100%;
`
export const HeaderRightStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  gap: 0px;

  @media screen and (min-width: ${MEDIA_SCREEN.LARGE_SIZE}px) {
    gap: 20px;
  }
`
export const HeaderBottomStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const HeaderContainerStyled = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const ButtonIconStyled = styled(Button)`
  --font-size: 1.625rem;
  width: fit-content;
  height: fit-content;
  padding: 0;
  box-sizing: border-box;
  border-color: transparent;
  box-shadow: unset;
  border-radius: 50%;
  background-color: transparent;
  .icon {
    padding: 0.875rem;
    font-size: var(--font-size);
    color: #ffffff;
    & svg {
      width: 18px;
      height: 18px;
    }
  }
`

export const DrawContainerStyled = styled.div`
  background-color: ${(props) => props.theme.token.colorBgMask};
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -9999;
  visibility: hidden;
  opacity: 0;
  &.visible {
    z-index: 1000;
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
  }
`
export const DrawerStyled = styled.div`
  width: 375px;
  height: 100%;
  max-width: 100vw;

  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 100%;
  z-index: 1000;
  background: #fff;
  padding: 20px;
  transform: translateX(0);
  transition: transform 0.2s ease-in;
  &.visible {
    transform: translateX(-375px);
    transition: transform 0.4s ease-out;
  }
  .link_item {
    color: ${(props) => props.theme.token.colorText};
  }
  .drawer-header {
    position: relative;
    height: calc(175 / 812 * 100%);
    max-height: 175px;
    .logo {
      .anticon {
        width: unset !important;
        height: unset !important;
        & svg {
          height: 40px;
        }
      }
    }
    .close-btn {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .drawer-body {
    flex: 1;
    overflow: auto;
  }

  .drawer-footer {
  }

  .desktop-button {
    display: none;
  }
`
