import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width={7} height={11} viewBox='0 0 7 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.9977 5.60312L3.5 7.59688L0 5.60312L3.5 0L6.9977 5.60312ZM3.5 8.23711L0 6.24336L3.5 11L7 6.24336L3.5 8.23711V8.23711Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
