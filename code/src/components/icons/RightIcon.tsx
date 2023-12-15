import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.4093 12.5881C20.7842 12.9632 20.9948 13.4718 20.9948 14.0021C20.9948 14.5325 20.7842 15.0411 20.4093 15.4161L12.3513 23.4721C12.1637 23.6596 11.9094 23.7649 11.6443 23.7649C11.3791 23.7649 11.1248 23.6596 10.9373 23.4721L10.2303 22.7651C10.0428 22.5776 9.9375 22.3233 9.9375 22.0581C9.9375 21.793 10.0428 21.5387 10.2303 21.3511L17.5803 14.0001L10.2303 6.65012C10.0428 6.46259 9.9375 6.20828 9.9375 5.94312C9.9375 5.67795 10.0428 5.42364 10.2303 5.23612L10.9373 4.52912C11.1248 4.34164 11.3791 4.23633 11.6443 4.23633C11.9094 4.23633 12.1637 4.34164 12.3513 4.52912L20.4093 12.5881Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
