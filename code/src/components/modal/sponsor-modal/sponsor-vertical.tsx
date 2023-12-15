import Image from '@/components/common/image'
import CloseIcon from '@/components/icons/CloseIcon'
import { Text3th400Styled, Text400Styled, Text500Styled, Text700Styled } from '@/components/styled'
import { ModalProps, Tooltip } from 'antd'
import React from 'react'
import {
  CompanyLogoStyled,
  ContactStyled,
  VerticalModalContentStyled,
  InfomationContentStyled,
  InfomationStyled,
  NameCompanyStyled,
  SponsorBannerVerticalStyled,
  SponsorInfomationStyled,
  SponsorModalStyled
} from './styled'
import { useTranslation } from 'next-i18next'
import formatJapanesePhoneNumber from '@/utils/phoneFormat'

interface CusModalProps extends ModalProps {
  contentModal?: any
}

export default (({ contentModal, ...props }) => {
  const { email, content, phonePrefixHomePage, phoneSuffixHomePage, logoName, image, icon } = contentModal || {}
  const { t } = useTranslation()

  return (
    <SponsorModalStyled
      width={892}
      open={true}
      closable={true}
      destroyOnClose
      maskClosable={false}
      keyboard={false}
      centered
      footer={false}
      closeIcon={<CloseIcon />}
      {...props}
    >
      <VerticalModalContentStyled>
        <SponsorBannerVerticalStyled>
          <Image src={image} alt='sponsor-img' fill={true} />
        </SponsorBannerVerticalStyled>
        <SponsorInfomationStyled>
          <NameCompanyStyled>
            <CompanyLogoStyled>
              <Image src={icon} alt='sponsor-img' fill={true} objectFit='cover' />
            </CompanyLogoStyled>
            <div style={{ flex: '1' }}>
              <Tooltip title={logoName}>
                <Text700Styled className='company-name text-nowrap-1'>{logoName}</Text700Styled>
              </Tooltip>
            </div>
          </NameCompanyStyled>
          <ContactStyled className='tel'>
            <Text400Styled className='label'>{t('TEL')}:</Text400Styled>
            <Text3th400Styled className='value'>
              {phonePrefixHomePage &&
                phoneSuffixHomePage &&
                formatJapanesePhoneNumber(phonePrefixHomePage, phoneSuffixHomePage, true)}
            </Text3th400Styled>
          </ContactStyled>
          <ContactStyled className='email'>
            <Text400Styled className='label'>{t('EMAIL')}:</Text400Styled>
            <Text3th400Styled className='value'>{email}</Text3th400Styled>
          </ContactStyled>
          <InfomationStyled>
            <Text500Styled className='info'>{t('INFORMATION')}</Text500Styled>
            <InfomationContentStyled maxHeight={351}>
              <pre>{content}</pre>
            </InfomationContentStyled>
          </InfomationStyled>
        </SponsorInfomationStyled>
      </VerticalModalContentStyled>
    </SponsorModalStyled>
  )
}) as React.FC<CusModalProps>
