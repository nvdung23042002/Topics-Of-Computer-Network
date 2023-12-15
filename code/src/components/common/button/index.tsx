import { ButtonProps } from 'antd/lib/button'
import { ButtonStyled } from './styled'
import { forwardRef } from 'react'
import classNames from 'classnames'

export default forwardRef<any, ButtonProps>(({ children, className, ...props }, fwdRef) => {
  return typeof children === 'string' &&
    children?.length === 2 &&
    !['text', 'link'].includes(props.type ?? 'default') &&
    !props.icon ? (
    <ButtonStyled className={classNames('hidden-icon', className)} ref={fwdRef} icon={<></>} {...props}>
      {children}
    </ButtonStyled>
  ) : (
    <ButtonStyled className={classNames(className)} ref={fwdRef} {...props}>
      {children}
    </ButtonStyled>
  )
})
