import { AlertContent, LabelStyled, SelectCountriesStyled } from './styled'

import { BaseOptionType, DefaultOptionType, SelectProps } from 'antd/es/select'

import { ReactNode, forwardRef, useMemo, memo } from 'react'

import classNames from 'classnames'

import countries from '@/constants/countries'
import { ConfigProvider } from 'antd'
import { FormTheme } from '@/theme'

export interface CusSelectProps extends SelectProps {
  label?: string | ReactNode
  labelclassname?: string
  placeholder?: string
  value?: any
  defaultValue?: any
  isRequired?: boolean
  disabled?: boolean
  showSearch?: boolean
  onChange?:
    | ((value: any, option?: DefaultOptionType | BaseOptionType | (DefaultOptionType | BaseOptionType)[]) => void)
    | undefined
  onBlur?: any
  className?: string
  isError?: boolean
}

export default memo(
  forwardRef<any, CusSelectProps>(({ label, isRequired, className, isError, ...props }, fwdref) => {
    const formatOption = useMemo(() => {
      return countries.map((item) => {
        return {
          key: `${item.countryCode}(${item.phoneCode})`,
          value: `${item.countryCode}(${item.phoneCode})`,
          label: `(${item.phoneCode}) ${item.countryName}`
        }
      })
    }, [])

    return (
      <ConfigProvider theme={FormTheme}>
        {label && (
          <LabelStyled className={props.labelclassname}>
            {label} {isRequired && label && <AlertContent>*</AlertContent>}
          </LabelStyled>
        )}

        <SelectCountriesStyled
          className={classNames(className, {
            'form-error': isError
          })}
          ref={fwdref}
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
          popupMatchSelectWidth={300}
          {...props}
          options={formatOption}
          filterOption={(input, option) =>
            (option?.label.split('*--*')[0] ?? '').toLowerCase().includes(input.toLowerCase().trim())
          }
        />
      </ConfigProvider>
    )
  })
)
