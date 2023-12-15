import { theme } from 'antd'
import React from 'react'
import { NavItemStyled } from './styled'
import NavLink from '@/components/common/nav-link'

interface NavItemProps {
  children: React.ReactNode | React.ReactElement
  href: string
  className: string
  activeClassName?: string
}

const NavItem = ({ children, activeClassName = '', href, ...props }: NavItemProps) => {
  const {
    token: { colorText }
  } = theme.useToken()

  return (
    <NavItemStyled {...props} style={{ color: colorText }}>
      <NavLink className='link_item' href={href} activeClassName={activeClassName}>
        {children}
      </NavLink>
    </NavItemStyled>
  )
}

export default NavItem
