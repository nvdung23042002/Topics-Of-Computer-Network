import React from 'react'
import { LineStyled, WrapBetsStyled } from './styled'
import Section1 from './components/section-1'
import Section2 from './components/section-2'
import Section3 from './components/section-3'
import Section4 from './components/section-4'
import Section5 from './components/section-5'
import Section6 from './components/section-6'
import Section7 from './components/section-7'

const Bets = () => {
  return (
    <WrapBetsStyled>
      <Section1 />

      <LineStyled />

      <Section2 />

      <Section3 />

      <Section4 />

      <LineStyled />

      <Section5 />

      <Section6 />

      <LineStyled />

      <Section7 />
    </WrapBetsStyled>
  )
}

export default Bets
