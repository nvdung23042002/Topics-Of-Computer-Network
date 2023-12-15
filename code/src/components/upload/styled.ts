import { Upload } from 'antd'
import styled from 'styled-components'

export const UploadStyled = styled(Upload)<{ isExitsImg: any }>`
  & > .ant-upload.ant-upload-select {
    background-color: #eff4fb;
    border: ${({ isExitsImg }: any) =>
      String(isExitsImg) === 'true' ? 'none !important' : '1px dashed #2969df !important'};
    border-radius: 4px !important;
    overflow: hidden;
  }

  .upload-content {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #eff4fb;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .trash-icon {
    cursor: pointer !important;
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 8px;
    border-radius: 50%;
    background-color: ${({ theme }: any) => theme.token.colorBgLayout};
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));

    & > svg > path {
      stroke: ${({ theme }: any) => theme.token.colorPrimary} !important;
    }

    @media screen and (max-width: 1199px) {
      padding: 6px;

      & > svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`
