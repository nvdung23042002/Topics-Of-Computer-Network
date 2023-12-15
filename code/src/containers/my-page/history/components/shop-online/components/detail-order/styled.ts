import { Modal, Table } from 'antd'
import styled from 'styled-components'

export const ModalDetailOrderStyled = styled(Modal)`
  padding-bottom: 0;

  .ant-modal-content {
    padding: 30px 16px 30px 30px;

    .ant-modal-header {
      .ant-modal-title {
        color: #183b56;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
`

export const ContentModalStyled = styled.div``

export const InfoStyled = styled.div`
  .row-info {
    color: #183b56;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: flex;

    &:not(:first-child) {
      margin-top: 5px;
    }

    .left-info {
      min-width: 120px;
    }

    .right-info {
      &.success {
        color: #1cce66;
        font-weight: 500;
      }

      &.error {
        color: #ea1313;
        font-weight: 500;
      }

      &.inprogess {
        color: #2969df;
        font-weight: 500;
      }
    }
  }
`

export const TableProduct = styled.div`
  margin-top: 15px;

  .title {
    color: #183b56;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`

export const TableStyled = styled(Table)`
  margin-top: 5px;

  .ant-table .ant-table-container {
    .ant-table-thead {
      .ant-table-cell {
        border: none;
        background-color: transparent;
        padding: 15px 0;

        color: #183b56;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 20px;

        &::before {
          display: none;
        }
      }
    }

    .ant-table-tbody {
      .ant-table-cell {
        padding: 15px 0;
      }
    }
  }
`

export const TableInfoProductStyled = styled.div`
  display: flex;

  .image {
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    height: 80px;
    max-width: 80px;
    min-width: 80px;

    img {
      object-fit: contain;
    }
  }

  .detail {
    width: calc(100% - 80px);
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;

    .detail-title {
      color: #183b56;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      overflow: hidden;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .detail-size {
      color: #6f7d95;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`

export const TotalPriceStyled = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;

  .label {
    color: #de1d43;
    text-align: right;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .value {
    margin-left: 10px;
    color: #de1d43;
    text-align: right;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`
