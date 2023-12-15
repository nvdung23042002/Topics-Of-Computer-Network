import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.5 83.3333C22.2325 73.0108 35.4459 66.6667 50 66.6667C64.5541 66.6667 77.7675 73.0108 87.5 83.3333M68.75 31.25C68.75 41.6053 60.3553 50 50 50C39.6447 50 31.25 41.6053 31.25 31.25C31.25 20.8947 39.6447 12.5 50 12.5C60.3553 12.5 68.75 20.8947 68.75 31.25Z'
        stroke='#D1D4DA'
        strokeWidth='8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
