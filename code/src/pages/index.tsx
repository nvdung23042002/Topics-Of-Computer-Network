import dynamic from 'next/dynamic'
import SiteLoading from '@/components/site-loading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import withLoading from '@/hoc/withLoading'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import NSBService from '@/services/NSB.service'

type Props = {
  listNews?: any[]
  listMatches?: any[]
  listBanner?: any[]
}

const DynamicHomeContainer = dynamic(
  () => {
    return import('@/containers/home')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading((props: Props) => {
  const { t } = useTranslation('common', { useSuspense: false })
  return (
    <>
      <Head>
        <title>{t('HOME')}</title>
      </Head>
      <DynamicHomeContainer {...props} />
    </>
  )
})

export async function getServerSideProps({ locale, res }: any) {
  res.setHeader('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=59')

  return await Promise.allSettled([
    NSBService.getNewListForDetail({
      page: 1,
      limit: 6,
      langKey: String(locale).toUpperCase() || 'JA'
    }),
    NSBService.getMatchAtHomePage(),
    NSBService.getBanner(null)
  ]).then(async (res) => ({
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'faq', 'validate', 'error-message'])),
      listNews: res[0].status === 'fulfilled' ? res[0].value.data : [],
      listMatches: res[1].status === 'fulfilled' ? res[1].value : [],
      listBanner: res[2].status === 'fulfilled' ? res[2].value.data?.result : []
      // Will be passed to the page component as props
    }
  }))
}
