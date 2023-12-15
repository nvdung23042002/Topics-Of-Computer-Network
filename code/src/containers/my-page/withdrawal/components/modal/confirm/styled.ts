import typography from '@/components/common/typography'
import { Button, Descriptions, Divider, Modal } from 'antd'
import styled from 'styled-components'

export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    overflow: hidden;
  }
`

export const ContainerInfo = styled.div`
  padding: 32px;
  padding-top: 0px;
  @media screen and (max-width: 575px) {
    padding: 16px;
    padding-top: 0px;
  }
`

export const DescriptionsStyled = styled(Descriptions)`
  padding: 16px 0px;
  .ant-descriptions-item-container {
    margin-top: 16px;
  }
  &.info-bank,
  &.info-crypto {
    .label {
      font-weight: 400;
      font-size: 14px;
      color: #6f7d95;
    }
  }
  .ant-descriptions-item {
    &:nth-child(even) {
      .ant-descriptions-item-container {
        margin-left: 16px;
      }
    }
  }
  .vertical {
    .ant-descriptions-item-container {
      flex-direction: column;
      gap: 4px;
    }
  }
  .ant-descriptions-header {
    margin-bottom: 0px;
  }
  .ant-descriptions-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
  }
  .color-success {
    color: #1cce66;
  }
  &.info-amount {
  }
  .ant-descriptions-item-label {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #183b56;
    &::after {
      display: none;
    }
    width: 50%;
  }
  .ant-descriptions-item-content {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    flex: 1;
  }
  @media screen and (max-width: 575px) {
    padding: 20px 0px;
  }
`

export const ButtonGroupModal = styled.div`
  margin-top: 16px;
  gap: 14px;
  display: flex;
  justify-content: end;
  &.modal-completed {
    justify-content: center;
    width: 100%;
  }
  @media screen and (max-width: 575px) {
    margin-bottom: 14px;
    gap: 5px;
  }
`
export const ButtonModalStyled = styled(Button)`
  &.ant-btn {
    height: fit-content;
    padding: 0;
    border-radius: 999px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    max-width: 168px;
    width: 100%;
    @media screen and (max-width: 575px) {
      max-width: 138px;
    }
  }
  .ant-btn-icon {
    span {
      padding: 0px;
    }
  }
  span {
    padding: 10px 0px;
  }
  @media screen and (max-width: 575px) {
    &.ant-btn {
      font-size: 14px;
      height: fit-content;
      span {
        padding: 8px 0px;
      }
    }
  }
`
export const ContainerTitleModalInfo = styled.div`
  border-bottom: 1px solid #f1f1f1;
  padding: 25px;
`

export const TitleStyled = styled(typography.Title)`
  &.title-modal.ant-typography {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 0 !important;
  }

  &.ant-typography {
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
  }
  margin-bottom: 30px !important;
`
export const DividerStyled = styled(Divider)`
  &.ant-divider-horizontal {
    margin-bottom: 1px;
    margin-top: 40px;
  }
  @media screen and (max-width: 575px) {
    &.ant-divider-horizontal {
      margin-top: 0px;
    }
  }
`
