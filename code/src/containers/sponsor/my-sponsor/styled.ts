import styled from 'styled-components'

export const MenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  & > .menu-item {
    display: flex;
    align-items: center;
    column-gap: 6px;
    font-size: 16px;
    cursor: pointer;
    color: ${(props) => props.theme.token.colorBorder};
    white-space: nowrap;
    &.menu-item-active {
      color: ${(props) => props.theme.token.colorPrimary};
      font-weight: 700;
    }
    svg {
      width: 24px;
    }
  }
  & > button.menu-item {
    background: none;
    outline: none;
    border: none;
    padding: 0;
    white-space: nowrap;
  }
  & + div {
    flex: 1;
  }
`

export const MySponsorStyled = styled.div`
  display: flex;
  padding: 40px 15px;
  column-gap: 96px;

  @media screen and (max-width: 1199px) {
    display: block;
    padding: 16px;
  }

  .sponsor-body {
    overflow: hidden;
  }
`
