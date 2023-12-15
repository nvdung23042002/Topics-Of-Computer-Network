import { ReactNode, forwardRef } from 'react'
import { AlertContent, LabelStyled, RangePickerStyled } from './styled'
import dayjs from '@/utils/dayjs'
import CalendarIcon from '../../icons/CalendarIcon'
import { RangePickerProps } from 'antd/es/date-picker'
import classNames from 'classnames'
import 'dayjs/locale/ja'
import 'dayjs/locale/en'
import en from 'antd/es/date-picker/locale/en_US'
import ja from 'antd/es/date-picker/locale/ja_JP'
import { useRouter } from 'next/router'

interface DatePickerPropsType {
  popupClassName?: string
  label?: string | ReactNode
  labelclassname?: string
  isRequired?: boolean
  dateFormat?: string
  value: [string, string]
  isError?: boolean
  onValueChange?: (fromDate: string, toDate: string) => void
}

export default forwardRef<any, RangePickerProps | DatePickerPropsType>(
  ({ label, isRequired, dateFormat, value, onValueChange, isError, className, popupClassName, ...props }: any, ref) => {
    const router = useRouter()
    return (
      <>
        <LabelStyled className={props.labelclassname}>
          {label} {isRequired && label && <AlertContent>(必須)</AlertContent>}
        </LabelStyled>
        <RangePickerStyled
          className={classNames(className, {
            'form-error': isError
          })}
          popupClassName={popupClassName}
          ref={ref}
          locale={router?.locale === 'en' ? en : ja}
          {...props}
          value={[
            value?.[0] ? dayjs(value[0], dateFormat) ?? undefined : undefined,
            value?.[1] ? dayjs(value[1], dateFormat) ?? undefined : undefined
          ]}
          suffixIcon={<CalendarIcon />}
          onChange={(e: dayjs.Dayjs[]) => {
            const startDate = e?.[0].startOf('D')
            const endDate = e?.[1].endOf('D')

            onValueChange &&
              onValueChange(
                dateFormat ? startDate?.format(dateFormat) : startDate?.toISOString(),
                dateFormat ? endDate?.format(dateFormat) : endDate?.toISOString()
              )
          }}
        />
      </>
    )
  }
)
