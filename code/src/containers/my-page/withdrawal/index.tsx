import Layout from '@/app/layout'
import LayoutMyPage from '@/components/layout-my-page'
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ButtonGroup,
  ButtonIconStyled,
  ButtonStyled,
  ContainerForm,
  ContainerSubFrom,
  HeaderMenuStyled,
  InputStyled,
  MessageSendSuccess,
  RadioCustomStyled,
  RadioGroupStyled,
  TitleStyled
} from './styled'
import { Form, Spin } from 'antd'
import InputNumber from './components/input-number/input-number'
import { ModalRef } from '../buy-ticket/components/modal'
import ModalChooseType from './components/modal/choose-type'
import ModalConfirmWithDraw, { ModalConfirmRef } from './components/modal/confirm'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import ErrorMessage from './components/input-number/error-message'
import classNames from 'classnames'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import NSBService from '@/services/NSB.service'
import useModal from '@/hooks/useModal'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMyPageContext } from '@/context/my-page'
import bigNumber, { BNToFormat } from '@/utils/bigNumber'
import { getBalance } from '@/utils/getBalance'
import { syncETHBalance } from '@/redux/auth/slice'
import { useWatch } from 'antd/es/form/Form'
import _ from 'lodash'
import WithDrawIcon from '@/components/icons/WithDrawIcon'
import MenuIcon from '@/components/icons/MenuIcon'

