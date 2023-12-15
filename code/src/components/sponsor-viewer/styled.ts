import styled from 'styled-components'

export const BannerStyled = styled.div`
  display: block;
  outline: none;
  width: 100%;
  height: 100%;
  max-height: 250px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  img {
    pointer-events: none;
  }
`

export const BackdropStyled = styled.div`
  background-color: ${(props) => props.theme.token.colorBgMask};
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -9999;
  visibility: hidden;
  opacity: 0;
  &.visible {
    z-index: 11;
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
  }
`
