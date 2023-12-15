import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='26' fill='none' viewBox='0 0 32 26'>
      <path
        fill='currentColor'
        d='M27.09 2.827a26.39 26.39 0 00-6.514-2.02.099.099 0 00-.105.049c-.281.5-.593 1.153-.81 1.666a24.36 24.36 0 00-7.317 0 16.869 16.869 0 00-.823-1.666.103.103 0 00-.105-.05 26.315 26.315 0 00-6.513 2.02.093.093 0 00-.043.037C.71 9.061-.425 15.107.132 21.077a.11.11 0 00.042.075 26.536 26.536 0 007.99 4.04.103.103 0 00.113-.038 18.96 18.96 0 001.634-2.658.101.101 0 00-.055-.141c-.87-.33-1.7-.733-2.496-1.19a.103.103 0 01-.01-.17c.167-.126.335-.257.495-.389a.099.099 0 01.104-.014c5.237 2.391 10.906 2.391 16.081 0a.099.099 0 01.105.013c.16.132.328.264.497.39a.103.103 0 01-.009.17c-.797.466-1.626.86-2.497 1.188a.102.102 0 00-.054.142c.48.931 1.029 1.818 1.633 2.658.025.036.07.051.112.038a26.445 26.445 0 008.003-4.039.103.103 0 00.042-.074c.667-6.902-1.117-12.898-4.731-18.213a.081.081 0 00-.042-.038zM10.692 17.442c-1.576 0-2.875-1.448-2.875-3.226 0-1.777 1.273-3.225 2.875-3.225 1.615 0 2.902 1.46 2.876 3.226 0 1.777-1.274 3.225-2.876 3.225zm10.633 0c-1.576 0-2.875-1.448-2.875-3.226 0-1.777 1.273-3.225 2.875-3.225 1.615 0 2.901 1.46 2.876 3.226 0 1.777-1.261 3.225-2.876 3.225z'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}