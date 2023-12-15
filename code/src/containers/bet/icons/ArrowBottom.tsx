import IconCustom from '@/components/icons'
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'

const SVG = () => {
  return (
    <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='15' cy='15' r='15' transform='rotate(-180 15 15)' fill='white' />
      <path d='M9 12L15 18L21 12' stroke='#183B56' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
