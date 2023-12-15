import { STORAGE_KEY } from '@/constants/common'
import { AppRoutes } from '@/constants/routes'
import { useAppSelector } from '@/hooks/store'
import storage from '@/utils/storage'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type CheckIsNewAccountProps = {
  children: React.ReactNode | React.ReactElement
}

const CheckIsNewAccount = ({ children }: CheckIsNewAccountProps) => {
  const isNewAccount = storage().get(STORAGE_KEY.W3A_TOKEN)?.isNewAccount
  const skipEnterCode = storage().get(STORAGE_KEY.W3A_TOKEN)?.skipEnterCode
  const isAuthenticated = useAppSelector((state) => state?.auth?.isAuthenticated)
  const { push } = useRouter()
  useEffect(() => {
    if (isAuthenticated === false) {
      push({
        pathname: '/'
      })
    }
    if (isNewAccount && isAuthenticated === true && !skipEnterCode) {
      push({
        pathname: AppRoutes.enterCodeAffiliate
      })
    } else {
      push({
        pathname: AppRoutes.affiliateHistory
      })
    }
  }, [isNewAccount, isAuthenticated, skipEnterCode])
  return <>{children}</>
}

export default CheckIsNewAccount
