import Container from '@/components/container'
import { AboutUsStyled, ContainerStyled } from './styled'
import Typography from '@/components/common/typography'
import Image from '@/components/common/image'
import HightLineShort from '@/assets/svg/hight-line-short.svg'
import CoinAbout from '@/assets/images/home/nsb-intro-3.png'
import TicketAbout from '@/assets/images/home/ticket.png'
import VectorAbout1 from '@/assets/images/home/vector-about-1.png'
import VectorAbout2 from '@/assets/images/home/vector-about-2.png'
import { Trans, useTranslation } from 'next-i18next'
import { AppRoutes } from '@/constants/routes'
import Anchor from '@/components/common/anchor'
import { memo } from 'react'

const AboutUs: React.FC = () => {
  const { t } = useTranslation('home', { useSuspense: false })

  return (
    <Container fullWidth>
      <AboutUsStyled>
        <ContainerStyled maxWidth={1200}>
          <div>
            <Anchor id='about' route={AppRoutes.about} />
            <Typography.Title className='title' level={1}>
              {t('ABOUT')}
              <br />
              <img className='hight-light' src={HightLineShort.src} alt='hight-light' />
            </Typography.Title>
            <Typography.Paragraph>{t('ABOUT_1')}</Typography.Paragraph>
            <Typography.Paragraph>
              <Trans
                t={t}
                components={{
                  br: <br />
                }}
              >
                ABOUT_2
              </Trans>
            </Typography.Paragraph>
            <Typography.Paragraph>{t('ABOUT_3')}</Typography.Paragraph>
          </div>

          <div className='image-box'>
            <Image className='eth-about' src={CoinAbout} alt='about-us' priority />
            <Image className='ticket-about' src={TicketAbout} alt='ticket-about' priority />
            <Image className='vector-about-1' src={VectorAbout1} alt='v-about-us-1' priority />
            <Image className='vector-about-2' src={VectorAbout2} alt='v-about-us-2' priority />
          </div>

          <Typography.Title className='title mobile' level={1}>
            {t('ABOUT')}
            <br />
            <img className='hight-light' src={HightLineShort.src} alt='hight-light' loading='lazy' />
          </Typography.Title>
        </ContainerStyled>
      </AboutUsStyled>
    </Container>
  )
}

export default memo(AboutUs)
