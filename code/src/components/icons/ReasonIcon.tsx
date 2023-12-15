import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11 15V11M11 7H11.01M1 7.52274V14.4773C1 14.7218 1 14.8441 1.02763 14.9592C1.05213 15.0613 1.09253 15.1588 1.14736 15.2483C1.2092 15.3492 1.29568 15.4357 1.46863 15.6086L6.39137 20.5314C6.56432 20.7043 6.6508 20.7908 6.75172 20.8526C6.84119 20.9075 6.93873 20.9479 7.04077 20.9724C7.15586 21 7.27815 21 7.52274 21H14.4773C14.7218 21 14.8441 21 14.9592 20.9724C15.0613 20.9479 15.1588 20.9075 15.2483 20.8526C15.3492 20.7908 15.4357 20.7043 15.6086 20.5314L20.5314 15.6086C20.7043 15.4357 20.7908 15.3492 20.8526 15.2483C20.9075 15.1588 20.9479 15.0613 20.9724 14.9592C21 14.8441 21 14.7218 21 14.4773V7.52274C21 7.27815 21 7.15586 20.9724 7.04077C20.9479 6.93873 20.9075 6.84119 20.8526 6.75172C20.7908 6.6508 20.7043 6.56432 20.5314 6.39137L15.6086 1.46863C15.4357 1.29568 15.3492 1.2092 15.2483 1.14736C15.1588 1.09253 15.0613 1.05213 14.9592 1.02763C14.8441 1 14.7218 1 14.4773 1H7.52274C7.27815 1 7.15586 1 7.04077 1.02763C6.93873 1.05213 6.84119 1.09253 6.75172 1.14736C6.6508 1.2092 6.56432 1.29568 6.39137 1.46863L1.46863 6.39137C1.29568 6.56432 1.2092 6.6508 1.14736 6.75172C1.09253 6.84119 1.05213 6.93873 1.02763 7.04077C1 7.15586 1 7.27815 1 7.52274Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
