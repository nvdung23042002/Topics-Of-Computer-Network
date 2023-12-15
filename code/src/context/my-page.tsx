import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'

interface MyPageContextValue {
  showDrawer: () => void
  open: boolean
  onClose: () => void
}
export const MyPageContext = React.createContext<MyPageContextValue | undefined>(undefined)

interface MyPageProviderProps {
  children: React.ReactNode | React.ReactElement
}

export const useMyPageContext = () => {
  const context = useContext(MyPageContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeAppProvider')
  }
  return context
}
export const MyPageProvider: React.FC<MyPageProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(true)
  const router = useRouter()
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    setOpen(false)
  }, [router.asPath])
  return (
    <MyPageContext.Provider
      value={{
        showDrawer: showDrawer,
        open: open,
        onClose: onClose
      }}
    >
      {children}
    </MyPageContext.Provider>
  )
}
