import Container from '@/components/container'
import styled from 'styled-components'

export const NewsDetailContainerStyled = styled(Container)`
  @media screen and (max-width: 1199px) {
    padding: 16px;
  }
`

export const NewsDetailStyled = styled.div`
  margin-top: 40px;
  margin-bottom: 99px;

  @media screen and (max-width: 1199px) {
    margin-top: 0;
    margin-bottom: 16px;
  }
`

export const NewsDetailTitleStyled = styled.div`
  font-size: 36px;
  font-style: normal;
  text-transform: capitalize;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;

  @media screen and (max-width: 1199px) {
    font-size: 24px;
    line-height: normal;
  }
`

export const NewsDetailContentStyled = styled.div`
  display: flex;
  gap: 82px;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    gap: 16px;
  }

  .col-left {
    flex: 1;
  }

  .col-right {
    width: 430px;

    @media screen and (max-width: 1199px) {
      width: 100%;
    }
  }
`

export const TypeAndDateStyled = styled.div`
  font-size: 14px;
  font-style: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 19px;
  margin-bottom: 19px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 24px;
  }
`

export const NewsBannerStyled = styled.div`
  width: 100%;
  height: 280px;
  margin-bottom: 30px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 24px;
  }
`

export const NewsContentStyled = styled.div`
  font-size: 14px;
  font-style: normal;
  line-height: 21.018px;
`

export const NewsLatestStyled = styled.div`
  margin-bottom: 87px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 24px;
  }
`

export const NewsLatestTitleStyled = styled.div`
  font-size: 26px;
  font-style: normal;
  letter-spacing: -0.5px;
  margin-bottom: 16px;

  & > div {
    line-height: 42.19px;
  }

  @media screen and (max-width: 1199px) {
    margin-bottom: 13px;
    font-size: 16px;
    line-height: normal;
  }
`

export const NewsLatestListStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;

  @media screen and (max-width: 1199px) {
    gap: 14px;
  }
`

export const NewsLatestItemStyled = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
`

export const NewsLatestImgStyled = styled.div`
  width: 118px;
  height: 62px;
  border-radius: 5px;
  overflow: hidden;
`

export const NewsLatestContentStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    letter-spacing: -0.5px;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: fit-content;
  }

  .create-at {
    font-size: 10px;
    font-style: normal;
  }
`

export const NewsSponsorStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div:nth-child(2) {
    margin-top: 0;
  }
`

export const NewsSponsorTitleStyled = styled.div`
  font-size: 26px;
  font-style: normal;
  letter-spacing: -0.5px;
`
