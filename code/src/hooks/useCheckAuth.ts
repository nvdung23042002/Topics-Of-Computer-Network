import { useCallback } from 'react'
import { useAppSelector } from '@/hooks/store'
import { selectAuth } from '@/redux/auth/slice'

interface IUseCheckAuth {
  checkAuth: () => Promise<true | undefined>
  isAuthenticated: boolean
}

const useCheckAuth = (): IUseCheckAuth => {
  const { isAuthenticated } = useAppSelector(selectAuth)

  const checkAuth = useCallback(async () => {
    if (isAuthenticated) return true
    else {
      const loginNode = document.getElementById('action-login-button')

      if (loginNode) {
        loginNode.click()
      }
    }

    return
  }, [isAuthenticated])

  return {
    checkAuth,
    isAuthenticated: !!isAuthenticated
  }
}

export default useCheckAuth
