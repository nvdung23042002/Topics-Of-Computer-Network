import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1 1H2.30616C2.55218 1 2.67519 1 2.77418 1.04524C2.86142 1.08511 2.93535 1.14922 2.98715 1.22995C3.04593 1.32154 3.06333 1.44332 3.09812 1.68686L3.57143 5M3.57143 5L4.62332 12.7314C4.75681 13.7125 4.82355 14.2031 5.0581 14.5723C5.26478 14.8977 5.56108 15.1564 5.91135 15.3174C6.30886 15.5 6.80394 15.5 7.79411 15.5H16.352C17.2945 15.5 17.7658 15.5 18.151 15.3304C18.4905 15.1809 18.7818 14.9398 18.9923 14.6342C19.2309 14.2876 19.3191 13.8247 19.4955 12.8988L20.8191 5.94969C20.8812 5.62381 20.9122 5.46087 20.8672 5.3335C20.8278 5.22177 20.7499 5.12768 20.6475 5.06802C20.5308 5 20.365 5 20.0332 5H3.57143ZM9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM17 20C17 20.5523 16.5523 21 16 21C15.4477 21 15 20.5523 15 20C15 19.4477 15.4477 19 16 19C16.5523 19 17 19.4477 17 20Z'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
