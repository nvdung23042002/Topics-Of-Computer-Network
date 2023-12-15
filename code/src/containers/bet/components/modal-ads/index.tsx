import { ModalProps } from 'antd'
import cx from 'classnames'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import { ModalAdsStyled } from './styled'
import ModalAdsHorizontal from './modal-ads-horizontal'
import ModalAdsVertical from './modal-ads-vertical'
import { useWindowSize } from '@/hooks/useWindowResize'

interface CusModalProps extends ModalProps {
  contentModal?: any
}

const ModalAds: React.FC<CusModalProps> = ({ contentModal, ...props }) => {
  const [isClosable, setIsClosable] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const [isSwipe, setIsSwipe] = useState<boolean>(false)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)
  const slider = useRef<any>()
  const { width } = useWindowSize()
  const isMaxWidth991 = width <= 991

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isAutoPlay,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    swipe: isSwipe
  }

  const handleSliderChange = (index: number) => {
    setCurrentIndex(index + 1)

    if (contentModal.length === index + 1) {
      setIsClosable(true)
    }
  }

  useEffect(() => {
    if (currentIndex === contentModal.length) {
      setIsSwipe(true)
      setIsAutoPlay(false)
    }
  }, [currentIndex])

  const renderModal = (type: number, item: any) => {
    const MODAL = {
      ['TEMPLATE_1']: <ModalAdsVertical item={item} />,
      ['TEMPLATE_2']: <ModalAdsHorizontal item={item} />
    }

    return isMaxWidth991 ? MODAL['TEMPLATE_2'] : MODAL[type]
  }

  return (
    <ModalAdsStyled
      width={892}
      open={true}
      closable={contentModal?.length === 1 ? true : isClosable}
      destroyOnClose
      maskClosable={false}
      keyboard={false}
      centered
      footer={false}
      {...props}
    >
      <Slider ref={(c) => (slider.current = c)} {...settings} arrows={false} afterChange={handleSliderChange}>
        {contentModal?.map((item: any, index: any) => (
          <Fragment key={index}>{renderModal(item?.template, item)}</Fragment>
        ))}
      </Slider>
      {contentModal?.length > 1 && (
        <div className='dots-list'>
          {contentModal?.map((item: any, index: number) => (
            <div
              className={cx('dot', {
                active: currentIndex === index + 1
              })}
              key={index}
            ></div>
          ))}
        </div>
      )}
    </ModalAdsStyled>
  )
}

export default ModalAds
