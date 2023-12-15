import { TabComponent } from '@/components/common/tab'
import styled from 'styled-components'

export const TournamentMatchStyled = styled.div`
  & > .header {
    text-align: center;
    & > .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 100%;
      overflow: hidden;
      .image {
        min-width: 80px;
        max-width: 80px;
        height: 80px;
        background: #000;
        border: none;
      }
      .name {
        margin-left: 16px;
        font-size: 24px;
        color: #000;
        text-align: left;
      }
    }
  }
  @media screen and (max-width: 775px) {
    & > .header {
      & > .avatar {
        .image {
          min-width: 60px;
          max-width: 60px;
          height: 60px;
        }
        .name {
          font-size: 20px;
        }
      }
    }
  }

  @media screen and (max-width: 570px) {
    & > .header {
      & > .avatar {
        .image {
          min-width: 40px;
          max-width: 40px;
          height: 40px;
        }
        .name {
          font-size: 18px;
        }
      }
    }
  }
`

export const Tab = styled(TabComponent)`
  margin-top: 34px;
  .ant-tabs-nav-wrap {
    justify-content: center;
    .ant-tabs-nav-list {
      border-radius: 20px;
      overflow: hidden;
      padding: 4px;
      background: ${(props) => props.theme.token.colorBg2th};
      .ant-tabs-tab {
        width: 165px;
        height: 32px;
        justify-content: center;
        border-radius: 20px;
        font-weight: 500;
        font-size: 14px;
        &[data-node-key='1'].ant-tabs-tab-active {
          background: ${(props) => props.theme.token.colorPrimary};
          & .ant-tabs-tab-btn {
            color: #fff;
          }
        }
        &[data-node-key='2'].ant-tabs-tab-active {
          background: #fff;
          & .ant-tabs-tab-btn {
            color: ${(props) => props.theme.token.colorText};
          }
        }
      }
      .ant-tabs-ink-bar {
        display: none;
      }
      .ant-tabs-tab + .ant-tabs-tab {
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 775px) {
    margin-top: 22px;
    .ant-tabs-nav-wrap {
      .ant-tabs-nav-list {
        width: 100%;
        .ant-tabs-tab {
          width: 50%;
          height: 28px;
        }
      }
    }
  }
  @media screen and (max-width: 577px) {
    margin-top: 16px;
    .ant-tabs-nav-wrap {
      .ant-tabs-nav-list {
        .ant-tabs-tab {
          height: 26px;
          font-size: 12px;
        }
      }
    }
  }
`
