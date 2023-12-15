import { ReactNode, forwardRef } from 'react'
import { AlertContent, DatePickerStyled, LabelStyled } from './styled'
import { ConfigProvider, DatePickerProps } from 'antd'
import dayjs from '@/utils/dayjs'
import { FormTheme } from '@/theme'
import 'dayjs/locale/ja'
import 'dayjs/locale/en'
import en from 'antd/es/date-picker/locale/en_US'
import ja from 'antd/es/date-picker/locale/ja_JP'
import { useRouter } from 'next/router'

interface DatePickerPropsType {
  label?: string | ReactNode
  isRequired?: boolean
  dateFormat?: string
  datePickerFormat?: string
  isEndDate?: boolean
  onValueChange?: (date: string) => void
}

export default forwardRef<any, DatePickerPropsType & DatePickerProps>(
  (
    { label, isRequired, dateFormat, datePickerFormat, value, onValueChange, onChange, isEndDate, ...props }: any,
    ref
  ) => {
    const router = useRouter()
    return (
      <ConfigProvider theme={FormTheme}>
        {label && (
          <LabelStyled>
            {label} {isRequired && label && <AlertContent>*</AlertContent>}
          </LabelStyled>
        )}
        <DatePickerStyled
          format={datePickerFormat}
          ref={ref}
          value={value ? dayjs(value, dateFormat) ?? undefined : undefined}
          onChange={(e) => {
            const val = props.showTime ? e?.millisecond(0) : isEndDate ? e?.endOf('D') : e?.startOf('D')
            onValueChange && onValueChange(dateFormat ? val?.format(dateFormat) : val?.toISOString())
            onChange && onChange(dateFormat ? val?.format(dateFormat) : val?.toISOString())
          }}
          getPopupContainer={(ref) => {
            return ref
          }}
          suffixIcon={
            <div>
              <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z'
                  stroke='#183B56'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          }
          placeholder={datePickerFormat ?? ''}
          locale={router?.locale === 'en' ? en : ja}
          {...props}
        />
      </ConfigProvider>
    )
  }
)
