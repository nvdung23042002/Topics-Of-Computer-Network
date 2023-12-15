import WarringIcon from '@/components/icons/WarringIcon'
import React, { FC } from 'react'
import styled from 'styled-components'

type ErrorMessageProps = {
  message?: string
}
const ErrorMessageStyled = styled.div`
  display: flex;
  gap: 10px;
  color: #ea1313;
  padding: 0px 15px;
  margin-top: -15px;
  text-align: center;
  span {
    &.message {
      display: inline-block;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      opacity: 0.7;
    }
  }
`
const ErrorMessage: FC<ErrorMessageProps> = ({ message }: ErrorMessageProps) => {
  return (
    <ErrorMessageStyled>
      <WarringIcon className='icon' /> <span className='message'>{message}</span>
    </ErrorMessageStyled>
  )
}

export default ErrorMessage
