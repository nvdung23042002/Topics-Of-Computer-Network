import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.7 7.41699C16.7 7.67533 17.925 9.21699 17.925 12.592V12.7003C17.925 16.4253 16.4333 17.917 12.7083 17.917H7.28332C3.55832 17.917 2.06665 16.4253 2.06665 12.7003V12.592C2.06665 9.24199 3.27498 7.70032 6.22498 7.42532'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 12.4999V3.0166'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.7913 4.87467L9.99966 2.08301L7.20801 4.87467'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
