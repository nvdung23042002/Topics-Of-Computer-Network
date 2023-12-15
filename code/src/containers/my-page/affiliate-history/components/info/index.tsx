import Typography from '@/components/common/typography'
import { Avatar, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  ButtonStyled,
  CardContainer,
  ContainerUserInfo,
  ContentContainer,
  HeaderUserInfo,
  MessageSuccess
} from './styled'
import { useAppSelector } from '@/hooks/store'
import trimPublicAddress from '@/utils/trimPublicAddress'
import { BNToFormat } from '@/utils/bigNumber'
import { useRouter } from 'next/router'
import CheckVerifiedIcon from '@/components/icons/CheckVerifiedIcon'
import Input from '@/components/common/form/Input'
import storage from '@/utils/storage'
import { STORAGE_KEY } from '@/constants/common'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import HistoryService from '@/services/History.service'
import { AppRoutes } from '@/constants/routes'
import { useTranslation } from 'next-i18next'
import AvatarDefault from '@/assets/images/avatar_default.png'
import { PriceRate } from '@/services/dto'
import useModal from '@/hooks/useModal'
function convertEthToUsd(ethAmount: number, ethToJpyRate: number, usdToJpyRate: number): number {
  const ethInJpy: number = ethAmount * ethToJpyRate
  const usdAmount: number = ethInJpy / usdToJpyRate
  return usdAmount
}
function convertEthToYen(ethAmount: number, ethToJpyRate: number): number {
  const ethInJpy: number = ethAmount * ethToJpyRate
  return ethInJpy
}
const UserInfo = ({ priceRates }: { priceRates: PriceRate[] }) => {
  const { user } = useAppSelector((state) => state.auth)
  const [isFirstLogin, setIsFirstLogin] = useState(false)
  const [form] = Form.useForm()
  const affiliateCodeValue = Form.useWatch('affiliateCode', form)
  const [loading, setLoading] = useState<boolean>(false)
  const [infoAffiliate, setInfoAffiliate] = useState<any>()
  const userProfile = useAppSelector((state) => state.auth.userProfile)
  const navigator = useRouter()
  const [priceOfTicket, setPriceOfTicket] = useState(0)
  const ethToJpyRate = priceRates.filter((item) => item.name === 'ETH_TO_JPY')[0].value ?? 0
  const usdToJpyRate = priceRates.filter((item) => item.name === 'USD_TO_JPY')[0].value ?? 0
  const { closeModal, openModal } = useModal()
  useEffect(() => {
    getRatePrice()
    form.setFieldValue('amount', 0)
  }, [priceRates])
  const getRatePrice = async () => {
    setLoading(true)
    try {
      const priceOfTicketTemp = priceRates.filter((item) => item.name === 'TICKET_TO_JPY')[0].value
      setPriceOfTicket(+priceOfTicketTemp)
    } catch (error) {
      navigator.push(AppRoutes.home)
    } finally {
      setLoading(false)
    }
  }
  const { t } = useTranslation('affiliate-history')
  useEffect(() => {
    fetchInfoAffiliate()
  }, [])
  const fetchInfoAffiliate = async () => {
    try {
      const data = await HistoryService.getAffiliateInfo()
      setInfoAffiliate(data)
      setIsFirstLogin(!data?.isEnterCode)
    } catch (error) {
      showMessage({ error: getError(error) })
    }
  }

  const handelSubmit = async (data: { affiliateCode: string }) => {
    setLoading(true)
    try {
      await HistoryService.insertAffiliateCode({ affiliateCode: (data['affiliateCode'] as string).trim() })
      const user = storage().get(STORAGE_KEY.W3A_TOKEN)
      openModal({
        type: 'notification',
        title: t('INSERT_AFFILIATE_CODE_SUCCESS'),
        subContent: <MessageSuccess>{t('INSERT_AFFILIATE_CODE_SUCCESS_MESSAGE')}</MessageSuccess>,
        okText: t('OK', { ns: 'common' }) as string,
        onOk: () => {
          closeModal()
          fetchInfoAffiliate()
          storage().set(STORAGE_KEY.W3A_TOKEN, {
            ...user,
            isNewAccount: false,
            skipEnterCode: false
          })
        }
      })
    } catch (error) {
      showMessage({ error: t(t(error.code ?? 'ERROR_UNKNOWN'), { ns: 'error-message' }) })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <CardContainer>
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
                className='avatar'
              />
            </div>
            <div className='container-header-info'>
              <Typography.Text className='name text-nowrap' title={infoAffiliate?.userName}>
                {infoAffiliate?.userName}
              </Typography.Text>
              <Typography.TextCopy valueCopy={user?.publicAddress} className='copy'>
                <span className='public-address'>{trimPublicAddress(user?.publicAddress ?? '', 10)}</span>{' '}
              </Typography.TextCopy>
              <div className='balance'>
                {BNToFormat(user?.totalTicket)} {t('TICKET', { ns: 'common' })} - {BNToFormat(user?.accountBalance)}
                {t('YEN', { ns: 'common' })} - {user?.balance} ETH
              </div>
            </div>
          </HeaderUserInfo>
          <ContentContainer>
            <div>
              <div className='item'>
                <div className='label'>
                  <span>{t('MY_AFFILIATE_CODE')}</span>
                </div>
                <div className='value'>
                  <Typography.TextCopy valueCopy={infoAffiliate?.affiliateCode} className='copy'>
                    <span className='text'>{infoAffiliate?.affiliateCode}</span>
                  </Typography.TextCopy>
                </div>
              </div>
              <div className='item'>
                <div className='label'>
                  <span>{t('NEW_USER_REGISTRATION_BONUS')}</span>
                </div>
                <div className='value color-success'>
                  <span className='text-main'>
                    {BNToFormat(infoAffiliate?.bonusTicket)} {t('TICKET')}
                  </span>
                  <span className='sub-text'>{`(1${t('TICKET')} = ${BNToFormat(priceOfTicket)}${t('YEN', {
                    ns: 'common'
                  })})`}</span>
                </div>
              </div>
              <div className='item'>
                <div className='label'>
                  <span>{t('NFT_PURCHASE_BONUS')}</span>
                </div>
                <div className='value color-success'>
                  <span className='text-main'>{BNToFormat(infoAffiliate?.bonusMoneyFromNFT, true)} ETH</span>{' '}
                  <span className='sub-text'>{`(≈ $${BNToFormat(
                    convertEthToUsd(+infoAffiliate?.bonusMoneyFromNFT, +ethToJpyRate, +usdToJpyRate)
                  )}/${BNToFormat(convertEthToYen(+infoAffiliate?.bonusMoneyFromNFT, +ethToJpyRate))}${t('YEN', {
                    ns: 'common'
                  })})`}</span>
                </div>
              </div>
              <div className='item'>
                <div className='label'>
                  <span>{t('SHARED_AFFILIATE_CODE')}</span>
                  <span>{isFirstLogin ? <></> : <CheckVerifiedIcon style={{ color: '#1CCE66' }} />}</span>
                </div>
                <div className='value'>
                  {isFirstLogin ? (
                    <>
                      <Form form={form} className='form-affiliate-code' onFinish={handelSubmit}>
                        <Form.Item
                          name='affiliateCode'
                          className='code-input'
                          rules={[
                            {
                              required: true,
                              message:
                                t('FIELD_REQUIRED', {
                                  fieldName: t('SHARED_AFFILIATE_CODE'),
                                  dynamicValue: true
                                }) ?? ''
                            },
                            {
                              max: 255,
                              message:
                                t('MAX_LENGTH_INPUT', {
                                  fieldName: t('SHARED_AFFILIATE_CODE'),
                                  length: 255,
                                  dynamicValue: true
                                }) ?? ''
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <ButtonStyled
                          type='primary'
                          htmlType='submit'
                          loading={loading}
                          disabled={!affiliateCodeValue}
                          className='btn-submit-form'
                        >
                          {t('APPLY')}
                        </ButtonStyled>
                      </Form>
                    </>
                  ) : (
                    <div className='value color-success'>
                      <span className='code'>{infoAffiliate?.introduceAffiliateCode}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ContentContainer>
        </ContainerUserInfo>
      </CardContainer>
    </>
  )
}

export default UserInfo
