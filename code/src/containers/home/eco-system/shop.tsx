import Shop0 from '@/assets/images/home/shop-0.png'
import Shop1 from '@/assets/images/home/shop-1.png'
import Shop2 from '@/assets/images/home/shop-2.png'
import Shop3 from '@/assets/images/home/shop-3.png'
import Shop4 from '@/assets/images/home/shop-4.png'
import { memo } from 'react'

export default memo(() => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='536'
      height='540'
      fill='none'
      viewBox='0 0 536 540'
    >
      <defs>
        <pattern id='pattern0-shop' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.00047 0 0 .00087 0 0)' xlinkHref='#image0_8734_64488'></use>
        </pattern>
        <pattern id='pattern1-shop' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='scale(.0003 .00056)' xlinkHref='#image1_8734_64488'></use>
        </pattern>
        <pattern id='pattern2-shop' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='scale(.00082 .00066)' xlinkHref='#image2_8734_64488'></use>
        </pattern>
        <pattern id='pattern3-shop' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.00064 0 0 .00054 0 -.001)' xlinkHref='#image3_8734_64488'></use>
        </pattern>
        <pattern id='pattern4-shop' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.00125 0 0 .00061 -.001 0)' xlinkHref='#image4_8734_64488'></use>
        </pattern>
        <image id='image0_8734_64488' width='2124' height='1136' xlinkHref={Shop0.src} />
        <image id='image1_8734_64488' width='3350' height='1760' xlinkHref={Shop1.src} />
        <image id='image2_8734_64488' width='1193' height='1481' xlinkHref={Shop2.src} />
        <image id='image3_8734_64488' width='1566' height='1852' xlinkHref={Shop3.src} />
        <image id='image4_8734_64488' width='800' height='1630' xlinkHref={Shop4.src} />
      </defs>
      <path fill='#fff' d='M0 0H536V540H0z'></path>
      <g className='translate-down-40'>
        <path fill='url(#pattern0-shop)' d='M206.633 352.489H501.19100000000003V511.489H206.633z'></path>
      </g>
      <g className='translate-down-40'>
        <path
          fill='url(#pattern1-shop)'
          d='M27.727 93.76H233.809V202.622H27.727z'
          transform='rotate(-18.608 27.727 93.76)'
        ></path>
      </g>
      <g className='translate-up-40'>
        <path
          fill='url(#pattern2-shop)'
          d='M49.227 256.947H231.112V483.524H49.227z'
          transform='rotate(6.139 49.227 256.947)'
        ></path>
      </g>
      <g className='translate-up-40'>
        <path fill='url(#pattern3-shop)' d='M265.836 71.268H510.363V361.519H265.836z'></path>
      </g>
      <g className='translate-down-40'>
        <path
          fill='url(#pattern4-shop)'
          d='M161.266 176.821H239.938V337.443H161.266z'
          transform='rotate(-28.329 161.266 176.821)'
        ></path>
      </g>
    </svg>
  )
})
