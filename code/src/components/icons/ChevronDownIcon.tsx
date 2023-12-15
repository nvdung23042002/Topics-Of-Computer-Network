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
        d='M8.177 9.132l3.657-3.657a.74.74 0 111.063 1.026l-.018.018-4.18 4.18a.74.74 0 01-1.044 0L3.475 6.52a.739.739 0 111.028-1.063l.018.018 3.656 3.657z'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
