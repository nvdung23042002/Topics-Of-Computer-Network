import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import IconCustom from '.'
const SVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='42' height='34' fill='none' viewBox='0 0 42 34'>
      <path
        fill='#DE1D43'
        d='M41.652.757l-5.65 7.456H14.974l-1.257 4.21-.134.452-.134.464H5.992l1.526-5.126L9.75.757h31.9zM29.094 33.378H0l2.233-7.457 1.526-5.126h7.469l-.147.464-.134.452-1.257 4.21h18.196l1.208 7.457z'
      ></path>
      <path
        fill='#DE1D43'
        fillRule='evenodd'
        d='M34.463 13.339l-5.65 7.456H11.226l.134-.451.134-.452 1.672-5.638.28-.915h21.016z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}
export default (props: Partial<CustomIconComponentProps>) => {
  return <IconCustom component={SVG} {...props} />
}
