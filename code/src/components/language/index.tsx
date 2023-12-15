'use-client'
import React, { useRef } from 'react'
import { LanguageGroupStyled, MenuLabel, MenuLabelSelected } from './styled'
import { useRouter } from 'next/router'
import { MenuProps } from 'antd'
import DropDownIcon from '../icons/DropdownIcon'
import classNames from 'classnames'
import DropDown from '../dropdown'
import storage from '@/utils/storage'
import EnFlagIcon from '../icons/EnFlagIcon'
import JpFlagIcon from '../icons/JpFlagIcon'

const Language: React.FC<any> = ({ ...props }) => {
  const refDropDown = useRef(null)
  const router = useRouter()
  const { pathname, asPath, query, locale } = router

  const onChangeLocale = (locale: string) => {
    storage().set('locale', locale)
    router.replace({ pathname, query }, asPath, {
      locale: locale
    })
  }
  const onClick: MenuProps['onClick'] = ({ key }) => {
    onChangeLocale(key)
  }
  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: (
        <MenuLabel className={classNames({ active: locale == 'en' })}>
          <EnFlagIcon /> <span>English</span>
        </MenuLabel>
      )
    },
    {
      key: 'ja',
      label: (
        <MenuLabel className={classNames({ active: locale == 'ja' })}>
          <JpFlagIcon /> <span>日本語</span>
        </MenuLabel>
      )
    }
  ]
  return (
    <LanguageGroupStyled ref={refDropDown} {...props}>
      <DropDown
        getPopupContainer={() => refDropDown.current as any}
        menu={{ items, onClick }}
        trigger={['click']}
        placement='bottomLeft'
      >
        <MenuLabelSelected>
          {locale === 'en' ? (
            <MenuLabel>
              <EnFlagIcon /> <span>English</span>
            </MenuLabel>
          ) : (
            <MenuLabel>
              <JpFlagIcon /> <span>日本語</span>
            </MenuLabel>
          )}
          <DropDownIcon />
        </MenuLabelSelected>
      </DropDown>
    </LanguageGroupStyled>
  )
}

export default Language
