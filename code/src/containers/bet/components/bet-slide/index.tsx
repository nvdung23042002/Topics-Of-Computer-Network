import Slider, { Settings } from 'react-slick'
import { BetSlideImageStyled, BetSlideStyled } from './styled'
import { useCallback, useEffect, useState } from 'react'
import NSBService from '@/services/NSB.service'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'

const BetSlide: React.FC = () => {
  const [listBanner, setListBanner] = useState<any[]>([])

  const settings: Settings = {
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '15px',
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
        breakpoint: 767,
        settings: {
          slidesToShow: (listBanner?.length ?? 0) < 1 ? listBanner?.length : 1,
          autoplay: false
        }
      }
    ]
  }

  const getListBanner = useCallback(async () => {
    try {
      const response = await NSBService.getBanner({})

      setListBanner(response?.data?.result)
    } catch (error) {
      showMessage({ error: getError(error) })
    }
  }, [])

  useEffect(() => {
    getListBanner()
  }, [getListBanner])

  return (
    <BetSlideStyled>
      <Slider {...settings} className='image-box'>
        {listBanner?.map((item: any) => (
          <BetSlideImageStyled key={item?.id} sponsorId={item.sponsorId} image={item?.backgroundImage} />
        ))}
      </Slider>
    </BetSlideStyled>
  )
}

export default BetSlide
