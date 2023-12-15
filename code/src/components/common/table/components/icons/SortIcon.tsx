import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import IconCustom from '@/components/icons'

const SVG = () => {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.19526 5.80474C1.93491 5.54439 1.93491 5.12228 2.19526 4.86193L4.86193 2.19526C5.12228 1.93491 5.54439 1.93491 5.80474 2.19526L8.4714 4.86193C8.73173 5.12228 8.73173 5.54439 8.4714 5.80474C8.21107 6.06509 7.78893 6.06509 7.5286 5.80474L6 4.27614V13.3333C6 13.7015 5.70152 14 5.33333 14C4.96515 14 4.66667 13.7015 4.66667 13.3333V4.27614L3.13807 5.80474C2.87772 6.06509 2.45561 6.06509 2.19526 5.80474Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.8047 10.1953C14.0651 10.4556 14.0651 10.8777 13.8047 11.1381L11.1381 13.8047C10.8777 14.0651 10.4556 14.0651 10.1953 13.8047L7.5286 11.1381C7.26827 10.8777 7.26827 10.4556 7.5286 10.1953C7.78893 9.93491 8.21107 9.93491 8.4714 10.1953L10 11.7239L10 2.66667C10 2.29847 10.2985 2 10.6667 2C11.0349 2 11.3333 2.29847 11.3333 2.66667L11.3333 11.7239L12.8619 10.1953C13.1223 9.93491 13.5444 9.93491 13.8047 10.1953Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
