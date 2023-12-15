import { theme } from 'antd'
import React from 'react'
import { NavItemStyled } from './styled'
import NavLink from '@/components/common/nav-link'

interface NavItemProps {
  children: React.ReactNode | React.ReactElement
  href: string
  className: string
  activeClassName?: string
  onClick?: () => void
}

const NavItem = ({ children, activeClassName = '', href, onClick, ...props }: NavItemProps) => {
  const {
    token: { colorText }
  } = theme.useToken()

  return (
    <NavItemStyled {...props} style={{ color: colorText }}>
      <NavLink className='link_item' href={href} activeClassName={activeClassName} onClick={onClick}>
        {children}
      </NavLink>
    </NavItemStyled>
  )
}

export default NavItem
