import { TabComponent } from '@/components/common/tab'
import { useAppSelector } from '@/hooks/store'
import { selectBet } from '@/redux/bet/slice'
import { FormInstance, TabsProps } from 'antd'
import cx from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import React, { memo, useEffect, useRef, useState } from 'react'
import FirstTab from './containers/first-tab'
import SecondTab from './containers/second-tab'
import ThirdTab from './containers/third-tab'
import { BetCartStyled } from './styled'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

type Props = {
  form: FormInstance
}

const LocalBetCart: React.FC<Props> = ({ form }) => {
  const { t } = useTranslation('cart')
  const router = useRouter()
  const { activeCartTab } = router.query || {}
  const { cartItems } = useAppSelector(selectBet) || {}
  const childRef = useRef<any>(null)
  const [currentTab, setCurrentTab] = useState<number>(1)

  useEffect(() => {
    setCurrentTab(Number(activeCartTab) || 1)
  }, [])

  const _items2: TabsProps['items'] = [
    {
      key: '1',
      label: t('BET_SLIP', {
        ns: 'cart'
      }),
      children: <FirstTab form={form} ref={childRef} />
    },
    {
      key: '2',
      label: t('BETTING', {
        ns: 'cart'
      }),
      children: <SecondTab ref={childRef} />
    },
    {
      key: '3',
      label: t('BET_RESULT', {
        ns: 'cart'
      }),
      children: <ThirdTab />
    }
  ]

  const onChange = (numberTab: number) => {
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
    setCurrentTab(numberTab)
    if (numberTab == 2) {
      childRef.current?.scrollToTopElement()
    }
  }

  return (
    <BetCartStyled
      className={cx('col-bet-right', {
        'no-data': _isEmpty(cartItems)
      })}
      maxWidth={430}
      bgColor={true}
      padding={'21px 15px'}
    >
      <TabComponent
        defaultActiveKey={String(currentTab)}
        activeKey={String(currentTab)}
        listItem={_items2}
        onChange={onChange}
      />
    </BetCartStyled>
  )
}

export default memo(LocalBetCart)
