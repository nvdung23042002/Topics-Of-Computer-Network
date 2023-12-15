import { Form } from 'antd'
import { useTranslation } from 'next-i18next'
import { InputPhoneStyled } from './styled'
import SelectCountries from '@/components/common/form/SelectCountries'
import { REGEX_PHONENUMBER } from '@/constants/regex'
import { useRef } from 'react'
const CustomPhone = ({ ...props }: any & { attention: string; prefixName: string; isShowAttention: boolean }) => {
  const { t } = useTranslation('user-profile', { useSuspense: false })
  const container = useRef()
  return (
    <>
      <div className='d-flex' ref={container as any}>
        <Form.Item name='phonePrefix' className='me-1 select-country'>
          <SelectCountries
            label={t('PHONE_NUMBER')}
            showSearch
            disabled={props?.disabled}
            getPopupContainer={() => null as any}
            dropdownMatchSelectWidth={300}
          />
        </Form.Item>
        <Form.Item
          name='phoneSuffix'
          rules={[
            {
              required: true,
              message:
                t('FIELD_REQUIRED', {
                  fieldName: t('PHONE'),
                  dynamicValue: true
                }) ?? ''
            },
            { pattern: REGEX_PHONENUMBER, message: t('INCORRECT_PHONE') ?? '' }
          ]}
          className='flex-grow-1'
        >
          <InputPhoneStyled autoComplete='off' disabled={props?.disabled} label={<></>} />
        </Form.Item>
      </div>
      {props.isShowAttention ? <div className='attention'>{t(props.attention)}</div> : ''}
    </>
  )
}
export default CustomPhone
