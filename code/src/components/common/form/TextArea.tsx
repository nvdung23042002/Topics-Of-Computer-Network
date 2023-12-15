import { ReactNode, forwardRef } from 'react'
import { AlertContent, LabelStyled, TextAreaStyled } from './styled'
import { ConfigProvider, InputProps } from 'antd'
import { FormTheme } from '@/theme'
import Config from '@/config'

interface InputPropsType extends InputProps {
  label?: string | ReactNode
  isRequired?: boolean
  minRows?: number
}

export default forwardRef<any, InputPropsType>(({ label, isRequired, minRows = 4, maxLength, ...props }: any, ref) => {
  return (
    <ConfigProvider theme={FormTheme}>
      {label && (
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
      )}
      <TextAreaStyled
        ref={ref}
        {...props}
        autoSize={{ minRows }}
        maxLength={maxLength ?? Config.MAX_TEXT_LENGTH}
        showCount={!props.disabled}
      />
    </ConfigProvider>
  )
})
