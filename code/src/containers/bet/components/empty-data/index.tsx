import { useTranslation } from 'next-i18next'
import { EmptyDataStyled } from './styled'

const EmptyData: React.FC = () => {
  const { t } = useTranslation('common')
  return <EmptyDataStyled>{t('EMPTY_DATA')}</EmptyDataStyled>
}

export default EmptyData
