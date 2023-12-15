import ButtonCommon from '@/components/common/button'
import styled from 'styled-components'

export const SecondStepStyled = styled.div`
  .template {
    margin-top: 30px;

    @media screen and (max-width: 1199px) {
      flex-direction: column;
    }
  }

  .active {
    outline: 2px solid ${({ theme }: any) => theme.token.colorPrimary} !important;
  }
`

export const SecondStepChooseTpStyled = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    gap: 16px;
  }
`

export const TemplateWrapStyled = styled.div`
  flex: 1;
  width: 100%;
`

export const SecondStepControlStyled = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  .choose-template {
    font-size: 24px;
  }

  @media screen and (max-width: 1199px) {
    .breadcrumb-mobile {
      display: flex;
      align-items: center;
      gap: 4px;

      .choose-template {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 26px;
      }
    }
  }
`

export const ContinueBtnStyled = styled(ButtonCommon)`
  width: 154px;
  border: none;
  background-color: ${({ theme }: any) => theme.token.colorPrimary};
  padding: 13px 0;
  height: auto;
  border-radius: 100px;

  @media screen and (max-width: 1199px) {
    width: 100%;
    margin-top: 44px;
    margin-bottom: 143px;
  }

  & > div {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.3px;
  }
`

export const VerticalTemplateStyled = styled.div`
  width: 100%;
  /* max-width: 430px; */
  height: 333px;
  outline: 1px solid ${({ theme }: any) => theme.token.colorBorder6th};
  border-radius: 10px;
  padding: 26px 20px;
  display: flex;
  gap: 20px;
`

export const ImgVerticalStyled = styled.div`
  width: 132px;
  height: 100%;
  border-radius: 5px;
  background-color: ${({ theme }: any) => theme.token.colorBg14th};
`

export const ContentVerticalStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ContentGroupVerticalStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const HorizontalTemplateStyled = styled.div`
  width: 100%;
  /* max-width: 430px; */
  height: 333px;
  outline: 1px solid ${({ theme }: any) => theme.token.colorBorder6th};
  border-radius: 10px;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ImgHorizontalStyled = styled.div`
  width: 100%;
  height: 113px;
  background-color: ${({ theme }: any) => theme.token.colorBg14th};
  border-radius: 5px;
  margin-bottom: 17px;
`

export const ContentTopHorizontalStyled = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentBottomHorizontalStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`

export const NameTemplateStyled = styled.div<{ active: any }>`
  text-align: center;
  margin-top: 21px;
  font-size: 16px;
  line-height: 22px;

  @media screen and (max-width: 1199px) {
    margin-top: 16px;
  }

  & > div {
    color: ${({ active, theme }: any) => (String(active) === 'true' ? theme.token.colorPrimary : 'none')} !important;
  }
`

export const LogoNameStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
`

export const LogoStyled = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({ theme }: any) => theme.token.colorBorder};
`

export const ContentStyled = styled.div<{ width?: number | undefined; flex?: number | undefined }>`
  width: ${({ width }: any) => (width ? `${width}px` : '100%')};
  height: 18px;
  border-radius: 5px;
  background-color: ${({ theme }: any) => theme.token.colorBg14th};
  flex: ${({ flex }: any) => (flex ? 1 : 'none')};
`
