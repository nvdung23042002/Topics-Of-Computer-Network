import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' fill='none' viewBox='0 0 80 80'>
      <path
        fill='currentColor'
        d='M38.028 8.118a4 4 0 013.944 0l12.383 7.018 12.27 7.215a4 4 0 011.972 3.416L68.71 40l-.113 14.233a4 4 0 01-1.972 3.416l-12.27 7.215-12.383 7.018a4 4 0 01-3.944 0l-12.383-7.018-12.27-7.215a4 4 0 01-1.972-3.416L11.29 40l.113-14.233a4 4 0 011.973-3.416l12.269-7.215 12.383-7.018z'
      ></path>
      <path
        stroke='currentColor'
        strokeWidth='3'
        d='M37.781 2.982a4.5 4.5 0 014.438 0l14.43 8.18 14.3 8.407a4.5 4.5 0 012.22 3.844L73.3 40l-.132 16.587a4.5 4.5 0 01-2.219 3.844L56.65 68.839l-14.431 8.18a4.5 4.5 0 01-4.438 0l-14.431-8.18-14.3-8.408a4.5 4.5 0 01-2.218-3.844L6.7 40l.132-16.587a4.5 4.5 0 012.219-3.844l14.299-8.408 14.431-8.18z'
      ></path>
      <path
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.1'
        d='M27.5 27.5h1.633c.307 0 .461 0 .585.057.109.05.201.13.266.23.073.115.095.267.139.572l.591 4.141m0 0l1.315 9.664c.167 1.227.25 1.84.544 2.301a2.5 2.5 0 001.066.932c.497.228 1.116.228 2.354.228H46.69c1.178 0 1.767 0 2.249-.212a2.5 2.5 0 001.051-.87c.299-.434.409-1.012.63-2.17l1.654-8.686c.078-.407.116-.61.06-.77a.625.625 0 00-.275-.332c-.145-.085-.353-.085-.767-.085H30.713zM37.5 51.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm10 0a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
