import { STATUS_PRODUCT } from '@/constants'
import { ProductStatusStyled } from './styled'
import { useTranslation } from 'next-i18next'

type ProductProps = {
  status: keyof typeof STATUS_PRODUCT | string
  className?: string
}

const LabelTag: React.FC<ProductProps> = ({ status, className }: ProductProps) => {
  const { t } = useTranslation(['common'])
  return {
    [STATUS_PRODUCT.ON_SALE_SOON]: (
      <ProductStatusStyled style={{ background: '#0052FF' }} className={className}>
        {t('ON_SALE_SOON')}
      </ProductStatusStyled>
    ),
    [STATUS_PRODUCT.NOW_ON_SALE]: (
      <ProductStatusStyled style={{ background: '#1CCE66' }} className={className}>
        {t('NOW_ON_SALE')}
      </ProductStatusStyled>
    ),
    [STATUS_PRODUCT.SOLD]: (
      <ProductStatusStyled style={{ background: '#C80909' }} className={className}>
        {t('SOLD')}
      </ProductStatusStyled>
    )
  }[status]
}

export default LabelTag
