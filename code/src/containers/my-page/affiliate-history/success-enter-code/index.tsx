import React from 'react'
import { ButtonGroupStyled, ButtonStyled, LayoutAntStyled, SuccessEnterCodeContainer } from './styled'
import Typography from '@/components/common/typography'
import { useTranslation } from 'next-i18next'
import Verified from '@/assets/svg/verified.svg'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/constants/routes'

const SuccessEnterCode = () => {
  const { t } = useTranslation('enter-code', { useSuspense: false })
  const router = useRouter()
  return (
    <LayoutAntStyled>
      <SuccessEnterCodeContainer className='center-box'>
        <Typography.Title className='title'>{t('ENTER_CODE_SUCCESS_TITLE')}</Typography.Title>
        <div className='image-success'>
          <img src={Verified.src} alt='success' />
        </div>
        <ButtonGroupStyled>
          <ButtonStyled
            type='primary'
            shape={'round'}
            onClick={() => {
              router.push(AppRoutes.affiliateHistory)
            }}
          >
            {t('OK', { ns: 'common' })}
          </ButtonStyled>
        </ButtonGroupStyled>
      </SuccessEnterCodeContainer>
    </LayoutAntStyled>
  )
}

export default SuccessEnterCode
