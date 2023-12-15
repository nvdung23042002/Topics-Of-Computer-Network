import SiteLoading from '@/components/site-loading'
import { AppRoutes } from '@/constants/routes'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace(AppRoutes.myPage)
  }, [router])
  return <SiteLoading />
}

export default MyPage
