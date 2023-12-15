import { ReactNode, forwardRef } from 'react'
import { LabelStyled, AlertContent, InputStyled } from './styled'
import { ConfigProvider, InputProps } from 'antd'
import classNames from 'classnames'
import { isNil } from 'lodash'
import { FormTheme } from '@/theme'

interface InputNumberPropsType extends InputProps {
  label?: string | ReactNode
  labelclassname?: string
  isRequired?: boolean
  isError?: boolean
  align?: string
}

export default forwardRef<any, InputNumberPropsType>(
  ({ label, isRequired, className, isError, value, align, onChange, ...props }, ref) => {
    return (
      <>
        <ConfigProvider theme={FormTheme}>
          {label && (
            <LabelStyled>
              {label} {isRequired && label && <AlertContent>*</AlertContent>}
            </LabelStyled>
          )}
          <InputStyled
            className={classNames(className, {
              'form-error': isError,
              [`align-${align}`]: !isNil(align)
            })}
            style={{ ...props.style, flexGrow: 1 }}
            ref={ref}
            // formatter={(value) => {
            //   return `${value ? (value as string) : ''}`
            // }}
            // parser={(value) => value?.replace(/\$\s?/g, '') ?? ''}
            value={value?.toString().replace(/\$\s?/g, '') ?? ''}
            maxLength={15}
            onChange={(val) => {
              onChange && onChange(val)
            }}
            onKeyDown={(e) => {
              if (
                ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Enter'].includes(e.key) ||
                (['v', 'c', 'x', 'z', 'a'].includes(e.key) && (e.ctrlKey || e.metaKey))
              ) {
                return e
              }

              e.preventDefault()
            }}
            // inputMode='decimal'
            {...props}
          />
        </ConfigProvider>
      </>
    )
  }
)
