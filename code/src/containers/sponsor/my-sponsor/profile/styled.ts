import { Descriptions } from 'antd'
import styled from 'styled-components'

export const SponsorProfileStyled = styled.div`
  overflow: hidden;

  .ant-card-body {
    padding: 14px 14px 19px 14px;
  }
`

export const SponsorProfileTitleStyled = styled.div`
  color: #183b56;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px;
  margin-bottom: 16px;
`

export const ContainerSponsorInfo = styled.div`
  .name {
    color: #183b56;
    font-weight: 700;
    font-size: 18px;
    max-width: calc(100% - 32px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    margin-bottom: 4px;
    @media screen and (max-width: 768px) {
      font-size: 16px;
      margin-bottom: 0px;
    }
  }
  .public-address {
    color: #6f7d95;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  .balance {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #2969df;
  }
  .text-info {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    color: #183b56;
    width: max-content;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    display: block;

    @media screen and (max-width: 1199px) {
      font-size: 14px;
      line-height: normal;
    }
  }
  .text-link {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    max-width: 260px;

    @media screen and (max-width: 1199px) {
      font-size: 14px;
      line-height: normal;
    }
  }
  .label-info {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #6f7d95;
    white-space: nowrap;

    @media screen and (max-width: 1199px) {
      font-size: 14px;
      line-height: normal;
    }
  }
  .color-success {
    color: #1cce66;
  }
  .ant-descriptions-item-container {
    align-items: center;
  }

  @media screen and (max-width: 1199px) {
    .hp-url {
      .ant-typography {
        display: flex;
        align-items: center;
      }
    }
  }
`
export const HeaderSponsorInfo = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;

  @media screen and (max-width: 1199px) {
    gap: 8px;
  }

  .container-header-info {
    flex: 1;
    overflow-x: hidden;
    display: flex;
  }
  .btn-icon {
    &.ant-btn-icon-only {
      width: 32px;
      height: 32px;
    }
    svg {
      width: 22px;
      height: 22px;
    }
  }
`
export const DescriptionsStyled = styled(Descriptions)`
  .ant-descriptions-item {
    padding-bottom: 8px !important;
  }

  .ant-descriptions-item-container {
    @media screen and (max-width: 1199px) {
      gap: 20px;
      align-items: center;
    }

    .ant-descriptions-item-label {
      width: 150px;

      @media screen and (max-width: 1199px) {
        width: 115px;
      }
    }
    .ant-descriptions-item-content {
      flex: 1;

      @media screen and (max-width: 1199px) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
      }
    }
  }
`
