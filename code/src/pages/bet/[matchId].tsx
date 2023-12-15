import SiteLoading from '@/components/site-loading'
// import { LANG_KEY } from '@/constants/common'
import withLoading from '@/hoc/withLoading'
// import NSBService from '@/services/NSB.service'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

// type Props = {
//   matchDetail: any
// }

const DynamicBetDetailContainer = dynamic(
  () => {
    return import('@/containers/bet/bet-detail')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading((props) => {
  return <DynamicBetDetailContainer {...props} />
})

export async function getServerSideProps({ locale, params }: any) {
  try {
    // const { matchId } = params
    // const result = await NSBService.getMatchDetail({
    //   matchId,
    //   langKey: LANG_KEY.JA
    // })

    return {
      props: {
        // matchDetail: result?.data,
        ...(await serverSideTranslations(locale, [
          'common',
          'bet-list',
          'cart',
          'success-message',
          'error-message',
          'sponsor'
        ]))
        // Will be passed to the page component as props
      }
    }
  } catch (error) {
    throw error
  }
}
