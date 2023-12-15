'use-client'
import React, { RefObject, forwardRef, memo, useEffect, useRef } from 'react'
import Nav from '../nav'
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
import DivideLine from '@/components/common/divide-line'
import SubNav from '../sub-nav'
import Web3Auth, { Web3ContainerHandle } from '@/components/web3-auth'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { getUserProfileThunk } from '@/redux/auth/thunk'
import Button from '@/components/common/button'
import CloseIcon from '@/components/icons/CloseIcon'
import GlobalSetting, { GlobalRef } from '@/components/global-setting'

// let lastScrollTop = 0
type HeaderBodyProps = {
  children?: any
}

const HeaderBody = memo(
  forwardRef<any, HeaderBodyProps>(({ children }: HeaderBodyProps, web3AuthRef) => {
    return (
      <>
        <HeaderContainerStyled maxWidth={1200}>
          <HeaderTopStyled>
            <HeaderLeftStyled>
              <Logo />
              <Nav type='left' />
            </HeaderLeftStyled>
            <HeaderRightStyled>
              <UserInfo ref={web3AuthRef} />
            </HeaderRightStyled>
          </HeaderTopStyled>
          <HeaderMenuStyled>
            <HeaderLeftStyled>
              <Logo />
            </HeaderLeftStyled>
            {children}
          </HeaderMenuStyled>
        </HeaderContainerStyled>
      </>
    )
  })
)

const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated)
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLElement | null>(null)
  const web3AuthRef = useRef<Web3ContainerHandle>()
  const navContainerMobileRef = useRef<HTMLDivElement>(null)
  const navMobileRef = useRef<HTMLDivElement>(null)
  const globalRef: RefObject<GlobalRef> | undefined = useRef<GlobalRef>(null)

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

  useEffect(() => {
    if (isAuthenticated === true) {
      dispatch(getUserProfileThunk({}))
    }
  }, [dispatch, isAuthenticated])

  return (
    <>
      <HeaderStyled ref={ref} className='sticky'>
        <HeaderBody ref={web3AuthRef}>
          <HeaderRightStyled>
            <ButtonIconStyled onClick={openDrawer}>
              <HamburgerIcon className='icon' />
            </ButtonIconStyled>
          </HeaderRightStyled>
        </HeaderBody>
      </HeaderStyled>
      {/** Mobile */}
      <GlobalSetting ref={globalRef} />
      <DrawContainerStyled ref={navContainerMobileRef} />
      <DrawerStyled ref={navMobileRef}>
        <div className='drawer-header'>
          <Logo className='logo center-box' closeDrawer={closeDrawer} />
          <Button className='close-btn' type='text' icon={<CloseIcon />} onClick={closeDrawer} />
        </div>

        <div className='drawer-body'>
          <Nav type='left' className='mobile' closeDrawer={closeDrawer} />
          <DivideLine style={{ borderBlockStartWidth: 2 }} />
          <SubNav className='mobile' closeDrawer={closeDrawer} />
        </div>

        <div className='drawer-footer'>
          <UserInfo className='mobile' ref={web3AuthRef} closeDrawer={closeDrawer} />
        </div>
      </DrawerStyled>
      <Web3Auth ref={web3AuthRef} />
    </>
  )
}

export default Header
