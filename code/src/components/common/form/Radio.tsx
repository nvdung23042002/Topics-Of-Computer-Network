import { AlertContent, LabelStyled, RadioGroupStyled, RadioStyled } from './styled'
import { ReactNode, forwardRef } from 'react'
import { ConfigProvider, RadioGroupProps, ThemeConfig } from 'antd'
import { FormTheme } from '@/theme'
import { ThemeProvider } from 'styled-components'

type OptionType = {
  label: string
  value: string | number | undefined
  disabled?: boolean
}

export interface RadioPropsTypes extends RadioGroupProps {
  label?: string | ReactNode
  list: OptionType[] | undefined
  isRequired?: boolean
  theme?: ThemeConfig
}

export default forwardRef<any, RadioPropsTypes>(({ list, theme, label, isRequired, ...props }, ref) => {
  return (
    <ConfigProvider theme={theme ?? FormTheme}>
      <ThemeProvider theme={theme ?? FormTheme}>
        {label && (
          <LabelStyled>
            {label} {isRequired && label && <AlertContent>*</AlertContent>}
          </LabelStyled>
        )}
        <RadioGroupStyled ref={ref} {...props}>
          {list?.map((item, index) => (
            <RadioStyled key={index} value={item.value} disabled={item.disabled}>
              {item.label}
            </RadioStyled>
          ))}
        </RadioGroupStyled>
      </ThemeProvider>
    </ConfigProvider>
  )
})
