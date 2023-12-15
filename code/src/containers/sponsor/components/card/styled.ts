import { translateLeft } from '@/components/animations/styled'
import button from '@/components/common/button'
import styled from 'styled-components'

export const CardStyled = styled.div<{ match?: boolean }>`
  border-radius: 10px;
  border: 1px solid #d6e5e9;
  background: #fff;
  margin-bottom: ${(props) => (props.match ? 10 : 20)}px;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  .banline {
    background-color: #ffa928;
    display: flex;
    justify-content: space-between;
    padding: 7px 20px;
    .ant-typography {
      color: #000;
      margin-top: 0;
      &.date {
        font-weight: 500;
        font-size: 14px;
        &.mobile {
          display: none;
        }
      }
      &.fighter-name {
        font-size: 20px;
        line-height: 22px;
        font-weight: 800;
        font-style: italic;
        text-transform: uppercase;
        font-family: Arial, 'Noto Sans JP', sans-serif;
        flex: 1;
      }
    }
  }
  .card-content {
    padding: ${(props) => (props.match ? 12 : 16)}px 20px 0;
    text-align: center;
    & .title {
      margin-bottom: 8px !important;
      display: flex;
      justify-content: space-between;
      text-align: left;
      .status {
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        line-height: 14px;
        padding: 5px 12px;
        border-radius: 20px;
        height: 24px;
        &.one {
          background: #ffa928;
        }
        &.multi {
          background: #1c6fec;
        }
      }
    }
    & > .subtitle {
      margin-bottom: 0;
      text-align: right;
    }
    & > .subtitle > .more-button {
      display: inline-block;
      border: none;
      background: none;
      color: #2969df;
      font-size: 14px;
      font-weight: 400;
      padding: 0;
    }
  }
  @media screen and (max-width: 775px) {
    .card-content {
      padding: 12px 10px 0;
      & .title {
        font-size: 16px;
      }
    }
    .banline {
      padding: 5px;
      flex-wrap: wrap;
      .ant-typography {
        color: #000;
        margin-top: 0;
        &.date {
          display: none;
          font-size: 11px;
          &.mobile {
            display: block;
            width: 100%;
            text-align: center;
          }
        }
        &.fighter-name {
          font-size: 14px;
          font-style: italic;
        }
      }
    }
  }

  @media screen and (max-width: 570px) {
    .card-content {
      & .title {
        font-size: 14px;
      }
    }
  }
`

export const CardImageStyled = styled.div<{
  match?: boolean
  background?: string
}>`
  height: calc(600 / 1480 * 740px);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    background-image: ${(props) => (props.background ? `url(${props.background})` : undefined)};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    filter: brightness(0.5);
    z-index: 0;
  }

  .text {
    position: absolute;
    left: 50%;
    top: 22px;
    transform: translateX(-50%);
    z-index: 1;
    width: max-content;
    max-width: 90%;
    text-align: center;
    &-date,
    &-title,
    &-tournament-title,
    &-vs {
      margin-top: 0 !important;
      color: #ffffff;
      text-align: center;
    }
    &-date {
      font-size: 18px;
    }
    &-title {
      font-size: 22px;
    }
    &-tournament-title {
      font-size: 26px;
    }
    &-vs {
      font-size: 40px;
    }
  }

  .fighter-avatar {
    max-width: 30%;
    height: 100%;
    position: absolute;
    z-index: 1;
    object-fit: contain;
    &:nth-child(1) {
      left: 0;
      bottom: 0;
      object-position: left bottom;
    }
    &:nth-child(2) {
      right: 0;
      bottom: 0;
      object-position: right bottom;
    }
  }
  @media screen and (max-width: 1259px) {
    height: calc(600 / 1480 * (742 / 1259 * (100vw - 30px)));
    /* grid-template-columns: calc(742 / 1259 * (100vw - 30px)) calc(100% - (742 / 1259 * (100vw - 30px)) - 30px); */
  }
  @media screen and (max-width: 995px) {
    height: calc(600 / 1480 * (742 / 1259 * (100vw - 35px)));
  }
  @media screen and (max-width: 775px) {
    height: calc(600 / 1480 * (100vw - 32px));
    .text {
      &-date {
        font-size: 16px;
      }
      &-title {
        font-size: 16px;
      }
      &-tournament-title {
        font-size: 16px;
      }
      &-vs {
        font-size: 30px;
      }
    }
  }

  @media screen and (max-width: 570px) {
    .text {
      &-date {
        font-size: 12px;
      }
      &-title {
        font-size: 12px;
      }
      &-tournament-title {
        font-size: 12px;
      }
      &-vs {
        font-size: 20px;
      }
    }
  }
`
export const SponsorListStyled = styled.div<{ seconds?: number }>`
  &.sponsor-list {
    display: flex;
    column-gap: 24px;
    position: absolute;
    bottom: 12px;
    min-width: 100%;
    transform: translateX(-100%);
    animation: ${translateLeft('100%', '100%')} ${(props) => props.seconds ?? 0}s infinite linear;
    .img-container {
      background: #ffffff;
      border-radius: 50%;
      object-fit: cover;
      overflow: hidden;
      width: 50px;
      height: 50px;
      img {
        object-fit: cover;
      }
    }
  }

  @media screen and (max-width: 775px) {
    &.sponsor-list {
      .img-container {
        width: 40px;
        height: 40px;
      }
    }
  }

  @media screen and (max-width: 570px) {
    &.sponsor-list {
      .img-container {
        width: 30px;
        height: 30px;
      }
    }
  }
`

export const ButtonStyled = styled(button)<{ match?: boolean; active?: 'true' | 'false' }>`
  border-color: ${(props) => (props.match ? '#2969DF' : props.theme.token.colorPrimary)} !important;
  color: ${(props) =>
    props.active === 'true' ? '#ffffff' : props.match ? '#2969DF' : props.theme.token.colorPrimary} !important;
  background-color: ${(props) =>
    props.active === 'true' ? (props.match ? '#2969DF' : props.theme.token.colorPrimary) : '#ffffff'} !important;
  min-width: 180px;
  height: 46px;
  font-weight: 500;
  font-size: 16px;
  margin: 24px auto;
  &:hover {
    opacity: 0.7;
  }
  &:disabled {
    border-color: ${(props) => props.theme.token.colorText} !important;
    color: ${(props) => props.theme.token.colorText} !important;
    opacity: 0.5 !important;
  }
  @media screen and (max-width: 775px) {
    height: 40px;
  }
`
