import { TabComponent } from '@/components/common/tab'
import styled from 'styled-components'

export const TournamentsListStyled = styled.div`
  .ant-divider {
    background-color: ${({ theme }: any) => theme.token.colorBg11th};
    margin: 0;
    margin-top: 24px;
  }

  .tournament-name {
    width: fit-content;
  }

  .ant-collapse-header {
    background-color: #e0e7f3 !important;
  }

  @media screen and (max-width: 767px) {
    .ant-collapse-header {
      height: 38px;
      align-items: center !important;

      .ant-collapse-header-text {
        font-size: 12px !important;
        line-height: normal !important;
      }

      .ant-collapse-expand-icon {
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`

export const BetListTabStyled = styled(TabComponent)`
  .ant-tabs-nav {
    margin-bottom: 24px;
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
        @media screen and (max-width: 767px) {
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

      .ant-tabs-tab:nth-child(2) {
        margin: 0;
      }

      .ant-tabs-tab.ant-tabs-tab-active {
        background-color: #de1d43;

        .ant-tabs-tab-btn {
          color: #fff;
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
    gap: 18px;
  }
`

export const FightersTitleStyled = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
`

export const FightersWrapper = styled.div``

export const TournamentsFighterListStyled = styled.div`
  display: grid;
  column-gap: 8px;
  row-gap: 10px;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
    justify-items: center;
  }
`
