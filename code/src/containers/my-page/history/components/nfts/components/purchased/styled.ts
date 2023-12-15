import { Collapse, List } from 'antd'
import styled from 'styled-components'

export const CollapseStyled = styled(Collapse)`
  background: transparent;
  &.ant-collapse-borderless > .ant-collapse-item {
    border: none;
    & > .ant-collapse-content > .ant-collapse-content-box {
      padding: 20px 0 0 0;
    }
  }
  @media screen and (max-width: 575px) {
    &.ant-collapse-borderless > .ant-collapse-item {
      border: none;
      & > .ant-collapse-content > .ant-collapse-content-box {
        padding: 0 0 0 0;
      }
    }
  }
`

export const PanelStyled = styled(Collapse.Panel)`
  margin-bottom: 24px;
  & > .ant-collapse-header {
    padding: 22px 25px !important;
    flex-flow: row-reverse;
    background: #ffffff;
    border: 1px solid #e4e4e4;
    border-radius: 8px !important;

    transition: border-color 400ms ease;
    &:hover {
      border-color: transparent;
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
        0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }

    .ant-collapse-expand-icon {
      transform: scale(1.2);
    }
  }
  @media screen and (max-width: 575px) {
    & > .ant-collapse-header {
      padding: 11px !important;
      &:hover {
        border: 1px solid #e4e4e4;
        box-shadow: unset;
      }
      .ant-collapse-expand-icon {
        transform: scale(1.1);
      }
    }
  }
`

export const TitleCollapse = styled.div`
  display: flex;
  align-items: baseline;
  .count-product {
    margin-left: 10px;
    color: ${(props) => props.theme.token.colorPrimary};
    font-size: 16px;
  }
  @media screen and (max-width: 575px) {
    .title {
      &.ant-typography {
        font-size: 14px;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
  .count-product {
    font-size: 14px;
  }
`
export const PurchasedContainer = styled.div`
  margin-top: 16px;
  padding: 10px;
  overflow-y: hidden;
  @media screen and (max-width: 575px) {
    padding: 0px;
  }
`
export const ContainerPanel = styled.div``
export const ListProduct = styled(List)`
  margin-top: 16px;
  .ant-col {
    padding-left: 8px;
    padding-right: 8px;
  }
  @media screen and (max-width: 575px) {
    .ant-col {
      padding-left: 4px;
      padding-right: 4px;
    }
  }
`
export const ButtonGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 6px;
  .btn-group-child {
    display: flex;
    gap: 5px;
  }
  @media screen and (max-width: 575px) {
    .btn-group-child {
      display: flex;
      gap: 9px;
      flex-direction: column;
    }
  }
`
