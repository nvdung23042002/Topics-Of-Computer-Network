import styled from 'styled-components'
import { ContainerProps } from '.'
export const ContainerStyled = styled.div`
  max-width: ${(props: ContainerProps) =>
    props.fullWidth ? '100%' : props.maxWidth ? `${props.maxWidth}px` : '1150px'};
  margin: 0 auto;

  /* @media screen and (max-width: 1199px) {
    padding: 0 16px 16px 16px;
  } */
`
