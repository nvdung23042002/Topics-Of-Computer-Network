import styled from 'styled-components'

export const HeaderDeposits = styled.div``
export const ContainerDeposits = styled.div`
  margin-top: 16px;
  @media screen and (max-width: 575px) {
    min-height: 100vh;
  }
`
export const ContentContainer = styled.div`
  max-height: 300px;
  transition: all 0.3s ease-in-out;
  .hidden {
    opacity: 0;
    display: none;
  }
`
