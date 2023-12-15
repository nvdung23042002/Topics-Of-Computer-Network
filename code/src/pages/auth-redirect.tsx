import Modal from '@/components/modal'
import SiteLoading from '@/components/site-loading'
import Web3Auth from '@/components/web3-auth'
import { STORAGE_KEY } from '@/constants/common'
import withLoading from '@/hoc/withLoading'
import storage from '@/utils/storage'
import { debounce } from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default withLoading(() => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{'Redirecting ...'}</title>
      </Head>
      <SiteLoading />
      <Web3Auth
        onCompleted={() => {
          const route = storage('session').get(STORAGE_KEY.CURRENT_PATH)

          if (route) {
            storage('session').remove(STORAGE_KEY.CURRENT_PATH)
            router.replace({ pathname: route.pathname, query: route.query }, route.asPath, { locale: route.locale })
          } else router.replace('/')
        }}
      />
    </>
  )
})

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error-message']))
      // Will be passed to the page component as props
    }
  }
}
