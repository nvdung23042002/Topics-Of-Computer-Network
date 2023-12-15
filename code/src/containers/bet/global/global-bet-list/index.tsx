import Layout from '@/app/layout'
import { Text2th700Styled } from '@/components/styled'
import { useWindowSize } from '@/hooks/useWindowResize'
import { Form } from 'antd'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import ArrowBottom from '../../icons/ArrowBottom'
import ArrowTop from '../../icons/ArrowTop'
import NormalBetCart from '../global-card/global-normal-card'
import NormalBetList from './normal-bet-list'
import {
  BetListContainerStyled,
  BetListRowStyled,
  BetSlipStyled,
  GlobalBetContainerStyled,
  LeftColStyled,
  RightColStyled
} from './styled'

const GlobalTabsWrapper = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [scroll, setScroll] = useState<boolean>(false)
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const handleTouchMove = (e: any) => {
    e.preventDefault()
  }

  return (
    <Layout>
      <GlobalBetContainerStyled maxWidth={1200}>
        <BetListContainerStyled>
          <BetListRowStyled>
            <RightColStyled>
              <div className='col-wrap'>
                <NormalBetList />
              </div>
            </RightColStyled>
            <LeftColStyled>
              {isMaxWidth1199 ? (
                <>
                  <div className={cx('bet-slip-mobile', scroll ? 'active' : 'un-active')} onTouchMove={handleTouchMove}>
                    <NormalBetCart form={form} />
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
                <NormalBetCart form={form} />
              )}
            </LeftColStyled>
          </BetListRowStyled>
        </BetListContainerStyled>
      </GlobalBetContainerStyled>
    </Layout>
  )
}

export default GlobalTabsWrapper
