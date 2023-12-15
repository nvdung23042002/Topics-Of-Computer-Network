/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from '@/components/common/image'
import { Text5th500Styled, Text700Styled, TextSecondary500Styled } from '@/components/styled'
import { dateFormat } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import dayjs from '@/utils/dayjs'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { NewsCreatedDateStyled, NewsTitleStyled, NewsTypeStyled } from '../styled'
import {
  HotNewsContentStyled,
  HotNewsItemContentStyled,
  HotNewsItemImgStyled,
  HotNewsItemStyled,
  HotNewsMobileStyled,
  HotNewsStyled,
  HotNewsTitleStyled
} from './styled'
import { Tooltip } from 'antd'
import { useWindowSize } from '@/hooks/useWindowResize'
import Slider, { Settings } from 'react-slick'

type Props = {
  hotNews: any[]
}

const HotNews: React.FC<Props> = ({ hotNews }) => {
  const { t } = useTranslation(['news', 'common'])
  const router = useRouter()
  const { width } = useWindowSize()
  const isMaxWidth767 = width <= 767

  const settings: Settings = {
    className: 'center',
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    speed: 500
  }

  return (
    <HotNewsStyled>
      <HotNewsTitleStyled>
        <Text700Styled>{t('HOT_NEWS')}</Text700Styled>
      </HotNewsTitleStyled>
      {isMaxWidth767 ? (
        <Slider {...settings}>
          {hotNews?.map((item: any, index: any) => (
            <HotNewsMobileStyled key={index}>
              <div className='news-image' onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}>
                <Image src={item?.image} alt='news' fill objectFit='cover' />
              </div>
              <div className='news-type'>
                <TextSecondary500Styled>
                  {t(item?.newsType, {
                    ns: 'common'
                  })}
                </TextSecondary500Styled>
              </div>
              <div className='news-content'>
                <Text700Styled
                  className='text-nowrap-2'
                  onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}
                >
                  {item?.title}
                </Text700Styled>
                <Text5th500Styled className='created-at'>{dayjs(item?.createdAt).format(dateFormat)}</Text5th500Styled>
              </div>
            </HotNewsMobileStyled>
          ))}
        </Slider>
      ) : (
        <HotNewsContentStyled>
          {hotNews?.map((news: any) => (
            <HotNewsItemStyled key={news?.newsId}>
              <HotNewsItemImgStyled className='hover' onClick={() => router.push(AppRoutes.newsDetail(news?.newsId))}>
                <Image src={news?.image} alt='News' fill={true} objectFit='cover' />
              </HotNewsItemImgStyled>
              <HotNewsItemContentStyled>
                <div className='content'>
                  <NewsTypeStyled>
                    <TextSecondary500Styled>
                      {t(news?.newsType, {
                        ns: 'common'
                      })}
                    </TextSecondary500Styled>
                  </NewsTypeStyled>
                  <NewsTitleStyled className='hover' onClick={() => router.push(AppRoutes.newsDetail(news?.newsId))}>
                    <Tooltip title={news?.title}>
                      <Text700Styled>{news?.title}</Text700Styled>
                    </Tooltip>
                  </NewsTitleStyled>
                  <NewsCreatedDateStyled>
                    <Text5th500Styled>{dayjs(news?.createdAt).format(dateFormat)}</Text5th500Styled>
                  </NewsCreatedDateStyled>
                </div>
              </HotNewsItemContentStyled>
            </HotNewsItemStyled>
          ))}
        </HotNewsContentStyled>
      )}
    </HotNewsStyled>
  )
}

export default HotNews
