import { Descriptions, Divider } from 'antd'
import styled from 'styled-components'

export const ContainerTicketBet = styled.div`
  width: 100%;
  background: #f6faff;
  border-radius: 5px;
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`
export const DescriptionsStyled = styled(Descriptions)`
  .ant-descriptions-item {
    padding-bottom: 0px !important;
  }
  &.ant-descriptions .ant-descriptions-item-label::after {
    display: none;
  }
`
export const BottomContent = styled.div`
  display: flex;
  align-items: center;
  & > div:first-child {
    flex: 1;
    justify-content: start;
    width: 100%;
    overflow-x: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    .table-info-ticket {
      /* display: flex;
      justify-content: start;
      gap: 100px; */
      max-width: 100%;
      .item {
        display: inline-block;
        margin-right: 30px;
        .label {
          white-space: nowrap;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          color: #6f7d95;
        }
        .value {
          white-space: nowrap;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          color: #183b56;
          text-align: right;
        }
      }
      @media screen and (max-width: 768px) {
        gap: 5px;
        flex-direction: column;
        .item {
        }
      }
    }
  }
  & > div {
    width: fit-content;
    display: flex;
    justify-content: end;
  }

  padding: 0px 15px;
  padding-bottom: 10px;
  @media screen and (max-width: 768px) {
    align-items: end;
  }
`
export const TopContent = styled.div`
  & > div:first-child {
    display: flex;
    justify-content: space-between;

    padding-bottom: 10px;
  }
  .ant-tooltip {
    .ant-tooltip-inner {
      margin-left: 10px;
      white-space: break-spaces;
    }
  }
  .match-name {
    font-size: 14px;
    font-weight: 500;
    color: #183b56;
    max-width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .date-time {
    font-size: 14px;
    font-weight: 400;
  }
  .name-winner {
    display: flex;
    gap: 9px;
    overflow: hidden;
    width: 100%;
    span {
      display: inline-block;
      white-space: nowrap;
    }
    .name {
      max-width: 50%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  & > div:last-child {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  padding: 10px 15px;
  padding-bottom: 0px;
`
export const DividerStyled = styled(Divider)`
  margin: 10px 0;
`
export const RateStyled = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  padding: 0px 12px;
  line-height: 24px;
  background: #de1d43;
`
