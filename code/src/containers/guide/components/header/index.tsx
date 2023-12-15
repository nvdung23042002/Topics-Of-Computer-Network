import React from 'react'
import { HeaderStyled, TitleStyled } from '../../styled'
import { useTranslation } from 'next-i18next'

const Header = () => {
  const { t } = useTranslation('guide')
  return (
    <HeaderStyled>
      <TitleStyled className='title-header'>{t('GUIDE_TITLE')}</TitleStyled>
    </HeaderStyled>
  )
}

export default Header
