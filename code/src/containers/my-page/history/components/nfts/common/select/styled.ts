import { Select } from 'antd'
import styled from 'styled-components'

// export const SelectStyled = styled(Select)`
//   .ant-select-selector {
//     .ant-select-selection-item {
//       font-size: 18px;
//       font-weight: 700;
//       color: #183b56;
//     }
//   }
// `
export const SelectStyled = styled(Select)`
  .ant-select-selector {
    border-radius: 10px;
    padding: 12px 14px !important;
    height: fit-content !important;

    .ant-select-selection-item {
      font-size: 18px;
      font-weight: 700;
      color: #183b56;
    }
  }
  .ant-select-arrow {
    color: #183b56;
    font-size: 16px;
  }
`
export const ContainerSelected = styled.div`
  .ant-select-item {
    .ant-select-item-option-content {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: #183b56;
    }
  }
  .ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    .ant-select-item-option-content {
      color: #de1d43;
    }

    background-color: transparent;
  }
`
