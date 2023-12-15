import React, { useEffect, useState } from 'react'
import { GlobalCardsWrapperStyled, TabsStyled } from './styled'
import { useTranslation } from 'next-i18next'
import { FormInstance } from 'antd'
import PoolBetCart from '@/containers/bet/global/global-card/global-pool-cart'
import NormalBetCart from '@/containers/bet/global/global-card/global-normal-card'
import { useRouter } from 'next/router'

type Props = {
  form: FormInstance
}

enum ACTIVE_TAB {
  BET_JP = 1,
  BET_GLOBAL = 2
}

const GlobalCardsWrapper: React.FC<Props> = ({ form }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { activeCartTab } = router.query || {}
  const [currentTab, setCurrentTab] = useState<number>(1)

  useEffect(() => {
    setCurrentTab(Number(activeCartTab) || 1)
  }, [])

  const betsGlobal = [
    {
      key: String(ACTIVE_TAB.BET_JP),
      label: t('POOL_BET', { ns: 'common' }),
      children: <PoolBetCart form={form} />
    },
    {
      key: String(ACTIVE_TAB.BET_GLOBAL),
      label: t('NORMAL_BET', { ns: 'common' }),
      children: <NormalBetCart form={form} />
    }
  ]

  const onChange = (numberTab: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          activeCartTab: numberTab
        }
      },
      undefined,
      {
        scroll: false,
        shallow: true
      }
    )

    setCurrentTab(Number(numberTab))
  }

  return (
    <GlobalCardsWrapperStyled>
      <TabsStyled
        centered
        defaultActiveKey={String(currentTab)}
        activeKey={String(currentTab)}
        items={betsGlobal}
        onChange={onChange}
      />
    </GlobalCardsWrapperStyled>
  )
}

export default GlobalCardsWrapper
