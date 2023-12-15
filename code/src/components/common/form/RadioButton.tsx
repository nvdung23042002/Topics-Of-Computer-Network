import { AlertContent, LabelStyled, RadioButtonStyled, RadioGroupStyled } from './styled'
import { ReactNode, forwardRef } from 'react'
import { ConfigProvider, RadioGroupProps } from 'antd'
import { FormTheme } from '@/theme'
type OptionType = {
  label: string
  value: string | number | undefined
  disabled?: boolean
}
interface RadioPropsTypes extends RadioGroupProps {
  label?: string | ReactNode
  list: OptionType[] | undefined
  isRequired?: boolean
}

export default forwardRef<any, RadioPropsTypes>(({ list, label, isRequired, ...props }, ref) => {
  return (
    <ConfigProvider theme={FormTheme}>
      {label && (
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
      )}
      <RadioGroupStyled ref={ref} {...props}>
        {list?.map((item, index) => (
          <RadioButtonStyled key={index} value={item.value} disabled={item.disabled}>
            {item.label}
          </RadioButtonStyled>
        ))}
      </RadioGroupStyled>
    </ConfigProvider>
  )
})
