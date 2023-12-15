import { ReactNode, forwardRef } from 'react'
import { NumberStyled, LabelStyled, AlertContent } from './styled'
import { ConfigProvider, InputNumberProps } from 'antd'
import { FormTheme } from '@/theme'
import formatJapanesePostCode from '@/utils/postCodeFormat'

interface InputNumberPropsType extends InputNumberProps {
  label?: string | ReactNode
  isRequired?: boolean
}

export default forwardRef<any, InputNumberPropsType>(({ label, isRequired, max, value, onChange, ...props }, ref) => {
  return (
    <ConfigProvider theme={FormTheme}>
      {label && (
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
      )}
      <NumberStyled
        ref={ref}
        formatter={(value) => {
          return formatJapanesePostCode(value)
        }}
        parser={(value) => value?.replace(/\$\s?|([-]*)/g, '') ?? ''}
        placeholder='NNN-NNNN'
        value={value?.toString().replace(/\$\s?|([-]*)/g, '') ?? ''}
        onChange={(val) => {
          onChange && (val?.toString().length ?? 0) < 8 && onChange(formatJapanesePostCode(val?.toString()))
        }}
        {...props}
      />
    </ConfigProvider>
  )
})
