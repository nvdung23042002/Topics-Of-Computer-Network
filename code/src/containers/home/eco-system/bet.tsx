import Fighter from '@/assets/images/home/fighter.jpeg'
import Coin from '@/assets/images/home/nsb-intro-3.png'
import { memo } from 'react'
export default memo(() => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='536'
      height='536'
      fill='none'
      viewBox='0 0 536 536'
    >
      <path fill='url(#pattern0_bet)' d='M0 0H536V536H0z'></path>
      <g className='translate-up-90'>
        <path
          fill='url(#pattern1_bet)'
          d='M103.852 214.392H172.441V276.884H103.852z'
          transform='rotate(-3.671 103.852 214.392)'
        ></path>
      </g>
      <g className='translate-down-60'>
        <path
          fill='url(#pattern2_bet)'
          d='M366 426.434H427.976V482.901H366z'
          transform='rotate(-15.041 366 426.434)'
        ></path>
      </g>
      <g className='translate-up-90'>
        <path
          fill='url(#pattern3_bet)'
          d='M0 0H60.475V55.099H0z'
          transform='scale(-1 1) rotate(-10.191 1165.698 2586.76)'
        ></path>
      </g>
      <g className='translate-down-60'>
        <path
          fill='url(#pattern4_bet)'
          d='M0 0H55.945V50.972H0z'
          transform='scale(-1 1) rotate(-.994 24146.235 8330.06)'
        ></path>
      </g>
      <defs>
        <pattern id='pattern0_bet' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='scale(.00078)' xlinkHref='#image0_9051_67351'></use>
        </pattern>
        <pattern id='pattern1_bet' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.0009 0 0 .00098 0 0)' xlinkHref='#image1_9051_67351'></use>
        </pattern>
        <pattern id='pattern2_bet' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.0009 0 0 .00098 0 0)' xlinkHref='#image1_9051_67351'></use>
        </pattern>
        <pattern id='pattern3_bet' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.0009 0 0 .00098 0 0)' xlinkHref='#image1_9051_67351'></use>
        </pattern>
        <pattern id='pattern4_bet' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.0009 0 0 .00098 0 0)' xlinkHref='#image1_9051_67351'></use>
        </pattern>
        <image id='image0_9051_67351' width='1275' height='1275' xlinkHref={Fighter.src} />
        <image id='image1_9051_67351' width='1120' height='1021' xlinkHref={Coin.src} />
      </defs>
    </svg>
  )
})
