import button from '@/components/common/button'
import container from '@/components/container'
import styled from 'styled-components'

export const NewsStyled = styled.div``

export const ContainerStyled = styled(container)<{ length: number }>`
  text-align: center;
  border-bottom: 1px ${(props) => props.theme.token.colorBorder3th} solid;
  padding-bottom: 36px;
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 34px;
      text-align: left;
    }
    .button-box {
      display: flex;
      column-gap: 15px;
    }
  }

  .center {
    .slick-arrow {
      display: none !important;
    }
    .slick-list {
      padding-top: 35px !important;
      padding-bottom: 35px !important;
    }

    @media screen and (min-width: 577px) {
      ${(props) =>
        props.length > 3 &&
        `
      .slick-track .slick-slide:not(.slick-center.slick-current) {
        transform: translateX(-16px);
      }
      .slick-center.slick-current {
        transform: scale(1.1);
        transition: scale .4s ease-out;
        .news-card {
          border: 2px solid #2969df;
          margin: 0 auto;
          .footer {
            color: #2969df;
          }
        }
        & + .slick-slide {
          transform: translateX(16px) !important;
          & + .slick-slide {
            transform: translateX(16px) !important;
          }
        }
      }
    `}
    }
  }

  .news-card {
    padding: 15px;
    display: flex;
    flex-direction: column;
    border: 1px solid #d6e5e9;
    border-radius: 15px;
    background: #fff;
    width: 388px;
    height: 448px;
    max-width: 100%;
    max-height: calc(70vw + 100px);
    margin: auto;
    &:hover {
      transition: box-shadow 0.4s ease-in;
      box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.25);
    }
    .img-container {
      width: 100%;
      min-height: 208px;
      max-height: 208px;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
      img {
        border-radius: 15px;
      }
    }
    .content {
      flex: 1;
      padding: 10px 0;
      text-align: left;
      & .category {
        font-size: 14px;
        color: #2969df;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .title {
        font-weight: 500;
        margin-top: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        width: fit-content;
        font-size: 28px;
      }
      & > .time {
        font-size: 12px;
        font-weight: 500;
        color: #a8aeba;
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #2969df;

      & > .redirect-text,
      & > button {
        color: #2969df;
        font-size: 16px;
        font-weight: 400;
      }
    }
  }

  @media screen and (max-width: 1439px) {
    .toolbar {
      padding: 0 16px;
      .title {
        font-size: 28px;
        .hight-light {
          height: 27px;
        }
      }
    }
    .news-card {
      width: 295px;
      height: 395px;
      padding: 12px;
      .img-container {
        min-height: 168px;
        max-height: 168px;
      }
      .content {
        & .title {
          font-size: 24px;
        }
      }
      .footer {
        & > .redirect-text {
          font-size: 14px;
        }
      }
    }
  }
  @media screen and (max-width: 995px) {
    .news-card {
      width: 245px;
      height: 345px;
      padding: 8px;
      .img-container {
        min-height: 150px;
        max-height: 150px;
      }
      .content {
        & .title {
          font-size: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 775px) {
    .toolbar {
      display: block;
      .title {
        font-size: 18px;
        text-align: center;
        .hight-light {
          height: 20px;
        }
      }
      .button-box {
        display: none;
      }
    }
    .news-card {
      width: 215px;
      height: 248px;
      padding: 8px;
      .img-container {
        min-height: 111px;
        max-height: 111px;
      }
      .content {
        padding: 8px 0 0;
        & .category {
          font-size: 12px;
        }
        & .title {
          font-size: 14px;
          -webkit-line-clamp: 2;
        }
      }
      .footer {
        & > .redirect-text {
          font-size: 12px;
        }
      }
    }
  }
`
export const ButtonStyled = styled(button)`
  min-width: 114px;
  height: 44px;
  font-weight: 400;
  font-size: 16px;
  @media screen and (max-width: 775px) {
    height: 40px;
  }
`
export const ButtonSlideStyled = styled(button)`
  height: 50px;
  width: 50px !important;
  color: ${(props) => props.theme.token.colorBorder};
  border-radius: 1px solid ${(props) => props.theme.token.colorBorder};
  display: flex;
  justify-content: center;
  align-items: center;
`
