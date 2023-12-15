import Layout from '@/app/layout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import FightersTab from './fighters-tab'
import { FighterListContainerStyled, FighterListTabStyled } from './styled'
import { useRouter } from 'next/router'
import { GENDER } from '@/constants/common'

const FighterList: React.FC = () => {
  const router = useRouter()
  const { activeTab } = router.query || {}
  const { t } = useTranslation('common')
  const [currentTab, setCurrentTab] = useState<number>(1)

  const bets = [
    {
      key: '1',
      label: t('ALL'),
      children: <FightersTab gender='' />
    },
    {
      key: '2',
      label: t('MEN'),
      children: <FightersTab gender={GENDER.MALE} />
    },
    {
      key: '3',
      label: t('WOMENT'),
      children: <FightersTab gender={GENDER.FEMALE} />
    }
  ]

  useEffect(() => {
    setCurrentTab(Number(activeTab) || 1)
  }, [])

  const handleChange = (numberTab: number) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        activeTab: numberTab
      }
    })
    setCurrentTab(numberTab)
  }

  return (
    <Layout>
      <FighterListContainerStyled maxWidth={1200}>
        <FighterListTabStyled
          defaultActiveKey={String(currentTab)}
          activeKey={String(currentTab)}
          listItem={bets}
          onChange={handleChange}
        />
      </FighterListContainerStyled>
    </Layout>
  )
}

export default FighterList
