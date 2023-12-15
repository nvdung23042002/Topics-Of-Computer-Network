import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='35' height='24' fill='none' viewBox='0 0 35 24'>
      <g clipPath='url(#clip0_1444_1855)'>
        <path fill='#F0F0F0' d='M34.5 1H.5v22.667h34V1z'></path>
        <path fill='#D80027' d='M19.625 1h-4.25v9.208H.5v4.25h14.875v9.209h4.25v-9.209H34.5v-4.25H19.625V1z'></path>
        <path
          fill='#0052B4'
          d='M26.65 16.275l7.85 4.362v-4.362h-7.85zM21.195 16.275L34.5 23.667v-2.09l-9.542-5.302h-3.763zM30.956 23.667l-9.76-5.423v5.423h9.76z'
        ></path>
        <path fill='#F0F0F0' d='M21.195 16.275L34.5 23.667v-2.09l-9.542-5.302h-3.763z'></path>
        <path fill='#D80027' d='M21.195 16.275L34.5 23.667v-2.09l-9.542-5.302h-3.763z'></path>
        <path fill='#0052B4' d='M6.5 16.275l-6 3.333v-3.333h6zM13.804 17.215v6.451H2.192l11.612-6.451z'></path>
        <path fill='#D80027' d='M10.042 16.275L.5 21.577v2.09l13.304-7.392h-3.762z'></path>
        <path
          fill='#0052B4'
          d='M8.35 8.39L.5 4.03v4.36h7.85zM13.804 8.391L.5 1v2.09l9.542 5.301h3.762zM4.044 1l9.76 5.423V1h-9.76z'
        ></path>
        <path fill='#F0F0F0' d='M13.804 8.391L.5 1v2.09l9.542 5.301h3.762z'></path>
        <path fill='#D80027' d='M13.804 8.391L.5 1v2.09l9.542 5.301h3.762z'></path>
        <path fill='#0052B4' d='M28.5 8.392l6-3.333v3.333h-6zM21.195 7.451V1h11.612L21.195 7.451z'></path>
        <path fill='#D80027' d='M24.958 8.391l9.542-5.3V1L21.195 8.391h3.763z'></path>
      </g>
      <defs>
        <clipPath id='clip0_1444_1855'>
          <path fill='#fff' d='M0 0H34V24H0z' transform='translate(.5)'></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
