import Layout from '@/app/layout'
import Image from '@/components/common/image'
import { Text500Styled, Text700Styled, TextSecondary400Styled, TextSecondary500Styled } from '@/components/styled'
import { dateFormat } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import SponsorAds from '@/containers/bet/components/sponsor-ads'
import { Tooltip } from 'antd'
import dayjs from '@/utils/dayjs'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'next-i18next'
import {
  NewsBannerStyled,
  NewsContentStyled,
  NewsDetailContainerStyled,
  NewsDetailContentStyled,
  NewsDetailStyled,
  NewsDetailTitleStyled,
  NewsLatestContentStyled,
  NewsLatestImgStyled,
  NewsLatestItemStyled,
  NewsLatestListStyled,
  NewsLatestStyled,
  NewsLatestTitleStyled,
  NewsSponsorStyled,
  TypeAndDateStyled
} from './styled'
import EditorViewer from '@/components/common/editor-viewer'
import _isEmpty from 'lodash/isEmpty'

type Props = {
  newsDetail: any
  listForDetail: any[]
}

const NewsDetail: React.FC<Props> = ({ newsDetail, listForDetail }) => {
  const { t } = useTranslation('news')
  const router = useRouter()
  const { title, content, createdAt, image, newsType } = newsDetail || {}

  return (
    <Layout isNewsDetai={true}>
      <NewsDetailContainerStyled maxWidth={1200}>
        <NewsDetailStyled>
          <NewsDetailContentStyled>
            <div className='col-left'>
              <NewsDetailTitleStyled>
                <Tooltip title={title}>
                  <Text500Styled>{title}</Text500Styled>
                </Tooltip>
              </NewsDetailTitleStyled>
              <TypeAndDateStyled>
                <TextSecondary500Styled>{t(newsType, { ns: 'common' })}</TextSecondary500Styled>
                <TextSecondary500Styled>{dayjs(createdAt).format(dateFormat)}</TextSecondary500Styled>
              </TypeAndDateStyled>
              <NewsBannerStyled>
                <Image src={image} alt='News' fill={true} objectFit='cover' />
              </NewsBannerStyled>
              <NewsContentStyled>
                <EditorViewer content={content} />
              </NewsContentStyled>
            </div>
            <div className='col-right'>
              {!_isEmpty(listForDetail) && (
                <NewsLatestStyled>
                  <NewsLatestTitleStyled>
                    <Text700Styled>{t('NEWS_LATEST')}</Text700Styled>
                  </NewsLatestTitleStyled>
                  <NewsLatestListStyled>
                    {listForDetail?.map((item: any) => (
                      <NewsLatestItemStyled key={item?.newsId}>
                        <NewsLatestImgStyled
                          className='hover'
                          onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}
                        >
                          <Image src={item?.image} alt='news latest' fill={true} objectFit='cover' />
                        </NewsLatestImgStyled>
                        <NewsLatestContentStyled>
                          <Tooltip title={item?.title}>
                            <Text700Styled
                              className='title hover'
                              onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}
                            >
                              {item?.title}
                            </Text700Styled>
                          </Tooltip>
                          <TextSecondary400Styled className='create-at'>
                            {dayjs(item?.createdAt).format(dateFormat)}
                          </TextSecondary400Styled>
                        </NewsLatestContentStyled>
                      </NewsLatestItemStyled>
                    ))}
                  </NewsLatestListStyled>
                </NewsLatestStyled>
              )}
              <NewsSponsorStyled>
                <SponsorAds />
              </NewsSponsorStyled>
            </div>
          </NewsDetailContentStyled>
        </NewsDetailStyled>
      </NewsDetailContainerStyled>
    </Layout>
  )
}

export default NewsDetail
