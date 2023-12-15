import styled from 'styled-components'

export const MatchListContainerStyled = styled.div`
  max-width: 740px;

  .ant-collapse-header {
    background-color: #e0e7f3 !important;
  }

  .ant-collapse-content {
    margin-top: unset;
  }

  @media screen and (max-width: 767px) {
    .ant-collapse-header {
      height: 38px;
      align-items: center !important;

      .ant-collapse-expand-icon {
        .ant-collapse-arrow {
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .ant-collapse-header-text {
      font-size: 12px !important;
      line-height: normal !important;
    }
  }
`
