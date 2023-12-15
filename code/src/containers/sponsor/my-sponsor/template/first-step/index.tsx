import { Text2th400Styled, Text700Styled } from '@/components/styled'
import { useTranslation } from 'next-i18next'
import { columns } from '../columns'
import { AddBtnStyled, FirstStepControlStyled, FirstStepStyled, TemplateTableStyled } from './styled'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import NSBService from '@/services/Sponsor.service'
import showMessage from '@/utils/showMessage'
import getError from '@/utils/getError'
import { TypePagination } from '@/types'
import { useWindowSize } from '@/hooks/useWindowResize'

const FirstStep: React.FC = () => {
  const { t } = useTranslation('sponsor')
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [pagination, setPagination] = useState<TypePagination>({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const getSponsorTemplateList = useCallback(async () => {
    setLoading(true)
    try {
      const response = await NSBService.SponsorHomepageList({
        page: pagination.current,
        limit: pagination.pageSize
      })

      setDataSource(response?.data?.result)
      setPagination((prevState: any) => ({
        ...prevState,
        current: response?.data?.page,
        total: response?.data?.total
      }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      showMessage({ error: getError(error) })
    }
  }, [pagination.current])

  useEffect(() => {
    getSponsorTemplateList()
  }, [getSponsorTemplateList])

  const handleChangeStep = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        step: 2
      }
    })
  }

  const handlePage = (params: any) => {
    const { page } = params

    setPagination((prevState: any) => ({
      ...prevState,
      current: page
    }))
  }

  const getColumnt = useMemo(() => {
    return columns(t, router, isMaxWidth1199)
  }, [])

  return (
    <FirstStepStyled>
      <FirstStepControlStyled>
        <Text700Styled className='template-management'>{t('TEMPLATE_MANAGEMENT')}</Text700Styled>
        {!isMaxWidth1199 && (
          <AddBtnStyled onClick={handleChangeStep}>
            <Text2th400Styled>{t('ADD')}</Text2th400Styled>
          </AddBtnStyled>
        )}
      </FirstStepControlStyled>
      <TemplateTableStyled
        loading={loading}
        action={(params: any) => handlePage(params)}
        rowKey={'id'}
        columns={getColumnt}
        items={dataSource}
        total={pagination.total}
        page={pagination.current}
        limit={pagination.pageSize}
        scroll={{ x: 880 }}
      />
      {isMaxWidth1199 && (
        <AddBtnStyled onClick={handleChangeStep}>
          <Text2th400Styled>{t('ADD')}</Text2th400Styled>
        </AddBtnStyled>
      )}
    </FirstStepStyled>
  )
}

export default FirstStep
