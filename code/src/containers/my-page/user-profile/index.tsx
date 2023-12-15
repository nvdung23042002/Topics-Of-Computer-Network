import Layout from '@/app/layout'
import LayoutMyPage from '@/components/layout-my-page'
import React, { useEffect, useRef, useState } from 'react'
import UserInfo from './components/user-info'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import SiteLoading from '@/components/site-loading'
import AccountLevel, { AccountLevelProps } from './components/account-level'
import {
  ButtonActionAccountLevel,
  ButtonIconStyled,
  HeaderMenuStyled,
  ListItemStyled,
  ListStyled,
  MessageSendSuccess,
  TitleStyled
} from './styled'
import { ModalRef, ModalVerifyRef } from './components/modal'
import ModalFormChangeEmail from './components/modal/enter-email'
import showMessage from '@/utils/showMessage'
import useModal from '@/hooks/useModal'
import ModalFormChangePhoneNumber from './components/modal/enter-phone'
import { useTranslation } from 'next-i18next'
import ModalFormVerify from './components/modal/verifly'
import NSBService from '@/services/NSB.service'
import { getUserProfileThunk } from '@/redux/auth/thunk'
// import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon'
import UserIcon from '@/components/icons/UserIcon'

import { useMyPageContext } from '@/context/my-page'
import formatJapanesePhoneNumber from '@/utils/phoneFormat'
import { BNToFormat } from '@/utils/bigNumber'
import MenuIcon from '@/components/icons/MenuIcon'

