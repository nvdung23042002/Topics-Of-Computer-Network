import SiteLoading from '@/components/site-loading'
import { LANG_KEY } from '@/constants/common'
import withLoading from '@/hoc/withLoading'
import NSBService from '@/services/NSB.service'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

const DynamicFighterListContainer = dynamic(
  () => {
    return import('@/containers/fighters/fighter-list')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading(() => {
  const { t } = useTranslation('common', { useSuspense: false })
  return (
    <>
      <Head>
        <title>{t('FIGHTERS')}</title>
      </Head>
      <DynamicFighterListContainer />
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error-message', 'fighter-list']))
      // Will be passed to the page component as props
    }
  }
}
