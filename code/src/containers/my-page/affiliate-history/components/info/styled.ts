import { Button, Card } from 'antd'
import styled from 'styled-components'
export const CardContainer = styled(Card)`
  @media screen and (max-width: 768px) {
    .ant-card-body {
      padding: 14px;
    }
  }
`
export const HeaderUserInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 23px;
  .container-header-info {
    flex: 1;
    overflow-x: hidden;
  }
  @media screen and (max-width: 768px) {
    gap: 8px;
    .avatar {
      width: 60px !important;
      height: 60px !important;
      line-height: 60px !important;
    }
  }
`

export const ContainerUserInfo = styled.div`
  .name {
    color: #183b56;
    font-weight: 700;
    font-size: 18px;
    max-width: calc(100%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    /* padding-left: 10px; */
    margin-bottom: 4px;
    width: fit-content;
    @media screen and (max-width: 768px) {
      font-size: 16px;
      margin-bottom: 0px;
    }
  }

  .public-address {
    color: #6f7d95;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }
  .balance {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #2969df;
    margin-top: 4px;
    /* padding-left: 10px; */
    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }
  .text-info {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    color: #183b56;
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
    .wrap-copy-text {
      /* padding-left: 10px; */
      display: flex;
      align-items: center;
    }
    @media screen and (max-width: 768px) {
      .ant-btn {
        height: 30px;
        width: 30px;
        padding: 0px;
      }
    }
  }
  .form-affiliate-code {
    display: flex;
    gap: 6px;
    .code-input {
      flex: 1;
      margin-bottom: 0px;
    }
    .ant-form-item-explain-error {
      margin-left: 12px;
    }
  }
  .text-main {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
export const ContentContainer = styled.div`
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .label {
      width: 40%;
      display: flex;
      gap: 8px;
      span {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: #6f7d95;
      }
    }
    .value {
      flex: 1;
      font-weight: 500;
      .code {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: start;
      gap: 4px;
      .label,
      .value {
        width: 100%;
      }
      margin-top: 16px;
      .label {
        span {
          font-size: 14px;
        }
      }
      .value {
        .sub-text {
          font-size: 12px;
        }
        .text-main {
          font-size: 14px;
        }
        .code {
          font-size: 14px;
        }
      }
    }
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
    .text {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: #183b56;
    }
    .wrap-copy-text {
      padding-left: 0px;
      display: flex;
      align-items: center;
    }
    @media screen and (max-width: 768px) {
      .ant-btn {
        height: 30px;
        width: 30px;
        padding: 0px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
  .sub-text {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .btn-submit-form {
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`

export const ButtonStyled = styled(Button)`
  max-width: 119px;
  width: 100%;
  &.ant-btn {
    height: fit-content;
    padding: 0;
    border-radius: 999px;
  }
  span {
    padding: 11px 0px;
  }
  &.form-button {
    flex: 1;
  }
  &.ant-btn-primary:disabled {
    border-color: ${(props) => props.theme.token.colorPrimary};
    background: ${(props) => props.theme.token.colorPrimary};
    color: #fff;
    opacity: 0.7;
  }
  .ant-btn-icon {
    padding: 0px;
  }
  @media screen and (max-width: 768px) {
    span {
      font-size: 14px;
    }
  }
`
export const MessageSuccess = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`
