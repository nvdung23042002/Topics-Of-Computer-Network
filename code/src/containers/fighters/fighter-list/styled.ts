import Container from '@/components/container'
import Input from '@/components/common/input'
import { TabComponent } from '@/components/common/tab'
import styled from 'styled-components'

export const FighterListContainerStyled = styled(Container)`
  @media screen and (max-width: 1199px) {
    padding: 0 16px 16px 16px;
  }
`

export const FighterListTitleStyled = styled.div``

export const FighterListTabStyled = styled(TabComponent)`
  margin-top: 40px;

  @media screen and (max-width: 1199px) {
    margin-top: 16px;
  }

  .ant-tabs-nav-wrap {
    justify-content: center;

    .ant-tabs-nav-list {
      background-color: ${({ theme }: any) => theme.token.colorBg2th};
      border-radius: 20px;
      padding: 4px;

      .ant-tabs-tab {
        width: 165px;
        justify-content: center;
        padding: 6px 0;
        border-radius: 16.5px;
        margin: 0;

        @media screen and (max-width: 767px) {
          width: 111px;
          padding: 5px 0;
        }

        .ant-tabs-tab-btn {
          font-weight: 500;
          font-size: 14px;
          color: ${({ theme }: any) => theme.token.colorText3th};
          text-transform: capitalize;
          line-height: 20px;

          @media screen and (max-width: 767px) {
            font-size: 12px;
            line-height: normal;
          }
        }
      }

      .ant-tabs-tab.ant-tabs-tab-active {
        background-color: ${({ theme }: any) => theme.token.colorPrimary};

        .ant-tabs-tab-btn {
          color: ${({ theme }: any) => theme.token.colorText2th};
        }
      }
    }
  }

  .ant-tabs-ink-bar {
    display: none;
  }

  .ant-collapse-content-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`

export const FighterInputStyled = styled(Input)`
  width: 503px;
  height: 42px;
  border-radius: 21px;
  max-width: 100%;

  @media screen and (max-width: 767px) {
    width: 343px;
  }
`
