import React, { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Layout from '@/app/layout'
import LayoutMyPage from '@/components/layout-my-page'
import {
  Box,
  ButtonGroup,
  ButtonIconStyled,
  ButtonStyled,
  ContainerForm,
  ContainerSubFrom,
  FormStyled,
  HeaderMenuStyled,
  InputStyled,
  MessageSendSuccess,
  PhoneStyled,
  RadioCustomStyled,
  RadioGroupStyled,
  Static,
  TitleStyled
} from './styled'
import Ticket2Icon from '@/components/icons/Ticket2Icon'
import TicketUsedIcon from '@/components/icons/TicketUsedIcon'
import Ticket3Icon from '@/components/icons/Ticket3Icon'

import { Form } from 'antd'
import InputNumber from './components/input-number/input-number'
import ErrorMessage from './components/input-number/error-message'
import { ModalRef } from './components/modal'
import { useAppSelector } from '@/hooks/store'
import { BNToFormat } from '@/utils/bigNumber'
import classNames from 'classnames'
import NSBService from '@/services/NSB.service'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import ModalConfirmBuyTicketByAccountBalance from './components/modal/confirm-buy-ticket-account-balance'
import ModalConfirmBuyTicketByCreditCard from './components/modal/confirm-buy-ticket-credit-card'
import ModalSuccessBuyTicketByAccountBalance from './components/modal/success-buy-ticket-account-balance'
import ModalSuccessBuyTicketByCreditCard from './components/modal/scucces-buy-ticket-credit-card'
import SiteLoading from '@/components/site-loading'
import { PriceRate } from '@/services/dto'
import ModalConfirmBankTransfer, { ModalRefConfirmBankTransfer } from './components/modal/confirm-bank-transfer'
import useModal from '@/hooks/useModal'

import ModalConfirmBuyTicketBySlashPayment from './components/modal/confirm-slash-payment'
import { useTranslation } from 'next-i18next'
import { REGEX_EMAIL, REGEX_PHONENUMBER } from '@/constants/regex'
import { useRouter } from 'next/router'
import InfoIcon from '@/components/icons/InfoIcon'
import TooltipCustom from './components/tooltip'
import { AppRoutes } from '@/constants/routes'
import { useMyPageContext } from '@/context/my-page'
import SelectCountries from '@/components/common/form/SelectCountries'
import MenuIcon from '@/components/icons/MenuIcon'
import TicketIcon from '@/components/icons/TicketIcon'
type RadioItemType = {
  label: string
  value: string | number
}
type BuyTicketProps = {
  priceRates: PriceRate[]
}
const BuyTicket = ({ priceRates }: BuyTicketProps) => {
  const [form] = Form.useForm()
  const { t } = useTranslation('buy-ticket')
  const radioList: RadioItemType[] = [
    { label: t('ACCOUNT_BALANCE'), value: 'ACCOUNT_BALANCE' },
    { label: t('BANK_TRANSFER'), value: 'BANK_TRANSFER' },
    { label: t('CREDIT_CARD'), value: 'CREDIT_CARD' },
    { label: t('SLASH_PAYMENT'), value: 'SLASH_PAYMENT' }
  ]
  const confirmBuyTicketByAccountBalanceRef = useRef<ModalRef | null>(null)
  const successBuyTicketByAccountBalanceRef = useRef<ModalRef | null>(null)
  const confirmBuyTicketByCreditCardRef = useRef<ModalRef | null>(null)
  const confirmBuyTicketBySlashPayment = useRef<ModalRef | null>(null)
  const successBuyTicketByCreditCardRef = useRef<ModalRef | null>(null)
  const confirmBankTransferRef = useRef<ModalRefConfirmBankTransfer | null>(null)
  const user = useAppSelector((state) => state.auth?.user)
  const watchAmount = Form.useWatch('amount', form) ?? 0
  const watchPaymentMethod = Form.useWatch('payment_method', form)
  const watchBalanceBefore = Form.useWatch('balance_before', form)
  const watchBalanceAfter = Form.useWatch('balance_after', form)
  const values = Form.useWatch([], form)
  const { openModal, closeModal } = useModal()
  const [showError, setShowError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingButtonSubmit, setLoadingButtonSubmit] = useState<boolean>(false)
  const [priceOfTicket, setPriceOfTicket] = useState(0)
  const router = useRouter()
  const { activeTab, redirectType, matchId } = router.query
  const [userTicket, setUserTicket] = useState({ totalTicketLose: 0, totalTicketUsed: 0 })
  const userProfile = useAppSelector((state) => state.auth?.userProfile)
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated)
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const priceRate = useAppSelector((state) => state.auth?.rate)
  const { showDrawer } = useMyPageContext()
  const MAX_LEVEL_1 = Number(priceRate?.LEVEL1_MAX_AMOUNT ?? 0)
  const MAX_LEVEL_2 = Number(priceRate?.LEVEL2_MAX_AMOUNT ?? 0)
  const MAX_LEVEL_3 = Number(priceRate?.LEVEL3_MAX_AMOUNT ?? 0)
  const MIN_PRICE = 3000
  const zone = useAppSelector((state) => state.app?.zone)
  const [currentTab, setCurrentTab] = useState<number>(1)

  useEffect(() => {
    setCurrentTab(Number(activeTab) || 1)
  }, [activeTab])

  const isMaxPriceCreditCard = useMemo(() => {
    if (watchPaymentMethod === 'BANK_TRANSFER') {
      if (userProfile.accountLevel == 1) {
        return !(watchAmount * priceOfTicket <= MAX_LEVEL_1)
      }
      if (userProfile.accountLevel == 2) {
        return !(watchAmount * priceOfTicket <= MAX_LEVEL_2)
      }
      if (userProfile.accountLevel == 3) {
        return !(watchAmount * priceOfTicket <= MAX_LEVEL_3)
      }
    } else {
      return false
    }
  }, [watchPaymentMethod, watchAmount, priceOfTicket])
  const isMinPriceCreditCard = useMemo(() => {
    if (watchPaymentMethod === 'BANK_TRANSFER' && form.isFieldTouched('amount')) {
      return !(watchAmount * priceOfTicket >= MIN_PRICE)
    } else {
      return false
    }
  }, [watchPaymentMethod, watchAmount, priceOfTicket])

  // useLayoutEffect(() => {
  //   if (dirPath && dirPath === 'bet') {
  //     setShowFormBuyTicket(true)
  //   }
  // }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTab])

  const showButtonBuyTicket =
    watchAmount > 0 && !!watchPaymentMethod && !showError && !isMaxPriceCreditCard && !isMinPriceCreditCard
  useLayoutEffect(() => {
    fetchUserTicket()
  }, [])
  useEffect(() => {
    if (isAuthenticated == true && userProfile?.accountLevel <= 0) {
      openModal({
        content: t('NEED_UPDATE_LEVEL_MESSAGE'),
        type: 'notification',
        okText: 'OK',
        theme: 'warning',
        onOk(e) {
          router.replace(AppRoutes.myPage)
          closeModal()
        }
      })
    }
  }, [userProfile, isAuthenticated])
  useEffect(() => {
    const touchedFields = Object.keys(form.getFieldsValue()).filter((field) => form.isFieldTouched(field))
    form.validateFields(touchedFields)
  }, [router.locale])
  useEffect(() => {
    getRatePrice()
  }, [priceRates])
  useEffect(() => {
    updateValueInput()
  }, [watchAmount, watchPaymentMethod, priceOfTicket])
  const containerInfoTicketRef = useRef()
  const fetchUserTicket = async () => {
    try {
      const data = await NSBService.getTicketUserInfo()
      setUserTicket(data)
    } catch (error) {
      setUserTicket({ totalTicketLose: 0, totalTicketUsed: 0 })
      if (![401, 403].includes(error.response?.status)) {
        showMessage(
          { error: t(t(error?.response?.data?.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) },
          () => undefined,
          'common',
          t('OK', { ns: 'common' }) ?? ''
        )
      }
    }
  }
  const checkCanSubmit = () => {
    switch (watchPaymentMethod) {
      case 'BANK_TRANSFER': {
        const arrayCheck = ['name', 'phoneSuffix', 'phonePrefix', 'email']
        form
          .validateFields(arrayCheck, { validateOnly: true })
          .then(() => {
            setCanSubmit(true)
          })
          .catch((error) => {
            if (error['outOfDate']) {
              setCanSubmit(true)
            } else {
              setCanSubmit(false)
            }
          })
        break
      }

      case 'ACCOUNT_BALANCE': {
        setCanSubmit(true)
        break
      }

      case 'CREDIT_CARD': {
        setCanSubmit(true)
        break
      }

      case 'SLASH_PAYMENT': {
        setCanSubmit(true)
        break
      }

      default:
        break
    }
  }
  useEffect(() => {
    checkCanSubmit()
  }, [watchPaymentMethod, values])
  const getRatePrice = async () => {
    setLoading(true)
    try {
      const priceOfTicketTemp = priceRates.filter((item) => item.name === 'TICKET_TO_JPY')[0].value
      setPriceOfTicket(+priceOfTicketTemp)
    } catch (error) {
      // console.log(getError(error))
    } finally {
      setLoading(false)
    }
  }
  const initData = () => {
    form.setFieldValue('phonePrefix', 'JP(+81)')
  }
  useEffect(() => {
    initData()
  }, [])
  const updateValueInput = useCallback(() => {
    form.setFieldValue('price', `${BNToFormat(watchAmount * priceOfTicket)}円`)
    form.setFieldValue('balance_before', `${BNToFormat(+user?.accountBalance)}円`)
    form.setFieldValue('balance_after', `${BNToFormat(+user?.accountBalance - watchAmount * priceOfTicket)}円`)
    if (watchPaymentMethod === radioList[0].value) {
      setShowError(+user?.accountBalance - watchAmount * priceOfTicket < -1)
    } else {
      setShowError(false)
    }
  }, [watchAmount, watchPaymentMethod, priceOfTicket, user?.accountBalance])
  const handleSubmit = async (data: any) => {
    switch (data.payment_method) {
      case 'ACCOUNT_BALANCE': {
        confirmBuyTicketByAccountBalanceRef.current?.visible()
        break
      }
      case 'CREDIT_CARD': {
        // alert('hello')
        handlePayment({ amount: data.amount, paymentMethod: 'CREDIT_CARD' })
        break
      }
      case 'BANK_TRANSFER': {
        try {
          const data_request = await NSBService.PaymentRequestTWG({
            amount: data.amount,
            email: data.email,
            name: data.name,
            phonePrefix: data.phonePrefix,
            phoneSuffix: data.phoneSuffix
          })
          confirmBankTransferRef.current?.visible()
          confirmBankTransferRef.current?.setData({
            ...data,
            ...data_request.data,
            paymentMethod: data.payment_method
          })
        } catch (error) {
          showMessage({ error: t(t(getError(error).code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
        }
        break
      }
      case 'SLASH_PAYMENT': {
        // confirmBuyTicketBySlashPayment.current?.visible()
        handlePayment({ amount: data.amount, paymentMethod: 'SLASH_PAYMENT' })
        // handlePayment({ paymentMethod: 'SLASH_PAYMENT', ticketQuantity: data.amount })
        break
      }
      default:
        showMessage({ info: 'Features is coming!' })
        break
    }
  }
  const resetForm = () => {
    form.setFieldValue('amount', 0)
    updateValueInput()
  }
  const handlePayment = async (data: any) => {
    switch (data.paymentMethod) {
      case 'ACCOUNT_BALANCE': {
        try {
          confirmBuyTicketByAccountBalanceRef.current?.setLoading(true)
          await NSBService.paymentAccountBalance({ amountTicket: data.amount ?? 0 })

          setTimeout(() => {
            confirmBuyTicketByAccountBalanceRef.current?.hidden()
          }, 500)
          setTimeout(() => {
            successBuyTicketByAccountBalanceRef.current?.visible()
            confirmBuyTicketByAccountBalanceRef.current?.setLoading(false)
          }, 1500)
        } catch (error) {
          showMessage({ error: t(t(getError(error).code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
          confirmBuyTicketByAccountBalanceRef.current?.setLoading(false)
        }
        break
      }
      case 'CREDIT_CARD': {
        try {
          setLoadingButtonSubmit(true)
          // confirmBuyTicketByCreditCardRef.current?.setLoading(true)
          const creditCardUrl = await NSBService.paymentStripe({
            amount: data.amount ?? 0,
            langKey: router.locale?.toLocaleUpperCase() ?? 'JA',
            redirectType: redirectType ?? 'MY_PAGE',
            matchId: matchId ?? 0
          })

          window.location.href = creditCardUrl.data
          // window.open(creditCardUrl.data)
          // setTimeout(() => {
          //   confirmBuyTicketByCreditCardRef.current?.hidden()
          // }, 500)
          // setTimeout(() => {
          //   successBuyTicketByCreditCardRef.current?.visible()
          //   confirmBuyTicketByCreditCardRef.current?.setLoading(false)
          // }, 1500)
        } catch (error) {
          console.log(getError(error))
          setLoadingButtonSubmit(false)
          showMessage({ error: t(t(getError(error).code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
          // confirmBuyTicketByCreditCardRef.current?.setLoading(false)
        } finally {
          setLoadingButtonSubmit(false)
        }
        break
      }
      case 'BANK_TRANSFER': {
        try {
          confirmBankTransferRef.current?.setLoading(true)
          delete data['paymentMethod']
          NSBService.PaymentDepositTWG({ ...data })
          setTimeout(() => {
            confirmBankTransferRef.current?.hidden()
          }, 500)
          setTimeout(() => {
            openModal({
              title: t('BANK_TRANSFER_SUCCESS_TITLE'),
              type: 'notification',
              theme: 'warning',
              subContent: (
                <MessageSendSuccess>
                  <div>{t('BANK_TRANSFER_SUCCESS_MESSAGE')}</div>
                </MessageSendSuccess>
              ),
              okText: t('OK', { ns: 'common' }) ?? '',
              onOk: () => {
                closeModal()
                form.resetFields()
                form.setFieldValue('amount', 0)
                confirmBankTransferRef.current?.setLoading(false)
                initData()
                setTimeout(() => {
                  router.push(`/my-page/history?tabActive=4&tabChildActive=BUY_TICKETS`)
                }, 500)
              }
            })
          }, 1500)
        } catch (error) {
          showMessage({ error: t(t(getError(error).code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
          confirmBankTransferRef.current?.setLoading(false)
        }
        break
      }
      case 'SLASH_PAYMENT': {
        try {
          setLoadingButtonSubmit(true)
          // confirmBuyTicketBySlashPayment.current?.setLoading(true)
          const rs = await NSBService.BuyTicketBySlash({
            amount: data.amount,
            redirectType: redirectType ?? 'MY_PAGE',
            matchId: matchId ?? 0
          })

          window.location.href = rs.url
        } catch (error) {
          showMessage({ error: t(t(getError(error).code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
        } finally {
          // confirmBuyTicketBySlashPayment.current?.setLoading(false)
          setLoadingButtonSubmit(false)
          // setLoading(false)
        }
        break
      }
      default:
        break
    }
  }
  const renderErrorMaxPrice = () => {
    switch (userProfile?.accountLevel) {
      case 1:
        return (
          <div style={{ marginBottom: 16 }}>
            <ErrorMessage
              message={
                t('ERROR_MAX_PRICE', {
                  dynamicValue: true,
                  paymentAmount: BNToFormat(MAX_LEVEL_1)
                }) as string
              }
            />
          </div>
        )
      case 2:
        return (
          <div style={{ marginBottom: 16 }}>
            <ErrorMessage
              message={
                t('ERROR_MAX_PRICE', {
                  dynamicValue: true,
                  paymentAmount: BNToFormat(MAX_LEVEL_2)
                }) as string
              }
            />
          </div>
        )
      case 3:
        return (
          <div style={{ marginBottom: 16 }}>
            <ErrorMessage
              message={
                t('ERROR_MAX_PRICE', {
                  dynamicValue: true,
                  paymentAmount: BNToFormat(MAX_LEVEL_3)
                }) as string
              }
            />
          </div>
        )
      default:
        break
    }
  }
  const renderErrorMinPrice = () => {
    return (
      <div style={{ marginBottom: 16 }}>
        <ErrorMessage
          message={
            t('ERROR_MIN_PRICE', {
              dynamicValue: true,
              paymentAmount: BNToFormat(MIN_PRICE)
            }) as string
          }
        />
      </div>
    )
  }
  const checkCanBuyByCreditCard = () => {
    switch (userProfile?.accountLevel) {
      case 1:
        return !!priceRate?.LEVEL1_PAYMENT_CREDIT
      case 2:
        return !!priceRate?.LEVEL2_PAYMENT_CREDIT
      case 3:
        return !!priceRate?.LEVEL3_PAYMENT_CREDIT
    }
  }
  const subForm = {
    ACCOUNT_BALANCE: (
      <>
        <ContainerSubFrom>
          <Form.Item label={<span className='label'>{t('BALANCE_BEFORE_SETTLEMENT')}</span>} name='balance_before'>
            <InputStyled disabled />
          </Form.Item>
          <Form.Item label={<span className='label'>{t('BALANCE_AFTER_SETTLEMENT')}</span>} name='balance_after'>
            <InputStyled disabled className={classNames({ error: showError })} />
          </Form.Item>
          {showError && <ErrorMessage message={t('INSUFFICIENT_EXISTING_BALANCE') as string} />}
        </ContainerSubFrom>
      </>
    ),
    CREDIT_CARD: <></>,
    BANK_TRANSFER: (
      <>
        <ContainerSubFrom>
          <Form.Item
            rules={[
              {
                required: true,
                message:
                  t('FIELD_REQUIRED', {
                    fieldName: t('NAME'),
                    dynamicValue: true
                  }) ?? ''
              },
              {
                max: 30,
                message:
                  t('MAX_LENGTH_INPUT', {
                    fieldName: t('NAME'),
                    length: '30',
                    dynamicValue: true
                  }) ?? ''
              }
            ]}
            name='name'
          >
            <InputStyled label={t('NAME')} isRequired />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message:
                  t('FIELD_REQUIRED', {
                    fieldName: t('EMAIL'),
                    dynamicValue: true
                  }) ?? ''
              },
              {
                max: 200,
                message:
                  t('MAX_LENGTH_INPUT', {
                    fieldName: t('EMAIL'),
                    length: '200',
                    dynamicValue: true
                  }) ?? ''
              },
              { pattern: REGEX_EMAIL, message: t('INCORRECT_EMAIL') ?? '' }
            ]}
            normalize={(value: string) => value.trim()}
          >
            <InputStyled label={t('EMAIL')} isRequired />
          </Form.Item>
          <div className='d-flex'>
            <Form.Item name='phonePrefix' className='me-1 select-country'>
              <SelectCountries label={t('PHONE_NUMBER')} showSearch />
            </Form.Item>
            <Form.Item
              name='phoneSuffix'
              className='flex-grow-1'
              rules={[
                {
                  required: true,
                  message:
                    t('FIELD_REQUIRED', {
                      fieldName: t('PHONE_NUMBER'),
                      dynamicValue: true
                    }) ?? ''
                },
                { pattern: REGEX_PHONENUMBER, message: t('INCORRECT_PHONE') ?? '' }
              ]}
            >
              <PhoneStyled label={<></>} />
            </Form.Item>
          </div>
        </ContainerSubFrom>
      </>
    )
  }
  return (
    <Layout isMyPage>
      <LayoutMyPage>
        <Box>
          <HeaderMenuStyled className='mobile tablet'>
            <div className='d-flex j-content-between al-items-center'>
              <TitleStyled className='mobile tablet'>
                <TicketIcon className='icon' /> <span>{t('TICKET_PURCHASE_TITLE')}</span>
              </TitleStyled>
              <ButtonIconStyled onClick={showDrawer}>
                <MenuIcon className='icon' />
              </ButtonIconStyled>
            </div>
          </HeaderMenuStyled>
          {!loading ? (
            <>
              {Number(currentTab) === 1 ? (
                <div ref={containerInfoTicketRef as any} className='container-info-ticket'>
                  <TitleStyled className='title'>{t('TICKET_PURCHASE_TITLE')}</TitleStyled>
                  <Static>
                    <div>
                      <Ticket2Icon className='icon' />
                      <div>
                        <div className='title'>{t('TICKET')}</div>
                        <div className='count'>{BNToFormat(user?.totalTicket) ?? 0}</div>{' '}
                      </div>
                    </div>
                    <div>
                      <TicketUsedIcon className='icon' />

                      <div>
                        <div className='title'>{t('NUMBER_OF_USED_TICKETS')}</div>
                        <div className='count'>{BNToFormat(userTicket.totalTicketUsed)}</div>
                      </div>
                    </div>
                    <div>
                      <Ticket3Icon className='icon' />
                      <div>
                        <div className='title'>{t('NUMBER_OF_LOST_TICKETS')}</div>
                        <div className='count'>{BNToFormat(userTicket.totalTicketLose)}</div>
                      </div>
                    </div>
                  </Static>
                  <ButtonGroup className='group-btn-next'>
                    <ButtonStyled
                      type={'primary'}
                      onClick={() => {
                        // setShowFormBuyTicket(true)
                        router.push(
                          {
                            pathname: router.pathname,
                            query: {
                              ...router.query,
                              activeTab: 2
                            }
                          },
                          undefined,
                          {
                            scroll: true,
                            shallow: true
                          }
                        )
                      }}
                      className='btn-next'
                    >
                      {''}
                      {t('BUY', { ns: 'common' })}
                    </ButtonStyled>
                  </ButtonGroup>
                </div>
              ) : (
                <ContainerForm>
                  <TitleStyled className='title'>{t('TICKET_PURCHASE_TITLE')}</TitleStyled>
                  <FormStyled form={form} layout='vertical' onFinish={handleSubmit}>
                    <Form.Item label={<span className='label'>{t('TICKETS')}</span>} name='amount'>
                      <InputNumber
                        charFormatter={t('PIECE') as string}
                        parser={(value: string) => {
                          const number = parseInt(
                            value!.replace(/\$\s?|(,*)/g, '').replace(t('PIECE') as string, ''),
                            10
                          )
                          return isNaN(number)
                            ? 0
                            : parseInt(value!.replace(/\$\s?|(,*)/g, '').replace(t('PIECE') as string, ''), 10)
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <span className='label'>
                          {t('PAYMENT_AMOUNT', { dynamicValue: true, amountPrice: BNToFormat(priceOfTicket) })}
                        </span>
                      }
                      className='input-number'
                      name='price'
                    >
                      <InputStyled
                        disabled
                        className={classNames({ error: isMaxPriceCreditCard || isMinPriceCreditCard })}
                      />
                    </Form.Item>
                    {isMaxPriceCreditCard && <>{renderErrorMaxPrice()}</>}
                    {isMinPriceCreditCard && <>{renderErrorMinPrice()}</>}

                    <Form.Item label={<span className='label'>{t('PAYMENT_METHOD')}</span>} name='payment_method'>
                      <RadioGroupStyled>
                        {radioList.map((item: RadioItemType, index) => {
                          return (
                            <Fragment key={index}>
                              {
                                {
                                  BANK_TRANSFER: (
                                    <RadioCustomStyled
                                      key={index}
                                      value={item.value}
                                      // disabled={userProfile?.accountLevel !== 3}
                                    >
                                      <span className='label d-flex al-items-center' style={{ gap: 8 }}>
                                        <span className='text'> {item.label}</span>
                                        <span className='icon'>
                                          <TooltipCustom
                                            title={t('BANK_TRANSFER_MAX', {
                                              dynamicValue: true,
                                              amountPriceLevel1: BNToFormat(MAX_LEVEL_1),
                                              amountPriceLevel2: BNToFormat(MAX_LEVEL_2),
                                              amountPriceLevel3: BNToFormat(MAX_LEVEL_3),
                                              amountMinPrice: BNToFormat(MIN_PRICE)
                                            })}
                                            trigger={['hover']}
                                            placement='bottom'
                                          >
                                            <InfoIcon />
                                          </TooltipCustom>
                                        </span>
                                      </span>
                                    </RadioCustomStyled>
                                  ),
                                  CREDIT_CARD: (
                                    <RadioCustomStyled
                                      key={index}
                                      value={item.value}
                                      disabled={!checkCanBuyByCreditCard()}
                                    >
                                      <span className='label d-flex al-items-center' style={{ gap: 8 }}>
                                        <span className='text'> {item.label}</span>
                                        <span className='icon'>
                                          <TooltipCustom
                                            title={t('ONLY_LEVEL_3')}
                                            trigger={['hover']}
                                            placement='bottom'
                                          >
                                            <InfoIcon />
                                          </TooltipCustom>
                                        </span>
                                      </span>
                                    </RadioCustomStyled>
                                  ),
                                  ACCOUNT_BALANCE: (
                                    <RadioCustomStyled key={index} value={item.value}>
                                      <span className='label d-flex al-items-center' style={{ gap: 8 }}>
                                        <span className='text'> {item.label}</span>
                                      </span>
                                    </RadioCustomStyled>
                                  ),
                                  SLASH_PAYMENT: (
                                    <>
                                      {zone === 'global' ? (
                                        <RadioCustomStyled key={index} value={item.value}>
                                          <span className='label d-flex al-items-center' style={{ gap: 8 }}>
                                            <span className='text'> {item.label}</span>
                                          </span>
                                        </RadioCustomStyled>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  )
                                }[item.value]
                              }
                              <>
                                {radioList[index].value == watchPaymentMethod && radioList[index].value == item.value
                                  ? subForm[watchPaymentMethod]
                                  : ''}
                              </>
                            </Fragment>
                          )
                        })}
                      </RadioGroupStyled>
                    </Form.Item>
                    <ButtonGroup>
                      <ButtonStyled
                        className='form-button'
                        onClick={() => {
                          // setShowFormBuyTicket(false)
                          router.push(
                            {
                              pathname: router.pathname,
                              query: {
                                ...router.query,
                                activeTab: 1
                              }
                            },
                            undefined,
                            {
                              scroll: true,
                              shallow: true
                            }
                          )
                        }}
                        loading={loadingButtonSubmit}
                      >
                        {t('CANCEL', { ns: 'common' })}
                      </ButtonStyled>
                      <ButtonStyled
                        className='form-button'
                        type={'primary'}
                        disabled={!showButtonBuyTicket || !canSubmit}
                        htmlType='submit'
                        loading={loadingButtonSubmit}
                      >
                        {''}
                        {t('NEXT', { ns: 'common' })}
                      </ButtonStyled>
                    </ButtonGroup>
                  </FormStyled>
                </ContainerForm>
              )}
            </>
          ) : (
            <SiteLoading />
          )}
        </Box>
        <ModalConfirmBuyTicketByAccountBalance
          handleSubmit={(data) => {
            handlePayment(data)
          }}
          priceOfTicket={priceOfTicket}
          ref={confirmBuyTicketByAccountBalanceRef}
          data={{
            amount: watchAmount,
            balanceAfter: watchBalanceAfter,
            balanceBefore: watchBalanceBefore,
            paymentMethod: watchPaymentMethod
          }}
        />
        <ModalConfirmBuyTicketBySlashPayment
          handleSubmit={(data) => {
            handlePayment(data)
          }}
          priceOfTicket={priceOfTicket}
          ref={confirmBuyTicketBySlashPayment}
          data={{
            amount: watchAmount,
            paymentMethod: watchPaymentMethod
          }}
        />
        <ModalSuccessBuyTicketByAccountBalance
          ref={successBuyTicketByAccountBalanceRef}
          priceOfTicket={priceOfTicket}
          resetForm={resetForm}
          data={{
            amount: watchAmount,
            balanceAfter: watchBalanceAfter,
            balanceBefore: watchBalanceBefore,
            paymentMethod: watchPaymentMethod
          }}
          handleOK={() => {
            if (redirectType === 'BET_TOURNAMENT') {
              return router.push({
                pathname: AppRoutes.betList,
                query: {
                  activeTab: 1
                }
              })
            }

            if (redirectType === 'BET_MATCH') {
              return router.push({
                pathname: AppRoutes.betList,
                query: {
                  activeTab: 2
                }
              })
            }

            if (redirectType === 'MATCH_DETAIL') {
              return router.push(AppRoutes.betDetail(Number(matchId)))
            }

            router.push(
              {
                pathname: router.pathname,
                query: {
                  ...router.query,
                  activeTab: 1
                }
              },
              undefined,
              {
                scroll: true,
                shallow: true
              }
            )
          }}
        />
        <ModalConfirmBuyTicketByCreditCard
          ref={confirmBuyTicketByCreditCardRef}
          handleSubmit={(data) => {
            handlePayment(data)
          }}
          priceOfTicket={priceOfTicket}
          data={{ amount: watchAmount, paymentMethod: watchPaymentMethod }}
        />
        <ModalSuccessBuyTicketByCreditCard
          priceOfTicket={priceOfTicket}
          ref={successBuyTicketByCreditCardRef}
          data={{ amount: watchAmount, paymentMethod: watchPaymentMethod }}
        />
        <ModalConfirmBankTransfer
          ref={confirmBankTransferRef}
          handleSubmit={(data) => {
            handlePayment(data)
          }}
        />
      </LayoutMyPage>
    </Layout>
  )
}

export default BuyTicket
