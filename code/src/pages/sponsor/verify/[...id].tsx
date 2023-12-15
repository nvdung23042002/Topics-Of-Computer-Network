import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import withLoading from '@/hoc/withLoading'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { REGEX_EMAIL } from '@/constants/regex'
import NSBService from '@/services/Sponsor.service'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import showMessage from '@/utils/showMessage'
import { AppRoutes } from '@/constants/routes'

type Props = {
  newsListLanding?: any[]
  result?: any
  error?: any
}

export default withLoading((props: Props) => {
  const { t } = useTranslation('common', { useSuspense: false })
  const navigate = useRouter()
  useEffect(() => {
    if (props.error) {
      navigate.replace('/404')
    } else {
      showMessage({ success: t('VERIFY_SUCCESSFULLY', { ns: 'sponsor' }) }, () => {
        navigate.replace(AppRoutes.sponsorLogin)
      })
    }
  }, [])
  return (
    <>
      <Head>
        <title>{t('VERIFYING')}</title>
      </Head>
    </>
  )
})

export async function getServerSideProps({ locale, params }: any) {
  const [email, tokenEmailSponsor] = params.id

  if (!REGEX_EMAIL.test(email) || !tokenEmailSponsor) {
    throw 'Bad request'
  } else {
    try {
      const result = await NSBService.verifyAccount({ email, tokenEmailSponsor })
      return {
        props: {
          result,
          ...(await serverSideTranslations(locale, ['common', 'sponsor']))
          // Will be passed to the page component as props
        }
      }
    } catch (error) {
      return {
        props: {
          error: error.response.data,
          ...(await serverSideTranslations(locale, ['common', 'sponsor']))
          // Will be passed to the page component as props
        }
      }
    }
  }
}
