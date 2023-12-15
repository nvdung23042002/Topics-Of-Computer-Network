import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactElement | React.ReactNode
}
const MobileViewStyled = styled.div`
  display: none;
  @media screen and (max-width: 575px) {
    display: block;
  }
`

const MobileView = (props: Props) => {
  return <MobileViewStyled>{props.children}</MobileViewStyled>
}

export default MobileView
