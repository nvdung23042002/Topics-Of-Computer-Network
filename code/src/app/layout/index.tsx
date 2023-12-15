import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { ContainerStyled, LayoutAntStyled } from './styled'
import HeaderHome from './components/header-home'
import { useAppDispatch } from '@/hooks/store'
import { getPriceRateThunk } from '@/redux/auth/thunk'
import SiteLoading from '@/components/site-loading'
import SubNav from './components/sub-nav'
import { useWindowSize } from '@/hooks/useWindowResize'
type LayoutProps = {
  children: React.ReactNode | React.ReactElement
  isHome?: boolean
  isNews?: boolean
  isNewsDetai?: boolean
  isMyPage?: boolean
  isGuidePage?: boolean
}

const Layout = ({ isHome, children, isNews, isNewsDetai, isMyPage, isGuidePage }: LayoutProps) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  useEffect(() => {
    ;(async () => {
      await dispatch(getPriceRateThunk({}))
      setLoaded(true)
    })()
  }, [])

  return (
    <>
      {loaded ? (
        <LayoutAntStyled>
          {isHome ? <HeaderHome /> : <Header />}
          {!isMaxWidth1199 && !isHome && !isNews && !isNewsDetai && !isMyPage && !isGuidePage && <SubNav />}
          <ContainerStyled>{children}</ContainerStyled>
          <Footer />
        </LayoutAntStyled>
      ) : (
        <SiteLoading />
      )}
    </>
  )
}

export default Layout
