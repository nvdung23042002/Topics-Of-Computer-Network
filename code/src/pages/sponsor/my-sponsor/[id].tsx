import dynamic from 'next/dynamic'
import SiteLoading from '@/components/site-loading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import withLoading from '@/hoc/withLoading'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
const DynamicMySponsorContainer = dynamic(
  () => {
    return import('@/containers/sponsor/my-sponsor')
  },
  {
    loading: () => <SiteLoading />,
    ssr: false
  }
)

export default withLoading(() => {
  const { t } = useTranslation('sponsor', { useSuspense: false })
  return (
    <>
      <Head>
        <title>{t('MY_SPONSOR')}</title>
      </Head>
      <DynamicMySponsorContainer />
    </>
  )
})

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      '/sponsor/my-sponsor/template',
      '/sponsor/my-sponsor/profile',
      '/sponsor/my-sponsor/transaction-history',
      '/en/sponsor/my-sponsor/template',
      '/en/sponsor/my-sponsor/profile',
      '/en/sponsor/my-sponsor/transaction-history'
      // Object variant:
    ],
    fallback: false
  }
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error-message', 'sponsor', 'validate']))
      // Will be passed to the page component as props
    }
  }
}
