import { Modal } from 'antd'
import styled from 'styled-components'

export const ModalStyled = styled(Modal)`
  &.theme .ant-modal-content {
    text-align: center;
    max-width: 526px;
    margin: auto;
    .ant-modal-footer {
      text-align: center;
      .ok-btn {
        &:focus {
          outline-color: ${(props) => props.theme.token.colorPrimary};
        }
        background-color: ${(props) => props.theme.token.colorPrimary};
      }
    }
  }

  .ant-modal-content {
    padding: 0;
    border-radius: 20px;
    overflow: hidden;
    .ant-modal-header {
      padding: 30px 30px 18px;
      margin-bottom: 0px;
      .ant-modal-title {
        color: ${(props) => props.theme.token.colorText};
        font-size: 22px;
      }
    }
    .ant-modal-footer {
      .ant-btn {
        width: 45%;
        height: 46px;
        max-width: 160px;
      }
    }
    .ant-modal-close {
      color: ${(props) => props.theme.token.colorText};
      border-radius: 50%;
      top: 10px;
    }
    .ant-modal-body {
      padding: 0 30px 30px;
      span.ant-typography {
        font-size: 18px;
        display: block;
        color: ${(props) => props.theme.token.colorText};
      }
    }
    .ant-modal-footer {
      padding: 0 30px 30px;
    }
    @media screen and (max-width: 575px) {
      .ant-modal-body {
        padding: 0 18px 18px;
      }
    }
  }
`
export const ModalConfirmStyled = styled(Modal)`
  &.theme .ant-modal-content {
    .ant-modal-footer .ok-btn {
      &:focus {
        outline-color: ${(props) => props.theme.primary};
      }

      background-color: ${(props) => props.theme.primary};
    }
  }

  .ant-modal-content {
    padding: 0;

    .ant-modal-header {
      padding: 32px 32px 0;

      .ant-modal-title {
        color: ${(props) => props.theme.token.colorText};

        text-align: center;

        font-size: 20px;
      }
    }

    .ant-modal-footer {
      .ant-btn {
        min-width: 130px;
        height: 46px;
      }
    }

    .ant-modal-close {
      border-radius: 50%;
      top: 10px;
    }

    .ant-modal-body {
      padding: 30px 32px;

      span {
        font-size: 18px;
        color: ${(props) => props.theme.token.colorText};
      }
    }

    .ant-modal-footer {
      padding: 0 32px 32px;
    }
  }

  @media screen and (max-width: 775px) {
    .ant-modal-content {
      .ant-modal-body {
        span {
          font-size: 16px;
        }
      }
    }
  }
`
