import React, { forwardRef, useMemo } from 'react'
import {
  DropDownContainer,
  DropDownStyled,
  LoginButton,
  MobileBtnStyled,
  MySponsorButton,
  UserInfoStyled
} from './styled'
import { useAppSelector } from '@/hooks/store'
import DefaultUser from '@/assets/images/avatar_default.png'
import { Avatar, Menu, MenuProps } from 'antd'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import DivideLine from '@/components/common/divide-line'
import LogoutIcon from '@/components/icons/LogoutIcon'
import UserIcon from '@/components/icons/UserIcon'
import Typography from '@/components/common/typography'
import trimPublicAddress from '@/utils/trimPublicAddress'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/constants/routes'
import { BNToFormat } from '@/utils/bigNumber'
import storage from '@/utils/storage'
import { STORAGE_KEY } from '@/constants/common'
import YenIcon from '@/components/icons/YenIcon'
import ETHBalanceIcon from '@/components/icons/ETHBalanceIcon'
import Ticket2Icon from '@/components/icons/Ticket2Icon'
import { debounce } from 'lodash'

const UserInfo = forwardRef<any, any>(({ className, closeDrawer }, web3AuthRef: any) => {
  const zone = useAppSelector((state) => state.app.zone)
  const auth = useAppSelector((state) => state.auth)
  const { t } = useTranslation('common', { useSuspense: false })
  const navigate = useRouter()
  const items: MenuProps['items'] = [
    {
      key: '0',
      onClick: () => {
        closeDrawer && debounce(closeDrawer, 500)()
        navigate.push(AppRoutes.myPage)
      },
      label: t('MY_PAGE'),
      icon: <UserIcon />
    },
    {
      rootClassName: 'logout-btn',
      key: '1',
      onClick: () => {
        closeDrawer && debounce(closeDrawer, 500)()
        web3AuthRef?.current?.logout()
        storage().set(STORAGE_KEY.CART_ITEMS, [])
      },
      label: t('LOGOUT'),
      icon: <LogoutIcon />
    }
  ]
  const balanceItems: MenuProps['items'] = useMemo(
    () => [
      {
        className: 'no-interact',
        key: 'ticket',
        label: `${BNToFormat(auth?.user?.totalTicket) ?? 0}${t('TICKET')}`,
        icon: <Ticket2Icon />
      },
      {
        className: 'no-interact',
        key: 'yen',
        label: `${BNToFormat(auth?.user?.accountBalance ?? 0)}円`,
        icon: <YenIcon />
      },
      {
        className: 'no-interact',
        key: 'eth',
        label: `${BNToFormat(auth?.user?.balance ?? 0, true)}ETH`,
        icon: <ETHBalanceIcon />
      }
    ],
    [auth?.user?.accountBalance, auth?.user?.balance, auth?.user?.totalTicket, t]
  )
  const goToSponsor = () => {
    navigate.push(AppRoutes.sponsor)
  }

  return (
    <>
      <MobileBtnStyled>
        {zone === 'jp' && (
          <MySponsorButton className='mobile-button mb-4' type='text' onClick={goToSponsor}>
            {t('SPONSOR_REGISTRATION')}
          </MySponsorButton>
        )}

        <LoginButton
          className={classNames({
            'mobile-button': true,
            'v-hidden': auth?.isAuthenticated
          })}
          type='text'
          onClick={() => web3AuthRef.current?.login()}
          loading={auth?.loading}
        >
          {t('MEMBER_REGISTRATION')}
        </LoginButton>
      </MobileBtnStyled>
      {zone === 'jp' && (
        <MySponsorButton className='desktop-button' type='text' onClick={goToSponsor}>
          {t('SPONSOR_REGISTRATION')}
        </MySponsorButton>
      )}
      <DropDownStyled
        disabled={!auth?.isAuthenticated}
        menu={{ items }}
        overlayStyle={{ zIndex: 1052 }}
        dropdownRender={(menu) => (
          <DropDownContainer>
            <div className='user-info'>
              <Avatar
                size={50}
                src={
                  <img
                    className='no-interact'
                    src={auth?.userProfile?.image ?? DefaultUser.src}
                    onError={(e) => (e.currentTarget.src = DefaultUser.src)}
                    alt='avatar'
                    loading='lazy'
                  />
                }
              />
              <div className='user-info-detail'>
                <Typography.Text
                  className='d-block text-nowrap-1'
                  style={{ maxWidth: 200 }}
                  title={auth?.userProfile?.userName ?? 'N/A'}
                >
                  {auth?.userProfile?.userName ?? 'N/A'}
                </Typography.Text>
                <Typography.TextCopy valueCopy={auth?.user?.publicAddress}>
                  {trimPublicAddress(auth?.user?.publicAddress, 5)}
                </Typography.TextCopy>
              </div>
            </div>
            <DivideLine style={{ margin: '8px 0' }} />
            <Menu mode='vertical' theme='light' items={balanceItems} />
            <DivideLine style={{ margin: '8px 0' }} />
            {React.cloneElement(menu as React.ReactElement, {})}
          </DropDownContainer>
        )}
        placement='bottomLeft'
        trigger={['click']}
        forceRender
      >
        <UserInfoStyled
          className={classNames({
            [className ?? '']: true,
            noBorder: !auth?.isAuthenticated || auth?.loading || !auth?.userProfile
          })}
          disabled={!auth?.isAuthenticated}
        >
          {!auth?.isAuthenticated || !auth?.userProfile ? (
            <LoginButton
              className='desktop-button'
              id='action-login-button'
              type='text'
              onClick={() => auth?.isAuthenticated === false && web3AuthRef.current?.login()}
              loading={auth?.loading}
            >
              {t('MEMBER_REGISTRATION')}
            </LoginButton>
          ) : (
            <>
              <div className='h-100 p-relative d-flex j-content-center al-items-end flex-col'>
                {auth?.isAuthenticated && !auth?.loading && (
                  <>
                    <Typography.Text
                      className='d-block text-right text-nowrap-1 name'
                      title={auth?.userProfile?.userName}
                    >
                      {auth?.userProfile?.userName}
                    </Typography.Text>
                    <Typography.Text
                      className='d-block text-right text-nowrap-1 address'
                      title={auth?.user?.publicAddress}
                    >
                      {trimPublicAddress(auth?.user?.publicAddress, 5)}
                    </Typography.Text>
                  </>
                )}
              </div>
              <img
                className='no-interact'
                width={54}
                height={54}
                src={auth?.userProfile?.image ?? DefaultUser.src}
                onError={(e) => (e.currentTarget.src = DefaultUser.src)}
                alt='avatar'
                loading='lazy'
              />
            </>
          )}
        </UserInfoStyled>
      </DropDownStyled>
    </>
  )
})

export default UserInfo
