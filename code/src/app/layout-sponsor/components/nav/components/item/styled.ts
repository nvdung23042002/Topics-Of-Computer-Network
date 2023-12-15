import { MEDIA_SCREEN } from '@/constants/common'
import styled from 'styled-components'
export const NavItemStyled = styled.div`
  line-height: 100%;
  .link_item {
    font-weight: 500;
    font-size: 1rem;
    color: inherit;
    transition: opacity ease-in-out 0.3s;
    color: ${(props) => props.theme.token.colorHeading};
    display: inline-flex;
    align-items: center;
    column-gap: 8px;
    &:hover {
      opacity: 0.7;
    }
  }
  @media screen and (min-width: ${MEDIA_SCREEN.LARGE_SIZE}px) {
    .link_item {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
  @media screen and (min-width: 1440px) {
    .link_item {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`
