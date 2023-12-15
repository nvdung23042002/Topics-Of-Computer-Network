import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' viewBox='0 0 20 20'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M13.143 4.954l3.24-2.652A9.958 9.958 0 0010 0a9.998 9.998 0 00-8.808 14.739A9.999 9.999 0 0010 20c2.37 0 4.547-.824 6.26-2.202a9.998 9.998 0 003.565-9.666H10.22v3.956h5.347a5.96 5.96 0 01-2.564 3.043 5.946 5.946 0 01-8.57-3.045A5.92 5.92 0 014.054 10c0-.676.114-1.326.321-1.932a5.948 5.948 0 018.767-3.114z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
