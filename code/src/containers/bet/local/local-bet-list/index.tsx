import Layout from '@/app/layout'
import { Text2th700Styled } from '@/components/styled'
import { useWindowSize } from '@/hooks/useWindowResize'
import { Form } from 'antd'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useLayoutEffect, useState } from 'react'
import BetSlide from '../../components/bet-slide'
import ArrowBottom from '../../icons/ArrowBottom'
import ArrowTop from '../../icons/ArrowTop'
import LocalBetCart from '../local-bet-cart'
import LocalMatchList from './local-match-list'
import LocalTournamentsList from './local-tournaments-list'
import { BetListTabStyled } from './local-tournaments-list/styled'
import {
  BetContainerStyled,
  BetListContainerStyled,
  BetListRowStyled,
  BetSlipStyled,
  LeftColStyled,
  RightColStyled,
  TypeBetStyled
} from './styled'

enum ACTIVE_TAB {
  TOURNAMENTS_TAB = 1,
  MATCH_TAB = 2
}

const LocalBetList: React.FC = () => {
  const { t } = useTranslation('bet-list')
  const router = useRouter()
  const { activeTab } = router.query || {}
  const [currentTab, setCurrenTab] = useState<number>(1)
  const [form] = Form.useForm()
  const [scroll, setScroll] = useState<boolean>(false)
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  useLayoutEffect(() => {
    setCurrenTab(Number(activeTab) || 1)
  }, [])

  const bets = [
    {
      key: String(ACTIVE_TAB.TOURNAMENTS_TAB),
      label: t('TOURNAMENTS', {
        ns: 'bet-list'
      }),
      children: <LocalTournamentsList form={form} />
    },
    {
      key: String(ACTIVE_TAB.MATCH_TAB),
      label: t('MATCH', {
        ns: 'bet-list'
      }),
      children: <LocalMatchList form={form} />
    }
  ]

  const handleChangeTab = (numberTab: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          activeTab: numberTab
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

  useLayoutEffect(() => {
    const element: any = document.getElementsByTagName('body')

    if (isMaxWidth1199 && scroll) {
      if (element[0]) element[0].style.overflow = 'hidden'
    } else {
      if (element[0]) element[0].style.overflow = 'auto'
    }
  }, [isMaxWidth1199, scroll])

  const handleTouchMove = (e: any) => {
    e.preventDefault()
  }

  return (
    <Layout>
      <BetContainerStyled maxWidth={1200}>
        <BetListContainerStyled>
          <BetListRowStyled>
            <RightColStyled>
              <TypeBetStyled>
                <div className='type-bet'>
                  {t('POOL_BET', {
                    ns: 'common'
                  })}
                </div>
              </TypeBetStyled>
              <div className='col-wrap'>
                <BetSlide />
                <BetListTabStyled
                  defaultActiveKey={String(currentTab)}
                  activeKey={String(currentTab)}
                  listItem={bets}
                  onChange={handleChangeTab}
                />
              </div>
            </RightColStyled>
            <LeftColStyled>
              {isMaxWidth1199 ? (
                <>
                  <div className={cx('bet-slip-mobile', scroll ? 'active' : 'un-active')} onTouchMove={handleTouchMove}>
                    <LocalBetCart form={form} />
                  </div>
                  <BetSlipStyled onClick={() => setScroll((prevState: boolean) => !prevState)} scroll={scroll}>
                    <Text2th700Styled>
                      {scroll
                        ? t('HIDE_BET_SLIP', {
                            ns: 'bet-list'
                          })
                        : t('SHOW_BET_SLIP', {
                            ns: 'bet-list'
                          })}
                    </Text2th700Styled>
                    {scroll ? <ArrowBottom /> : <ArrowTop />}
                  </BetSlipStyled>
                </>
              ) : (
                <LocalBetCart form={form} />
              )}
            </LeftColStyled>
          </BetListRowStyled>
        </BetListContainerStyled>
      </BetContainerStyled>
    </Layout>
  )
}

export default LocalBetList
