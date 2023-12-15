import React, { ReactNode } from 'react'
import NavItem from './components/item'
import { NavStyled } from './styled'
import BetsIcon from '@/components/icons/BetsIcon'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import { AppRoutes } from '@/constants/routes'
import MarketIcon from '@/components/icons/MarketIcon'
import ShopIcon from '@/components/icons/ShopIcon'
import { useAppSelector } from '@/hooks/store'

type PathType = { href: string; text: string | ReactNode; icon?: ReactNode; alwaysActive?: boolean }
const leftPaths: PathType[] = [
  {
    text: 'BETS',
    href: AppRoutes.betList,
    icon: <BetsIcon />
  },
  {
    text: 'MARKET_PLACE',
    href: AppRoutes.marketplace,
    icon: <MarketIcon />
  },
  {
    text: 'SHOP_ONLINE',
    href: AppRoutes.shop,
    icon: <ShopIcon />
  }
]

const rightPaths: PathType[] = [
  {
    text: 'ABOUT_US',
    href: '/'
  },
  {
    text: 'CONTACT_US',
    href: '/'
  }
]

const Nav: React.FC<{
  type: 'left' | 'right'
  style?: React.CSSProperties
  className?: string
  closeDrawer?: () => void
}> = ({ type, className, closeDrawer, ...props }) => {
  const zone = useAppSelector((state) => state.app.zone)
  const { t } = useTranslation()

  const leftPathProcessed = zone === 'global' ? leftPaths?.slice(0, 2) : leftPaths
  return (
    <NavStyled className={className} type={type} {...props}>
      {(type === 'left' ? leftPathProcessed : rightPaths).map((item: PathType, index) => (
        <NavItem
          className={classNames({
            search: item.href === '/search'
          })}
          activeClassName='nav-active'
          key={index}
          href={item.href}
          onClick={closeDrawer}
        >
          {item?.icon}
          {typeof item.text === 'string' ? t(item.text) : item.text}
        </NavItem>
      ))}
    </NavStyled>
  )
}

export default Nav
