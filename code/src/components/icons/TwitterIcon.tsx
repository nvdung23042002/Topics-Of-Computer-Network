import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='none' viewBox='0 0 32 32'>
      <path fill='currentColor' d='M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z'></path>
      <path
        fill='#03A9F4'
        d='M26.363 9.572c-.78.34-1.604.567-2.449.672a4.223 4.223 0 001.87-2.35 8.488 8.488 0 01-2.695 1.03 4.248 4.248 0 00-7.351 2.905c-.003.326.03.65.098.969a12.033 12.033 0 01-8.76-4.445 4.253 4.253 0 001.308 5.685 4.193 4.193 0 01-1.92-.525v.047a4.27 4.27 0 003.404 4.172 4.24 4.24 0 01-1.114.14c-.27.004-.54-.02-.806-.072a4.293 4.293 0 003.973 2.96 8.546 8.546 0 01-5.264 1.812c-.34.003-.68-.016-1.016-.059a11.956 11.956 0 006.526 1.908c7.821 0 12.097-6.478 12.097-12.093 0-.187 0-.368-.015-.55a8.453 8.453 0 002.114-2.206z'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
