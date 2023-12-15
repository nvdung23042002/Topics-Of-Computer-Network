import Layout from '@/app/layout'
import LayoutMyPage from '@/components/layout-my-page'
import React, { useEffect } from 'react'
import { ButtonIconStyled, ContainerContent, HeaderMenuStyled, TabsStyled, TitleStyled } from './styled'
import { TabsProps } from 'antd'
import { useTranslation } from 'next-i18next'
import Bets from './components/bets'
import NFTs from './components/nfts'
import DepositsWithdrawal from './components/deposit-withdrawal'
import ShopOnlineContent from './components/shop-online'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/constants/routes'
import MenuIcon from '@/components/icons/MenuIcon'
import ClockIcon from '@/components/icons/ClockIcon'
import { useMyPageContext } from '@/context/my-page'
import { useAppSelector } from '@/hooks/store'

const HistoryPage = () => {
  const { t } = useTranslation('history')
  const zone = useAppSelector((state) => state.app?.zone)
  const router = useRouter()
  const { query } = router
  const { showDrawer } = useMyPageContext()

  const items: TabsProps['items'] = [
    { key: '1', label: t('BETS'), children: <Bets /> },
    { key: '2', label: t('NFTS'), children: <NFTs /> },
    { key: '3', label: t('GOODS_SALE'), children: <ShopOnlineContent /> },
    { key: '4', label: t('TRANSACTION_HISTORY'), children: <DepositsWithdrawal /> }
  ]
  if (zone === 'global') items.splice(2, 1)

  const onChange = (key: string) => {
    router.replace(AppRoutes.orderHistory(key))
  }

  useEffect(() => {
    if (!query || !Object.keys(query).length) {
      router.replace(AppRoutes.orderHistory(1))
    }
  }, [query, router])

  return (
    <Layout isMyPage>
      <LayoutMyPage>
        <HeaderMenuStyled className='mobile tablet'>
          <div className='d-flex j-content-between al-items-center'>
            <TitleStyled className='title-mobile'>
              <ClockIcon className='icon' /> <span>{t('TRANSACTION_HISTORY_TITLE')}</span>
            </TitleStyled>
            <ButtonIconStyled onClick={showDrawer}>
              <MenuIcon className='icon' />
            </ButtonIconStyled>
          </div>
        </HeaderMenuStyled>
        <TitleStyled className='title-pc'>{t('TRANSACTION_HISTORY_TITLE')}</TitleStyled>
        <ContainerContent>
          <TabsStyled activeKey={(query['tabActive'] || 1).toString()} items={items} onChange={onChange} />
        </ContainerContent>
      </LayoutMyPage>
    </Layout>
  )
}

export default HistoryPage
