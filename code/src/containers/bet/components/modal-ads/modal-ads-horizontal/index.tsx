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
  CompanyBannerHorizontalStyled,
  CompanyLogoHorizontalStyled,
  ModalAdsHorizontalContentStyled,
  QrHorizontalStyled,
  StoreHorizontalStyled
} from './styled'

type Props = {
  item: any
}

const ModalAdsHorizontal: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation('sponsor')
  const router = useRouter()
  const [currentQr, setCurrentQr] = useState<any>(() => {
    if ((item?.appQrAndroid && item?.appQrIos) || (item?.appQrAndroid && !item?.appQrIos)) {
      return 'android'
    }

    return 'ios'
  })

  return (
    <ModalAdsHorizontalContentStyled>
      <div className='company-name'>
        <CompanyLogoHorizontalStyled>
          <Image src={item?.icon} alt='sponsor-logo' fill={true} objectFit='cover' />
        </CompanyLogoHorizontalStyled>
        <div style={{ flex: '1' }}>
          <Tooltip title={item?.logoName}>
            <Text700Styled className='name text-nowrap-1'>{item?.logoName}</Text700Styled>
          </Tooltip>
        </div>
      </div>
      <div className='company-banner'>
        <CompanyBannerHorizontalStyled>
          <Image src={item?.image} alt='sponsor-banner' fill={true} objectFit='cover' />
          {(item?.appQrAndroid || item?.appQrIos) && (
            <div className='qr'>
              <QrHorizontalStyled>
                <QRCode value={currentQr === 'android' ? item?.appQrAndroid : item?.appQrIos} />
              </QrHorizontalStyled>
              <div className='store'>
                {item?.appQrAndroid && (
                  <StoreHorizontalStyled className='hover' onClick={() => setCurrentQr('android')}>
                    <GooglePlayIcon />
                  </StoreHorizontalStyled>
                )}
                {item?.appQrIos && (
                  <StoreHorizontalStyled className='hover' onClick={() => setCurrentQr('ios')}>
                    <AppStoreIcon />
                  </StoreHorizontalStyled>
                )}
              </div>
            </div>
          )}
        </CompanyBannerHorizontalStyled>
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
    </ModalAdsHorizontalContentStyled>
  )
}

export default ModalAdsHorizontal
