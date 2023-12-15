import { Tooltip } from 'antd'
import DefaultImg from '@/assets/images/default-img.png'
import Image, { StaticImageData } from 'next/image'

import { STATUS_PRODUCT } from '@/constants'
import ToggleWishList from './ToggleWishList'
import {
  ProductCollectionNameStyled,
  ProductImageStyled,
  ProductNameStyled,
  ProductPriceStyled,
  ProductStyled
} from './styled'
import { useRouter } from 'next/navigation'
import ETHIcon from '../icons/ETHIcon'
import LabelTag from '../label-tag'
import { BNToFormat } from '@/utils/bigNumber'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/hooks/store'
import { AppRoutes } from '@/constants/routes'
// import { AppRoutes } from '@/constants/routes'
// import { useRef } from 'react'

type ProductProps = {
  src: string | StaticImageData
  status: keyof typeof STATUS_PRODUCT | string
  name: string
  collectionName: string
  priceUSDT?: number
  priceETH: number
  wishCount: number
  price: number
  locale?: string
  id?: string
}

const Product: React.FC<ProductProps> = ({
  status,
  collectionName,
  name,
  priceETH,
  src,
  wishCount,
  price,
  locale,
  id
}: ProductProps) => {
  const navigate = useRouter()
  const { t } = useTranslation('common')
  const zone = useAppSelector((state) => state.app?.zone)
  return (
    <ProductStyled hoverable onClick={() => navigate.push(`${AppRoutes.marketPlaceDetail(id ?? '')}`)}>
      <ProductImageStyled>
        <Image
          src={src}
          onError={(e) => (e.currentTarget.src = DefaultImg.src)}
          alt='nft-img'
          fill
          sizes='(min-width: 325px) 100%'
        />
        <ToggleWishList count={wishCount} />
      </ProductImageStyled>
      <Tooltip title={collectionName ? collectionName : 'NA'} placement='bottom'>
        <ProductCollectionNameStyled>{collectionName ? collectionName : 'NA'}</ProductCollectionNameStyled>
      </Tooltip>

      <ProductNameStyled justify={'space-between'}>
        <Tooltip title={name} placement='bottom'>
          <span className='product-name'>{name}</span>
        </Tooltip>
        <span className='eth-icon'>
          <ETHIcon />
        </span>
      </ProductNameStyled>
      <div className='d-flex al-items-center j-content-between info-product'>
        <LabelTag status={status} className='status' />
        <ProductPriceStyled>
          <div className='coin-price'>{BNToFormat(priceETH, true)} ETH</div>
          <div className='price'>
            ≈{BNToFormat(price)} {zone == 'global' ? t('YEN_GLOBAL') : t('YEN')}
          </div>
        </ProductPriceStyled>
      </div>
    </ProductStyled>
  )
}

export default Product
