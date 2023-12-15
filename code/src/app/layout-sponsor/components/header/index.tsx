'use-client'
import React, { RefObject, memo, useRef } from 'react'
import {
  ButtonIconStyled,
  DrawContainerStyled,
  DrawerStyled,
  HeaderContainerStyled,
  HeaderLeftStyled,
  HeaderMenuStyled,
  HeaderRightStyled,
  HeaderStyled,
  HeaderTopStyled
} from './styled'
import Logo from '@/components/logo'
import HamburgerIcon from '@/components/icons/HamburgerIcon'
import UserInfo from '../user-info'
import CloseIcon from '@/components/icons/CloseIcon'
import { AppRoutes } from '@/constants/routes'
import Button from '@/components/common/button'
import GlobalSetting, { GlobalRef } from '@/components/global-setting'
import BuildingIcon from '@/components/icons/BuildingIcon'
import TemplateIcon from '@/components/icons/TemplateIcon'
import LogoutIcon from '@/components/icons/LogoutIcon'
import { useAppDispatch } from '@/hooks/store'
import { useRouter } from 'next/router'
import { signOut } from '@/redux/auth-sponsor/slice'
import DocumentIcon from '@/components/icons/DocumentIcon'
import NavLink from '@/components/common/nav-link'

// let lastScrollTop = 0
type HeaderBodyProps = {
  children?: any
}
const HeaderBody = memo(({ children }: HeaderBodyProps) => {
  return (
    <>
      <HeaderContainerStyled maxWidth={1200}>
        <HeaderTopStyled>
          <HeaderLeftStyled>
            <Logo linkCustom={AppRoutes.sponsor} />
          </HeaderLeftStyled>
          {/* <Nav type='left' /> */}
          <HeaderRightStyled>
            <UserInfo />
          </HeaderRightStyled>
        </HeaderTopStyled>
        <HeaderMenuStyled>
          <HeaderLeftStyled>
            <Logo linkCustom={AppRoutes.sponsor} />
          </HeaderLeftStyled>
          {children}
        </HeaderMenuStyled>
      </HeaderContainerStyled>
    </>
  )
})

const Header = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const ref = useRef<HTMLElement | null>(null)
  const navContainerMobileRef = useRef<HTMLDivElement>(null)
  const navMobileRef = useRef<HTMLDivElement>(null)
  const globalRef: RefObject<GlobalRef> | undefined = useRef<GlobalRef>(null)

  const menu = [
    {
      icon: <BuildingIcon />,
      name: 'スポンサー情報',
      link: AppRoutes.sponsorProfile
    },
    {
      icon: <DocumentIcon />,
      name: 'スポンサーの支払い',
      link: AppRoutes.sponsorHistory
    },
    {
      icon: <TemplateIcon />,
      name: 'テンプレート管理',
      link: AppRoutes.sponsorTemplate
    },
    {
      icon: <LogoutIcon />,
      name: 'ログアウト',
      onClick: () => {
        dispatch(signOut())
        router.replace(AppRoutes.sponsorLogin)
      }
    }
  ]

  const openDrawer = () => {
    navContainerMobileRef.current?.classList.add('visible')
    navMobileRef.current?.classList.add('visible')

    globalRef.current?.active()
  }

  const closeDrawer = () => {
    navContainerMobileRef.current?.classList.remove('visible')
    navMobileRef.current?.classList.remove('visible')

    globalRef.current?.deactive()
  }

  return (
    <>
      <HeaderStyled ref={ref} className='sticky'>
        <HeaderBody>
          <HeaderRightStyled>
            <ButtonIconStyled onClick={openDrawer}>
              <HamburgerIcon className='icon' />
            </ButtonIconStyled>
          </HeaderRightStyled>
        </HeaderBody>
      </HeaderStyled>
      {/** Mobile */}
      <GlobalSetting ref={globalRef} />
      <DrawContainerStyled ref={navContainerMobileRef}></DrawContainerStyled>
      <DrawerStyled ref={navMobileRef}>
        <div className='drawer-header'>
          <Logo className='logo center-box' linkCustom={AppRoutes.sponsor} closeDrawer={closeDrawer} />
          <Button className='close-btn' type='text' icon={<CloseIcon />} onClick={closeDrawer} />
        </div>
        <div className='drawer-body'>
          {menu?.map((item, index) =>
            item.link ? (
              <NavLink
                onClick={closeDrawer}
                className='menu-item'
                activeClassName='menu-item-active'
                href={item.link ?? ''}
                key={index}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ) : (
              <button
                className='menu-item'
                key={index}
                onClick={() => {
                  closeDrawer && closeDrawer()
                  item.onClick && item.onClick()
                }}
              >
                {item.icon}
                {item.name}
              </button>
            )
          )}
        </div>

        <div className='drawer-footer'>
          <UserInfo className='mobile' closeDrawer={closeDrawer} />
        </div>
      </DrawerStyled>
    </>
  )
}

export default Header
