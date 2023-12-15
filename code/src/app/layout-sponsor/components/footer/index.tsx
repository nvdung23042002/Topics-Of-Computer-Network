import React from 'react'

import { FooterContainerStyled, FooterLeft, FooterRight, FooterStyled } from './styled'
import { useTranslation } from 'next-i18next'
import Logo from '@/components/logo'
import NavLink from '@/components/common/nav-link'
import { AppRoutes } from '@/constants/routes'
import { useAppSelector } from '@/hooks/store'

const Footer = () => {
  const zone = useAppSelector((state) => state.app.zone)

  const { t } = useTranslation('common', { useSuspense: false })
  const companyPath: { href: string; text: string }[] = [
    {
      text: t('HOME'),
      href: AppRoutes.home
    },
    {
      text: t('GUIDE'),
      href: AppRoutes.guide()
    },
    {
      text: t('ABOUT'),
      href: AppRoutes.about
    },
    {
      text: t('FAQ'),
      href: AppRoutes.faq
    },
    {
      text: t('INQUIRY'),
      href: AppRoutes.contact
    }
  ]
  const servicePath: { href: string; text: string }[] = [
    {
      text: t('BETS'),
      href: AppRoutes.betList
    },
    {
      text: t('MARKET_PLACE'),
      href: AppRoutes.marketplace
    },
    {
      text: t('SHOP_ONLINE'),
      href: AppRoutes.shop
    }
  ]
  const socialPath: { href: string; text: string }[] = [
    {
      text: 'Facebook',
      href: ''
    },
    {
      text: 'Twitter',
      href: ''
    },
    {
      text: 'Instagram',
      href: ''
    },
    {
      text: 'Discord',
      href: ''
    }
  ]
  const servicePathProcessed = zone === 'global' ? servicePath?.slice(0, 2) : servicePath
  return (
    <FooterStyled>
      <FooterContainerStyled maxWidth={1200}>
        <FooterLeft>
          <Logo className='logo' />
          <span className='license'>©NSB Corporation. All rights reserved.</span>
          {/* <Language className='language-choice' /> */}
        </FooterLeft>
        <FooterRight>
          <div className='col'>
            <div className='title'>{t('COMPANY')}</div>
            {companyPath.map((item, index) => {
              return (
                <NavLink href={item.href} key={index} className={`nav-item`}>
                  {item.text}
                </NavLink>
              )
            })}
          </div>
          <div className='col'>
            <div className='title'>{t('SERVICES')}</div>
            {servicePathProcessed.map((item, index) => {
              return (
                <NavLink href={item.href} key={index} className={`nav-item`}>
                  {item.text}
                </NavLink>
              )
            })}
          </div>
          <div className='col'>
            <div className='title'>{t('FOLLOW_US')}</div>
            {socialPath.map((item, index) => {
              return (
                <NavLink href={item.href} key={index} className={`nav-item`}>
                  {item.text}
                </NavLink>
              )
            })}
          </div>
        </FooterRight>
      </FooterContainerStyled>
    </FooterStyled>
  )
}

export default Footer
