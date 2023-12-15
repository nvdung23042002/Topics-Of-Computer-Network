import { Button, Pagination as PaginationAntd } from 'antd'

import styled from 'styled-components'

export const PaginationStyled = styled(PaginationAntd)`
  & .ant-pagination-item-active {
    background-color: ${(props) => props.theme.token.colorPrimary};
  }
  &.ant-pagination .ant-pagination-item-active a {
    color: #ffffff;
  }
  .ant-pagination-item {
    border: 1px solid #f1f1f1;
  }
  &.ant-pagination .ant-pagination-next .ant-pagination-item-link,
  &.ant-pagination .ant-pagination-prev .ant-pagination-item-link {
    border: 1px solid #f1f1f1;
  }
`
export const ButtonStyled = styled(Button)`
  border: 1px solid #f1f1f1;

  &.ant-btn.ant-btn-icon-only .anticon {
    font-size: 14px;
  }
`
export const PaginationContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  &.hidden {
    display: none;
  }
`
