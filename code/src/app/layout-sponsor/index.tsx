import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { ContainerStyled, LayoutAntStyled } from './styled'
import { useAppSelector } from '@/hooks/store'
import { useRouter as useNavigate } from 'next/navigation'
import { AppRoutes } from '@/constants/routes'
import { useRouter } from 'next/router'
type LayoutProps = {
  children: React.ReactNode | React.ReactElement
  mustAuth?: boolean
}

const Layout = ({ children, mustAuth }: LayoutProps) => {
  const zone = useAppSelector((state) => state.app?.zone)

  const isAuthenticated = useAppSelector((state) => state.authSponsor?.isAuthenticated)
  const [loaded, setLoaded] = useState<boolean>(false)
  const navigate = useNavigate()
  const { pathname } = useRouter()

  useEffect(() => {
    /** Not support global version */
    if (zone === 'global') {
      navigate.replace(AppRoutes[404])
      return
    }

    setLoaded(true)
    if (!isAuthenticated) {
      navigate.replace(AppRoutes.sponsorLogin)
    } else if ([AppRoutes.sponsorLogin, AppRoutes.sponsorRegister].includes(pathname)) {
      navigate.replace(AppRoutes.sponsor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, zone])
  return (
    <>
      {loaded && (
        <LayoutAntStyled>
          {isAuthenticated ? (
            <>
              <Header />
              <ContainerStyled>{children}</ContainerStyled>
              <Footer />
            </>
          ) : (
            !mustAuth && children
          )}
        </LayoutAntStyled>
      )}
    </>
  )
}

export default Layout
