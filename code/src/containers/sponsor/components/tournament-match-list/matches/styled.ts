import styled from 'styled-components'

export const MatchStyled = styled.div`
  @media screen and (max-width: 775px) {
    .ant-collapse > .ant-collapse-item {
      .ant-collapse-header {
        height: 38px;
        .ant-collapse-header-text > div {
          font-size: 12px;
        }
        .ant-collapse-expand-icon {
          &,
          svg {
            height: 18px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 570px) {
  }
`
