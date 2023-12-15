import SiteLoading from '@/components/site-loading'
import { AppRoutes } from '@/constants/routes'
import useModal from '@/hooks/useModal'
import NSBService from '@/services/NSB.service'
import getError from '@/utils/getError'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

const CallbackSlashPayment = () => {
  const [loading, setLoading] = useState(true)
  const { query, push } = useRouter()
  const { openModal, closeModal } = useModal()
  const { t } = useTranslation('common')
  useEffect(() => {
    if (query?.payment_token) {
      ;(async () => {
        setLoading(true)
        try {
          const data = await NSBService.CallbackPaymentSlash(query?.payment_token)
          push(data.url)
        } catch (error) {
          openModal({
            type: 'notification',
            theme: 'error',
            title: 'エラー',
            subContent: t(getError(error), { ns: 'error-message' }),
            onOk: () => {
              closeModal()
              push(AppRoutes.home)
            }
          })
        } finally {
          setLoading(false)
        }
      })()
    } else {
      push(AppRoutes.home)
    }
  }, [query?.payment_token])

  return <div>{loading ? <SiteLoading /> : ''}</div>
}

export default CallbackSlashPayment
