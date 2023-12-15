import styled from 'styled-components'

export const ModalAdsHorizontalContentStyled = styled.div`
  .company-name {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 34px;

    @media screen and (max-width: 991px) {
      gap: 8px;
      margin-bottom: 20px;
    }

    .name {
      font-size: 20px;
      line-height: normal;
      flex: 1;
      width: fit-content;
      word-break: break-all;

      @media screen and (max-width: 991px) {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }

  .company-banner {
    margin-bottom: 18px;

    @media screen and (max-width: 991px) {
      margin-bottom: 16px;
    }

    .qr {
      display: flex;
      align-items: end;
      gap: 14px;
      position: absolute;
      top: 33px;
      left: 16px;

      @media screen and (max-width: 991px) {
        top: 9px;
        left: 12px;
        gap: 8px;
      }

      .store {
        display: flex;
        flex-direction: column;
        gap: 8px;

        @media screen and (max-width: 991px) {
          gap: 4px;
        }
      }
    }
  }

  .infomation {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 18px;

    @media screen and (max-width: 991px) {
      gap: 5px;
      margin-bottom: 4px;
    }

    .label {
      font-size: 16px;
      line-height: normal;

      @media screen and (max-width: 991px) {
        font-size: 14px;
      }
    }

    .value {
      font-size: 14px;
      line-height: normal;
      max-height: 220px;
      overflow-y: auto;

      @media screen and (max-width: 991px) {
        font-size: 12px;
        max-height: 293px;
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
        word-break: break-all;
        font-family: 'Noto Sans JP', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }

  .company-link {
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    color: #2969df;
    word-break: break-all;

    @media screen and (max-width: 991px) {
      font-size: 12px;
    }
  }
`

export const CompanyLogoHorizontalStyled = styled.div`
  width: 42px;
  height: 42px;

  @media screen and (max-width: 991px) {
    width: 34px;
    height: 34px;
  }
`

export const CompanyBannerHorizontalStyled = styled.div`
  position: relative;
  width: 832px;
  height: 268px;

  @media screen and (max-width: 991px) {
    width: 100%;
    height: 120px;
  }
`

export const QrHorizontalStyled = styled.div`
  width: 202px;
  height: 202px;
  border-radius: 5px;
  overflow: hidden;

  @media screen and (max-width: 991px) {
    width: 102px;
    height: 102px;
  }

  .ant-qrcode {
    display: block;
    padding: 16px;
    background-color: #fff !important;
    width: 100% !important;
    height: 100% !important;

    @media screen and (max-width: 991px) {
      padding: 8.08px;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
`

export const StoreHorizontalStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 991px) {
    svg {
      width: 90px;
      height: 27px;
    }
  }
`
