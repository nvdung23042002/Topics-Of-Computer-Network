import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width={120} height={120} viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1190_38465)'>
        <path
          d='M106.25 110H13.75C6.165 110 0 103.835 0 96.25V87.5C0 85.43 1.68 83.75 3.75 83.75H6.25C11.075 83.75 15 79.825 15 75C15 70.175 11.075 66.25 6.25 66.25H3.75C1.68 66.25 0 64.57 0 62.5V53.75C0 46.165 6.165 40 13.75 40H106.25C113.835 40 120 46.165 120 53.75V62.5C120 64.57 118.32 66.25 116.25 66.25H113.75C108.925 66.25 105 70.175 105 75C105 77.335 105.91 79.535 107.565 81.185C109.22 82.835 111.415 83.745 113.745 83.745H116.245C118.315 83.745 119.995 85.425 119.995 87.495V96.245C120 103.835 113.835 110 106.25 110ZM7.5 91.205V96.25C7.5 99.695 10.305 102.5 13.75 102.5H106.25C109.695 102.5 112.5 99.695 112.5 96.25V91.2C108.635 90.91 105.035 89.26 102.26 86.49C99.19 83.42 97.5 79.34 97.5 75C97.5 66.46 104.12 59.44 112.5 58.795V53.75C112.5 50.305 109.695 47.5 106.25 47.5H13.75C10.305 47.5 7.5 50.305 7.5 53.75V58.795C15.88 59.435 22.5 66.46 22.5 75C22.5 83.54 15.88 90.56 7.5 91.205Z'
          fill='currentColor'
        />
        <path
          d='M43.75 53.75C41.68 53.75 40 52.07 40 50V45C40 42.93 41.68 41.25 43.75 41.25C45.82 41.25 47.5 42.93 47.5 45V50C47.5 52.07 45.82 53.75 43.75 53.75Z'
          fill='currentColor'
        />
        <path
          d='M43.75 85C41.68 85 40 83.32 40 81.25V68.75C40 66.68 41.68 65 43.75 65C45.82 65 47.5 66.68 47.5 68.75V81.25C47.5 83.32 45.82 85 43.75 85Z'
          fill='currentColor'
        />
        <path
          d='M43.75 108.75C41.68 108.75 40 107.07 40 105V100C40 97.93 41.68 96.25 43.75 96.25C45.82 96.25 47.5 97.93 47.5 100V105C47.5 107.07 45.82 108.75 43.75 108.75Z'
          fill='currentColor'
        />
        <path
          d='M12.5033 47.5002C10.9833 47.5002 9.55329 46.5702 8.98829 45.0602C8.26329 43.1202 9.24829 40.9602 11.1883 40.2352L90.6883 10.5502C95.1983 8.87519 100.493 11.3902 102.038 15.9402L111.053 42.5452C111.718 44.5102 110.663 46.6352 108.703 47.3002C106.748 47.9602 104.613 46.9102 103.948 44.9502L94.9333 18.3452C94.7933 17.9252 94.3733 17.5002 93.7533 17.5002L13.8133 47.2652C13.3833 47.4252 12.9383 47.5002 12.5033 47.5002Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_1190_38465'>
          <rect width={120} height={120} fill='currentColor' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}