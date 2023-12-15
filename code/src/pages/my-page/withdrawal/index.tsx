import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { MyPageProvider } from '@/context/my-page'
const DynamicContainer = dynamic(
  () => {
    return import('@/containers/my-page/withdrawal')
  },
  {
    loading: () => <SiteLoading />,
    ssr: false
  }
)

export default withLoading(() => {
  const { t } = useTranslation('withdrawal')
  return (
    <>
      <Head>
        <title>{t('WITHDRAW_TITLE')}</title>
      </Head>
      <MyPageProvider>
        <DynamicContainer />
      </MyPageProvider>
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error-message', 'withdrawal']))
      // Will be passed to the page component as props
    }
  }
}
