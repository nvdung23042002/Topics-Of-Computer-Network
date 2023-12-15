import styled from 'styled-components'

export const SubNavContainerStyled = styled.div`
  /* margin-top: 22px; */
  width: 100%;
  background-color: ${(props) => props.theme.token.colorPrimary};
  height: 42px;
`

export const SubNavContentStyled = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 157px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`

export const NavStyled = styled.nav`
  display: flex;
  align-items: flex-start;
  gap: 38px;
  padding-bottom: 3px;

  .nav-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    border: none;
  }

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${(props) => props.theme.token.colorText2th};
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
    border: none;
  }

  .active {
    border-bottom: 2px solid #fff;
  }
`

// mobile

export const SubNavMobileContainerStyled = styled.div``

export const NavMobileStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  align-items: start;

  .nav-item {
    a {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: #183b56;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .nav-item.active {
    a {
      color: #de1d43;

      svg {
        path {
          stroke: #de1d43;
        }
      }
    }
  }

  .nav-item.active.fighter-icon {
    svg {
      path {
        stroke: unset;
        fill: #de1d43;
      }
    }
  }
`
