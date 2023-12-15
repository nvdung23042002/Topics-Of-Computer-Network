import styled from 'styled-components'

export const ModalAdsVerticalContentStyled = styled.div`
  display: flex;
  gap: 32px;

  .col-right {
    .company-name {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 34px;

      .name {
        font-size: 20px;
        line-height: normal;
        flex: 1;
        width: fit-content;
        word-break: break-all;
      }
    }

    .infomation {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 18px;

      .label {
        font-size: 16px;
        line-height: normal;
      }

      .value {
        font-size: 14px;
        line-height: normal;
        max-height: 351px;
        overflow-y: auto;

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
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #2969df;
      word-break: break-all;
    }
  }
`

export const CompanyBannerVerticalStyled = styled.div`
  width: 352px;
  height: 537px;
  position: relative;

  .qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 32px;
    left: 0;
    right: 0;
    margin: 0px auto;
  }

  .store {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const CompanyLogoVerticalStyled = styled.div`
  width: 42px;
  height: 42px;
`

export const QrVerticaStyled = styled.div`
  width: 202px;
  height: 202px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 16px;

  .ant-qrcode {
    display: block;
    padding: 16px;
    background-color: #fff !important;
    width: 100% !important;
    height: 100% !important;

    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
`

export const StoreVerticalStyled = styled.div`
  width: 117px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`
