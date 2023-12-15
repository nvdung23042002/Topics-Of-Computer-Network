import DefaultUser from '@/assets/images/avatar_default.png'
import Image from '@/components/common/image'
import SponsorHorizontal from '@/components/modal/sponsor-modal/sponsor-horizontal'
import SponsorVertical from '@/components/modal/sponsor-modal/sponsor-vertical'
import { Text11th500Styled, Text2th300Styled, Text2th500Styled } from '@/components/styled'
import { useWindowSize } from '@/hooks/useWindowResize'
import { Tooltip } from 'antd'
import cx from 'classnames'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { SponsorPlatiumStyled } from './styled'

type Props = {
  sponsor?: any
  itemSize?: any
  templateData?: any
}

const SponsorPlatium: React.FC<Props> = ({ sponsor, itemSize, templateData }) => {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState<boolean>(false)
  const { name, fund, icon } = sponsor || {}
  const { width } = useWindowSize()
  const isMaxWidth991 = width <= 991

  const onOpenModal = () => {
    setVisible(true)
  }
  const onCloseModal = () => {
    setVisible(false)
  }

  const renderTemplate = (type: string) => {
    const TEMPLATE = {
      TEMPLATE_1: <SponsorVertical onCancel={onCloseModal} contentModal={templateData} />,
      TEMPLATE_2: <SponsorHorizontal onCancel={onCloseModal} contentModal={templateData} />
    }

    return isMaxWidth991 ? TEMPLATE['TEMPLATE_2'] : TEMPLATE[type]
  }

  return (
    <SponsorPlatiumStyled>
      <div
        className={cx('second-class', {
          small: Number(itemSize) === 1,
          medium: Number(itemSize) === 2
        })}
      >
        <div
          className={cx('third-class', {
            small: Number(itemSize) === 1,
            medium: Number(itemSize) === 2
          })}
        >
          {Number(itemSize) === 1 && (
            <div className='four-class'>
              <div className='company-small'>
                <div className='logo-small'>
                  <Image src={icon} fill={true} alt='sponsor-logo' objectFit='cover' defaultSrc={DefaultUser.src} />
                </div>
                <Tooltip title={`${t('BUSINESS_NAME')}: ${name}`}>
                  <Text2th500Styled
                    className={cx('company-name-small text-nowrap-1', {
                      small: Number(itemSize) === 1,
                      medium: Number(itemSize) === 2
                    })}
                  >
                    {t('BUSINESS_NAME')}: {name}
                  </Text2th500Styled>
                </Tooltip>
              </div>
              <div className='flag-small'>
                <span>Platinum</span>
                <div className='aa'></div>
              </div>
              <div className='company-money-small'>
                <div className='money-small'>
                  {fund?.toLocaleString('en-US') || 0} {t('CIRCLE')}
                </div>
              </div>
              <Text2th300Styled className='sponsor-money-small'>{t('SPONSOR_MONEY')}</Text2th300Styled>
              {templateData && (
                <Text11th500Styled className='sponsor-link-small hover' onClick={onOpenModal}>
                  {t('PROFILE_LINK')}
                </Text11th500Styled>
              )}
            </div>
          )}
          {Number(itemSize) === 2 && (
            <div className='four-class'>
              <div className='company-medium'>
                <div className='logo-medium'>
                  <Image src={icon} fill={true} alt='sponsor-logo' objectFit='cover' defaultSrc={DefaultUser.src} />
                </div>
                <Tooltip title={`${t('BUSINESS_NAME')}: ${name}`}>
                  <Text2th500Styled className='company-name-medium text-nowrap-1'>
                    {t('BUSINESS_NAME')}: {name}
                  </Text2th500Styled>
                </Tooltip>
              </div>
              <div className='flag-medium'>
                <span>Platinum</span>
                <div className='aa'></div>
              </div>
              <div className='company-money-medium'>
                <div className='money-medium'>
                  {fund?.toLocaleString('en-US') || 0} {t('CIRCLE')}
                </div>
              </div>
              <Text2th300Styled className='sponsor-money-medium'>{t('SPONSOR_MONEY')}</Text2th300Styled>
              {templateData && (
                <Text11th500Styled className='sponsor-link-medium hover' onClick={onOpenModal}>
                  {t('PROFILE_LINK')}
                </Text11th500Styled>
              )}
            </div>
          )}
          {Number(itemSize) === 3 && (
            <div className='four-class'>
              <div className='company'>
                <div className='logo'>
                  <Image src={icon} fill={true} alt='sponsor-logo' objectFit='cover' defaultSrc={DefaultUser.src} />
                </div>
                <Tooltip title={`${t('BUSINESS_NAME')}: ${name}`}>
                  <Text2th500Styled className='company-name text-nowrap-1'>
                    {t('BUSINESS_NAME')}: {name}
                  </Text2th500Styled>
                </Tooltip>
              </div>
              <div className='flag'>
                <span>Platinum</span>
                <div className='aa'></div>
              </div>
              <div className='company-money'>
                <div className='money'>
                  {fund?.toLocaleString('en-US') || 0} {t('CIRCLE')}
                </div>
              </div>
              <Text2th300Styled className='sponsor-money'>{t('SPONSOR_MONEY')}</Text2th300Styled>
              {templateData && (
                <Text11th500Styled className='sponsor-link hover' onClick={onOpenModal}>
                  {t('PROFILE_LINK')}
                </Text11th500Styled>
              )}
            </div>
          )}
        </div>
      </div>
      {visible && renderTemplate(templateData?.template)}
    </SponsorPlatiumStyled>
  )
}

export default SponsorPlatium
