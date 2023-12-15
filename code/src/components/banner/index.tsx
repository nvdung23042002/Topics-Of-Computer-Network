import React, { memo } from 'react'
import Image from '../common/image'
import { BannerStyled } from './styled'
import classNames from 'classnames'
import { getSponsorDetailThunk } from '@/redux/sponsor/thunk'
import { useAppDispatch } from '@/hooks/store'
import { isNil } from 'lodash'
type BannerProps = {
  key?: string
  sponsorId: string
  image?: string
  className?: string
  style?: React.CSSProperties
}
export default memo(({ image, sponsorId, ...props }: BannerProps) => {
  const dispatch = useAppDispatch()
  return (
    <>
      <BannerStyled
        {...props}
        className={classNames('no-select', {
          hover: !isNil(sponsorId),
          [props.className as string]: props.className
        })}
        onClick={() => {
          if (!isNil(sponsorId)) {
            dispatch(getSponsorDetailThunk(sponsorId))
          }
        }}
      >
        <Image src={image} alt={`banner`} fill priority objectFit='contain' />
      </BannerStyled>
    </>
  )
})
