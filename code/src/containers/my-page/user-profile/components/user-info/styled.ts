import button from '@/components/common/button'
import { Button, Card } from 'antd'
import styled from 'styled-components'

export const HeaderUserInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  .container-header-info {
    flex: 1;
    overflow-x: hidden;
  }
  @media screen and (max-width: 768px) {
    gap: 0px;
    margin-bottom: 15px;
  }
`
export const IconButton = styled(button)`
  color: ${(props: any) => props.theme.token.colorBorder} !important;
  margin-left: 4px;
  &:hover,
  &:active,
  &:focus {
    opacity: 0.8;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`
export const ContainerUserInfo = styled.div`
  .name {
    display: flex;
    align-items: center;
    & > span {
      line-height: normal;
    }
    overflow: hidden;
    .text {
      color: #183b56;
      font-weight: 700;
      font-size: 18px;
      max-width: calc(100% - 32px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      @media screen and (max-width: 768px) {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        max-width: calc(100% - 32px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    /* gap: 10px; */
    .btn-edit {
      margin: 0;
      padding: 0;
    }
    @media screen and (max-width: 768px) {
      margin-left: 8px;
    }
  }
  .private-address,
  .public-address {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media screen and (max-width: 768px) {
      margin-left: 8px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  .public-address {
    color: #6f7d95;
  }
  .balance {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #2969df;
    margin-top: 4px;
    @media screen and (max-width: 768px) {
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-top: 2px;
    }
  }
  .text-info {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    color: #183b56;
    display: inline-block;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .label-info {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #6f7d95;
  }
  .color-success {
    color: #1cce66;
  }
  .ant-descriptions-item-container {
    align-items: center;
  }
  .copy {
    .ant-btn {
      height: 30px;
      width: 30px;
      padding: 0px;
    }
    .ant-btn.ant-btn-icon-only {
      width: 30px;
    }
    .wrap-copy-text {
      display: flex;
      align-items: center;
    }
    @media screen and (max-width: 768px) {
      .wrap-copy-text {
        gap: 5px;
      }
      .ant-btn {
        height: 30px;
        width: 30px;
        padding: 0px;
        margin: 0px;
        border: unset;
        width: fit-content;
        .ant-btn-icon {
          /* svg {
          } */
        }
      }
    }
  }
  .private-key {
    .ant-btn {
      height: 30px;
      width: 30px;
      padding: 0px;
    }
    .ant-btn.ant-btn-icon-only {
      width: 30px;
    }
    .wrap-copy-text {
      display: flex;
      align-items: center;
    }
    @media screen and (max-width: 768px) {
      .wrap-copy-text {
        gap: 5px;
      }
      .ant-btn {
        height: 30px;
        width: 30px;
        padding: 0px;
        margin: 0px;
        border: unset;
        width: fit-content;
        .ant-btn-icon {
          /* svg {
          } */
        }
      }
    }
  }
`
export const SubInfoAccount = styled.div``

export const MyPageInfoAdvancedStyled = styled.div`
  margin: 24px 0;
  border-radius: 10px;
  background: #f6faff;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px;
  gap: 20px;
  flex-wrap: wrap;
  .info-account {
    display: flex;
    gap: 35px;
    flex-wrap: wrap;
    .title-label {
      color: #183b56;
      font-weight: 700;
      font-size: 18px;
      line-height: 26px;
      white-space: nowrap;
      .ant-typography {
        color: #183b56;
        font-weight: 700;
        font-size: 18px;
        line-height: 26px;
        white-space: nowrap;
      }
      &.level {
        span {
          line-height: 26px;
        }
      }
      &:first-child {
        display: flex;
        gap: 10px;
      }
      &.balance {
        gap: 4px !important;
        align-items: center;
      }
      &.total-ticket,
      &.total-ticket-lose {
        gap: 0px !important;
        align-items: center;
      }
      .ant-typography {
        max-width: 180px;
        width: fit-content;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      @media screen and (max-width: 1024px) {
        .ant-typography {
          max-width: 150px;
        }
      }
      @media screen and (max-width: 768px) {
        .ant-typography {
          max-width: 150px;
        }
      }
      @media screen and (max-width: 575px) {
        .ant-typography {
          max-width: 120px;
        }
      }
    }
    .content-value {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #6f7d95;
      white-space: nowrap;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      gap: 10px;
    }
    @media screen and (max-width: 575px) {
      width: 100%;
      gap: 0px;
      & > div:nth-child(1) {
        width: 50%;
      }
      & > div:nth-child(2) {
        width: 50%;
      }
      .title-label {
        font-size: 16px;
        font-weight: 700;
        line-height: normal;
        &:first-child {
          display: flex;
          gap: 4px;
          svg {
            width: 18px;
            height: 18px;
          }
        }
      }
      .content-value {
        font-size: 14px;
        font-weight: 400;
        line-height: normal;
        white-space: nowrap;
      }
    }
  }
  .group-btn-action {
    margin-top: 16px;
    display: flex;
    gap: 8px;
    @media screen and (max-width: 575px) {
      gap: 4px;
      max-width: 100%;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &.mobile {
    display: none;
  }
  @media screen and (max-width: 575px) {
    margin: 14px 0;
    margin-bottom: 8px;
    padding: 12px;
    display: none;
    &.mobile {
      display: block;
    }
  }
`
export const ButtonAction = styled(Button)`
  height: fit-content;
  padding: 0;
  border-radius: 999px;
  &.ant-btn-primary {
    box-shadow: unset;
  }
  span {
    padding: 10px 13px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    min-width: 95px;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      padding: 5px 14px;
    }
  }
  &.ant-btn-primary:disabled {
    border-color: ${(props) => props.theme.token.colorPrimary};
    background-color: ${(props) => props.theme.token.colorPrimary};
    opacity: 0.7;
    color: #ffff;
  }
`
export const ContainerContentUserInfo = styled.div`
  &.ja {
    .ant-descriptions-item.email {
      .ant-descriptions-item-label {
        width: 35%;
        /* padding-right: 30px; */
      }
    }
    .ant-descriptions-item.private-key {
      .ant-descriptions-item-label {
        width: 35%;
        /* padding-right: 30px; */
      }
    }
    .ant-descriptions-item.user-id {
      .ant-descriptions-item-label {
        width: 25%;
        /* padding-right: 30px; */
      }
    }
    .ant-descriptions-item.phone {
      padding-left: 16px;
      .ant-descriptions-item-label {
        width: 45%;
      }
    }
    .ant-descriptions-item.kyc {
      padding-left: 16px;
      .ant-descriptions-item-label {
        width: 45%;
      }
    }
    .ant-descriptions .ant-descriptions-item-container .ant-descriptions-item-content {
      align-items: start;
    }
  }
  &.en {
    .ant-descriptions-item.email {
      .ant-descriptions-item-label {
        width: 25%;
        /* padding-right: 30px; */
      }
    }
    .ant-descriptions-item.private-key {
      .ant-descriptions-item-label {
        width: 25%;
        /* padding-right: 30px; */
      }
    }
    .ant-descriptions-item.user-id {
      .ant-descriptions-item-label {
        width: 25%;
        /* padding-right: 30px; */
      }
    }
    .ant-descriptions-item.phone {
      padding-left: 16px;
      .ant-descriptions-item-label {
        width: 50%;
      }
    }
    .ant-descriptions-item.kyc {
      padding-left: 16px;
      .ant-descriptions-item-label {
        width: 50%;
      }
    }
    .ant-descriptions .ant-descriptions-item-container .ant-descriptions-item-content {
      align-items: start;
    }
  }

  @media screen and (max-width: 768px) {
    &.ja {
      .info-user-mobile {
        display: flex;
        flex-direction: column;
        gap: 4px;
        .item {
          display: flex;
          .label {
            width: 30%;
            .label-info {
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
          .value {
            width: 65%;
            display: flex;
            align-items: center;
            .text-info {
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              display: inline-block;
              max-width: 200px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .wrap-copy-text {
              .private-address {
                margin-left: 0px;
              }
              /* .wrap-copy-text {
            
            } */
              display: flex;
              align-items: center;
              gap: 5px;
              .ant-btn {
                height: 20px;
                padding: 0px;
                margin: 0px;
                border: unset;
                width: fit-content;
                /* .ant-btn-icon {
                svg {
                  width: 20;
                  height: 20px;
                }
              } */
              }
            }
            .icon {
              svg {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }
    &.en {
      .info-user-mobile {
        display: flex;
        flex-direction: column;
        gap: 4px;
        .item {
          display: flex;
          .label {
            width: 40%;
            .label-info {
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
          .value {
            width: 65%;
            display: flex;
            align-items: center;
            .text-info {
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              display: inline-block;
              max-width: 200px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .wrap-copy-text {
              .private-address {
                margin-left: 0px;
              }
              /* .wrap-copy-text {
            
            } */
              display: flex;
              align-items: center;
              gap: 5px;
              .ant-btn {
                height: 20px;
                padding: 0px;
                margin: 0px;
                border: unset;
                width: fit-content;
                /* .ant-btn-icon {
                svg {
                  width: 20;
                  height: 20px;
                }
              } */
              }
            }
            .icon {
              svg {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 575px) {
    &.ja,
    &.en {
      .info-user-mobile {
        display: flex;
        flex-direction: column;
        gap: 4px;
        .item {
          display: flex;
          .label {
            width: 50%;
            .label-info {
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
          .value {
            width: 50%;
            display: flex;
            align-items: center;
            .text-info {
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              display: inline-block;
              max-width: 100%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .wrap-copy-text {
              .private-address {
                margin-left: 0px;
              }
              /* .wrap-copy-text {
            
            } */
              display: flex;
              align-items: center;
              gap: 5px;
              .ant-btn {
                height: 30px;
                padding: 0px;
                margin: 0px;
                border: unset;
                width: 30px;
                .ant-btn-icon {
                  /* svg {
                  width: 20px;
                  height: 20px;
                } */
                }
              }
            }
            .icon {
              svg {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }
  }
`
export const CardStyled = styled(Card)`
  display: block;
  &.mobile {
    display: none;
    .ant-card-body {
      padding: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
    &.mobile {
      display: block;
    }
  }
  @media screen and (max-width: 575px) {
    display: none;
    &.mobile {
      display: block;
    }
  }
`
