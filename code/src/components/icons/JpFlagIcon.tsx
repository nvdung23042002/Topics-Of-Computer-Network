import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='36' height='25' fill='none' viewBox='0 0 36 25'>
      <g clipPath='url(#clip0_288_6031)'>
        <path fill='#fff' d='M1 1h34v22.667H1V1z'></path>
        <path fill='#D80027' d='M18 18.708a6.375 6.375 0 100-12.75 6.375 6.375 0 000 12.75z'></path>
      </g>
      <path stroke='#000' strokeOpacity='0.5' d='M0.5 0.5H35.5V24.167H0.5z'></path>
      <defs>
        <clipPath id='clip0_288_6031'>
          <path fill='#fff' d='M1 1H35V23.667H1z'></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
