import styled from 'styled-components'
import Image from 'next/image'

export const ImageStyled = styled(Image)<{ ['imagefit']: 'contain' | 'cover' }>`
  max-width: 100%;
  /* position: unset !important; */
  max-height: 100%;
  display: block;
  object-fit: ${({ imagefit }: any) => imagefit};
`
