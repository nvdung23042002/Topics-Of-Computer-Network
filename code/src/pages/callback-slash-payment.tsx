import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
const DynamicContainer = dynamic(
  () => {
    return import('@/containers/callback-slash-payment')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading(() => {
  return (
    <>
      <Head>
        <title>{'Slash Payment'}</title>
      </Head>
      <DynamicContainer />
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error-message']))
      // Will be passed to the page component as props
    }
  }
}
