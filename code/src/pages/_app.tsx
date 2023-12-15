import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider, Spin } from 'antd'
import { Theme, DefaultThemeStyled } from '@/theme'
import { appWithTranslation } from 'next-i18next'
import { ThemeAppProvider } from '@/context/theme'
import { ReduxProviders } from '@/redux/provider'
import { App as AntApp } from 'antd'
import Head from 'next/head'
import SiteLoading from '@/components/site-loading'
import { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'
import Empty from '@/components/common/empty'
import Modal from '@/components/modal'
import storage from '@/utils/storage'
import useNetwork from '@/hooks/useNetwork'
import SponsorViewer from '@/components/sponsor-viewer'
import isIOSPlatform from '@/utils/isIOSPlatform'
import { debounce } from 'lodash'

function App({ Component, pageProps, router }: AppProps) {
  const network = useNetwork()
  useEffect(() => {
    if (window?.history) {
      if (window.history?.state?.options?.scroll) {
        debounce(() => {
          document.body.scroll({ top: 0, left: 0 })
          const state = { ...window.history.state, options: { ...window.history.state.options, scroll: undefined } }
          window.history.replaceState(state, '')
        }, 400)()
      }
    }
  })

  useEffect(() => {
    Spin.setDefaultIndicator(<SiteLoading width={50} />)
  }, [])

  /** process on ios */
  useEffect(() => {
    if (isIOSPlatform()) {
      const onScroll = debounce(() => {
        const node: any = document.activeElement
        if (node && ['TEXTAREA', 'INPUT'].includes(node.tagName)) node.blur()
      }, 30)
      document.body.addEventListener('scroll', onScroll)

      return () => {
        document.body.removeEventListener('scroll', onScroll)
      }
    }
  }, [])
  const { pathname, query, asPath } = router

  useEffect(() => {
    const locale = storage().get('locale') ?? router.defaultLocale
    if (router.locale !== locale && !(pathname.includes('/auth-redirect') || pathname.includes('/sponsor'))) {
      router.replace({ pathname, query }, asPath, {
        locale: locale
      })
    }
  }, [pathname])

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='icon' type='image/svg+xml' href='/favicon.png' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover'
        />

        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-touch-fullscreen' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      </Head>
      <ReduxProviders>
        <ConfigProvider theme={{ ...Theme }} renderEmpty={() => <Empty />}>
          <ThemeProvider theme={{ ...DefaultThemeStyled }}>
            <ThemeAppProvider>
              <AntApp>
                <Modal />
                <SponsorViewer />
                <NextNProgress color={DefaultThemeStyled.token.colorPrimary} />
                <Component {...pageProps} />
              </AntApp>
            </ThemeAppProvider>
          </ThemeProvider>
        </ConfigProvider>
      </ReduxProviders>
    </>
  )
}

export default appWithTranslation(App)
