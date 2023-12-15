import ButtonCommon from '@/components/common/button'
import { Modal } from 'antd'
import styled from 'styled-components'

export const ModalAdsStyled = styled(Modal)`
  display: flex;
  flex-direction: column;

  .ant-modal-content {
    padding: 40px 30px;
    border-radius: 20px;

    .ant-modal-close-x {
      svg > path {
        color: #183b56;
      }
    }

    @media screen and (max-width: 991px) {
      padding: 25px 10px;
    }
  }

  .dots-list {
    margin-top: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 46px;

    @media screen and (max-width: 991px) {
      gap: 10px;
    }

    .dot {
      width: 16px;
      height: 16px;
      background-color: #d9d9d9;
      border-radius: 50%;
      opacity: 0.7;

      @media screen and (max-width: 991px) {
        width: 10px;
        height: 10px;
      }
    }

    .dot.active {
      background-color: #de1d43;
    }
  }
`

export const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 17px;
  justify-content: end;
`

export const PrevButtonStyled = styled(ButtonCommon)`
  width: 160px;
  height: 46px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: #183b56;
  border-radius: 9999px;
  opacity: 0.5;
`

export const NextButtonStyled = styled(ButtonCommon)`
  width: 160px;
  height: 46px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: #f9fafb;
  border-radius: 9999px;
`
