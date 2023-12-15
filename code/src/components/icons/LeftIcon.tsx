import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.59067 15.4129C7.21577 15.0378 7.00517 14.5292 7.00517 13.9989C7.00517 13.4685 7.21577 12.9599 7.59067 12.5849L15.6487 4.52889C15.8363 4.34139 16.0906 4.23609 16.3557 4.23609C16.6209 4.23609 16.8752 4.34139 17.0627 4.52889L17.7697 5.23589C17.9572 5.42339 18.0625 5.67769 18.0625 5.94289C18.0625 6.20799 17.9572 6.46229 17.7697 6.64989L10.4197 14.0009L17.7697 21.3509C17.9572 21.5384 18.0625 21.7927 18.0625 22.0579C18.0625 22.323 17.9572 22.5773 17.7697 22.7649L17.0627 23.4719C16.8752 23.6593 16.6209 23.7646 16.3557 23.7646C16.0906 23.7646 15.8363 23.6593 15.6487 23.4719L7.59067 15.4129Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
