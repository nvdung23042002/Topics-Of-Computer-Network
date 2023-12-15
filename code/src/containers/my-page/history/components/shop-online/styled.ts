import { Collapse } from 'antd'
import styled from 'styled-components'

const BLACK_1 = '#183B56'

const RED_1 = '#DE1D43'

const GRAY_1 = '#e4e4e4'

export const CollapseStyled = styled(Collapse)`
  background-color: transparent;

  .ant-collapse-item {
    border-bottom: none;
    margin-bottom: 10px;

    .ant-collapse-header {
      flex-direction: row-reverse;
      padding: 22px 22px 22px 25px;
      align-items: center;
      border-radius: 8px;
      border: 1px solid ${GRAY_1};

      .ant-collapse-expand-icon {
        padding-right: 0;
      }

      .svg-active {
        transform: rotate(0deg);
      }

      .svg-none {
        transform: rotate(-90deg);
      }
    }

    .ant-collapse-content {
      .ant-collapse-content-box {
        padding: 0;

        & > p {
          margin: 0;
        }
      }
    }

    &:last-child {
      border-radius: 8px;
      margin-bottom: 0px;

      .ant-collapse-header {
        border-radius: 8px;
      }
    }
  }
`

export const HeaderStyled = styled.div``
export const HeaderNameStyled = styled.div`
  display: flex;

  .name {
    color: ${BLACK_1};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .note {
    color: ${RED_1};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 20px;
  }
`
