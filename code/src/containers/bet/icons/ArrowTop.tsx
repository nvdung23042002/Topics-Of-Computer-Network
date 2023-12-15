import IconCustom from '@/components/icons'
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'

const SVG = () => {
  return (
    <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='15' cy='15' r='15' fill='white' />
      <path d='M21 18L15 12L9 18' stroke='#DE1D43' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
