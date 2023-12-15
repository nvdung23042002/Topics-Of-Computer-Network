import FighterIcon from '@/components/icons/FighterIcon'
import TournamentsIcon from '@/components/icons/TournamentsIcon'
import WalletSecondIcon from '@/components/icons/WalletSecondIcon'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import {
  NavMobileStyled,
  NavStyled,
  SubNavContainerStyled,
  SubNavContentStyled,
  SubNavMobileContainerStyled
} from './styled'
import { AppRoutes } from '@/constants/routes'
import TournamentsMobileIcon from '@/components/icons/TournamentsMobileIcon'
import WalletMobileIcon from '@/components/icons/WalletMobileIcon'
import FighterMobileIcon from '@/components/icons/FighterMobileIcon'

type PathType = { href: string; text: string; icon?: ReactNode; className?: string }
const paths: PathType[] = [
  {
    text: 'TOURNAMENTS',
    href: AppRoutes.betList,
    icon: <TournamentsIcon />
  },
  {
    text: 'FIGHTERS',
    href: AppRoutes.fighters,
    icon: <FighterIcon />
  },
  {
    text: 'MY_BET',
    href: AppRoutes.tradingHistory,
    icon: <WalletSecondIcon />
  }
]

const pathsMobile: PathType[] = [
  {
    text: 'TOURNAMENTS',
    href: AppRoutes.betList,
    icon: <TournamentsMobileIcon />
  },
  {
    text: 'FIGHTERS',
    href: AppRoutes.fighters,
    icon: <FighterMobileIcon />,
    className: 'fighter-icon'
  },
  {
    text: 'MY_BET',
    href: AppRoutes.tradingHistory,
    icon: <WalletMobileIcon />
  }
]

const SubNav: React.FC<{ style?: React.CSSProperties; className?: string; closeDrawer?: () => void }> = ({
  className,
  closeDrawer,
  ...props
}) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const activeMenu = (data: any) => {
    const active = router.pathname
      .replace(/bet\/(fighter)/, 'fighter')
      .includes(data.replace(/bet\/(fighter)/, 'fighter'))
    return active
  }

  return (
    <>
      {className === 'mobile' ? (
        <SubNavMobileContainerStyled>
          <NavMobileStyled>
            {pathsMobile.map((item: PathType, index) => (
              <div
                className={cx('nav-item', item?.className, {
                  active: activeMenu(item?.href)
                })}
                key={index}
              >
                <Link href={item.href} onClick={closeDrawer}>
                  {item?.icon}
                  {t(item.text)}
                </Link>
              </div>
            ))}
          </NavMobileStyled>
        </SubNavMobileContainerStyled>
      ) : (
        <SubNavContainerStyled>
          <SubNavContentStyled>
            <NavStyled className={className} {...props}>
              {paths.map((item: PathType, index) => (
                <div className='nav-item' key={index}>
                  <Link href={item.href} onClick={closeDrawer}>
                    {item?.icon}
                    {t(item.text)}
                  </Link>
                  <div
                    className={cx({
                      active: activeMenu(item?.href)
                    })}
                  ></div>
                </div>
              ))}
            </NavStyled>
          </SubNavContentStyled>
        </SubNavContainerStyled>
      )}
    </>
  )
}

export default SubNav
