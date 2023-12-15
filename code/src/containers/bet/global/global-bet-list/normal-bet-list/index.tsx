import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import NormalMatchList from './normal-match-list'
import NormalTournamentsList from './normal-tournaments-list'
import { BetListTabStyled } from './normal-tournaments-list/styled'

enum ACTIVE_TAB {
  TOURNAMENTS_TAB = 1,
  MATCH_TAB = 2
}

const NormalBetList: React.FC = () => {
  const { t } = useTranslation('bet-list')
  const router = useRouter()
  const { activeNormalTab } = router.query || {}
  const [currentTab, setCurrenTab] = useState<number>(1)
  const [form] = Form.useForm()

  useEffect(() => {
    setCurrenTab(Number(activeNormalTab) || 1)
  }, [])

  const bets = [
    {
      key: String(ACTIVE_TAB.TOURNAMENTS_TAB),
      label: t('TOURNAMENTS', {
        ns: 'bet-list'
      }),
      children: <NormalTournamentsList form={form} />
    },
    {
      key: String(ACTIVE_TAB.MATCH_TAB),
      label: t('MATCH', {
        ns: 'bet-list'
      }),
      children: <NormalMatchList form={form} />
    }
  ]

  const handleChangeTab = (numberTab: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          activeNormalTab: numberTab
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
    <BetListTabStyled
      defaultActiveKey={String(currentTab)}
      activeKey={String(currentTab)}
      listItem={bets}
      onChange={handleChangeTab}
    />
  )
}

export default NormalBetList