type RadioItemType = {
  label: string
  value: string | number
}
const Withdrawal = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation('withdrawal')
  const { locale } = useRouter()
  const radioList: RadioItemType[] = [
    { label: t('BANK_DEPOSIT'), value: 'BANK_DEPOSIT' },
    { label: t('CRYPTOCURRENCY'), value: 'CRYPTOCURRENCY' }
  ]
  const watchPaymentMethod = Form.useWatch('payment_method', form)
  const modalChooseCryptoRef = useRef<ModalRef | null>(null)
  const modalChooseBankRef = useRef<ModalRef | null>(null)
  const modalConfirmRef = useRef<ModalConfirmRef | null>(null)
  const user = useAppSelector((state) => state.auth?.user)
  const watchAmount = Form.useWatch('amount', form)
  const { openModal, closeModal } = useModal()
  const { showDrawer } = useMyPageContext()
  const [listBank, setListBank] = useState<any>([])
  const [listCryptoUserAccount, setListCryptoUserAccount] = useState([])
  const [priceETHToYen, setPriceETHToYen] = useState(0)
  const [keyCryptoAmount, setKeyCryptoAmount] = useState(new Date().getTime())
  const [keyGasAmount, setKeyGasAmount] = useState(new Date().getTime())
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const values = useWatch([], form)
  const dispatch = useAppDispatch()
  const [loadingFormCrypto, setLoadingFormCrypto] = useState(false)
  const zone = useAppSelector((state) => state.app.zone)
  const handleSubmit = async (data: any) => {
    modalConfirmRef.current?.setDataConfirm(data)
    modalConfirmRef.current?.visible()
  }
  const [gasData, setGasData] = useState(null)
  const initData = () => {
    form.setFieldValue('amount', 0)
    form.setFieldValue('payment_method', 'BANK_DEPOSIT')
    form.setFieldValue('save_history', false)
    form.setFieldValue('currency', 'ETH')
    form.setFieldValue('cryptoAmount', `${0} ETH`)
    form.setFieldValue('gasData', `${0} ETH`)
    form.setFieldValue('toPublicAddress', user?.publicAddress)
  }
  const MAX_LEVEL_3 = 100000000
  const MIN_PRICE = 1000
  const isMaxPriceCreditCard = useMemo(() => {
    if (watchPaymentMethod === 'BANK_DEPOSIT') {
      return !(watchAmount <= MAX_LEVEL_3)
    } else {
      return false
    }
  }, [watchPaymentMethod, watchAmount])
  const isMinPriceCreditCard = useMemo(() => {
    if (form.isFieldTouched('amount')) {
      return !(watchAmount >= MIN_PRICE)
    } else {
      return false
    }
  }, [watchPaymentMethod, watchAmount])

  useEffect(() => {
    // initData
    initData()
  }, [user?.publicAddress])
  // get bank info
  useEffect(() => {
    updateValueInput()
  }, [watchAmount])
  const convertYenToETH = (amountYen, priceETHToYen) => {
    const roundedNumber = Math.floor((amountYen / priceETHToYen) * 100000000) / 100000000
    return roundedNumber
  }
  const updateValueInput = useCallback(() => {
    if (watchAmount >= 0) {
      if (isNaN(watchAmount / priceETHToYen)) {
        form.setFieldValue('cryptoAmount', `${0} ETH`)
        setKeyCryptoAmount(new Date().getTime())
      } else {
        form.setFieldValue('cryptoAmount', `${convertYenToETH(watchAmount, priceETHToYen)} ETH`)
        setKeyCryptoAmount(new Date().getTime())
      }
    }
  }, [watchAmount, priceETHToYen, user?.accountBalance])

  const fetchListCryptoUserAccount = async () => {
    try {
      const data = await NSBService.getListCryptoUserAccount()
      setListCryptoUserAccount(data.result)
    } catch (error) {
      setListCryptoUserAccount([])
      // showMessage({ error: getError(error) })
    }
  }
  useEffect(() => {
    fetchListBank()
    fetchListCryptoUserAccount()
    getRatePrice()
  }, [])
  const fetchListBank = async () => {
    try {
      const data = await NSBService.getListBankByUser()
      setListBank(data.result)
    } catch (error) {
      // console.log(error)
      setListBank([])
    }
  }
  const getRatePrice = async () => {
    // setLoading(true)
    try {
      const priceRates = await NSBService.getPriceRate()
      const priceETHToYenTemp = priceRates.filter((item) => item.name === 'ETH_TO_JPY')[0].value
      setPriceETHToYen(+priceETHToYenTemp)
    } catch (error) {
      setPriceETHToYen(0)
      throw error
    }
  }
  const updateBalanceInput = useCallback(() => {
    form.setFieldValue('balance', bigNumber(user?.accountBalance).toNumber())
  }, [user?.accountBalance])
  useEffect(() => {
    updateBalanceInput()
  }, [user?.accountBalance])
  const debouncedGetGasCrypto = _.debounce(() => {
    switch (watchPaymentMethod) {
      case 'CRYPTOCURRENCY': {
        if (watchAmount > 0 && !isMinPriceCreditCard) {
          fetchGasCrypto()
        } else {
          form.setFieldValue('gasData', `${0} ETH`)
          setCanSubmit(false)
          setKeyGasAmount(new Date().getTime())
          setLoadingFormCrypto(false)
          setGasData(null)
        }
        break
      }
      default:
        break
    }
  })
  useEffect(() => {
    debouncedGetGasCrypto()
  }, [watchPaymentMethod])
  const checkCanSubmit = useCallback(() => {
    switch (watchPaymentMethod) {
      case 'BANK_DEPOSIT': {
        const arrayCheck = ['account_name', 'account_number', 'bank_code', 'bank_name', 'branch_code', 'branch_name']
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

      case 'CRYPTOCURRENCY': {
        // setCanSubmit(true)
        break
      }
      default:
        break
    }
  }, [watchPaymentMethod, values])
  useEffect(() => {
    checkCanSubmit()
  }, [watchPaymentMethod, values])

  useEffect(() => {
    const touchedFields = Object.keys(form.getFieldsValue()).filter((field) => form.isFieldTouched(field))
    form.validateFields(touchedFields)
  }, [locale])

  const checkErrorBalance = useMemo(() => {
    return Number(user?.accountBalance) < watchAmount
  }, [watchAmount, user?.accountBalance])
  const disableButtonSubmit = useMemo(() => {
    return checkErrorBalance || watchAmount <= 0
  }, [checkErrorBalance, watchAmount])
  const handleChooseInfoBank = (data: any) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      bank_name: data.bankName,
      bank_code: data.bankCode,
      branch_name: data.branchName,
      branch_code: data.branchCode,
      account_number: data.accountNumber,
      account_name: data.accountName
    })
    modalChooseBankRef.current?.hidden()
  }
  // TODO
  const handleWithdrawal = async (dataConfirm: any) => {
    switch (dataConfirm?.payment_method) {
      case 'BANK_DEPOSIT':
        {
          try {
            modalConfirmRef.current?.setLoading(true)
            await NSBService.withdrawalTGW({
              account_name: dataConfirm?.account_name,
              amount: dataConfirm?.amount,
              account_number: dataConfirm?.account_number,
              bank_code: dataConfirm?.bank_code,
              bank_name: dataConfirm?.bank_name,
              branch_code: dataConfirm?.branch_code,
              branch_name: dataConfirm?.branch_name,
              save_history: dataConfirm?.save_history
            })
            modalConfirmRef.current?.hidden()
            setTimeout(() => {
              openModal({
                title: t('COMPLETED_WITHDRAWAL_BANK_TITLE'),
                type: 'notification',
                subContent: (
                  <MessageSendSuccess>
                    <div>{t('COMPLETED_WITHDRAWAL_BANK_MESSAGE')}</div>
                  </MessageSendSuccess>
                ),
                okText: t('OK') ?? 'OK',
                onOk: () => {
                  closeModal()
                  if (dataConfirm.save_history) {
                    fetchListBank()
                  }
                  form.resetFields()
                  form.setFieldsValue({
                    ...form.getFieldsValue(),
                    bank_name: null,
                    bank_code: null,
                    branch_name: null,
                    branch_code: null,
                    account_number: null,
                    account_name: null
                  })
                  updateBalanceInput()
                  initData()
                }
              })
            }, 500)
          } catch (error) {
            // console.log(error)
            modalConfirmRef.current?.hidden()
            showMessage({ error: t(t(getError(error).code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
          } finally {
            modalConfirmRef.current?.setLoading(false)
          }
        }

        break
      case 'CRYPTOCURRENCY':
        {
          try {
            modalConfirmRef.current?.setLoading(true)
            await NSBService.withdrawCrypto({
              cryptoAmount: dataConfirm?.cryptoAmount.replace('ETH', '').trim(),
              currency: dataConfirm?.currency,
              jpyAmount: dataConfirm?.amount,
              saveHistory: dataConfirm?.saveHistory,
              toPublicAddress: dataConfirm?.toPublicAddress,
              gasData: gasData
            })
            modalConfirmRef.current?.hidden()
            setTimeout(() => {
              openModal({
                title: t('COMPLETED_WITHDRAWAL_CRYPTO_TITLE'),
                type: 'notification',
                subContent: (
                  <MessageSendSuccess>
                    <div>{t('COMPLETED_WITHDRAWAL_CRYPTO_MESSAGE')}</div>
                  </MessageSendSuccess>
                ),
                okText: t('OK') ?? 'OK',
                onOk: async () => {
                  closeModal()
                  if (dataConfirm.save_history) {
                    fetchListBank()
                  }
                  initData()
                  const balance = await getBalance()
                  // new BigNumber(dataConfirm?.cryptoAmount.replace('ETH', '').trim()).plus(balance).toFixed(8)
                  dispatch(syncETHBalance(balance))
                }
              })
            }, 500)
          } catch (error) {
            modalConfirmRef.current?.hidden()
            showMessage({ error: t(t(getError(error).code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
          } finally {
            modalConfirmRef.current?.setLoading(false)
          }
        }
        break
      default:
        break
    }
  }
  const handleDeleteBankInfo = async (id: string) => {
    modalChooseBankRef.current?.setLoading(true)
    try {
      await NSBService.deleteBankUserById(id)
      fetchListBank()
    } catch (error) {
      // console.log(error)
    } finally {
      modalChooseBankRef.current?.setLoading(false)
    }
  }
  const handleDeleteCryptoInfo = async (id: string) => {
    modalChooseBankRef.current?.setLoading(true)
    try {
      await NSBService.deleteCryptoUserAccount(id)
      fetchListCryptoUserAccount()
    } catch (error) {
      console.log(error)
    } finally {
      modalChooseBankRef.current?.setLoading(false)
    }
  }
  const handleChooseInfoCrypto = async (data: any) => {
    form.setFieldValue('currency', data.currency)
    form.setFieldValue('toPublicAddress', data.walletAddress)
    modalChooseCryptoRef.current?.hidden()
  }
  const fetchGasCrypto = useCallback(async () => {
    setLoadingFormCrypto(true)
    const dataForm = await form.getFieldsValue()
    try {
      const data = await NSBService.getGasCrypto({
        cryptoAmount: dataForm?.cryptoAmount.replace('ETH', '').trim(),
        currency: dataForm?.currency,
        jpyAmount: dataForm?.amount,
        toPublicAddress: dataForm?.toPublicAddress
      })
      form.setFieldValue('gasData', `${data.gasUser} ETH`)
      setKeyGasAmount(new Date().getTime())
      setLoadingFormCrypto(false)
      setGasData(data)
      setCanSubmit(true)
    } catch (error) {
      form.setFieldValue('gasData', `${0} ETH`)
      setCanSubmit(false)
      setKeyGasAmount(new Date().getTime())
      setLoadingFormCrypto(false)
      setGasData(null)
    }
  }, [watchPaymentMethod])

  const subFormEnum = {
    ['CRYPTOCURRENCY']: (
      <>
        <div>
          <div className='first-form-item'>
            <Form.Item
              name={'currency'}
              rules={[
                {
                  required: true,
                  message: t('FIELD_REQUIRED', { fieldName: t('CURRENCY'), dynamicValue: true }) ?? ''
                },
                {
                  max: 30,
                  message:
                    t('MAX_LENGTH_INPUT', {
                      fieldName: t('CURRENCY'),
                      length: 30,
                      dynamicValue: true
                    }) ?? ''
                }
              ]}
            >
              <InputStyled label={t('CURRENCY')} disabled />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name='toPublicAddress'
          rules={[
            {
              required: true,
              message: t('FIELD_REQUIRED', { fieldName: t('PUBLIC_ADDRESS'), dynamicValue: true }) ?? ''
            },
            {
              max: 100,
              message:
                t('MAX_LENGTH_INPUT', {
                  fieldName: t('PUBLIC_ADDRESS'),
                  length: 30,
                  dynamicValue: true
                }) ?? ''
            }
          ]}
        >
          <InputStyled label={t('PUBLIC_ADDRESS')} isRequired disabled />
        </Form.Item>
        <Form.Item
          label={
            <label className='label'>
              {t('AMOUNT_RATE_ETH_TO_YEN', { dynamicValue: true, priceETHToYen: BNToFormat(priceETHToYen) })}
            </label>
          }
          className='input-number'
          name='cryptoAmount'
          normalize={(value: string) => {
            return value ? value.toString().replace('-', '') : value
          }}
        >
          <InputNumber charFormatter='ETH' disabled key={keyCryptoAmount} />
        </Form.Item>
        <Form.Item name='gasData' label={<label className='label'>{t('GAS_EXPENSES')}</label>}>
          <InputNumber charFormatter='ETH' disabled key={keyGasAmount} />
        </Form.Item>
      </>
    ),
    ['BANK_DEPOSIT']: (
      <>
        <div>
          <div className='first-form-item'>
            <Form.Item
              name='bank_name'
              rules={[
                {
                  required: true,
                  message: t('FIELD_REQUIRED', { fieldName: t('BANK_NAME'), dynamicValue: true }) ?? ''
                },
                {
                  max: 30,
                  message:
                    t('MAX_LENGTH_INPUT', {
                      fieldName: t('BANK_NAME'),
                      length: 30,
                      dynamicValue: true
                    }) ?? ''
                }
              ]}
            >
              <InputStyled label={t('BANK_NAME')} isRequired />
            </Form.Item>
            <ButtonStyled
              type='primary'
              onClick={() => modalChooseBankRef.current?.visible()}
              shape='round'
              className='btn-choose-info-bank'
            >
              {t('SELECT_FROM_THE_LIST')}
            </ButtonStyled>
          </div>
        </div>
        <Form.Item
          name='bank_code'
          rules={[
            {
              required: true,
              message: t('FIELD_REQUIRED', { fieldName: t('BANK_CODE'), dynamicValue: true }) ?? ''
            },
            {
              pattern: /^\d{4}$/,
              message: t('MATCH_DIGIT', { fieldName: t('BANK_CODE'), numberDigit: 4, dynamicValue: true }) ?? ''
            }
            // {
            //   validator: (_, value) => {
            //     const regex = /^[0-9]{4}$/
            //     if (value && !regex.test(value)) {
            //       return Promise.reject(
            //         new Error(t('MATCH_DIGIT', { fieldName: t('BANK_CODE'), numberDigit: 4, dynamicValue: true }) ?? '')
            //       )
            //     }
            //     return Promise.resolve()
            //   }
            // }
          ]}
          // normalize={(value: string) => {
          //   return value ? value.toString().replace('-', '') : value
          // }}
        >
          <InputStyled label={t('BANK_CODE')} isRequired />
        </Form.Item>
        <Form.Item
          name='branch_name'
          rules={[
            {
              required: true,
              message: t('FIELD_REQUIRED', { fieldName: t('BRANCH_NAME'), dynamicValue: true }) ?? ''
            },
            {
              max: 30,
              message:
                t('MAX_LENGTH_INPUT', {
                  fieldName: t('BRANCH_NAME'),
                  length: 30,
                  dynamicValue: true
                }) ?? ''
            }
          ]}
          // normalize={(value: string) => {
          //   return value ? value.toString().replace('-', '') : value
          // }}
        >
          <InputStyled label={t('BRANCH_NAME')} isRequired />
        </Form.Item>
        <Form.Item
          name='branch_code'
          rules={[
            {
              required: true,
              message: t('FIELD_REQUIRED', { fieldName: t('BRANCH_CODE'), dynamicValue: true }) ?? ''
            },
            {
              pattern: /^\d{3}$/,
              message: t('MATCH_DIGIT', { fieldName: t('BRANCH_CODE'), numberDigit: 3, dynamicValue: true }) ?? ''
            }
          ]}
        >
          <InputStyled label={t('BRANCH_CODE')} isRequired />

          {/* <InputNumberStyled label={t('BRANCH_CODE')} isRequired controls={false} /> */}
        </Form.Item>
        <Form.Item
          name='account_name'
          rules={[
            {
              required: true,
              message: t('FIELD_REQUIRED', { fieldName: t('ACCOUNT_NAME'), dynamicValue: true }) ?? ''
            },
            {
              max: 30,
              message:
                t('MAX_LENGTH_INPUT', {
                  fieldName: t('ACCOUNT_NAME'),
                  length: 30,
                  dynamicValue: true
                }) ?? ''
            }
          ]}
        >
          <InputStyled label={t('ACCOUNT_NAME')} isRequired />
        </Form.Item>
        <Form.Item
          name='account_number'
          rules={[
            {
              required: true,
              message: t('FIELD_REQUIRED', { fieldName: t('ACCOUNT_NUMBER'), dynamicValue: true }) ?? ''
            },
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: t('ACCOUNT_NUMBER_MUST_BE_NUMBER') ?? ''
            },
            {
              max: 20,
              message:
                t('MAX_LENGTH_INPUT', {
                  fieldName: t('ACCOUNT_NUMBER'),
                  length: 20,
                  dynamicValue: true
                }) ?? ''
            }
          ]}
          className='last-child'
        >
          <InputStyled label={t('ACCOUNT_NUMBER')} isRequired />
        </Form.Item>
      </>
    )
  }
  const renderErrorMaxPrice = () => {
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
  return (
    <Layout isMyPage>
      <LayoutMyPage>
        <div>
          <HeaderMenuStyled className='mobile tablet'>
            <div className='d-flex j-content-between al-items-center'>
              <TitleStyled className='title-mobile'>
                <WithDrawIcon className='icon' /> <span>{t('WITHDRAW_TITLE')}</span>
              </TitleStyled>
              <ButtonIconStyled onClick={showDrawer}>
                <MenuIcon className='icon' />
              </ButtonIconStyled>
            </div>
          </HeaderMenuStyled>
          <TitleStyled className='title'>{t('WITHDRAW_TITLE')}</TitleStyled>
          <ContainerForm>
            <Form form={form} layout='vertical' onFinish={handleSubmit}>
              <Form.Item label={<span className='label'>{t('BALANCE')}</span>} name='balance'>
                <InputNumber charFormatter='円' disabled />
              </Form.Item>
              <Form.Item
                label={
                  <span className='label'>
                    {t('WITHDRAWAL_AMOUNT')}{' '}
                    <span className={classNames({ hidden: true })} style={{ color: '#EA1313' }}>
                      *
                    </span>
                  </span>
                }
                name='amount'
                className='amount-form-item last-child'
                normalize={(value: string) => {
                  return value ? value.toString().replace('-', '') : value
                }}
              >
                <InputNumber
                  charFormatter='円'
                  className={classNames({ error: checkErrorBalance })}
                  onBlur={debouncedGetGasCrypto}
                />
              </Form.Item>

              {checkErrorBalance ? <ErrorMessage message={t('BALANCE_NOT_ENOUGH') as string} /> : ''}
              {isMaxPriceCreditCard && <>{renderErrorMaxPrice()}</>}
              {isMinPriceCreditCard && <>{renderErrorMinPrice()}</>}
              <Spin spinning={loadingFormCrypto}>
                <Form.Item
                  label={<span className='label'>{t('PAYMENT_METHOD')}</span>}
                  name='payment_method'
                  className='payment-method'
                >
                  <RadioGroupStyled>
                    {radioList.map((item: RadioItemType, index) => {
                      switch (item.value) {
                        case 'BANK_DEPOSIT':
                          return (
                            <Fragment key={index}>
                              <>
                                <RadioCustomStyled key={index} value={item.value}>
                                  <span className='label'>{item.label}</span>
                                </RadioCustomStyled>
                                <>
                                  {radioList[index].value == watchPaymentMethod &&
                                  radioList[index].value == item.value ? (
                                    <ContainerSubFrom>{subFormEnum[radioList[index].value]}</ContainerSubFrom>
                                  ) : (
                                    ''
                                  )}
                                </>
                              </>
                            </Fragment>
                          )
                        case 'CRYPTOCURRENCY':
                          return (
                            <Fragment key={index}>
                              {zone === 'global' ? (
                                <>
                                  <RadioCustomStyled key={index} value={item.value}>
                                    <span className='label'>{item.label}</span>
                                  </RadioCustomStyled>
                                  <>
                                    {radioList[index].value == watchPaymentMethod &&
                                    radioList[index].value == item.value ? (
                                      <ContainerSubFrom>{subFormEnum[radioList[index].value]}</ContainerSubFrom>
                                    ) : (
                                      ''
                                    )}
                                  </>
                                </>
                              ) : (
                                <></>
                              )}
                            </Fragment>
                          )

                        default:
                          break
                      }
                    })}
                  </RadioGroupStyled>
                </Form.Item>
                {
                  {
                    [radioList[0].value]: (
                      <Form.Item
                        label={<span className='label'>{t('SAVE_WITHDRAWAL_INFORMATION')}</span>}
                        name='save_history'
                      >
                        <RadioGroupStyled className='flex-row'>
                          <RadioCustomStyled value={false}>
                            <span className='label'>{t('NO')}</span>
                          </RadioCustomStyled>
                          <RadioCustomStyled value={true}>
                            <span className='label'>{t('YES')}</span>
                          </RadioCustomStyled>
                        </RadioGroupStyled>
                      </Form.Item>
                    ),
                    [radioList[1].value]: <></>
                  }[watchPaymentMethod]
                }
              </Spin>

              <ButtonGroup>
                <ButtonStyled
                  className='form-button'
                  type={'primary'}
                  htmlType='submit'
                  disabled={disableButtonSubmit || !canSubmit || isMaxPriceCreditCard || isMinPriceCreditCard}
                  shape='round'
                >
                  {t('NEXT', { ns: 'common' })}
                  {''}
                </ButtonStyled>
              </ButtonGroup>
            </Form>
          </ContainerForm>
        </div>
        <ModalChooseType
          nameTable={radioList[0].value}
          ref={modalChooseCryptoRef}
          data={listCryptoUserAccount}
          handleSubmit={(data) => {
            handleChooseInfoCrypto(data)
          }}
          handleDelete={(id: string) => {
            openModal({
              type: 'confirmation',
              title: t('CONFIRM', { ns: 'common' }),
              content: t('MESSAGE_CONFIRM_DELETE_INFO_CRYPTO'),
              onOk: () => {
                closeModal()
                handleDeleteCryptoInfo(id)
                // handleDeleteBankInfo(id)
              },
              okText: t('CONFIRM', { ns: 'common' }) as string,
              onCancel: () => {
                closeModal()
              }
            })
          }}
        />
        <ModalChooseType
          nameTable={radioList[0].value}
          ref={modalChooseBankRef}
          width={1200}
          data={listBank}
          handleSubmit={(data) => {
            handleChooseInfoBank(data)
          }}
          handleDelete={(id: string) => {
            openModal({
              type: 'confirmation',
              title: t('CONFIRM', { ns: 'common' }),
              content: t('MESSAGE_CONFIRM_DELETE_INFO_BANK'),
              onOk: () => {
                closeModal()
                handleDeleteBankInfo(id)
              },
              okText: t('CONFIRM', { ns: 'common' }) as string,
              cancelText: t('CANCEL', { ns: 'common' }) as string,
              onCancel: () => {
                closeModal()
              }
            })
          }}
        />
        <ModalConfirmWithDraw ref={modalConfirmRef} handleSubmit={handleWithdrawal} priceETHToYen={priceETHToYen} />
      </LayoutMyPage>
    </Layout>
  )
}

export default Withdrawal
