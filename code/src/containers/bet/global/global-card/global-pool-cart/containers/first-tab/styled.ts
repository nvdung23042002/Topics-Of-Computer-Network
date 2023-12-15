import styled from 'styled-components'
import ButtonCommon from '@/components/common/button'

export const BetCardContentStyled = styled.div`
  padding: 20px 15px;
  height: 100%;

  .ant-form {
    height: 100%;

    & > .ant-row {
      height: 100%;

      & > .ant-col:nth-child(2) {
        height: fit-content;
      }
    }
  }

  @media screen and (max-width: 1199px) {
    padding: 16px 10px;

    .ant-form {
      height: 100%;

      & > .ant-row {
        height: 100%;

        & > .ant-col:nth-child(2) {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-bottom: 30px;
        }
      }
    }
  }

  .error {
    color: ${({ theme }: any) => theme.token.colorCancel} !important;
  }

  .item-list {
    @media screen and (min-width: 1200px) {
      max-height: calc(100vh - 430px);
    }

    overflow-x: hidden;
    overflow-y: auto;

    @media screen and (max-width: 1199px) {
      .ant-row {
        gap: 8px !important;

        .ant-col {
          height: fit-content;
        }
      }
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
  }
`

export const ControlBtnGroupStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const CustomRowStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const CustomFirstColStyled = styled.div`
  width: 100%;
  flex: 1;
`

export const CustomSecondColStyled = styled.div`
  width: 100%;
  height: fit-content;

  @media screen and (max-width: 1199px) {
    margin-bottom: 36px;
  }
`

export const BuyTicketBtnStyled = styled(ButtonCommon)`
  width: 100%;
  height: 34px;
  background-color: #2969df;
  border-color: #2969df;
  border-radius: 2px;
  font-size: 16px;
  line-height: 23px;

  @media screen and (max-width: 1199px) {
    font-size: 14px;
    line-height: normal;
    margin-bottom: 18px;
  }

  &:disabled {
    background-color: #2969df;
    border-color: #2969df;
    opacity: 0.5;
  }

  &:hover {
    border-color: #2969df !important;
  }

  span {
    color: ${(props: any) => props.theme.token.colorText2th};
  }
`
