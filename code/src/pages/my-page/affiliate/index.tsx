import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import NSBService from '@/services/NSB.service'
import { PriceRate } from '@/services/dto'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { MyPageProvider } from '@/context/my-page'
const DynamicContainer = dynamic(
  () => {
    return import('@/containers/my-page/affiliate-history')
  },
  {
    loading: () => <SiteLoading />,
    ssr: false
  }
)
type PropsPage = {
  priceRates: PriceRate[]
}
export default withLoading((props: PropsPage) => {
  const { t } = useTranslation('common')
  return (
    <>
      <Head>
        <title>{t('AFFILIATE_INFORMATION', { ns: 'common' })}</title>
      </Head>
      <MyPageProvider>
        <DynamicContainer {...props} />
      </MyPageProvider>
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  try {
    const data = await NSBService.getPriceRate()
    return {
      props: {
        priceRates: data,
        ...(await serverSideTranslations(locale, ['common', 'affiliate-history', 'error-message']))
        // Will be passed to the page component as props
      }
    }
  } catch (error) {
    throw error
  }
}
