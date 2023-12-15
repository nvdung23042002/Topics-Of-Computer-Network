import { IconButton } from '@/components/common/typography/styled'
import styled from 'styled-components'

export const DeleteButtonIcon = styled(IconButton)`
  background-color: #fff;
  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));
  .icon {
    color: #ea1313;
  }
  &.ant-btn-text:not(:disabled):hover {
    background-color: #fff;
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));
  }
`
export const UploadFileStyled = styled.div`
  .container-upload {
    position: absolute;
    top: 64px;
    left: 50%;
    width: max-content;
    transform: translate(-50%);
    display: flex;
    gap: 3px;
    border: none;
    margin: 0;
    padding: 0;
    overflow: visible;
    background: transparent;
    cursor: pointer;
    flex-direction: column;
    color: inherit;
    font: inherit;
    line-height: normal;
    width: 160px;
    /* span {
      display: block;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      text-align: center;
    } */
    .container-icon {
      width: 100%;
      .icon {
        color: #3c50e0;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        border-radius: 100%;
        background-color: #fff;
        margin: 0 auto;
      }
    }
    .container-text {
      width: 100%;
      display: flex;
      flex-direction: column;
      .text-main {
        font-weight: 500;
        font-size: 14px;
        color: #2969df;
      }
      .text-sub {
        font-weight: 350;
        font-size: 12px;
      }
    }
  }
  .container-avatar {
    background-color: #eff4fb;
    border: 1px dashed #2969df;
  }
`
