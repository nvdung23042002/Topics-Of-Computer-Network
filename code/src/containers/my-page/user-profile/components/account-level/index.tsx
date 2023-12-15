import React from 'react'
import { AccountLevelContainer, DescriptionStyled, FooterAccountLevel, HeaderAccountLevel } from './styled'
import classNames from 'classnames'

export type AccountLevelProps = {
  title: string
  footerContent: string
  status: string
  verified: boolean
  content: string
  buttonFooter: React.ReactNode | React.ReactElement
  disabled?: boolean
}

const AccountLevel = ({
  title,
  footerContent,
  buttonFooter,
  verified,
  status,
  content,
  disabled = false
}: AccountLevelProps) => {
  return (
    <AccountLevelContainer className={classNames({ disabled: disabled })}>
      <HeaderAccountLevel>
        <h1>{title}</h1>
        <div className={classNames({ active: verified }, { status: true })}>{status}</div>
      </HeaderAccountLevel>
      <DescriptionStyled>{content}</DescriptionStyled>
      <FooterAccountLevel>
        <div className='footer-content'>{footerContent}</div>
        <div>{buttonFooter}</div>
      </FooterAccountLevel>
    </AccountLevelContainer>
  )
}

export default AccountLevel
