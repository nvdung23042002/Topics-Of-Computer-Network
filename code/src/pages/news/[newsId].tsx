import SiteLoading from '@/components/site-loading'
import { LANG_KEY } from '@/constants/common'
import withLoading from '@/hoc/withLoading'
import NSBService from '@/services/NSB.service'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import showMessage from '@/utils/showMessage'

type Props = {
  newsDetail: any
  listForDetail: any[]
  errorMsg?: string
}

const DynamicNewsDetailContainer = dynamic(
  () => {
    return import('@/containers/news/news-detail')
  },
  {
    loading: () => <SiteLoading />,
    ssr: true
  }
)

export default withLoading((props: Props) => {
  const { t } = useTranslation('common', { useSuspense: false })

  useEffect(() => {
    if (props.errorMsg) {
      showMessage({ error: props.errorMsg })
    }
  }, [])

  return (
    <>
      <Head>
        <title>{t('NEWS')}</title>
      </Head>
      <DynamicNewsDetailContainer {...props} />
    </>
  )
})

export async function getServerSideProps({ locale, query }: any) {
  try {
    const { newsId } = query

    const response = await NSBService.GetNewsDetail({
      id: newsId
    })

    const listForDetailResonse = await NSBService.getNewListForDetail({
      page: 1,
      limit: 6,
      langKey: String(locale).toUpperCase() || 'JA'
    })

    return {
      props: {
        newsDetail: response?.data,
        listForDetail: listForDetailResonse?.data,
        ...(await serverSideTranslations(locale, ['common', 'error-message', 'news']))
        // Will be passed to the page component as props
      }
    }
  } catch ({ message }) {
    return {
      props: {
        error: message,
        ...(await serverSideTranslations(locale, ['common', 'news']))
      }
    }
  }
}
