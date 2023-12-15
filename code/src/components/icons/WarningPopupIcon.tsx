import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='152' height='152' viewBox='0 0 152 152' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M76 127C104.167 127 127 104.167 127 76C127 47.8335 104.167 25 76 25C47.8335 25 25 47.8335 25 76C25 104.167 47.8335 127 76 127Z'
        fill='#FFA928'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M76.015 89.3727C75.0316 89.3727 74.19 88.5336 74.0193 87.3794L68.989 53.4515C68.3566 49.1787 71.117 45.2617 74.7598 45.2617H77.2678C80.9106 45.2617 83.671 49.1787 83.0386 53.4515L78.0084 87.3794C77.84 88.5336 76.9985 89.3727 76.015 89.3727Z'
        fill='white'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M80.6108 102.135C80.6108 99.6011 78.5429 97.5332 76.0085 97.5332C73.4741 97.5332 71.4062 99.6011 71.4062 102.135C71.4062 104.67 73.4741 106.738 76.0085 106.738C78.5429 106.738 80.6108 104.672 80.6108 102.135Z'
        fill='white'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
