import { Modal } from 'antd'
import styled from 'styled-components'

export const PolicyModal = styled(Modal)`
  background: #fff;
  border-radius: 20px;
  padding: 0;
  overflow: hidden;
  .ant-modal-content {
    padding: 32px 0;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    .ant-modal-header {
      margin-bottom: 22px;
      padding: 0 44px;
      .ant-modal-title {
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        color: ${(props) => props.theme.token.colorText};
      }
    }
    .ant-modal-body {
      overflow: hidden auto;
      padding: 0 28px 0 44px;
      .policy-content {
        color: #000000;
        font-size: 16px;
      }
      @media screen and (max-width: 775px) {
        padding: 0 14px;
      }
    }
    .ant-modal-footer {
      margin-top: 32px;
      padding: 0 44px;
      button.ant-btn {
        height: 46px;
        min-width: 181px;
        font-weight: 400;
        font-size: 16px;
        & + .ant-btn:not(.ant-dropdown-trigger) {
          margin-inline-start: 20px;
        }
      }
      @media screen and (max-width: 775px) {
        margin-top: 22px;
        padding: 0 14px;
        button.ant-btn {
          min-width: calc(50% - 10px);
        }
      }
    }
  }
`
