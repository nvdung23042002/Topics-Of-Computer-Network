import styled from 'styled-components'
import ButtonCommon from '@/components/common/button'
import Input from '@/components/common/input'
import { UploadComponent } from '@/components/upload'

export const ThirdStepStyled = styled.div`
  width: 100%;

  .ant-spin {
    top: 50% !important;
    transform: translateY(-50%);
  }
`

export const ThirdStepControlStyled = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  .edit-template {
    font-size: 24px;
    line-height: normal;
  }

  @media screen and (max-width: 1199px) {
    .breadcrumb-mobile {
      display: flex;
      gap: 4px;
      align-items: center;

      .edit-template,
      .choose-template {
        font-size: 16px;
        line-height: normal;
      }
    }
  }
`

export const PreviewBtnStyled = styled(ButtonCommon)`
  width: 124px;
  border: none;
  background-color: ${({ theme }: any) => theme.token.colorSecondary};
  height: 44px;
  border-radius: 50px;

  @media screen and (max-width: 1199px) {
    width: 100%;
  }

  & > div {
    display: none;
  }

  &:is(:hover, :focus, :active) {
    box-shadow: none;
  }

  & > span {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.3px;
    font-style: normal;
    color: ${({ theme }: any) => theme.token.colorText2th};
  }
`

export const ThirdStepContentStyled = styled.div`
  margin-top: 32px;

  @media screen and (max-width: 1199px) {
    margin-top: 24px;
  }

  .ant-form-item {
    margin: 0;
  }

  .ant-form-item-label {
    padding-bottom: 5px;

    .ant-form-item-required {
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      color: ${({ theme }: any) => theme.token.colorText3th};
      flex-direction: row-reverse;
    }
  }

  .title {
    margin-bottom: 24px;

    @media screen and (max-width: 1199px) {
      margin-bottom: 16px;
    }
  }

  .email {
    margin-bottom: 16px;
  }

  .homepage-url {
    margin-bottom: 16px;
  }

  .ios {
    margin-bottom: 16px;
  }

  .android {
    margin-bottom: 16px;
  }

  .infomation {
    flex-grow: 1;

    .ant-form-item-control {
      height: 174px;
    }

    .ant-row {
      height: 100%;
      flex-wrap: nowrap;

      .ant-form-item-control-input {
        height: 100%;

        .ant-form-item-control-input-content {
          height: 100%;
        }
      }

      .ant-input {
        border: 1px solid ${({ theme }: any) => theme.token.colorBorder5th};
        height: 100% !important;
        resize: none;

        @media screen and (max-width: 1199px) {
          height: 174px !important;
        }
      }
    }
  }

  .ant-input-status-success {
    border: 1px solid ${({ theme }: any) => theme.token.colorBorder5th};
  }

  .ant-input:is(:hover, :active, :focus) {
    border: 1px solid ${({ theme }: any) => theme.token.colorBorder5th};
    box-shadow: none;
  }
`

export const PhoneGroupStyled = styled.div`
  .phone {
    margin-bottom: '26px';
    flex: 1;
  }

  .phone-error {
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: opacity 1s, max-height 1s;
    font-size: 12px;
    color: #ff4d4f;
  }

  .hide.phone-error {
    height: 26px;
    opacity: 1;
  }
`

export const AntInputStyled = styled(Input)<{ width?: any; flex?: any }>`
  width: ${({ width }: any) => (width ? `${width}px` : '100%')};
  flex: ${({ flex }: any) => (flex ? flex : 'none')};
  height: 46px;
  border-radius: 33px;
  border: 1px solid ${({ theme }: any) => theme.token.colorBorder5th};

  @media screen and (max-width: 1199px) {
    width: 100%;
  }
`

export const ItemGroupStyled = styled.div`
  display: flex;
  align-items: stretch;
  gap: 49px;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    gap: 24px;
  }
`

export const SponsorBannerStyled = styled.div`
  @media screen and (max-width: 1199px) {
    width: fit-content;
    margin: 0 auto;
  }

  .upload-banner {
    .ant-row {
      flex-direction: column-reverse;
      gap: 10px;

      .ant-form-item-label {
        display: flex;
        justify-content: center;
      }
    }
  }
