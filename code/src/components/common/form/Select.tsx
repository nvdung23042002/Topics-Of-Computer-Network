import { ConfigProvider } from 'antd'
import { AlertContent, LabelStyled, OptionStyled, SelectStyled } from './styled'
import { BaseOptionType, DefaultOptionType, SelectProps } from 'antd/es/select'
import { ReactNode, forwardRef } from 'react'
import { FormTheme } from '@/theme'
type OptionType = {
  label: string
  value: string | number | undefined
  disabled?: boolean
}
export interface CusSelectProps extends SelectProps {
  label?: string | ReactNode
  options?: OptionType[]
  placeholder?: string
  value?: any
  defaultValue?: any
  isRequired?: boolean
  disabled?: boolean
  onChange?:
    | ((value: any, option?: DefaultOptionType | BaseOptionType | (DefaultOptionType | BaseOptionType)[]) => void)
    | undefined
  onBlur?: any
}

export default forwardRef<any, CusSelectProps>(({ options, label, isRequired, ...props }, ref) => {
  return (
    <ConfigProvider theme={FormTheme}>
      {label && (
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
      )}
      <SelectStyled
        ref={ref}
        {...props}
        suffixIcon={
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12.6654 6L7.9987 10.6667L3.33203 6'
              stroke='#65676B'
              strokeWidth='1.33333'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        }
      >
        {options?.map((item, index) => (
          <OptionStyled key={index} value={item.value} disabled={item.disabled}>
            {item.label ?? 'No file'}
          </OptionStyled>
        ))}
      </SelectStyled>
    </ConfigProvider>
  )
})
