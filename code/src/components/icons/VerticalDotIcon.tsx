import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4.16667 8.33301C3.25 8.33301 2.5 9.08301 2.5 9.99967C2.5 10.9163 3.25 11.6663 4.16667 11.6663C5.08333 11.6663 5.83333 10.9163 5.83333 9.99967C5.83333 9.08301 5.08333 8.33301 4.16667 8.33301Z'
        stroke='currentColor'
        strokeWidth='1.25'
      />
      <path
        d='M15.8337 8.33301C14.917 8.33301 14.167 9.08301 14.167 9.99967C14.167 10.9163 14.917 11.6663 15.8337 11.6663C16.7503 11.6663 17.5003 10.9163 17.5003 9.99967C17.5003 9.08301 16.7503 8.33301 15.8337 8.33301Z'
        stroke='currentColor'
        strokeWidth='1.25'
      />
      <path
        d='M9.99967 8.33301C9.08301 8.33301 8.33301 9.08301 8.33301 9.99967C8.33301 10.9163 9.08301 11.6663 9.99967 11.6663C10.9163 11.6663 11.6663 10.9163 11.6663 9.99967C11.6663 9.08301 10.9163 8.33301 9.99967 8.33301Z'
        stroke='currentColor'
        strokeWidth='1.25'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
