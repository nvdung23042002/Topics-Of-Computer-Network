import Layout from '@/app/layout'
import React, { memo } from 'react'
import AboutUs from './about-us'
import AdvertisingArea from './advertising-area'
import EcoSystem from './eco-system'
import FAQ from './faq'
import Inquiry from './inquiry'
import Introduction from './introduction'
import News from './news'
import Ticket from './ticket'
import { LPHomeStyled } from './styled'
import { GlobalScrollConfig } from '@/components/global-setting/styled'

type Props = {
  listNews?: any[]
  listMatches?: any[]
  listBanner?: any[]
}

const Home: React.FC<Props> = ({ listNews, listMatches, listBanner }) => {
  return (
    <Layout isHome>
      <LPHomeStyled>
        <GlobalScrollConfig />
        <Introduction listMatches={listMatches} />
        <AboutUs />
        <News listNews={listNews} />
        <AdvertisingArea listBanner={listBanner} />
        <Ticket />
        <EcoSystem />
        <FAQ />
        <Inquiry />
      </LPHomeStyled>
    </Layout>
  )
}

export default memo(Home)
