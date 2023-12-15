import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

const DynamicGuideContainer = dynamic(
  () => {
    return import('@/containers/guide')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading(() => {
  const { t } = useTranslation('guide')
  return (
    <>
      <Head>
        <title>{t('GUIDE_TITLE')}</title>
      </Head>
      <DynamicGuideContainer />
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'guide', 'error-message']))
      // Will be passed to the page component as props
    }
  }
}
