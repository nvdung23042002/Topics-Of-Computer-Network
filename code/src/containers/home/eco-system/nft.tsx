import ArtBoard1 from '@/assets/images/home/artboard-1.png'
import ArtBoard2 from '@/assets/images/home/artboard-2.png'
import ArtBoard3 from '@/assets/images/home/artboard-3.png'
import ArtBoard4 from '@/assets/images/home/artboard-4.png'
import { memo } from 'react'

export default memo(() => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='536'
      height='541'
      fill='none'
      viewBox='0 0 536 541'
    >
      <path className='translate-up-40' fill='url(#pattern0_4_1)' d='M75 12H452V345H75z'></path>
      <path fill='url(#pattern1_4_1)' d='M88 205H438V540H88z'></path>
      <path className='translate-down-40' fill='url(#pattern2_4_1)' d='M65 94H465V480H65z'></path>
      <path className='translate-up-40' fill='url(#pattern3_4_1)' d='M28 26H449V382H28z'></path>
      <defs>
        <pattern id='pattern0_4_1' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.00107 0 0 .0012 0 -.001)' xlinkHref='#image0_2_12457'></use>
        </pattern>
        <pattern id='pattern1_4_1' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.00116 0 0 .0012 0 -.001)' xlinkHref='#image1_2_12457'></use>
        </pattern>
        <pattern id='pattern2_4_1' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.00107 0 0 .0011 0 0)' xlinkHref='#image2_2_12457'></use>
        </pattern>
        <pattern id='pattern3_4_1' width='1' height='1' patternContentUnits='objectBoundingBox'>
          <use transform='matrix(.00086 0 0 .00102 0 -.001)' xlinkHref='#image3_2_12457'></use>
        </pattern>
        <image id='image0_2_12457' width='937' height='830' xlinkHref={ArtBoard1.src}></image>
        <image id='image1_2_12457' width='865' height='830' xlinkHref={ArtBoard2.src}></image>
        <image id='image2_2_12457' width='939' height='905' xlinkHref={ArtBoard3.src}></image>
        <image id='image3_2_12457' width='1165' height='988' xlinkHref={ArtBoard4.src}></image>
      </defs>
    </svg>
  )
})
