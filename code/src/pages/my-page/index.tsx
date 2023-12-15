import SiteLoading from '@/components/site-loading'
import { MyPageProvider } from '@/context/my-page'
import withLoading from '@/hoc/withLoading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
const DynamicMyPageListContainer = dynamic(
  () => {
    return import('@/containers/my-page')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading(() => {
  return (
    <MyPageProvider>
      <DynamicMyPageListContainer />
    </MyPageProvider>
  )
})

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'bet-list', 'error-message']))
      // Will be passed to the page component as props
    }
  }
}
