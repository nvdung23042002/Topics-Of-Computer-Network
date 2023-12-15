import button from '@/components/common/button'
import { List } from 'antd'
import styled from 'styled-components'
import Typography from '@/components/common/typography'
import Button from '@/components/common/button'

// export const ButtonActionAccountLevel = styled(Button)`
//   font-weight: 400;
//   font-size: 14px;
// `
export const ButtonActionAccountLevel = styled(button)`
  height: 30px;
  padding: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  width: fit-content;
  span {
    padding: 0px 15px;
  }
  border-radius: 999px;
  &.ant-btn-primary:disabled {
    border-color: ${(props) => props.theme.token.colorPrimary};
  }
`
export const ListStyled = styled(List)`
  .ant-list-item {
    border-block-end: unset;
  }
`
export const ListItemStyled = styled(List.Item)``
export const MessageSendSuccess = styled.div`
  font-size: 18px;
  color: #183b56;
  font-weight: 500;
  line-height: 24px;
  .email,
  .phone {
    color: #2969df;
  }
`
export const TitleStyled = styled(Typography.Title)`
  &.mobile {
    display: flex;
    align-items: center;
    gap: 6px;
    span {
      font-size: 16px;
      font-weight: 700;
      line-height: 26px;
    }
    .icon {
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`
export const ButtonStyled = styled(button)`
  &.ant-btn-primary:disabled {
    color: #fff;
    background-color: ${(props) => props.theme.token.colorPrimary};
    box-shadow: 0 2px 0 rgba(5, 255, 72, 0.06);
    opacity: 0.3;
    border-color: transparent;
  }
  width: fit-content;
  border-radius: 999px;
  height: fit-content;
  padding: 0 5px;
  span {
    padding: 0;
  }
`
export const HeaderMenuStyled = styled.div`
  /* margin-top: 16px;
  margin-bottom: 16px; */
  margin-bottom: 10px;
  .ant-typography {
    display: flex;
    align-items: center;
    span {
      font-size: 18px;
      padding: 0px;
      &.icon {
        padding-right: 0px;
      }
      &:nth-child(2) {
        padding-right: 10px;
      }
    }
    margin-bottom: 0px !important;
  }
  &.mobile {
    display: none;
    /* .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    } */
  }
  &.tablet {
    display: none;
    /* .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    } */
  }
  .btn-show-menu {
    width: fit-content;
    &.ant-btn-text:not(:disabled):active {
      background-color: transparent;
    }
    &.ant-btn:not(:disabled):focus-visible {
      outline: 4px solid transparent;
    }
  }

  @media screen and (max-width: 991px) {
    .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    }
    &.tablet,
    &.mobile {
      display: block;
    }
  }
  @media screen and (max-width: 575px) {
    .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    }
  }
`
export const ButtonIconStyled = styled(Button)`
  --font-size: 24px;
  width: fit-content;
  height: fit-content;
  padding: 0;
  box-sizing: border-box;
  border-color: transparent;
  box-shadow: unset;
  border-radius: 50%;
  background-color: transparent;
  .icon {
    padding: 0.25rem;
    font-size: var(--font-size);
    & svg {
      width: 24px;
      height: 24px;
    }
  }
`
