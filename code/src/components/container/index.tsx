import { ContainerStyled } from './styled'

export type ContainerProps = {
  fullWidth?: boolean
  children?: React.ReactNode | string | number
  maxWidth?: number
  className?: string
}

export default (({ children, className, ...props }) => {
  return (
    <ContainerStyled className={className} {...props}>
      {children}
    </ContainerStyled>
  )
}) as React.FC<ContainerProps>
