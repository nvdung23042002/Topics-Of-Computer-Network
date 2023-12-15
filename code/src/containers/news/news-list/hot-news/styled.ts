import styled from 'styled-components'

export const HotNewsStyled = styled.div`
  .slick-slider {
    .slick-slide {
      & > div {
        display: flex;
        justify-content: center;
      }
    }

    .slick-dots {
      li {
        margin: 0;
      }

      li button::before {
        font-size: 10px;
        color: #d9d9d9;
      }

      li.slick-active button::before {
        font-size: 10px;
        color: #de1d43;
      }
    }
  }
`

export const HotNewsTitleStyled = styled.div`
  font-size: 36px;
  font-style: normal;
  letter-spacing: -0.5px;
  margin-bottom: 32px;

  @media screen and (max-width: 1199px) {
    font-size: 18px;
    line-height: normal;
    margin-bottom: 8px;
  }
`

export const HotNewsContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const HotNewsItemStyled = styled.div`
  border: 1px solid ${({ theme }: any) => theme.token.colorBorder3th};
  padding: 25px 26px;
  border-radius: 15px;
  display: flex;
  align-items: stretch;
  gap: 22px;
  height: 279px;
`

export const HotNewsItemImgStyled = styled.div`
  width: 300px;
  height: 229px;
  border-radius: 10px;
  overflow: hidden;
`

export const HotNewsItemContentStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const HotNewsMobileStyled = styled.div`
  width: 215px !important;
  height: 226px;
  border: 1px solid #d6e5e9;
  border-radius: 15px;
  padding: 8px;
  display: flex !important;
  flex-direction: column;

  .news-image {
    width: 100%;
    height: 119px;
    margin-bottom: 8px;
    border-radius: 10px;
    overflow: hidden;
  }

  .news-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: space-between;
    flex-grow: 1;

    .created-at {
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }
`
