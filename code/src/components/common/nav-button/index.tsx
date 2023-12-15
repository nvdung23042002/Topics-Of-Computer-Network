import React from 'react'
import { Button, ButtonProps } from 'antd'

import classNames from 'classnames'
import styled from 'styled-components'

type NavButtonProps = {
  children?: React.ReactNode | React.ReactElement
  isActive?: boolean
  buttonSize?: 'large'
} & ButtonProps

const NavButtonStyled = styled(Button)`
  font-weight: 500;
  &.ant-btn {
    height: unset;
    padding: 0.5rem 1.875rem;
  }
  &.ant-btn-link {
    color: initial;
  }
  &.large {
    font-size: 1rem;
    &.ant-btn {
      min-height: 47px;
    }
  }
`

export default (({ children, isActive = false, buttonSize, ...rests }: NavButtonProps) => {
  return (
    <NavButtonStyled className={classNames([buttonSize])} type={isActive ? 'primary' : 'text'} {...rests}>
      {children}
    </NavButtonStyled>
  )
}) as React.FC<NavButtonProps>
