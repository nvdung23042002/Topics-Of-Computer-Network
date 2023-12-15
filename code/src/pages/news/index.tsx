import SiteLoading from '@/components/site-loading'
import withLoading from '@/hoc/withLoading'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import NSBService from '@/services/NSB.service'
import { useEffect } from 'react'
import showMessage from '@/utils/showMessage'

type Props = {
  normalNews: any
  hotNews: any
  errorMsg?: string
}

const DynamicNewsListContainer = dynamic(
  () => {
    return import('@/containers/news/news-list')
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
      <DynamicNewsListContainer {...props} />
    </>
  )
})

export async function getServerSideProps({ locale }: any) {
  try {
    const response = await NSBService.GetNewsList({
      page: 1,
      limit: 6,
      langKey: String(locale).toUpperCase() || 'JA'
    })

    const { hotNews, pageNews } = response.data || {}

    return {
      props: {
        normalNews: pageNews,
        hotNews,
        ...(await serverSideTranslations(locale, ['common', 'error-message', 'news']))
        // Will be passed to the page component as props
      }
    }
  } catch ({ message }) {
    return {
      props: {
        error: message,
        ...(await serverSideTranslations(locale, ['common', 'error-message', 'news']))
      }
    }
  }
}
