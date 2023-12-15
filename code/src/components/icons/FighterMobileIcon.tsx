import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_6320_111368)'>
        <path
          d='M17.4993 13.3333H14.166V11.6667H16.666V6.66667H14.166V5H17.4993C17.7204 5 17.9323 5.0878 18.0886 5.24408C18.2449 5.40036 18.3327 5.61232 18.3327 5.83333V12.5C18.3327 12.721 18.2449 12.933 18.0886 13.0893C17.9323 13.2455 17.7204 13.3333 17.4993 13.3333Z'
          fill='#183B56'
        />
        <path
          d='M8.33268 15.8332H5.83268C4.72761 15.8332 3.66781 15.3942 2.8864 14.6128C2.105 13.8314 1.66602 12.7716 1.66602 11.6665V8.33317C1.66602 7.2281 2.105 6.16829 2.8864 5.38689C3.66781 4.60549 4.72761 4.1665 5.83268 4.1665H14.166C14.387 4.1665 14.599 4.2543 14.7553 4.41058C14.9116 4.56686 14.9993 4.77882 14.9993 4.99984V13.3332C14.9993 13.5542 14.9116 13.7661 14.7553 13.9224C14.599 14.0787 14.387 14.1665 14.166 14.1665H10.691C10.5186 14.6541 10.1992 15.0763 9.77683 15.3748C9.35445 15.6733 8.84989 15.8334 8.33268 15.8332ZM5.83268 5.83317C5.16964 5.83317 4.53376 6.09656 4.06492 6.5654C3.59607 7.03424 3.33268 7.67013 3.33268 8.33317V11.6665C3.33268 12.3295 3.59607 12.9654 4.06492 13.4343C4.53376 13.9031 5.16964 14.1665 5.83268 14.1665H8.33268C8.5537 14.1665 8.76566 14.0787 8.92194 13.9224C9.07822 13.7661 9.16602 13.5542 9.16602 13.3332V10.8332H7.91602C7.80551 10.8332 7.69953 10.7893 7.62139 10.7111C7.54325 10.633 7.49935 10.527 7.49935 10.4165V9.58317C7.49935 9.47266 7.54325 9.36668 7.62139 9.28854C7.69953 9.2104 7.80551 9.1665 7.91602 9.1665H9.99935C10.2204 9.1665 10.4323 9.2543 10.5886 9.41058C10.7449 9.56686 10.8327 9.77882 10.8327 9.99984V12.4998H13.3327V5.83317H5.83268Z'
          fill='#183B56'
        />
      </g>
      <defs>
        <clipPath id='clip0_6320_111368'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
