import { ReactNode, forwardRef } from 'react'
import { AlertContent, CheckBoxStyled, LabelStyled } from './styled'
import { CheckboxProps, ConfigProvider, ThemeConfig } from 'antd'
import { FormTheme } from '@/theme'
import { ThemeProvider } from 'styled-components'

interface CheckboxPropsType extends CheckboxProps {
  label?: string | ReactNode
  isRequired?: boolean
  theme?: ThemeConfig
}

export default forwardRef<any, CheckboxPropsType>(({ label, isRequired, theme, ...props }, ref) => {
  return (
    <ConfigProvider theme={theme ?? FormTheme}>
      <ThemeProvider theme={theme ?? FormTheme}>
        {label && (
          <LabelStyled>
            {label} {isRequired && label && <AlertContent>*</AlertContent>}
          </LabelStyled>
        )}
        <CheckBoxStyled ref={ref} {...props}>
          {props.children}
        </CheckBoxStyled>
      </ThemeProvider>
    </ConfigProvider>
  )
})
