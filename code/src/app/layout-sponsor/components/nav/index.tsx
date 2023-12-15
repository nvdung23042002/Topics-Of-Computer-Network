import React, { ReactNode } from 'react'
import NavItem from './components/item'
import { NavStyled } from './styled'
import BetsIcon from '@/components/icons/BetsIcon'
import ShopIcon from '@/components/icons/ShopIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import MarketIcon from '@/components/icons/MarketIcon'
import { AppRoutes } from '@/constants/routes'

type PathType = { href: string; text: string | ReactNode; icon?: ReactNode }
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
    text: 'NFTS_ITEM',
    href: '/market-place/search'
  },
  {
    text: 'NFT_AIRDROPS',
    href: '/'
  },
  {
    text: 'E_KYC',
    href: '/'
  },
  {
    text: <SearchIcon />,
    href: '/search'
  }
]
const Nav: React.FC<{ type: 'left' | 'right'; style?: React.CSSProperties; className?: string }> = ({
  type,
  className,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <NavStyled className={className} type={type} {...props}>
      {(type === 'left' ? leftPaths : rightPaths).map((item: PathType, index) => (
        <NavItem
          className={classNames({
            search: item.href === '/search'
          })}
          activeClassName='nav-active'
          key={index}
          href={item.href}
        >
          {item?.icon}
          {typeof item.text === 'string' ? t(item.text?.toUpperCase()) : item.text}
        </NavItem>
      ))}
    </NavStyled>
  )
}

export default Nav
