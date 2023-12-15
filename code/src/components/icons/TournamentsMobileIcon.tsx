import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.82812 8.86719H11.1719'
        stroke='#183B56'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.14062 17.0703V13.5547H15.8594V17.0703'
        stroke='#183B56'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <mask
        id='mask0_6320_111336'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='20'
        height='20'
      >
        <path d='M0 7.62939e-06H20V20H0V7.62939e-06Z' fill='white' />
      </mask>
      <g mask='url(#mask0_6320_111336)'>
        <path
          d='M0.585938 19.4141V17.0703H7.65625V19.4141'
          stroke='#183B56'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.3516 19.4141V17.0703H19.4219V19.4141'
          stroke='#183B56'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <path
        d='M10 6.44531V8.86719'
        stroke='#183B56'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <mask
        id='mask1_6320_111336'
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='20'
        height='20'
      >
        <path d='M0 7.62939e-06H20V20H0V7.62939e-06Z' fill='white' />
      </mask>
      <g mask='url(#mask1_6320_111336)'>
        <path
          d='M12.3438 0.585939H14.6875V2.34375C14.6875 3.31457 13.9005 4.10156 12.9297 4.10156H12.3438'
          stroke='#183B56'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10 6.44531C8.70559 6.44531 7.65625 5.39598 7.65625 4.10156V0.585939H12.3437V4.10156C12.3437 5.39598 11.2944 6.44531 10 6.44531Z'
          stroke='#183B56'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.65625 4.10156H7.07031C6.09949 4.10156 5.3125 3.31457 5.3125 2.34375V0.585939H7.65625'
          stroke='#183B56'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10 11.2109V13.5547'
          stroke='#183B56'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.65625 11.2109H12.3437'
          stroke='#183B56'
          strokeWidth='1.5'
          strokeMiterlimit='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
