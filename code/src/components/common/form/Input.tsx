import { ReactNode, forwardRef } from 'react'
import { AlertContent, InputStyled, LabelStyled, PasswordStyled } from './styled'
import { ConfigProvider, InputProps } from 'antd'
import { FormTheme } from '@/theme'
import Config from '@/config'

export interface InputPropsType extends InputProps {
  inputType?: 'text' | 'password'
  label?: string | ReactNode
  isRequired?: boolean
}

export default forwardRef<any, InputPropsType>(({ inputType, label, isRequired, maxLength, ...props }, ref) => {
  return inputType === 'password' ? (
    <ConfigProvider theme={FormTheme}>
      {label && (
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
      )}
      <PasswordStyled ref={ref} {...props} maxLength={maxLength ?? Config.MAX_TEXT_LENGTH} />
    </ConfigProvider>
  ) : (
    <ConfigProvider theme={FormTheme}>
      {label && (
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
      )}
      <InputStyled ref={ref} {...props} maxLength={maxLength ?? Config.MAX_TEXT_LENGTH} />
    </ConfigProvider>
  )
})
