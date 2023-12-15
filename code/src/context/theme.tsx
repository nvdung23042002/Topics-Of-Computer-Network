import React, { useContext, useEffect, useState } from 'react'

interface ThemeAppContextValue {
  setTheme: (theme: 'dark' | 'light') => void
  theme: 'dark' | 'light'
}
export const ThemeAppContext = React.createContext<ThemeAppContextValue | undefined>(undefined)

interface ThemeAppProviderProps {
  children: React.ReactNode | React.ReactElement
}

export const useThemeContext = () => {
  const context = useContext(ThemeAppContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeAppProvider')
  }
  return context
}
export const ThemeAppProvider: React.FC<ThemeAppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    if (window) {
      setTheme((JSON.parse(window.localStorage.getItem('theme') as string) as 'light' | 'dark') ?? 'light')
      document.documentElement.classList.remove(
        JSON.parse(window.localStorage.getItem('theme') as string) == 'dark' ? 'light' : 'dark'
      )
      document.documentElement.classList.add(JSON.parse(window.localStorage.getItem('theme') as string) ?? 'light')
    }
  }, [])
  const handlerChangeTheme = (theme: 'dark' | 'light' | any) => {
    setTheme(theme)
    document.documentElement.classList.remove(theme == 'dark' ? 'light' : 'dark')
    document.documentElement.classList.add(theme)
    window.localStorage.setItem('theme', JSON.stringify(theme))
  }

  return (
    <ThemeAppContext.Provider
      value={{
        theme,
        setTheme: handlerChangeTheme
      }}
    >
      {children}
    </ThemeAppContext.Provider>
  )
}
