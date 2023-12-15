/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from '@/components/common/image'
import AppStoreIcon from '@/components/icons/AppStoreIcon'
import GooglePlayIcon from '@/components/icons/GooglePlayIcon'
import { Text3th400Styled, Text500Styled, Text700Styled } from '@/components/styled'
import { QRCode, Tooltip } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  CompanyBannerVerticalStyled,
  CompanyLogoVerticalStyled,
  ModalAdsVerticalContentStyled,
  QrVerticaStyled,
  StoreVerticalStyled
} from './styled'

type Props = {
  item: any
}

const ModalAdsVertical: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation('sponsor')
  const router = useRouter()

  const [currentQr, setCurrentQr] = useState<any>(() => {
    if ((item?.appQrAndroid && item?.appQrIos) || (item?.appQrAndroid && !item?.appQrIos)) {
      return 'android'
    }

    return 'ios'
  })

  return (
    <ModalAdsVerticalContentStyled>
      <div className='col-left'>
        <CompanyBannerVerticalStyled>
          <Image src={item?.image} alt='sponsor-banner' fill={true} objectFit='cover' />
          {item?.appQrAndroid || item?.appQrIos ? (
            <div className='qr'>
              <QrVerticaStyled>
                <QRCode value={currentQr === 'android' ? item?.appQrAndroid : item?.appQrIos} />
              </QrVerticaStyled>
              <div className='store'>
                {item?.appQrAndroid && (
                  <StoreVerticalStyled className='hover' onClick={() => setCurrentQr('android')}>
                    <GooglePlayIcon />
                  </StoreVerticalStyled>
                )}
                {item?.appQrIos && (
                  <StoreVerticalStyled className='hover' onClick={() => setCurrentQr('ios')}>
                    <AppStoreIcon />
                  </StoreVerticalStyled>
                )}
              </div>
            </div>
          ) : null}
        </CompanyBannerVerticalStyled>
      </div>
      <div className='col-right'>
        <div className='company-name'>
          <CompanyLogoVerticalStyled>
            <Image src={item?.icon} alt='sponsor-logo' fill={true} objectFit='cover' />
          </CompanyLogoVerticalStyled>
          <div style={{ flex: '1' }}>
            <Tooltip title={item?.logoName}>
              <Text700Styled className='name text-nowrap-1'>{item?.logoName}</Text700Styled>
            </Tooltip>
          </div>
        </div>
        <div className='infomation'>
          <Text500Styled className='label'>{t('INFORMATION')}</Text500Styled>
          <Text3th400Styled className='value'>
            <pre>{item?.content}</pre>
          </Text3th400Styled>
        </div>
        {item?.homepageUrl && (
          <p onClick={() => router.push(item?.homepageUrl)} className='company-link hover'>
            {item?.homepageUrl}
          </p>
        )}
      </div>
    </ModalAdsVerticalContentStyled>
  )
}

export default ModalAdsVertical
