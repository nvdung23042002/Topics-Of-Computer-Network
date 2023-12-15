import Layout from '@/app/layout'
import { useTranslation } from 'next-i18next'
import HotNews from './hot-news'
import {
  NewsListContainerStyled,
  NewsListStyled,
  NormalNewsColStyled,
  NormalNewsRowStyled,
  NormalNewsStyled,
  NormalNewsTitleStyled,
  SponsorAdsColStyled
} from './styled'
import NormalNews from './normal-news'
import SponsorAds from '@/containers/bet/components/sponsor-ads'
import { Text700Styled } from '@/components/styled'
import React, { useState } from 'react'
import _isEmpty from 'lodash/isEmpty'

type Props = {
  normalNews: any
  hotNews: any
}

const NewsList: React.FC<Props> = ({ normalNews, hotNews }) => {
  const { t } = useTranslation('news')
  const [isEmptySponsorAds, setIsEmptySponsorAds] = useState<boolean>(false)

  return (
    <Layout isNews={true}>
      <NewsListContainerStyled maxWidth={1290}>
        <NewsListStyled>
          {!_isEmpty(hotNews) && <HotNews hotNews={hotNews} />}
          <NormalNewsStyled>
            {!_isEmpty(normalNews?.records) && (
              <NormalNewsTitleStyled>
                <Text700Styled>{t('NEWS')}</Text700Styled>
              </NormalNewsTitleStyled>
            )}
            <NormalNewsRowStyled
              isEmptySponsorAds={isEmptySponsorAds}
              isEmptyNormalNews={_isEmpty(normalNews?.records)}
            >
              {!_isEmpty(normalNews?.records) && (
                <NormalNewsColStyled>
                  <NormalNews normalNews={normalNews} />
                </NormalNewsColStyled>
              )}
              {!isEmptySponsorAds && (
                <SponsorAdsColStyled>
                  <SponsorAds setIsEmptySponsorAds={setIsEmptySponsorAds} />
                </SponsorAdsColStyled>
              )}
            </NormalNewsRowStyled>
          </NormalNewsStyled>
        </NewsListStyled>
      </NewsListContainerStyled>
    </Layout>
  )
}

export default NewsList
