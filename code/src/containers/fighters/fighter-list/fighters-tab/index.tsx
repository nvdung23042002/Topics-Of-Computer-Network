import Image from '@/components/common/image'
import Pagination from '@/components/common/pagination'
import SearchIcon from '@/components/icons/SearchIcon'
import SiteLoading from '@/components/site-loading'
import { Text400Styled, Text9th800Styled } from '@/components/styled'
import { dateFormat, dateFormatJP } from '@/constants/format'
import { AppRoutes } from '@/constants/routes'
import NSBService from '@/services/NSB.service'
import { TypePagination } from '@/types'
import dayjs from '@/utils/dayjs'
import getError from '@/utils/getError'
import showMessage from '@/utils/showMessage'
import { Spin, Tooltip } from 'antd'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'
import _trim from 'lodash/trim'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { FighterInputStyled } from '../styled'
import {
  FighterBodyIndexStyled,
  FighterHeaderStyled,
  FighterImgStyled,
  FighterInfoStyled,
  FighterItemStyled,
  FighterListGridStyled,
  FighterListItemsStyled,
  FighterListStyled,
  FighterNameStyled,
  FighterSearchStyled,
  NoDataSearchStyled,
  PairBodyIndexStyled
} from './styled'

type Props = {
  gender?: string
}

const FightersTab: React.FC<Props> = ({ gender }) => {
  const { t } = useTranslation(['fighter-list', 'common'])
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState<string>('')
  const [pagination, setPagination] = useState<TypePagination>({
    current: 1,
    pageSize: 20,
    total: 0
  })
  const [fightersList, setFighterList] = useState<any[]>([])

  const getFighterList = useCallback(async (keyword: string, gender: string, page: number, limit: number) => {
    setLoading(true)

    try {
      const trimKeyword = _trim(keyword)
      const params = {
        keyword: trimKeyword,
        gender,
        page,
        limit
      }

      const response = await NSBService.GetFighterList(params)
      const result = response?.data?.result

      setFighterList(result)
      setPagination({ current: response?.data?.page, pageSize: response?.data?.limit, total: response?.data?.total })

      setTimeout(() => {
        setLoading(false)
      }, 500)
    } catch (error: any) {
      setLoading(false)
      showMessage({ error: getError(error) })
    }
  }, [])

  const debounceFn = useCallback(_debounce(getFighterList, 700), [])

  useEffect(() => {
    getFighterList(keyword, gender || '', pagination.current, pagination.pageSize)
  }, [getFighterList])

  const handleChangePagination = (page: number) => {
    getFighterList(keyword, gender || '', page, pagination.pageSize)
  }

  const handleChangeKeyword = (e: any) => {
    setKeyword(e?.target?.value || '')
    debounceFn(e?.target?.value, gender || '', 1, pagination.pageSize)
  }

  const formatWeight = (weight: number) => {
    if (Number.isInteger(weight)) {
      return `${weight}.0`
    }

    return weight
  }

  return (
    <FighterListItemsStyled>
      <FighterSearchStyled>
        <FighterInputStyled
          placeholder={t('PLEASE_ENTER_NAME_FIGHTER') || ''}
          suffix={<SearchIcon />}
          onChange={handleChangeKeyword}
        />
      </FighterSearchStyled>
      <Spin spinning={loading} indicator={<SiteLoading />}>
        {!_isEmpty(fightersList) ? (
          <FighterListStyled>
            <FighterListGridStyled className='fighters-list' col={4} gap={16}>
              {fightersList.map((item: any) => (
                <FighterItemStyled
                  key={item?.ftId}
                  className='hover'
                  onClick={() => router.push(AppRoutes.fightersDetail(item?.ftId))}
                >
                  <FighterHeaderStyled>
                    <FighterImgStyled>
                      <Image src={item?.avatar} alt='Fighter' fill={true} objectFit='cover' />
                    </FighterImgStyled>
                  </FighterHeaderStyled>
                  <FighterInfoStyled>
                    <FighterNameStyled>
                      <Tooltip title={item?.fullNameRomaji?.toUpperCase()} placement='topLeft'>
                        <Text9th800Styled className='name-romaji text-nowrap-1'>
                          {item?.fullNameRomaji}
                        </Text9th800Styled>
                      </Tooltip>
                      <Tooltip title={item?.fullNameKanji} placement='topLeft'>
                        <Text9th800Styled className='nname-kanji text-nowrap-1'>{item?.fullNameKanji}</Text9th800Styled>
                      </Tooltip>
                    </FighterNameStyled>
                    <FighterBodyIndexStyled>
                      <PairBodyIndexStyled>
                        <Text400Styled className='label'>{t('DATE_OF_BIRTH')}：</Text400Styled>
                        <Text400Styled className='value'>
                          {dayjs(item?.dateOfBirth, dateFormat)?.format(dateFormatJP)}
                        </Text400Styled>
                      </PairBodyIndexStyled>
                      <PairBodyIndexStyled>
                        <Text400Styled className='label'>{t('HEIGHT_WEIGHT')}：</Text400Styled>
                        <Text400Styled className='value'>
                          {item?.height || 0}CM / {formatWeight(item?.weight) || 0}KG
                        </Text400Styled>
                      </PairBodyIndexStyled>
                      <PairBodyIndexStyled>
                        <Text400Styled className='label'>{t('FROM')}:</Text400Styled>
                        <Tooltip title={item?.address ? item?.address : '-'}>
                          <Text400Styled className='value text-nowrap-1'>
                            {item?.address ? item?.address : '-'}
                          </Text400Styled>
                        </Tooltip>
                      </PairBodyIndexStyled>
                    </FighterBodyIndexStyled>
                  </FighterInfoStyled>
                </FighterItemStyled>
              ))}
            </FighterListGridStyled>
          </FighterListStyled>
        ) : (
          <NoDataSearchStyled>
            <Text400Styled>
              {t('NO_ITEM_FOUND', {
                ns: 'common'
              })}
            </Text400Styled>
          </NoDataSearchStyled>
        )}
      </Spin>
      <Pagination {...pagination} hideOnSinglePage={false} onChange={handleChangePagination} responsive={false} />
    </FighterListItemsStyled>
  )
}

export default FightersTab
