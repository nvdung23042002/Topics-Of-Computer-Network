import HightLineShort from '@/assets/svg/hight-line-short.svg'
import Image from '@/components/common/image'
import Typography from '@/components/common/typography'
import Container from '@/components/container'
import ArrowNarrowRight from '@/components/icons/ArrowNarrowRightIcon'
import LeftIcon from '@/components/icons/LeftIcon'
import RightIcon from '@/components/icons/RightIcon'
import { AppRoutes } from '@/constants/routes'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useMemo, useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import { ButtonSlideStyled, ButtonStyled, ContainerStyled, NewsStyled } from './styled'
import Button from '@/components/common/button'
import { dateFormat } from '@/constants/format'
import dayjs from '@/utils/dayjs'

const News: React.FC<any> = ({ listNews }: any) => {
  const { t } = useTranslation('home', { useSuspense: false })
  const router = useRouter()
  const slider = useRef<any>()

  const settings: Settings = useMemo(
    () => ({
      className: 'center',
      centerMode: true,
      infinite: true,
      // centerPadding: '60px',
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 10000,
          settings: {
            slidesToShow: (listNews?.length ?? 0) < 3 ? listNews?.length : 3,
            swipe: false
          }
        },
        {
          breakpoint: 577,
          settings: {
            slidesToShow: (listNews?.length ?? 0) < 1 ? listNews?.length : 1
          }
        }
      ]
    }),
    [listNews]
  )

  const arrowLeft = () => {
    slider.current.slickPrev()
  }

  const arrowRight = () => {
    slider.current.slickNext()
  }

  return listNews?.length ? (
    <Container fullWidth>
      <NewsStyled>
        <ContainerStyled maxWidth={1200} length={listNews?.length}>
          <div className='toolbar'>
            <Typography.Title className='title' level={1}>
              {t('NEWS')}
              <br />
              <img className='hight-light' src={HightLineShort.src} alt='hight-light' />
            </Typography.Title>

            <div className='button-box'>
              {listNews?.length > 3 && (
                <>
                  <ButtonSlideStyled shape='circle' onClick={arrowLeft}>
                    <LeftIcon />
                  </ButtonSlideStyled>
                  <ButtonSlideStyled shape='circle' onClick={arrowRight}>
                    <RightIcon />
                  </ButtonSlideStyled>
                </>
              )}
            </div>
          </div>
          <Slider ref={(c) => (slider.current = c)} {...settings}>
            {listNews?.map((item: any) => (
              <div key={item?.newsId} className='p-3'>
                <div className='news-card'>
                  <div className='img-container'>
                    <Image
                      src={item?.image}
                      fill
                      priority
                      alt='new'
                      onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}
                    />
                  </div>
                  <div className='content'>
                    <Typography.Text className='category' title={t(item?.newsType, { ns: 'common' }) ?? ''}>
                      {t(item?.newsType, { ns: 'common' })}
                    </Typography.Text>
                    <Typography.Title
                      className='title hover'
                      level={2}
                      title={item.title}
                      onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}
                    >
                      {item?.title}
                    </Typography.Title>
                    <Typography.Text className='time'>{dayjs(item?.createdAt).format(dateFormat)}</Typography.Text>
                  </div>
                  <div className='footer'>
                    <Typography.Text
                      className='redirect-text hover'
                      onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}
                    >
                      {t('LEARN_MORE')}
                    </Typography.Text>
                    <Button
                      type='text'
                      icon={<ArrowNarrowRight />}
                      onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <ButtonStyled
            disabled={_isEmpty(listNews)}
            shape='round'
            type='primary'
            onClick={() => router.push(AppRoutes.news)}
          >
            {t('VIEW_ALL')}
          </ButtonStyled>
        </ContainerStyled>
      </NewsStyled>
    </Container>
  ) : (
    <></>
  )
}

export default memo(News)
