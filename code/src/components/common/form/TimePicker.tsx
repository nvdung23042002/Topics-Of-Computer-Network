import { ReactNode, forwardRef } from 'react'
import { AlertContent, TimePickerStyled, LabelStyled } from './styled'
import { ConfigProvider, TimePickerProps } from 'antd'
import dayjs from '@/utils/dayjs'
import { FormTheme } from '@/theme'
import 'dayjs/locale/ja'
import 'dayjs/locale/en'
import en from 'antd/es/time-picker/locale/en_US'
import ja from 'antd/es/time-picker/locale/ja_JP'
import { useRouter } from 'next/router'

interface TimePickerPropsType {
  label?: string | ReactNode
  isRequired?: boolean
  dateFormat?: string
  onValueChange?: (date: string) => void
}

export default forwardRef<any, TimePickerPropsType & TimePickerProps>(
  ({ label, isRequired, dateFormat, value, onValueChange, ...props }: any, ref) => {
    const router = useRouter()
    return (
      <ConfigProvider theme={FormTheme}>
        <LabelStyled>
          {label} {isRequired && label && <AlertContent>*</AlertContent>}
        </LabelStyled>
        <TimePickerStyled
          ref={ref}
          value={value ? dayjs(value) ?? undefined : undefined}
          locale={router?.locale === 'en' ? en : ja}
          onChange={(e) => {
            onValueChange &&
              onValueChange(dateFormat ? e?.millisecond(0).format(dateFormat) : e?.millisecond(0).toISOString())
          }}
          {...props}
        />
      </ConfigProvider>
    )
  }
)
