import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_62_9145)'>
        <path
          d='M9.21329 4.56665L11.2399 6.59332'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeMiterlimit={10}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.21329 11.4333V4.56665'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeMiterlimit={10}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.7866 11.4333L4.75995 9.40662'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeMiterlimit={10}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.7865 4.56665V11.4333'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeMiterlimit={10}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8.00005 14.6666C11.682 14.6666 14.6667 11.6819 14.6667 7.99998C14.6667 4.31808 11.682 1.33331 8.00005 1.33331C4.31814 1.33331 1.33337 4.31808 1.33337 7.99998C1.33337 11.6819 4.31814 14.6666 8.00005 14.6666Z'
          stroke='currentColor'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_62_9145'>
          <rect width={16} height={16} fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
