import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
const DynamicContainer = dynamic(
  () => {
    return import('@/containers/reset-pass')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading(() => {
  const { t } = useTranslation('sponsor')
  return (
    <>
      <Head>
        <title>{t('RESET_PASSWORD')}</title>
      </Head>
      <DynamicContainer />
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'sponsor', 'error-message', 'validate']))
      // Will be passed to the page component as props
    }
  }
}
