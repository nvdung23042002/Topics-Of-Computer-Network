import dynamic from 'next/dynamic'
import SiteLoading from '@/components/site-loading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import withLoading from '@/hoc/withLoading'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
const DynamicHomeContainer = dynamic(
  () => {
    return import('@/containers/sponsor')
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
        <title>{t('SPONSOR_HOME')}</title>
      </Head>
      <DynamicHomeContainer />
    </>
  )
})

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error-message', 'sponsor', 'validate']))
      // Will be passed to the page component as props
    }
  }
}
