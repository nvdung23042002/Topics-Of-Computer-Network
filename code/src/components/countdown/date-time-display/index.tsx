import React, { FC } from 'react'
import { DateTimeDisplayStyled } from './styled'
import { Text3th400Styled, TextPrimary700Styled } from '@/components/styled'

type Props = {
  value?: any
  type?: any
  isDanger?: any
}

const DateTimeDisplay: FC<Props> = ({ value, type, isDanger }) => {
  return (
    <DateTimeDisplayStyled className={isDanger ? 'countdown danger' : 'countdown'}>
      <TextPrimary700Styled className='count-time'>{value < 10 ? `0${value}` : value}</TextPrimary700Styled>
      <Text3th400Styled className='count-name'>{type}</Text3th400Styled>
    </DateTimeDisplayStyled>
  )
}

export default DateTimeDisplay
