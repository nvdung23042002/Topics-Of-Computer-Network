import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'>
      <path
        fill='currentColor'
        stroke='currentColor'
        strokeWidth='0.5'
        d='M9.242 8.082L5.585 4.425a.74.74 0 111.026-1.063l.018.018 4.18 4.18a.74.74 0 010 1.045L6.63 12.782a.74.74 0 01-1.063-1.026l.018-.018 3.657-3.657z'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
