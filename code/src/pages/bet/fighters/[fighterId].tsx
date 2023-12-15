import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import NSBService from '@/services/NSB.service'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

type Props = {
  fighterDetail: any
}

const DynamicFighterDetailContainer = dynamic(
  () => {
    return import('@/containers/fighters/fighter-detail')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading((props: Props) => {
  return <DynamicFighterDetailContainer {...props} />
})

export async function getServerSideProps({ locale, query }: any) {
  try {
    const { fighterId } = query

    const response = await NSBService.GetFighterDetail({
      fighterId
    })

    return {
      props: {
        fighterDetail: response?.data,
        ...(await serverSideTranslations(locale, ['common', 'error-message', 'fighter-detail', 'fighter-list']))
        // Will be passed to the page component as props
      }
    }
  } catch ({ message }) {
    return {
      props: {
        error: message,
        ...(await serverSideTranslations(locale, ['common', 'error-message', 'fighter-detail', 'fighter-list']))
      }
    }
  }
}
