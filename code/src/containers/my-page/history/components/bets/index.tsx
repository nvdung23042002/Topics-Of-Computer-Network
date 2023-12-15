import React, { useEffect, useState } from 'react'
import { ContainerBeds, HeaderBeds, ListTicketBet } from './styled'
import { RadioButtonGroupStyled, RadioButtonStyled } from '../../styled'
import { useTranslation } from 'next-i18next'
import TicketBet from './components/ticket-bet'
import { ConfigProvider, Spin } from 'antd'
import EmptyData from './components/empty'
import { TypePagination } from '@/types'
import Pagination from '@/components/common/pagination'
import showMessage from '@/utils/showMessage'
import HistoryService from '@/services/History.service'
import { IBetResult } from '@/services/dto/history'
import { useRouter } from 'next/router'

// type Props = {}

const Bets = () => {
  const { t } = useTranslation('history')
  const buttons = [
    {
      label: t('CURRENTLY_BETTING'),
      value: 'CURRENTLY_BETTING'
    },
    {
      label: t('FINISHED_BET'),
      value: 'FINISHED_BET'
    }
  ]
  const [selectedButton, setSelectedButton] = useState(buttons[0].value)
  const [pagination, setPagination] = useState<TypePagination>({ current: 1, pageSize: 10, total: 0 })
  const [dataSource, setDataSource] = useState<IBetResult[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { locale } = useRouter()
  const fetchDataEnum = {
    CURRENTLY_BETTING: (query: { page: number; limit: number; langKey: string }) => {
      fetchData({ ...query, status: 'NEW,COMPLETED_TRANSFERRING,CANCELLED_TRANSFERRING' })
    },
    FINISHED_BET: (query: { page: number; limit: number; langKey: string }) => {
      fetchData({ ...query, status: 'COMPLETED_TRANSFERRED,CANCELLED_TRANSFERRED' })
    }
  }
  const fetchData = async (query: { status: string; page: number; limit: number; langKey: string }) => {
    setLoading(true)
    try {
      const data = await HistoryService.getMyBetResult(query)
      setDataSource(data.result)
      setPagination({ current: data.page, pageSize: data.limit, total: data.total })
    } catch (error) {
      showMessage({ error: t('ERROR_UNKNOWN', { ns: 'error-message' }) })
      setDataSource([])
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchDataEnum[selectedButton]({
      langKey: locale?.toUpperCase() ?? 'JA',
      page: pagination.current,
      limit: pagination.pageSize
    })
  }, [selectedButton, locale, pagination.current])
  const handlePaginationChange = (page: number) => {
    setPagination({ ...pagination, current: page })
  }
  return (
    <ContainerBeds>
      <HeaderBeds>
        <RadioButtonGroupStyled
          className='beds button-group'
          defaultValue={selectedButton}
          onChange={(e) => {
            setSelectedButton(e.target.value)
            setPagination({ ...pagination, current: 1 })
          }}
        >
          {buttons.map((item) => {
            return (
              <RadioButtonStyled key={item.value} value={item.value}>
                {item.label}
              </RadioButtonStyled>
            )
          })}
        </RadioButtonGroupStyled>
      </HeaderBeds>
      <ConfigProvider renderEmpty={() => <EmptyData />}>
        <Spin spinning={loading}>
          <ListTicketBet
            grid={{ gutter: 16, column: 1 }}
            dataSource={dataSource}
            renderItem={(item: IBetResult, index) => {
              return (
                <ListTicketBet.Item key={index}>
                  <TicketBet {...item} tab={selectedButton as 'CURRENTLY_BETTING' | 'FINISHED_BET'} />
                </ListTicketBet.Item>
              )
            }}
          />
          <Pagination {...pagination} hideOnSinglePage onChange={handlePaginationChange} />
        </Spin>
      </ConfigProvider>
    </ContainerBeds>
  )
}

export default Bets
