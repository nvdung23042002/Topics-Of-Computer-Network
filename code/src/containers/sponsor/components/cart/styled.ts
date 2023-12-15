import button from '@/components/common/button'
import InputNumber from '@/components/common/form/Number'
import styled from 'styled-components'

export const CartContainerStyled = styled.div`
  border-radius: 10px;
  border: 1px solid #d6e5e9;
  background: #f6faff;
  min-height: 406px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: sticky;
  top: 100px;
  width: 100%;
  max-width: 430px;
  .title {
    font-size: 16px;
    color: ${(props) => props.theme.token.colorPrimary};
    padding: 30px 0;
    text-align: center;
    border-bottom: 1px solid rgba(111, 125, 149, 0.5);
  }
  .toolbar {
    padding: 10px 15px 0;
    & > .total {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      margin-bottom: 8px;
      & > .ant-typography {
        margin-top: 0;
        color: ${(props) => props.theme.token.colorPrimary};
      }
    }
  }

  @media screen and (max-width: 775px) {
    position: fixed;
    top: unset;
    right: 0;
    bottom: 50px;
    z-index: 10;
    width: 100%;
    height: calc(100% - 50px);
    min-height: unset;
    border-radius: 10px 10px 0 0;
    transform: translateY(100%);
    overflow: hidden;
    opacity: 0;
    transition: transform 0.2s ease-in, opacity 0.2s ease-in;
    &.show {
      transition: transform 0.4s ease-out, opacity 0.4s ease-out;
      opacity: 1;
      transform: translateY(0%);
    }

    .ant-spin-nested-loading {
      flex-grow: 1;
      overflow: hidden;
      .ant-spin-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    }
  }

  @media screen and (max-width: 570px) {
  }
`

export const CartList = styled.div`
  flex: 1;
  position: relative;
  overflow: auto;
  padding: 0 15px;
  min-height: 300px;
  max-height: calc(100vh - 350px);
  & > .empty-text {
    font-size: 18px;
    text-align: center;
    width: 90%;
    opacity: 0.5;
  }

  .cart-item {
    border-radius: 10px;
    border: 1px solid #d6e5e9;
    background: #fff;
    padding: 15px 18px 20px;
    position: relative;
    min-height: 124px;
    margin: 20px 0;
    &:last-child {
      margin-bottom: 0;
    }
    & > .date {
      padding-right: 20px;
      min-height: 24px;
      line-height: 24px;
    }
    & > .date,
    & > .name {
      display: block;
      color: ${(props) => props.theme.token.colorText};
      font-weight: 700;
      font-size: 16px;
    }
    & > .name {
      font-weight: 500;
      margin: 10px 0;
    }

    & > .label {
      color: #fff;
      background-color: ${(props) => props.theme.token.colorPrimary};
      padding: 9px 11px;
      margin: 10px 0;
      border-radius: 2px;
      font-size: 14px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      &.match {
        background-color: #2969df;
      }
    }
    & > .err-message {
      display: block;
      position: absolute;
      font-size: 12px;
      color: ${(props) => props.theme.token.colorCancel};
    }
  }

  @media screen and (max-width: 775px) {
    min-height: unset;
    max-height: unset;
  }
`

export const CloseButton = styled(button)`
  color: black;
  position: absolute;
  right: 10px;
  top: 8px;
`

export const SubmitButton = styled(button)`
  width: 100%;
  height: 34px;
  border-radius: 2px;
  &:disabled {
    border-color: transparent;
  }
`

export const InputStyled = styled(InputNumber)`
  width: 100%;
  min-height: unset;
  height: 38px;
  border-radius: 2px;
  &::after {
    content: '円';
    position: absolute;
    right: 6px;
    top: 6px;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
  & .ant-input-number-input {
    min-height: unset;
    padding-right: 22px;
    height: 38px;
  }
`

export const CartButtonStyled = styled(button)`
  border-radius: 5px 5px 0px 0px;
  padding: 0 14px;
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  color: #fff !important;
  background-color: ${(props) => props.theme.token.colorPrimary} !important;
  border-color: ${(props) => props.theme.token.colorPrimary} !important;
  .nav-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #fff;
    color: ${(props) => props.theme.token.colorPrimary};
    border-radius: 50%;
    transform: rotate(-180deg);
    transition: transform 0.4s ease;
  }

  &.show {
    background-color: ${(props) => props.theme.token.colorBorder} !important;
    border-color: ${(props) => props.theme.token.colorBorder} !important;
    .nav-icon {
      color: ${(props) => props.theme.token.colorText};
      transform: rotate(0);
    }
  }
  @media screen and (min-width: 776px) {
    display: none;
  }
`
