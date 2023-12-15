import React from 'react'
import NoDataIcon from '../icons/NoDataIcon'
import { Text3th500Styled } from '../styled'
import { NoDataStyled } from './styled'

type Props = {
  text: string | number
}

const NoData: React.FC<Props> = ({ text }) => {
  return (
    <NoDataStyled>
      <NoDataIcon />
      <Text3th500Styled>{text}</Text3th500Styled>
    </NoDataStyled>
  )
}

export default NoData
