import styled from 'styled-components'
export const NavStyled = styled.nav<{ type: 'left' | 'right' }>`
  display: flex;
  gap: 60px;
  .nav-active {
    color: ${(props) => props.theme.token.colorPrimary};
  }
  .active {
    color: ${(props) => props.theme.token.colorPrimary} !important;
  }
  &.mobile {
    align-items: flex-start;
    flex-direction: column;
    gap: 32px;

    .search {
      display: none;
    }
  }
`
