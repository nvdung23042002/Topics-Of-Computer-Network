import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import NSBService from '@/services/NSB.service'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import showMessage from '@/utils/showMessage'
import { useEffect } from 'react'

const DynamicBetListContainer = dynamic(
  () => {
    return import('@/containers/bet')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading(() => {
  const { t } = useTranslation('common', { useSuspense: false })

  return (
    <>
      <Head>
        <title>{t('BETS')}</title>
      </Head>
      <DynamicBetListContainer />
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'bet-list',
        'cart',
        'success-message',
        'error-message',
        'sponsor'
      ]))
      // Will be passed to the page component as props
    }
  }
}
