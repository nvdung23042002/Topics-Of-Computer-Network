// import { useAppSelector } from '@/hooks/store'
import BetSlide from '@/containers/bet/components/bet-slide'
import { Form } from 'antd'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PoolMatchList from './pool-match-list'
import PoolTournamentsList from './pool-tournaments-list'
import { BetListTabStyled } from './pool-tournaments-list/styled'

enum ACTIVE_TAB {
  TOURNAMENTS_TAB = 1,
  MATCH_TAB = 2
}

const PoolBetList: React.FC = () => {
  const { t } = useTranslation('bet-list')
  const router = useRouter()
  const { activePoolTab } = router.query || {}
  const [currentTab, setCurrenTab] = useState<number>(1)
  const [form] = Form.useForm()

  useEffect(() => {
    setCurrenTab(Number(activePoolTab) || 1)
  }, [])

  const bets = [
    {
      key: String(ACTIVE_TAB.TOURNAMENTS_TAB),
      label: t('TOURNAMENTS', {
        ns: 'bet-list'
      }),
      children: <PoolTournamentsList form={form} />
    },
    {
      key: String(ACTIVE_TAB.MATCH_TAB),
      label: t('MATCH', {
        ns: 'bet-list'
      }),
      children: <PoolMatchList form={form} />
    }
  ]

  const handleChangeTab = (numberTab: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          activePoolTab: numberTab
        }
      },
      undefined,
      {
        scroll: false,
        shallow: true
      }
    )
    setCurrenTab(Number(numberTab))
  }

  return (
    <>
      <BetSlide />
      <BetListTabStyled
        defaultActiveKey={String(currentTab)}
        activeKey={String(currentTab)}
        listItem={bets}
        onChange={handleChangeTab}
      />
    </>
  )
}

export default PoolBetList
