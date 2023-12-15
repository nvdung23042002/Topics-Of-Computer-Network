import { Form } from 'antd'
import { useTranslation } from 'next-i18next'
import { InputStyled } from './styled'

const CustomInput = ({ ...props }: any & { attention: string }) => {
  const { t } = useTranslation('user-profile', { useSuspense: false })
  const { status } = Form.Item.useStatus()
  return (
    <>
      <InputStyled {...props} autoComplete='off' />
      {(status === 'success' || !status) && <div className='attention'>{t(props.attention)}</div>}
    </>
  )
}
export default CustomInput
