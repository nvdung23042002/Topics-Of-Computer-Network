import Typography from '@/components/common/typography'
import { Avatar, ConfigProvider, Descriptions } from 'antd'
import React, { useMemo } from 'react'
import {
  ButtonAction,
  CardStyled,
  ContainerContentUserInfo,
  ContainerUserInfo,
  HeaderUserInfo,
  IconButton,
  MyPageInfoAdvancedStyled
} from './styled'
import { ThemeProvider } from 'styled-components'
import EditIcon from '@/components/icons/EditIcon'
import { useAppSelector } from '@/hooks/store'
import trimPublicAddress from '@/utils/trimPublicAddress'
import { BNToFormat } from '@/utils/bigNumber'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/constants/routes'
import { useTranslation } from 'next-i18next'
import CheckVerifiedIcon from '@/components/icons/CheckVerifiedIcon'
import AvatarDefault from '@/assets/images/avatar_default.png'
import phoneServerFormat from '@/utils/phoneFormat'
import TooltipCustom from '../common/tooltip'
import InfoIcon from '@/components/icons/InfoIcon'
const UserInfo = ({ ticketInfo }: { ticketInfo: { totalTicketLose: number; totalTicketUsed: number } }) => {
  const { user } = useAppSelector((state) => state.auth)
  const zone = useAppSelector((state) => state.app?.zone)
  const userProfile = useAppSelector((state) => state.auth?.userProfile)
  const priceRate = useAppSelector((state) => state.auth?.rate)
  const router = useRouter()
  const { t } = useTranslation('user-profile')
  const MAX_LEVEL_1 = Number(priceRate?.LEVEL1_MAX_AMOUNT ?? 0)
  const MAX_LEVEL_2 = Number(priceRate?.LEVEL2_MAX_AMOUNT ?? 0)
  const MAX_LEVEL_3 = Number(priceRate?.LEVEL3_MAX_AMOUNT ?? 0)
  const { locale } = useRouter()
  const renderTooltipInfo = useMemo(() => {
    switch (userProfile?.accountLevel) {
      case 1:
        return (
          <TooltipCustom
            title={t('BANK_TRANSFER_MAX', {
              dynamicValue: true,
              level: 1,
              maxPrice: `${BNToFormat(MAX_LEVEL_1)}円`
            })}
            trigger={['hover']}
            placement='bottom'
          >
            <InfoIcon />
          </TooltipCustom>
        )

      case 2:
        return (
          <TooltipCustom
            title={t('BANK_TRANSFER_MAX', {
              dynamicValue: true,
              level: 2,
              maxPrice: `${BNToFormat(MAX_LEVEL_2)}円`
            })}
            trigger={['hover']}
            placement='bottom'
          >
            <InfoIcon />
          </TooltipCustom>
        )
      case 3:
        return (
          <TooltipCustom
            title={t('BANK_TRANSFER_MAX_LEVEL_3', { dynamicValue: true, maxPrice: `${BNToFormat(MAX_LEVEL_3)}円` })}
            trigger={['hover']}
            placement='bottom'
          >
            <InfoIcon />
          </TooltipCustom>
        )

      default:
        return (
          <TooltipCustom title={t('LEVEL_0_CANNOT_BET')} trigger={['hover']} placement='bottom'>
            <InfoIcon />
          </TooltipCustom>
        )
    }
  }, [userProfile?.accountLevel])
  return (
    <>
      <CardStyled className='mobile tablet'>
        <ContainerUserInfo>
          <HeaderUserInfo>
            <div>
              <Avatar
                size={60}
                src={
                  <img
                    src={userProfile?.image ?? AvatarDefault.src}
                    onError={(e) => (e.currentTarget.src = AvatarDefault.src)}
                    alt='avatar'
                  />
                }
              />
            </div>
            <div className='container-header-info'>
              <div className='name al-items-center'>
                <Typography.Text className='text' title={userProfile?.userName}>
                  {userProfile?.userName}
                </Typography.Text>
                <IconButton
                  type='text'
                  icon={<EditIcon />}
                  className='btn-edit'
                  onClick={() => {
                    router.push(AppRoutes.editUserProfile)
                  }}
                />{' '}
              </div>
              <Typography.TextCopy valueCopy={user?.publicAddress} className='copy'>
                <span className='public-address'>{trimPublicAddress(user?.publicAddress ?? '', 10)}</span>{' '}
              </Typography.TextCopy>
              <div className='balance'>
                {BNToFormat(user?.totalTicket)}
                {t('TICKET', { ns: 'common' })} - {BNToFormat(user?.accountBalance)}円 - {user?.balance}ETH
              </div>
            </div>
          </HeaderUserInfo>
          <ContainerContentUserInfo className={`${locale}`}>
            <div className='info-user-mobile'>
              <div className='item'>
                <div className='label'>
                  <span className='label-info'>{t('USER_NAME')}:</span>
                </div>
                <div className='value'>
                  <Typography.Text className='text-info' title={userProfile?.userName}>
                    {userProfile?.userName}
                  </Typography.Text>
                </div>
              </div>
              <div className='item'>
                <div className='label'>
                  <span className='label-info'>{t('EMAIL')}:</span>
                </div>
                <div className='value'>
                  <Typography.Text className='text-info' title={userProfile?.email}>
                    {userProfile?.email}
                  </Typography.Text>
                  {userProfile?.accountLevel >= 1 ? (
                    <span style={{ marginLeft: 8 }}>
                      <CheckVerifiedIcon className='icon' style={{ color: '#1CCE66' }} />
                    </span>
                  ) : null}
                </div>
              </div>
              <div className='item'>
                <div className='label'>
                  <span className='label-info '>{t('PHONE_NUMBER')}:</span>
                </div>
                <div className='value'>
                  <Typography.Text
                    className='text-info'
                    title={
                      userProfile?.phonePrefix && userProfile?.phoneSuffix
                        ? `${phoneServerFormat(userProfile?.phonePrefix, userProfile?.phoneSuffix, true)}`
                        : ''
                    }
                  >
                    {userProfile?.phonePrefix && userProfile?.phoneSuffix ? (
                      <>{phoneServerFormat(userProfile?.phonePrefix, userProfile?.phoneSuffix, true)}</>
                    ) : (
                      <></>
                    )}
                  </Typography.Text>
                  {userProfile?.accountLevel >= 2 ? (
                    <span style={{ marginLeft: 8 }}>
                      <CheckVerifiedIcon className='icon' style={{ color: '#1CCE66' }} />
                    </span>
                  ) : null}
                </div>
              </div>
              <div className='item'>
                <div className='label'>
                  <span className='label-info'>{t('KYC_AUTHENTICATION_STATUS')}:</span>
                </div>
                <div className='value'>
                  <span className='text-info color-success'>{t('UNVERIFIED')}</span>
                </div>
              </div>
              <div className='item'>
                <div className='label'>
                  <span className='label-info'>{t('PRIVATE_KEY')}:</span>
                </div>
                <div className='value'>
                  <Typography.TextCopy valueCopy={user?.privateKey} className='private-key'>
                    <span className='private-address'>*************</span>
                  </Typography.TextCopy>
                </div>
              </div>
            </div>
          </ContainerContentUserInfo>
        </ContainerUserInfo>
      </CardStyled>
      <CardStyled>
        <ContainerUserInfo>
          <HeaderUserInfo>
            <div>
              <Avatar
                size={80}
                src={
                  <img
                    src={userProfile?.image ?? AvatarDefault.src}
                    onError={(e) => (e.currentTarget.src = AvatarDefault.src)}
                    alt='avatar'
                  />
                }
              />
            </div>
            <div className='container-header-info'>
              <div className='name al-items-center'>
                <Typography.Text className='text' title={userProfile?.userName}>
                  {userProfile?.userName}
                </Typography.Text>
                <IconButton
                  type='text'
                  icon={<EditIcon />}
                  className='btn-edit'
                  onClick={() => {
                    router.push(AppRoutes.editUserProfile)
                  }}
                />{' '}
              </div>
              <Typography.TextCopy valueCopy={user?.publicAddress} className='copy'>
                <span className='public-address'>{trimPublicAddress(user?.publicAddress ?? '', 10)}</span>{' '}
              </Typography.TextCopy>
              <div className='balance'>
                {BNToFormat(user?.totalTicket)} {t('TICKET', { ns: 'common' })} - {BNToFormat(user?.accountBalance)} 円
                - {user?.balance} ETH
              </div>
            </div>
          </HeaderUserInfo>
          <ContainerContentUserInfo className={`${locale}`}>
            <Descriptions column={2}>
              <Descriptions.Item label={<span className='label-info'>{t('EMAIL')}</span>} className='email'>
                <Typography.Text className='text-info' title={userProfile?.email}>
                  {userProfile?.email}
                </Typography.Text>
                {userProfile?.accountLevel >= 1 ? (
                  <span style={{ marginLeft: 8 }}>
                    <CheckVerifiedIcon style={{ color: '#1CCE66' }} />
                  </span>
                ) : null}
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info '>{t('PHONE_NUMBER')}</span>} className='phone'>
                <Typography.Text
                  className='text-info'
                  title={
                    userProfile?.phonePrefix && userProfile?.phoneSuffix
                      ? `${phoneServerFormat(userProfile?.phonePrefix, userProfile?.phoneSuffix, true)}`
                      : ''
                  }
                >
                  {userProfile?.phonePrefix && userProfile?.phoneSuffix ? (
                    <>{phoneServerFormat(userProfile?.phonePrefix, userProfile?.phoneSuffix, true)}</>
                  ) : (
                    <></>
                  )}
                </Typography.Text>
                {userProfile?.accountLevel >= 2 ? (
                  <span style={{ marginLeft: 8 }}>
                    <CheckVerifiedIcon style={{ color: '#1CCE66' }} />
                  </span>
                ) : null}
              </Descriptions.Item>
              <Descriptions.Item label={<span className='label-info'>{t('PRIVATE_KEY')}</span>} className='private-key'>
                <Typography.TextCopy valueCopy={user?.privateKey} className='private-key'>
                  <span className='private-address'>*******************************</span>
                </Typography.TextCopy>
              </Descriptions.Item>
              <Descriptions.Item
                label={<span className='label-info'>{t('KYC_AUTHENTICATION_STATUS')}</span>}
                className='kyc'
              >
                <span className='text-info'>{t('UNVERIFIED')}</span>
              </Descriptions.Item>
            </Descriptions>
          </ContainerContentUserInfo>
        </ContainerUserInfo>
      </CardStyled>
      <MyPageInfoAdvancedStyled className='mobile tablet'>
        <div className='info-account'>
          <div>
            <div>
              <div className='title-label level'>
                <span>
                  {t('LEVEL')} {userProfile?.accountLevel ?? 0}
                </span>{' '}
                {renderTooltipInfo}
                {/* <InfoOctagonIcon /> */}
              </div>
              <div className='content-value'>
                {t('ACCOUNT_LEVEL', {
                  dynamicValue: true,
                  number: ''
                })}
              </div>
            </div>
            <div>
              <div className='title-label balance'>
                <Typography.Text title={BNToFormat(user?.accountBalance)}>
                  {BNToFormat(user?.accountBalance)}
                </Typography.Text>
                {t('YEN', { ns: 'common' })}
              </div>
              <div className='content-value'>{t('BALANCE')}</div>
            </div>
          </div>
          <div>
            <div>
              <div className='title-label total-ticket'>
                <Typography.Text title={BNToFormat(user?.totalTicket)}>{BNToFormat(user?.totalTicket)}</Typography.Text>
                {t('TICKET', { ns: 'common' })}
              </div>
              <div className='content-value'>{t('AMOUNT_TICKET')}</div>
            </div>
            <div>
              <div className='title-label total-ticket-lose'>
                <Typography.Text title={BNToFormat(ticketInfo?.totalTicketLose)}>
                  {BNToFormat(ticketInfo?.totalTicketLose)}
                </Typography.Text>
                {t('TICKET', { ns: 'common' })}
              </div>
              <div className='content-value'>{t('LOST_TICKET')}</div>
            </div>
          </div>
        </div>
        <div className='group-btn-action'>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#183B56'
              }
            }}
          >
            <ThemeProvider
              theme={{
                token: {
                  colorPrimary: '#183B56'
                }
              }}
            >
              {zone === 'global' ? (
                ''
              ) : (
                <ButtonAction type='primary' onClick={() => router.push(AppRoutes.shop)}>
                  {t('GOODS_EXCHANGE')}
                </ButtonAction>
              )}
              <ButtonAction type='primary' onClick={() => router.push(AppRoutes.withDrawal)}>
                {''}
                {t('WITHDRAWAL')}
              </ButtonAction>
              {zone === 'global' ? (
                ''
              ) : (
                <ButtonAction type='primary' onClick={() => router.push(AppRoutes.ticketPurchase)}>
                  {t('PURCHASE_TICKETS')}
                </ButtonAction>
              )}
            </ThemeProvider>
          </ConfigProvider>
        </div>
      </MyPageInfoAdvancedStyled>
      <MyPageInfoAdvancedStyled>
        <div className='info-account'>
          <div>
            <div className='title-label'>
              <span>
                {t('LEVEL')} {userProfile?.accountLevel ?? 0}
              </span>{' '}
              {renderTooltipInfo}
            </div>
            <div className='content-value'>
              {t('ACCOUNT_LEVEL', {
                dynamicValue: true,
                number: ''
              })}
            </div>
          </div>
          <div>
            <div className='title-label balance'>
              <Typography.Text title={BNToFormat(user?.accountBalance)}>
                {BNToFormat(user?.accountBalance)}
              </Typography.Text>
              <span>円</span>
            </div>
            <div className='content-value'>{t('BALANCE')}</div>
          </div>
          <div>
            <div className='title-label total-ticket'>
              <Typography.Text title={BNToFormat(user?.totalTicket)}>{BNToFormat(user?.totalTicket)}</Typography.Text>

              {t('TICKET', { ns: 'common' })}
            </div>
            <div className='content-value'>{t('AMOUNT_TICKET')}</div>
          </div>
          <div>
            <div className='title-label total-ticket-lose'>
              <Typography.Text title={BNToFormat(ticketInfo?.totalTicketLose)}>
                {BNToFormat(ticketInfo?.totalTicketLose)}
              </Typography.Text>
              {t('TICKET', { ns: 'common' })}
            </div>
            <div className='content-value'>{t('LOST_TICKET')}</div>
          </div>
        </div>
        <div className='group-btn-action'>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#183B56'
              }
            }}
          >
            <ThemeProvider
              theme={{
                token: {
                  colorPrimary: '#183B56'
                }
              }}
            >
              {zone === 'jp' && (
                <ButtonAction type='primary' onClick={() => router.push(AppRoutes.shop)}>
                  {t('GOODS_EXCHANGE')}
                </ButtonAction>
              )}
              <ButtonAction type='primary' onClick={() => router.push(AppRoutes.withDrawal)}>
                {''}
                {t('WITHDRAWAL')}
              </ButtonAction>
              {zone === 'jp' && (
                <ButtonAction type='primary' onClick={() => router.push(AppRoutes.ticketPurchase)}>
                  {t('PURCHASE_TICKETS')}
                </ButtonAction>
              )}
            </ThemeProvider>
          </ConfigProvider>
        </div>
      </MyPageInfoAdvancedStyled>
    </>
  )
}

export default UserInfo
