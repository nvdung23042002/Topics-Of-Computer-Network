import styled from 'styled-components'
export const NavStyled = styled.nav<{ type: 'left' | 'right' }>`
  display: flex;
  gap: 35px;
  .nav-active {
    color: ${(props) => props.theme.token.colorPrimary};
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
