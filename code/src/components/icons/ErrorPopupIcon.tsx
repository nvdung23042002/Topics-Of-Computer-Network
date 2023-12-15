import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='152' height='152' viewBox='0 0 152 152' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='76' cy='76' r='50' fill='#EA1313' />
      <rect x='92.2617' y='49.8372' width='14' height='60' rx='7' transform='rotate(45 92.2617 49.8372)' fill='white' />
      <rect
        x='102.164'
        y='92.2634'
        width='14'
        height='60'
        rx='7'
        transform='rotate(135 102.164 92.2634)'
        fill='white'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
