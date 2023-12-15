import React, { ReactNode, useEffect } from 'react'
import {
  ButtonLogout,
  ContainerLayoutMyPage,
  Content,
  DrawerStyled,
  HeaderMenuStyled,
  Sider,
  TitleStyled
} from './styled'
import NavLink from '../common/nav-link'
import UserIcon from '../icons/UserIcon'
import TicketIcon from '../icons/TicketIcon'
import WithDrawIcon from '../icons/WithDrawIcon'
import ClockIcon from '../icons/ClockIcon'
import LogoutIcon from '../icons/LogoutIcon'
import { useAppSelector } from '@/hooks/store'
import SiteLoading from '../site-loading'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/constants/routes'
import BezierCurveIcon from '../icons/BezierCurveIcon'
import CloseIcon from '../icons/CloseIcon'
import Logo from '../logo'
import { useMyPageContext } from '@/context/my-page'
type LayoutMyPageProps = {
  children: React.ReactNode | React.ReactElement
}
type PathType = { href: string; text: string | ReactNode; icon?: ReactNode }
const LayoutMyPage = ({ children }: LayoutMyPageProps) => {
  const { t } = useTranslation('common')
  const zone = useAppSelector((state) => state.app?.zone)
  const paths: PathType[] = [
    { text: t('USER_INFORMATION'), href: '/my-page/user-profile', icon: <UserIcon /> },
    { text: t('TICKET_PURCHASE'), href: '/my-page/buy-ticket', icon: <TicketIcon /> },
    { text: t('WITHDRAWAL'), href: '/my-page/withdrawal', icon: <WithDrawIcon /> },
    { text: t('TRANSACTION_HISTORY'), href: '/my-page/history', icon: <ClockIcon /> },
    { text: t('AFFILIATE_INFORMATION', { ns: 'common' }), href: '/my-page/affiliate', icon: <BezierCurveIcon /> }
  ]
  if (zone === 'global') paths.splice(1, 1)

  const auth = useAppSelector((state) => state.auth)
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated)
  const router = useRouter()
  const { onClose, open } = useMyPageContext()
  useEffect(() => {
    if (isAuthenticated === false && !auth.user) {
      router.replace(AppRoutes.home)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, auth.user])

  return (
    <ContainerLayoutMyPage maxWidth={1440}>
      {isAuthenticated ? (
        <>
          <Sider>
            {paths.map((item, index) => {
              return (
                <NavLink href={item.href} className='nav-link' activeClassName='active' key={index}>
                  {item.icon} <span>{item.text}</span>
                </NavLink>
              )
            })}
            <ButtonLogout
              onClick={() => {
                const node: any = document.querySelector("li[rootclassname='logout-btn']")
                if (node) node.click()
              }}
            >
              <LogoutIcon /> <span>{t('LOGOUT', { ns: 'common' })}</span>
            </ButtonLogout>
          </Sider>
          <Content>{children}</Content>

          <DrawerStyled
            placement={'right'}
            width={375}
            onClose={onClose}
            open={open}
            closeIcon={<CloseIcon />}
            title={
              <HeaderMenuStyled>
                <Logo />
              </HeaderMenuStyled>
            }
          >
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <TitleStyled className='menu-title'>{t('MY_PAGE', { ns: 'common' })}</TitleStyled>
            </div>
            <Sider className='mobile'>
              {paths.map((item, index) => {
                return (
                  <NavLink href={item.href} className='nav-link' activeClassName='active' key={index}>
                    {item.icon} <span>{item.text}</span>
                  </NavLink>
                )
              })}
              <ButtonLogout
                onClick={() => {
                  const node: any = document.querySelector("li[rootclassname='logout-btn']")
                  if (node) node.click()
                }}
              >
                <LogoutIcon /> <span>{t('LOGOUT', { ns: 'common' })}</span>
              </ButtonLogout>
            </Sider>
          </DrawerStyled>
        </>
      ) : (
        <SiteLoading />
      )}
    </ContainerLayoutMyPage>
  )
}

export default LayoutMyPage
