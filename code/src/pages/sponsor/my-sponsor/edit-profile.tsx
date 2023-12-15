import dynamic from 'next/dynamic'
import SiteLoading from '@/components/site-loading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import withLoading from '@/hoc/withLoading'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
const DynamicHomeContainer = dynamic(
  () => {
    return import('@/containers/sponsor/my-sponsor/edit-profile')
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
        <title>{t('SPONSOR_EDIT_PROFILE_TITLE')}</title>
      </Head>
      <DynamicHomeContainer />
    </>
  )
})

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error-message', 'sponsor']))
      // Will be passed to the page component as props
    }
  }
}
