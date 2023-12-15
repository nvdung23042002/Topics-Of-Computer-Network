import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import React from 'react'
import IconCustom from '.'

const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M12 1C5.935 1 1 5.935 1 12c0 6.066 4.935 11 11 11 6.066 0 11-4.934 11-11 0-6.065-4.934-11-11-11zm0 20.593c-5.289 0-9.592-4.303-9.592-9.592 0-5.29 4.303-9.593 9.592-9.593 5.29 0 9.593 4.303 9.593 9.593 0 5.289-4.303 9.592-9.593 9.592z'
      ></path>
      <path
        fill='currentColor'
        d='M15.246 12.928a.705.705 0 000-1.409h-2.54v-.168l2.715-3.836a.703.703 0 10-1.149-.814L12.01 9.898l-2.198-3.19a.704.704 0 10-1.16.8l2.646 3.839v.172h-2.54a.704.704 0 000 1.409h2.54v1.423h-2.54a.704.704 0 000 1.408h2.54v1.133a.704.704 0 101.408 0V15.76h2.54a.704.704 0 000-1.408h-2.54v-1.424h2.54z'
      ></path>
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
