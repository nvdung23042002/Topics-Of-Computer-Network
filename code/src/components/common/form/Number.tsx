import { ReactNode, forwardRef } from 'react'
import { NumberStyled, LabelStyled, AlertContent } from './styled'
import { ConfigProvider, InputNumberProps } from 'antd'
import { FormTheme } from '@/theme'
import Config from '@/config'

interface InputNumberPropsType extends InputNumberProps {
  label?: string | ReactNode
  isRequired?: boolean
}

export default forwardRef<any, InputNumberPropsType>(({ label, isRequired, max, ...props }, ref) => {
  return (
    <ConfigProvider theme={FormTheme}>
      {label && (
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
      )}
      <NumberStyled ref={ref} {...props} max={max ?? Config.MAX_NUMBER} />
    </ConfigProvider>
  )
})
