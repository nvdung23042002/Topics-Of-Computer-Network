import Container from '@/components/container'
import styled from 'styled-components'

export const NewsListContainerStyled = styled(Container)`
  @media screen and (max-width: 1199px) {
    padding: 0 16px;
  }
`

export const NewsListStyled = styled.div`
  margin-top: 40px;
  margin-bottom: 52px;

  @media screen and (max-width: 1199px) {
    margin-top: 16px;
    margin-bottom: 40px;
  }
`

export const FirstNewsStyled = styled.div`
  width: 526px;
  height: 582px;
  padding: 36px 32px 33px 32px;
  border-radius: 15px;
  border: 1px solid ${({ theme }: any) => theme.token.colorBorder3th};
`

export const FirstNewsImgStyled = styled.div`
  width: 100%;
  height: 270px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 16px;
`

export const NewsTypeStyled = styled.div`
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 12px;

  @media screen and (max-width: 1199px) {
    font-size: 12px;
    line-height: normal;
    margin-bottom: 1px;
  }
`

export const NewsTitleStyled = styled.div`
  font-size: 24px;
  font-style: normal;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;

  @media screen and (max-width: 1199px) {
    font-size: 12px;
    line-height: normal;
    -webkit-line-clamp: 3;
  }
`

export const NewsCreatedDateStyled = styled.div`
  font-size: 12px;
  font-style: normal;
  letter-spacing: 1px;
  text-transform: uppercase;

  @media screen and (max-width: 1199px) {
    font-size: 10px;
    line-height: normal;
  }
`

export const NewsLinkStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: fit-content;

  div {
    font-size: 16px;
    line-height: 23.17px;
  }

  svg > path {
    stroke: ${({ theme }: any) => theme.token.colorSecondary};
  }
`

export const SecondAndThirdNewsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`

export const NormalNewsStyled = styled.div`
  margin-top: 33px;

  .ant-spin-spinning {
    top: 50% !important;
    transform: translateY(-50%);
  }
`

export const NormalNewsTitleStyled = styled.div`
  font-size: 26px;
  font-style: normal;
  letter-spacing: -0.5px;
  margin-bottom: 16px;

  @media screen and (max-width: 1199px) {
    font-size: 18px;
    line-height: normal;
  }
`

export const NormalNewsRowStyled = styled.div<{ isEmptySponsorAds: any; isEmptyNormalNews: any }>`
  display: flex;
  gap: ${({ isEmptySponsorAds }: any) => (String(isEmptySponsorAds) === 'true' ? 0 : 22)}px;
  flex-wrap: nowrap;
  justify-content: ${({ isEmptyNormalNews }: any) => (String(isEmptyNormalNews) === 'true' ? 'end' : 'unset')};

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    gap: 24px;
  }
`

export const NormalNewsColStyled = styled.div`
  flex: 1;
`

export const SponsorAdsColStyled = styled.div``
