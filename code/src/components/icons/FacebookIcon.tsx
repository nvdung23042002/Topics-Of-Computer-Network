import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none' viewBox='0 0 32 32'>
      <path
        fill='currentColor'
        d='M32 16c0 7.986-5.851 14.606-13.5 15.806V20.625h3.728l.71-4.625H18.5v-3.001c0-1.266.62-2.499 2.608-2.499h2.017V6.562s-1.831-.312-3.582-.312c-3.654 0-6.043 2.215-6.043 6.225V16H9.437v4.625H13.5v11.18C5.851 30.606 0 23.987 0 16 0 7.164 7.164 0 16 0s16 7.164 16 16z'
      ></path>
      <path
        fill='#1877F2'
        d='M22.228 20.625l.71-4.625H18.5v-3.001c0-1.266.62-2.499 2.607-2.499h2.018V6.562s-1.831-.312-3.582-.312c-3.654 0-6.043 2.215-6.043 6.225V16H9.437v4.625H13.5v11.18a16.121 16.121 0 005 0v-11.18h3.728z'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
