import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { setZone } from './app/slice'

interface ReduxProvidersProps {
  children: React.ReactNode | React.ReactElement
}

export function ReduxProviders({ children }: ReduxProvidersProps) {
  useEffect(() => {
    /**Check zone */
    const isJPZone = ['dev.esports-bet.io', 'stg.esports-bet.io', 'esports-bet.io', 'localhost:8080'].includes(
      window?.location.host
    )
    store.dispatch(setZone(isJPZone ? 'jp' : 'global'))
  }, [])
  return <Provider store={store}>{children}</Provider>
}
