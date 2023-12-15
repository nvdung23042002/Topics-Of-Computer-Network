import React from 'react'
import { LogoStyled } from './styled'
import NavLink from '../common/nav-link'
import classNames from 'classnames'
import FullDarkLogoIcon from '../icons/FullDarkLogoIcon'
import FullLogoIcon from '../icons/FullLogoIcon'
interface LogoProps {
  activeClassName?: string
  className?: string
  dark?: boolean
  style?: React.CSSProperties
  linkCustom?: string
  closeDrawer?: () => void
}

const Logo = ({ activeClassName, className, linkCustom, dark, closeDrawer, ...props }: LogoProps) => {
  return (
    <NavLink
      activeClassName={activeClassName ?? ''}
      className={classNames({
        [className ?? '']: true,
        'd-inline-block': true
      })}
      href={linkCustom ?? '/'}
      onClick={closeDrawer}
      scroll
    >
      <LogoStyled>
        {dark ? (
          <FullDarkLogoIcon style={{ width: 100, height: 28 }} {...props} />
        ) : (
          <FullLogoIcon style={{ width: 100, height: 28 }} {...props} />
        )}
      </LogoStyled>
    </NavLink>
  )
}

export default Logo
