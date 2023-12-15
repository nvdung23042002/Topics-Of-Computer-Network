import { useEffect, useState } from 'react'

export default () => {
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | undefined>('online')

  useEffect(() => {
    const callback = (e: any) => {
      window.location.reload()
    }

    // window.addEventListener('online', callback)
    window.addEventListener('offline', callback)

    return () => {
      //   window.removeEventListener('online', callback)
      window.removeEventListener('offline', callback)
    }
  }, [])
  return { networkStatus }
}
