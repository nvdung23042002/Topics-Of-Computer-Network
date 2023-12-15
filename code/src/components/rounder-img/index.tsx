import React from 'react'
import Image from '../common/image'
import { FighterImgStyled } from './styled'

type Props = {
  imgUrl: any
  width: number
  height: number
}

const RounderImg: React.FC<Props> = ({ imgUrl, width, height }) => {
  return (
    <FighterImgStyled className='rounder-20' width={width} height={height}>
      <Image src={imgUrl} alt='Fighter Image' fill={true} style={{ objectFit: 'cover' }} />
    </FighterImgStyled>
  )
}

export default RounderImg
