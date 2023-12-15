import Container from '@/components/container'
import { AdvertisingAreaStyled, ContainerStyled } from './styled'
import Typography from '@/components/common/typography'
import HightLine from '@/assets/svg/hight-line-short.svg'

import { useTranslation } from 'next-i18next'
import { memo, useMemo } from 'react'
import Banner from '@/components/banner'
import Slider, { Settings } from 'react-slick'
import classNames from 'classnames'

const AdvertisingArea: React.FC<any> = ({ listBanner }: any) => {
  const { t } = useTranslation('home', { useSuspense: false })

  const settings: Settings = useMemo(
    () => ({
      infinite: true,
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 10000,
          settings: {
            slidesToShow: (listBanner?.length ?? 0) < 2 ? listBanner?.length : 2,
            swipe: false
          }
        },
        {
          breakpoint: 577,
          settings: {
            slidesToShow: (listBanner?.length ?? 0) < 1 ? listBanner?.length : 1,
            autoplay: false
          }
        }
      ]
    }),
    [listBanner]
  )

  return listBanner && listBanner?.length !== 0 ? (
    <Container fullWidth>
      <AdvertisingAreaStyled>
        <ContainerStyled maxWidth={1224} lineBannerTime={listBanner?.length * 8}>
          <Typography.Title className='title' level={1}>
            {t('ADS_AREA')}
            <br />
            <img className='hight-light' src={HightLine.src} alt='hight-light' />
          </Typography.Title>

          <Slider {...settings} className='image-box'>
            {listBanner?.map((item) => (
              <div key={`advertising-${item.id.toString()}`}>
                <Banner
                  className={classNames('banner-item', { ['single-item']: listBanner?.length < 2 })}
                  image={item.backgroundImage}
                  sponsorId={item.sponsorId?.toString()}
                />
              </div>
            ))}
          </Slider>
        </ContainerStyled>
      </AdvertisingAreaStyled>
    </Container>
  ) : (
    <></>
  )
}

export default memo(AdvertisingArea)
