import styled from 'styled-components'

export const TextPrimary700Styled = styled.div`
  font-weight: 700;
  color: ${(props: any) => props.theme.token.colorPrimary};
  line-height: normal;
`

export const TextPrimary500Styled = styled.div`
  font-weight: 500;
  color: ${(props: any) => props.theme.token.colorPrimary};
  line-height: normal;
`

export const TextPrimary400Styled = styled.div`
  font-weight: 400;
  color: ${(props: any) => props.theme.token.colorPrimary};
  line-height: normal;
`

export const Text400Styled = styled.div`
  font-weight: 400;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText};
`

export const Text500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText};
`

export const Text600Styled = styled.div`
  font-weight: 600;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText};
`

export const Text700Styled = styled.div`
  font-weight: 700;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText};
`

export const Text2th700Styled = styled.div`
  font-weight: 700;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText2th};
`

export const Text2th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText2th};
`

export const Text2th400Styled = styled.div`
  font-weight: 400;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText2th};
`

export const Text2th300Styled = styled.div`
  font-weight: 300;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText2th};
`

export const Text3th400Styled = styled.div`
  font-weight: 400;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText3th};
`

export const Text3th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText3th};
`

export const Text3th700Styled = styled.div`
  font-weight: 700;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText3th};
`

export const Text4th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText4th};
`

export const Text5th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText5th};
`

export const Text6th400Styled = styled.div`
  font-weight: 400;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText6th};
`

export const Text6th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText6th};
`

export const Text6th700Styled = styled.div`
  font-weight: 700;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText6th};
`

export const Text7th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText7th};
`

export const Text7th700Styled = styled.div`
  font-weight: 700;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText7th};
`

export const Text8th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText8th};
`

export const Text8th700Styled = styled.div`
  font-weight: 700;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText8th};
`

export const Text9th800Styled = styled.div`
  font-weight: 800;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText9th};
`

export const Text10th700Styled = styled.div`
  font-weight: 800;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText10th};
`

export const Text11th400Styled = styled.div`
  font-weight: 400;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText11th};
`

export const Text11th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText11th};
`

export const Text11th700Styled = styled.div`
  font-weight: 700;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText11th};
`

export const Text11th900Styled = styled.div`
  font-weight: 900;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText11th};
`

export const Text12th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText12th};
`

export const Text13th500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorText13th};
`

export const TextSecondary400Styled = styled.div`
  font-weight: 400;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorSecondary};
`

export const TextSecondary500Styled = styled.div`
  font-weight: 500;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorSecondary};
`

export const TextSecondary700Styled = styled.div`
  font-weight: 700;
  line-height: normal;
  color: ${(props: any) => props.theme.token.colorSecondary};
`

export const GridLayoutStyled = styled.div<{ gap: number; col: number }>`
  display: grid;
  gap: ${({ gap }: any) => `${gap}px`};
  grid-template-columns: repeat(${({ col }: any) => col}, 1fr);
`
