import Image from '@/components/common/image'
import Pagination from '@/components/common/pagination'
import { Text5th500Styled, Text700Styled, TextSecondary500Styled } from '@/components/styled'
import { TypePagination } from '@/types'
import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { NewsCreatedDateStyled, NewsTitleStyled, NewsTypeStyled } from '../styled'
import {
  NormalNewsItemContentStyled,
  NormalNewsItemImgStyled,
  NormalNewsItemStyled,
  NormalNewsPaginationStyled,
  NormalNewsStyled
} from './styled'

import SiteLoading from '@/components/site-loading'
import { dateFormat } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import NSBService from '@/services/NSB.service'
import dayjs from '@/utils/dayjs'
import { Spin, Tooltip } from 'antd'
import { useRouter } from 'next/router'

type Props = {
  normalNews: any
}

const NormalNews: React.FC<Props> = ({ normalNews }) => {
  const { t } = useTranslation(['news', 'common'])
  const router = useRouter()
  const [normalNewsList, setNormalNewsList] = useState<any>([])
  const [pagination, setPagination] = useState<TypePagination>({
    current: 1,
    pageSize: 6,
    total: normalNews?.total || 0
  })
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setNormalNewsList(normalNews?.records || [])
  }, [normalNews])

  const handleChangePagination = async (page: number) => {
    setLoading(true)
    try {
      const response = await NSBService.GetNewsList({
        page,
        limit: 6,
        langKey: String(router?.locale).toUpperCase() || 'JA'
      })

      const { pageNews } = response.data || {}

      setNormalNewsList(pageNews.records)
      setPagination({
        ...pagination,
        current: pageNews.page,
        total: pageNews.total
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Spin spinning={loading} indicator={<SiteLoading />}>
      <NormalNewsStyled>
        {normalNewsList?.map((item: any, index: number) => (
          <NormalNewsItemStyled key={item?.newsId || index}>
            <NormalNewsItemImgStyled className='hover' onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}>
              <Image src={item?.image} alt='News' fill={true} objectFit='cover' />
            </NormalNewsItemImgStyled>
            <NormalNewsItemContentStyled>
              <div>
                <NewsTypeStyled>
                  <TextSecondary500Styled>
                    {t(item?.newsType, {
                      ns: 'common'
                    })}
                  </TextSecondary500Styled>
                </NewsTypeStyled>
                <NewsTitleStyled className='hover' onClick={() => router.push(AppRoutes.newsDetail(item?.newsId))}>
                  <Tooltip title={item?.title}>
                    <Text700Styled>{item?.title}</Text700Styled>
                  </Tooltip>
                </NewsTitleStyled>
              </div>
              <NewsCreatedDateStyled className='created-at'>
                <Text5th500Styled>{dayjs(item?.createdAt).format(dateFormat)}</Text5th500Styled>
              </NewsCreatedDateStyled>
            </NormalNewsItemContentStyled>
          </NormalNewsItemStyled>
        ))}
      </NormalNewsStyled>
      <NormalNewsPaginationStyled>
        <Pagination {...pagination} hideOnSinglePage={false} onChange={handleChangePagination} responsive />
      </NormalNewsPaginationStyled>
    </Spin>
  )
}

export default memo(NormalNews)