const UserProfile = () => {
  const modalConfirmEmailRef = useRef<ModalRef | null>(null)
  const modalConfirmPhoneRef = useRef<ModalRef | null>(null)
  const modalVerifyEmailRef = useRef<ModalVerifyRef | null>(null)
  const modalVerifyPhoneRef = useRef<ModalVerifyRef | null>(null)
  const { showDrawer } = useMyPageContext()
  const zone = useAppSelector((state) => state.app.zone)
  const { openModal, closeModal } = useModal()
  const userProfile = useAppSelector((state) => state.auth?.userProfile)
  const { t } = useTranslation('user-profile')
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const [ticketInfo, setTicketInfo] = useState<{ totalTicketLose: number; totalTicketUsed: number }>({
    totalTicketLose: 0,
    totalTicketUsed: 0
  })
  const priceRate = useAppSelector((state) => state.auth?.rate)

  const MAX_LEVEL_1 = Number(priceRate?.LEVEL1_MAX_AMOUNT ?? 0)
  const MAX_LEVEL_2 = Number(priceRate?.LEVEL2_MAX_AMOUNT ?? 0)
  const MAX_LEVEL_3 = Number(priceRate?.LEVEL3_MAX_AMOUNT ?? 0)
  const handleSubmitConfirmEmail = async (data: { email: string }) => {
    modalConfirmEmailRef.current?.setLoading(true)
    try {
      await NSBService.sendOTPEmail({ email: data.email })
      modalVerifyEmailRef.current?.setData(data.email)
      modalVerifyEmailRef.current?.visible()
      modalConfirmEmailRef.current?.hidden()
    } catch (error) {
      showMessage(
        { error: t(t(error?.response?.data?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) },
        () => {
          modalConfirmEmailRef.current?.clearForm()
        },
        'common',
        t('OK', { ns: 'common' }) ?? ''
      )
    } finally {
      modalConfirmEmailRef.current?.setLoading(false)
    }
  }
  const handleSubmitConfirmPhoneNumber = async (data: { phonePrefix: string; phoneSuffix: string }) => {
    modalConfirmPhoneRef.current?.setLoading(true)
    try {
      await NSBService.sendOTPPhone({
        phonePrefix: data?.phonePrefix,
        phoneSuffix: data?.phoneSuffix
      })
      modalVerifyPhoneRef.current?.setData(data)
      modalVerifyPhoneRef.current?.visible()
      modalConfirmPhoneRef.current?.hidden()
    } catch (error) {
      showMessage(
        { error: t(t(error?.response?.data?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) },
        () => {
          modalConfirmPhoneRef.current?.clearForm()
        },
        'common',
        t('OK', { ns: 'common' }) ?? ''
      )
    } finally {
      modalConfirmPhoneRef.current?.setLoading(false)
    }
  }
  const handelVerifyEmail = async (data) => {
    modalVerifyEmailRef.current?.setLoading(true)
    try {
      await NSBService.verifyEmail({ email: data.email, optEmail: data.code })
      modalVerifyEmailRef.current?.clearForm()
      modalVerifyEmailRef.current?.hidden()
      setTimeout(() => {
        openModal({
          title: t('VERIFY_EMAIL_COMPLETED'),
          type: 'notification',
          subContent: (
            <MessageSendSuccess>
              <span>{t('EMAIL')}</span>
              <span className='email'>{data.email}</span>
              <span>{t('MESSAGE_VERIFY_SUCCESS')}</span>
            </MessageSendSuccess>
          ),
          okText: t('OK') ?? '完了',
          onOk: () => {
            closeModal()
            dispatch(getUserProfileThunk({}))
          }
        })
      }, 500)
    } catch (error) {
      showMessage(
        { error: t(t(error?.response?.data?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) },
        () => undefined,
        'common',
        t('OK') ?? '完了'
      )
    } finally {
      modalVerifyEmailRef.current?.setLoading(false)
    }
  }
  const handleResendCodeEmail = async (email: string) => {
    modalVerifyEmailRef.current?.setLoadingResendButton(true)
    try {
      await NSBService.sendOTPEmail({ email: email })
      modalVerifyEmailRef.current?.setTimeResendCode()
    } catch (error) {
      showMessage(
        { error: t(t(error?.response?.data?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) },
        () => undefined,
        'common',
        t('OK') ?? '完了'
      )
    } finally {
      modalVerifyEmailRef.current?.setLoadingResendButton(false)
    }
  }
  const handelVerifyPhone = async (data: { phonePrefix: string; phoneSuffix: string; code: string }) => {
    modalVerifyPhoneRef.current?.setLoading(true)
    try {
      await NSBService.verifyPhone({ phonePrefix: data.phonePrefix, phoneSuffix: data.phoneSuffix, otp: data.code })
      modalVerifyPhoneRef.current?.clearForm()
      modalVerifyPhoneRef.current?.hidden()
      setTimeout(() => {
        openModal({
          title: t('VERIFY_PHONE_COMPLETED'),
          type: 'notification',
          subContent: (
            <MessageSendSuccess>
              <div className='phone'>{`${formatJapanesePhoneNumber(data.phonePrefix, data.phoneSuffix, true)}`}</div>
              <span>{t('MESSAGE_VERIFY_PHONE_SUCCESS')}</span>
            </MessageSendSuccess>
          ),
          okText: t('OK') ?? '完了',
          onOk: () => {
            closeModal()
            dispatch(getUserProfileThunk({}))
          }
        })
      }, 500)
    } catch (error) {
      showMessage(
        { error: t(t(error?.response?.data?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) },
        () => undefined,
        'common',
        t('OK') ?? '完了'
      )
    } finally {
      modalVerifyPhoneRef.current?.setLoading(false)
    }
  }
  const handleResendCodePhone = async (data: { phonePrefix: string; phoneSuffix: string }) => {
    modalVerifyPhoneRef.current?.setLoadingResendButton(true)
    try {
      await NSBService.sendOTPPhone({ phonePrefix: data.phonePrefix, phoneSuffix: data.phoneSuffix })
      modalVerifyPhoneRef.current?.setTimeResendCode()
    } catch (error) {
      showMessage(
        { error: t(t(error?.response?.data?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) },
        () => undefined,
        'common',
        t('OK') ?? '完了'
      )
    } finally {
      modalVerifyPhoneRef.current?.setLoadingResendButton(false)
    }
  }
  useEffect(() => {
    fetchTicketLost()
  }, [])
  const fetchTicketLost = async () => {
    try {
      const data = await NSBService.getTicketUserInfo()
      setTicketInfo(data)
    } catch (error) {
      if (![401, 403].includes(error.response?.status)) {
        showMessage(
          { error: t(t(error?.response?.data?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) },
          () => undefined,
          'common',
          t('OK') ?? '完了'
        )
      }
    }
  }
  const data: AccountLevelProps[] = [
    {
      buttonFooter: (
        <ButtonActionAccountLevel
          type='primary'
          onClick={() => {
            modalConfirmEmailRef.current?.setData(userProfile?.email)
            modalConfirmEmailRef.current?.visible()
          }}
          disabled={userProfile?.accountLevel < 0 || userProfile?.accountLevel >= 1}
        >
          {t('EMAIL_VERIFICATION')}
        </ButtonActionAccountLevel>
      ),
      footerContent: `${t('EMAIL')}: ${userProfile?.email}`,
      title: `${t('ACCOUNT_LEVEL', {
        dynamicValue: true,
        number: 1
      })}`,
      status: userProfile?.accountLevel >= 1 ? t('VERIFIED') : t('UNVERIFIED'),
      verified: userProfile?.accountLevel >= 1,
      content:
        zone == 'global'
          ? t('LEVEL_1_CONTENT_GLOBAL', { dynamicValue: true, amountPrice: BNToFormat(MAX_LEVEL_1) })
          : t('LEVEL_1_CONTENT', { dynamicValue: true, amountPrice: BNToFormat(MAX_LEVEL_1) })
    },
    {
      buttonFooter: (
        <ButtonActionAccountLevel
          type='primary'
          disabled={userProfile?.accountLevel < 1 || userProfile?.accountLevel >= 2}
          onClick={() => {
            modalConfirmPhoneRef.current?.setData({
              phoneSuffix: userProfile?.phoneSuffix,
              phonePrefix: userProfile?.phonePrefix
            })
            modalConfirmPhoneRef.current?.visible()
          }}
        >
          {t('PHONE_VERIFICATION_2')}
        </ButtonActionAccountLevel>
      ),
      footerContent: `${t('PHONE_NUMBER')}: ${
        userProfile?.phonePrefix && userProfile?.phoneSuffix
          ? `${formatJapanesePhoneNumber(userProfile?.phonePrefix, userProfile?.phoneSuffix, true)}`
          : ''
      } `,
      title: `${t('ACCOUNT_LEVEL', {
        dynamicValue: true,
        number: 2
      })}`,
      status: userProfile?.accountLevel >= 2 ? t('VERIFIED') : t('UNVERIFIED'),
      verified: userProfile?.accountLevel >= 2,
      content:
        zone == 'global'
          ? t('LEVEL_2_CONTENT_GLOBAL', { dynamicValue: true, amountPrice: BNToFormat(MAX_LEVEL_2) })
          : t('LEVEL_2_CONTENT', { dynamicValue: true, amountPrice: BNToFormat(MAX_LEVEL_2) })
    },
    {
      buttonFooter: (
        <ButtonActionAccountLevel type='primary' disabled={true}>
          {t('E_KYC_VERIFICATION')}
        </ButtonActionAccountLevel>
      ),
      footerContent: t('FOOTER_CONTENT_KYC'),
      title: `${t('ACCOUNT_LEVEL', {
        dynamicValue: true,
        number: 3
      })}`,
      status: userProfile?.accountLevel >= 3 ? t('VERIFIED') : t('UNVERIFIED'),
      verified: userProfile?.accountLevel >= 3,
      content:
        zone == 'global'
          ? t('LEVEL_3_CONTENT_GLOBAL', { dynamicValue: true, amountPrice: BNToFormat(MAX_LEVEL_3) })
          : t('LEVEL_3_CONTENT', { dynamicValue: true, amountPrice: BNToFormat(MAX_LEVEL_3) }),
      disabled: true
    }
  ]
  return (
    <Layout isMyPage>
      <LayoutMyPage>
        {auth.isAuthenticated ? (
          <>
            <HeaderMenuStyled className='mobile tablet'>
              <div className='d-flex j-content-between al-items-center'>
                <TitleStyled className='mobile tablet'>
                  <UserIcon className='icon' /> <span>{t('USER_INFORMATION', { ns: 'common' })}</span>
                </TitleStyled>
                <ButtonIconStyled onClick={showDrawer}>
                  <MenuIcon className='icon' />
                </ButtonIconStyled>
              </div>
            </HeaderMenuStyled>
            <UserInfo ticketInfo={ticketInfo} />
            <ListStyled
              dataSource={data}
              renderItem={(item: AccountLevelProps, index) => (
                <ListItemStyled>
                  <AccountLevel {...item} />
                </ListItemStyled>
              )}
            />
          </>
        ) : (
          <SiteLoading />
        )}
      </LayoutMyPage>
      <ModalFormChangeEmail ref={modalConfirmEmailRef} handleSubmit={handleSubmitConfirmEmail} />
      <ModalFormChangePhoneNumber ref={modalConfirmPhoneRef} handleSubmit={handleSubmitConfirmPhoneNumber} />
      <ModalFormVerify
        handleResendCode={handleResendCodeEmail}
        ref={modalVerifyEmailRef}
        handleSubmit={handelVerifyEmail}
        title={t('TITLE_EMAIL_VERIFY')}
        type={'email'}
      />
      <ModalFormVerify
        handleResendCode={handleResendCodePhone}
        ref={modalVerifyPhoneRef}
        handleSubmit={handelVerifyPhone}
        title={t('TITLE_PHONE_VERIFY')}
        type={'phone'}
      />
    </Layout>
  )
}

export default UserProfile
