import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_11307_184984)'>
        <path
          d='M24 12C24 5.37258 18.6274 -2.34843e-07 12 -5.24537e-07C5.37258 -8.1423e-07 -2.34843e-07 5.37258 -5.24537e-07 12C-8.1423e-07 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12ZM1.5 12C1.5 6.201 6.201 1.5 12 1.5C17.799 1.5 22.5 6.201 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.201 22.5 1.5 17.799 1.5 12Z'
          fill='currentColor'
        />
        <path
          d='M10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12Z'
          fill='currentColor'
        />
        <path
          d='M10.5 17.25C10.5 18.0784 11.1716 18.75 12 18.75C12.8284 18.75 13.5 18.0784 13.5 17.25C13.5 16.4216 12.8284 15.75 12 15.75C11.1716 15.75 10.5 16.4216 10.5 17.25Z'
          fill='currentColor'
        />
        <path
          d='M10.5 6.75C10.5 7.57843 11.1716 8.25 12 8.25C12.8284 8.25 13.5 7.57843 13.5 6.75C13.5 5.92157 12.8284 5.25 12 5.25C11.1716 5.25 10.5 5.92157 10.5 6.75Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_11307_184984'>
          <rect width='24' height='24' fill='white' transform='translate(24) rotate(90)' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
