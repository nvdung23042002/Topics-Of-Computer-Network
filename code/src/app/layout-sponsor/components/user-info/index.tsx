import React, { useEffect } from 'react'
import { DropDownContainer, DropDownStyled, UserInfoStyled } from './styled'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import DefaultUser from '@/assets/images/avatar_default.png'
import { Avatar, MenuProps } from 'antd'
import { useTranslation } from 'next-i18next'
import classNames from 'classnames'
import DivideLine from '@/components/common/divide-line'
import LogoutIcon from '@/components/icons/LogoutIcon'
import UserIcon from '@/components/icons/UserIcon'
import Typography from '@/components/common/typography'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/constants/routes'
import { signOut } from '@/redux/auth-sponsor/slice'
import { getSponsorProfileThunk } from '@/redux/auth-sponsor/thunk'
import { debounce } from 'lodash'

const UserInfo: React.FC<any> = ({ className, closeDrawer }) => {
  const auth = useAppSelector((state) => state.authSponsor)
  const { t } = useTranslation('common', { useSuspense: false })
  const navigate = useRouter()
  const dispatch = useAppDispatch()
  const sponsorProfile = useAppSelector((state) => state.authSponsor.sponsorProfile)
  const isAuthenticated = useAppSelector((state) => state.authSponsor.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getSponsorProfileThunk())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isAuthenticated])
  const items: MenuProps['items'] = [
    {
      key: '0',
      onClick: () => {
        closeDrawer && debounce(closeDrawer, 500)()
        navigate.push(AppRoutes.sponsorProfile)
      },
      label: t('MY_PAGE'),
      icon: <UserIcon />
    },
    {
      key: '1',
      onClick: () => {
        closeDrawer && debounce(closeDrawer, 500)()
        dispatch(signOut())
        window.location.replace(AppRoutes.sponsorLogin)
      },
      label: t('LOGOUT'),
      icon: <LogoutIcon />
    }
  ]

  return (
    <>
      {auth?.isAuthenticated && sponsorProfile && !auth?.loading && (
        <DropDownStyled
          disabled={!auth?.isAuthenticated}
          menu={{ items }}
          dropdownRender={(menu) => (
            <DropDownContainer>
              <div className='user-info'>
                <Avatar
                  size={50}
                  src={
                    <img
                      src={sponsorProfile?.logoSponsor ?? DefaultUser.src}
                      onError={(e) => (e.currentTarget.src = DefaultUser.src)}
                      alt='avatar'
                    />
                  }
                />
                <div className='user-info-detail'>
                  <Typography.Text
                    className='d-block text-nowrap-1'
                    style={{ maxWidth: 200 }}
                    title={sponsorProfile?.companyName}
                  >
                    {sponsorProfile?.companyName ?? 'N/A'}
                  </Typography.Text>
                </div>
              </div>
              <DivideLine style={{ margin: '8px 0' }} />
              {React.cloneElement(menu as React.ReactElement, {})}
            </DropDownContainer>
          )}
          placement='bottomLeft'
          trigger={['click']}
        >
          {auth?.isAuthenticated && (
            <UserInfoStyled
              className={classNames({
                [className ?? '']: true,
                noBorder: !auth?.isAuthenticated || auth?.loading
              })}
              disabled={!auth?.isAuthenticated}
            >
              <Typography.Text className='text-nowrap-1' title={sponsorProfile?.companyName}>
                {sponsorProfile?.companyName ?? 'N/A'}
              </Typography.Text>

              <img
                width={42}
                height={42}
                src={sponsorProfile?.logoSponsor ?? DefaultUser.src}
                onError={(e) => (e.currentTarget.src = DefaultUser.src)}
                alt='avatar'
              />
            </UserInfoStyled>
          )}
        </DropDownStyled>
      )}
    </>
  )
}

export default UserInfo
