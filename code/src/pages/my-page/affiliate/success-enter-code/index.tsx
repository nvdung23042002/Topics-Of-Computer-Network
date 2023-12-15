import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import NSBService from '@/services/NSB.service'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
const DynamicContainer = dynamic(
  () => {
    return import('@/containers/my-page/affiliate-history/success-enter-code')
  },
  {
    loading: () => <SiteLoading />,
    ssr: false
  }
)
export default withLoading(() => {
  return (
    <>
      <Head>
        <title>Enter Code Success</title>
      </Head>
      <DynamicContainer />
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  try {
    const data = await NSBService.getPriceRate()
    return {
      props: {
        priceRates: data,
        ...(await serverSideTranslations(locale, ['common', 'enter-code', 'error-message']))
        // Will be passed to the page component as props
      }
    }
  } catch (error) {
    throw error
  }
}