`

export const SponsorUploadStyled = styled(UploadComponent)`
  width: 400px !important;
  height: 548px;

  @media screen and (max-width: 1199px) {
    width: 343px !important;
    height: 469.91px;
  }

  .ant-upload {
    width: 100% !important;
    height: 100% !important;
    background-color: #eff4fb;
  }

  .sub-text {
    width: 326px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .blue-text {
      color: #2969df;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }

    .grey-text {
      color: #64748b;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    }
  }
`

export const OtherContentStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const LogoCompanyUploadStyled = styled(UploadComponent)`
  width: 94px !important;
  height: 94px;

  .ant-upload {
    width: 100% !important;
    height: 100% !important;
    background-color: #eff4fb;
  }

  .trash-icon {
    top: -20px !important;
    right: 35px !important;

    @media screen and (max-width: 1199px) {
      top: -15px !important;
      right: 40px !important;
    }
  }
`

export const LogoAndNameStyled = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 25px;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    margin-bottom: 16px;
  }

  .upload-logo {
    margin-bottom: 18px;

    .ant-row {
      flex-direction: column-reverse;
    }

    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      display: none;
    }

    .upload-logo-label {
      display: flex;
      align-items: center;
      gap: 8px;

      .asterisk {
        display: inline-block;
        margin-inline-end: 4px;
        color: #ff4d4f;
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
      }
    }
  }

  .logo-name {
    flex: 1;

    @media screen and (max-width: 1199px) {
      width: 100%;
    }
  }
`

export const LogoUploadItemStyled = styled.div``

export const GroupBtnStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    gap: 16px;
  }
`

export const CancelBtnStyled = styled(ButtonCommon)`
  height: 44px;
  width: 154px;
  border-radius: 100px;
  border: 1px solid ${({ theme }: any) => theme.token.colorText} !important;

  @media screen and (max-width: 1199px) {
    width: 100%;
  }

  & > div {
    display: none;
  }

  &:is(:hover, :focus, :active) {
    border: 1px solid ${({ theme }: any) => theme.token.colorText} !important;
    box-shadow: none;
  }

  & > span {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.3px;
    font-style: normal;
    color: ${({ theme }: any) => theme.token.colorText};
  }
`

export const SaveBtnGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 1199px) {
    flex-direction: column;
    width: 100%;
  }

  & > .ant-btn-default[disabled]:nth-child(1) {
    background-color: ${({ theme }: any) => theme.token.colorBgRewardWon} !important;
    opacity: 0.5;
  }

  & > .ant-btn-default[disabled]:nth-child(2) {
    background-color: ${({ theme }: any) => theme.token.colorPrimary} !important;
    opacity: 0.5;
  }
`

export const SavePublicBtnStyled = styled(ButtonCommon)`
  background-color: ${({ theme }: any) => theme.token.colorBgRewardWon};
  border: none;
  height: 44px;
  width: 154px;
  border-radius: 100px;

  @media screen and (max-width: 1199px) {
    width: 100%;
  }

  & > div {
    display: none;
  }

  &:is(:hover, :focus, :active) {
    box-shadow: none;
  }

  & > span {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.3px;
    font-style: normal;
    color: ${({ theme }: any) => theme.token.colorText2th};
  }
`

export const SavePrivateBtnStyled = styled(ButtonCommon)`
  background-color: ${({ theme }: any) => theme.token.colorPrimary};
  border: none;
  height: 44px;
  width: 180px;
  border-radius: 100px;

  @media screen and (max-width: 1199px) {
    width: 100%;
  }

  & > div {
    display: none;
  }

  &:is(:hover, :focus, :active) {
    box-shadow: none;
  }

  & > span {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.3px;
    font-style: normal;
    color: ${({ theme }: any) => theme.token.colorText2th};
  }
`

export const AppQRStyled = styled.div`
  .title {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #6f7d95;
  }

  .ant-form-item {
    .ant-row {
      .ant-col {
        label {
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 24px;
          color: ${({ theme }: any) => theme.token.colorText3th};
        }
      }
    }
  }
`
