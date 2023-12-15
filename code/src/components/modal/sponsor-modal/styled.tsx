import { Modal } from 'antd'
import styled from 'styled-components'

export const SponsorModalStyled = styled(Modal)`
  .ant-modal-content {
    padding: 40px 30px;
    border-radius: 20px;

    @media screen and (max-width: 991px) {
      padding: 38px 10px 24px 10px;
    }
  }
`

export const VerticalModalContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 32px;
`

export const HorizontalModalContentStyled = styled.div``

export const CompanyLogoStyled = styled.div`
  width: 42px;
  height: 42px;
`

export const SponsorBannerVerticalStyled = styled.div`
  width: 352px;
  height: 537px;
`

export const SponsorBannerHorizontalStyled = styled.div`
  width: 100%;
  height: 268px;
  margin-bottom: 18px;

  @media screen and (max-width: 767px) {
    max-width: 100%;
    height: 120px;
    margin-bottom: 16px;
  }
`

export const SponsorInfomationStyled = styled.div`
  flex: 1;

  .tel {
    margin-bottom: 7px;
  }

  .email {
    margin-bottom: 16px;
  }
`

export const NameCompanyStyled = styled.div`
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 991px) {
    margin-bottom: 16px;
  }

  .company-name {
    width: fit-content;
    font-size: 20px;
    word-break: break-all;
  }
`

export const ContactStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  .label {
    width: 70px;
  }

  @media screen and (max-width: 991px) {
    .value {
      font-size: 12px;
      line-height: normal;
    }
  }
`

export const EmailStyled = styled.div`
  display: flex;
  align-items: center;
`

export const InfomationStyled = styled.div`
  .info {
    font-size: 16px;
    margin-bottom: 8px;
    @media screen and (max-width: 991px) {
      font-size: 14px;
    }
  }
`

export const InfomationContentStyled = styled.div<{ maxHeight: number }>`
  word-break: break-all;
  max-height: ${({ maxHeight }: any) => maxHeight}px;
  overflow-y: auto;
  color: #6f7d95;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media screen and (max-width: 991px) {
    font-size: 12px;
  }

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-thumb {
    border: 5px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 9999px;
    background-color: #aaaaaa;
  }

  & > pre {
    white-space: pre-wrap;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
