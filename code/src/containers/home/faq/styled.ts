import typography from '@/components/common/typography'
import container from '@/components/container'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import { Collapse } from 'antd'
import styled from 'styled-components'

export const FaqStyled = styled.div`
  background-color: #fff;
  padding: 0 0 67px;

  @media screen and (max-width: 1439px) {
  }
  @media screen and (max-width: 995px) {
    padding: 0 0 40px;
  }
  @media screen and (max-width: 775px) {
    padding: 0 0 26px;
  }
`

export const ContainerStyled = styled(container)`
  & > .title {
    font-size: 34px;
    text-align: center;
    margin-bottom: 54px !important;
  }

  @media screen and (max-width: 1439px) {
    padding: 0 16px;
    & > .title {
      font-size: 28px;
      margin-bottom: 40px !important;
      .hight-light {
        height: 27px;
      }
    }
  }
  @media screen and (max-width: 995px) {
    & > .title {
      margin-bottom: 24px !important;
    }
  }
  @media screen and (max-width: 775px) {
    & > .title {
      font-size: 18px;
      margin-bottom: 12px !important;
      .hight-light {
        height: 20px;
      }
    }
  }
`

export const CollapseStyled = styled(Collapse)`
  background: transparent;
`

export const PanelStyled = styled(Collapse.Panel)`
  border-radius: 10px !important;
  border: 1px solid #d6e5e9 !important;
  overflow: hidden;
  background: #fff;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  & > .ant-collapse-header {
    padding: 20px 24px 20px 24px !important;
    flex-flow: row-reverse;
    background-color: transparent !important;
    transition: border-color 400ms ease;

    .ant-collapse-expand-icon {
      color: #2969df;
    }
  }
  & > .ant-collapse-content .ant-collapse-content-box {
    padding: 0px 24px 20px !important;
    color: ${(props) => props.theme.token.colorBorder};
  }

  @media screen and (max-width: 775px) {
    & > .ant-collapse-header {
      padding: 16px !important;
    }
    & > .ant-collapse-content .ant-collapse-content-box {
      padding: 0px 16px 16px !important;
    }
  }
`

export const TitleCollapse = styled(typography.Title)`
  font-weight: 700 !important;
  font-size: 18px !important;
  @media screen and (max-width: 755px) {
    font-size: 16px !important;
  }
`

export const ChevronRightIconStyled = styled(ChevronRightIcon)<{ active?: 'true' | 'false' }>`
  transition: transform 400ms ease;
  transform: ${(props) => (props.active === 'true' ? 'rotate(90deg)' : 'rotate(0)')};
`
