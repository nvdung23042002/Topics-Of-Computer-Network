import styled from 'styled-components'

export const FighterImgStyled = styled.div<{ width: number; height: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: unset;
  width: ${(props: any) => props.width}px;
  height: ${(props: any) => props.width}px;
  overflow: hidden;
  position: relative;
`
