import { Breadcrumb } from 'antd'
import styled from 'styled-components'

export const BreadcrumbAntdStyed = styled(Breadcrumb)`
  @media screen and (max-width: 767px) {
    margin-bottom: 4px;
  }

  ol {
    align-items: center;

    .ant-breadcrumb-link {
      height: fit-content;
    }

    .ant-breadcrumb-link:hover {
      background-color: unset;
    }

    li:nth-child(1) {
      border: none;

      div {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 0;
        border: none;
        cursor: pointer;

        @media screen and (max-width: 767px) {
          gap: 6px;
        }
      }
    }
  }
`

export const BreadcrumbContentStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media screen and (max-width: 767px) {
    gap: 6px;
  }

  .match-name {
    font-size: 24px;
    line-height: 35px;

    @media screen and (max-width: 767px) {
      font-size: 16px;
      line-height: normal;
    }
  }
`
