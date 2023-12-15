import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import NSBService from '@/services/NSB.service'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
const DynamicContainer = dynamic(
  () => {
    return import('@/containers/my-page/affiliate-history/enter-code')
  },
  {
    loading: () => <SiteLoading />,
    ssr: false
  }
)
export default withLoading(() => {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('ENTER_CODE')}</title>
      </Head>
      <DynamicContainer />
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'enter-code', 'error-message']))
        // Will be passed to the page component as props
      }
    }
  } catch (error) {
    throw error
  }
}
