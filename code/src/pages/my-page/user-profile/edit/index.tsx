import SiteLoading from '@/components/site-loading'
import { MyPageProvider } from '@/context/my-page'
import withLoading from '@/hoc/withLoading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
const DynamicContainer = dynamic(
  () => {
    return import('@/containers/my-page/user-profile/edit-user-profile')
  },
  {
    loading: () => <SiteLoading />,
    ssr: false
  }
)

export default withLoading(() => {
  const { t } = useTranslation('user-profile-edit', { useSuspense: false })

  return (
    <>
      <Head>
        <title>{t('USER_EDIT_PROFILE_TITLE')}</title>
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
      ...(await serverSideTranslations(locale, ['common', 'user-profile-edit', 'error-message', 'validate']))
      // Will be passed to the page component as props
    }
  }
}
