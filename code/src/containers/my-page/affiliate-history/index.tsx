import Layout from '@/app/layout'
import LayoutMyPage from '@/components/layout-my-page'
import React, { useState } from 'react'
import Info from './components/info'
import { useTranslation } from 'next-i18next'
import { TabsProps } from 'antd'
import { ContainerTable, HeaderMenuStyled, TabsStyled, TitleStyled, ButtonIconStyled } from './styled'
import TableNewRegistered from './components/table/new-registered'
import TableNewPurchase from './components/table/nft-purchase'
import { PriceRate } from '@/services/dto'
import { useMyPageContext } from '@/context/my-page'
import BezierCurveIcon from '@/components/icons/BezierCurveIcon'

import MenuIcon from '@/components/icons/MenuIcon'

const AffiliateHistory = ({ priceRates }: { priceRates: PriceRate[] }) => {
  const { t } = useTranslation('affiliate-history')
  const { showDrawer } = useMyPageContext()
  const [keyTab, setKetTab] = useState(new Date().getTime())
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('NEW_REGISTERED'),
      children: (
        <>
          <TableNewRegistered key={keyTab} />
        </>
      )
    },
    {
      key: '2',
      label: t('NFT_PURCHASE'),
      children: (
        <>
          <TableNewPurchase key={keyTab} />
        </>
      )
    }
  ]
  return (
    <Layout isMyPage>
      <LayoutMyPage>
        {/* <CheckIsNewAccount> */}
        <HeaderMenuStyled className='mobile tablet'>
          <div className='d-flex j-content-between al-items-center'>
            <TitleStyled className='title-mobile'>
              <BezierCurveIcon className='icon' /> <span>{t('AFFILIATE_INFORMATION', { ns: 'common' })}</span>
            </TitleStyled>
            <ButtonIconStyled onClick={showDrawer}>
              <MenuIcon className='icon' />
            </ButtonIconStyled>
          </div>
        </HeaderMenuStyled>

        <Info priceRates={priceRates} />
        <ContainerTable>
          <TabsStyled
            defaultActiveKey={items[0].key}
            items={items}
            onChange={() => {
              setKetTab(new Date().getTime())
            }}
          />
        </ContainerTable>
        {/* </CheckIsNewAccount> */}
      </LayoutMyPage>
    </Layout>
  )
}

export default AffiliateHistory
