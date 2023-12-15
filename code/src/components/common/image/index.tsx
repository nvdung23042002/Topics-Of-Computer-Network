import DefaultImage from '@/assets/images/default-image.png'
import React, { memo, useEffect, useState } from 'react'
import { ImageStyled } from './styled'

type Props = {
  src: any
  alt: string
  fill?: boolean
  style?: any
  onClick?: any
  width?: any
  height?: any
  defaultSrc?: string
  objectFit?: 'contain' | 'cover'
  priority?: boolean
  id?: string
  className?: string
}

const Image: React.FC<Props> = ({
  src,
  alt,
  onClick,
  defaultSrc,
  objectFit = 'contain',
  priority = false,
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState(src || defaultSrc)

  useEffect(() => {
    setImageSrc(src || defaultSrc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  return (
    <ImageStyled
      src={imageSrc}
      onError={() => {
        setImageSrc(defaultSrc || DefaultImage.src)
      }}
      alt={alt}
      onClick={onClick}
      quality={100}
      imagefit={objectFit}
      priority={priority}
      {...rest}
    />
  )
}

export default memo(Image)
