import Input from '@/components/common/form/Input'
import Phone from '@/components/common/form/Phone'
import Radio, { RadioGroup } from '@/components/common/radio'
import typography from '@/components/common/typography'
import { Button, Descriptions, Divider, Form } from 'antd'
import styled, { keyframes } from 'styled-components'

export const TitleStyled = styled(typography.Title)`
  &.title-modal.ant-typography {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    margin-bottom: 0 !important;
  }
  &.ant-typography {
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
  }
  margin-bottom: 30px !important;
  @media screen and (max-width: 991px) {
    &.title {
      display: none;
    }
  }
  @media screen and (max-width: 575px) {
    &.title {
      display: none;
    }
    &.mobile {
      margin-bottom: 0px !important;
      display: flex;
      align-items: center;
      gap: 6px;
      span {
        font-size: 16px;
        font-weight: 700;
        line-height: 26px;
        padding: 0px;
      }
      .icon {
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
    &.title-modal {
      display: block;
      font-size: 18px;
    }
  }
`

export const Static = styled.div`
  display: flex;
  color: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 70px;
  background-color: #e6ecf4;
  padding: 30px 0px;
  & > div {
    width: calc(100% / 3);
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 0px 10px;
    .anticon {
      justify-content: center;
    }
    .title {
      font-weight: 400;
      font-size: 18px;
      line-height: 26px;
      @media screen and (max-width: 575px) {
        font-size: 11px;
        line-height: normal;
      }
    }
    .count {
      font-weight: 700;
      font-size: 30px;
      line-height: 26px;
      max-width: 100%;
      overflow-wrap: anywhere;
      @media screen and (max-width: 575px) {
        font-size: 18px;
        line-height: normal;
      }
    }
    @media screen and (max-width: 575px) {
      gap: 11px;
    }
  }
  & > div {
    color: #183b56;
    .icon {
      svg {
        width: 80px;
        height: 80px;
      }
    }
    & > div {
      display: flex;
      flex-direction: column;
      gap: 5px;
      text-align: center;
    }
    @media screen and (max-width: 575px) {
      .icon {
        svg {
          width: 34px;
          height: 34px;
        }
      }
    }
  }
  & > div:nth-child(1) {
    .icon {
      color: #2969df;
    }
    border-right: 1px solid #d6e5e9;
  }
  & > div:nth-child(2) {
    .icon {
      color: #6f7d95;
    }
    border-right: 1px solid #d6e5e9;
  }
  & > div:nth-child(3) {
    .icon {
      color: #ffa928;
    }
  }
  @media screen and (max-width: 575px) {
    padding: 21px 0px;
    margin-bottom: 16px;
    margin-top: 16px;
  }
`
export const ButtonStyled = styled(Button)`
  max-width: 272px;
  width: 100%;
  &.ant-btn {
    height: fit-content;
    padding: 0;
    border-radius: 999px;
  }
  span {
    padding: 11px 0px;
  }
  .ant-btn-icon {
    span {
      padding: 0px;
    }
  }
  &.form-button {
    flex: 1;
  }
  &.ant-btn-primary:disabled {
    border-color: ${(props) => props.theme.token.colorPrimary};
    background: ${(props) => props.theme.token.colorPrimary};
    color: #fff;
    opacity: 0.5;
  }
  @media screen and (max-width: 575px) {
    &.ant-btn {
      font-size: 14px;
      span {
        /* padding: 9px 0px; */
      }
    }
  }
`
export const ButtonGroup = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 36px;

  @media screen and (max-width: 575px) {
    gap: 7px;
    margin-top: 36px;
    &.group-btn-next {
      margin-top: 16px;
    }
  }
`
export const InputStyled = styled(Input)`
  &.ant-input {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    padding: 11px 15px;
    border-radius: 999px;
  }
  &.ant-input-disabled {
    color: #183b56;
  }
  &.error {
    color: #ea1313;
  }
  &.ant-input:hover {
    border-color: #eb4460;
    border-inline-end-width: 1px;
  }
  &.ant-input:focus {
    border-color: #eb4460;
    box-shadow: unset;
  }
`
export const ContainerForm = styled.div`
  max-width: 560px;
  .label {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #6f7d95;
  }
  .ant-form-item {
    margin-bottom: 16px;
  }
  .select-country {
    .ant-select-selector:hover {
      border-color: #eb4460 !important;
    }
    .ant-select-focused .ant-select-selector,
    .ant-select-selector:focus,
    .ant-select-selector:active,
    .ant-select-open .ant-select-selector {
      border-color: #eb4460 !important;
    }

    /* &.ant-input-number-focused {
        box-shadow: unset;
        border-color: #eb4460;
      } */
  }
`
export const RadioCustomStyled = styled(Radio)`
  .label {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #183b56;
  }
  &.ant-radio-wrapper-disabled {
    .label {
      .text {
        opacity: 0.5;
      }
    }
    .ant-radio-disabled {
      .ant-radio-inner {
        border-color: #838383;
      }
    }
  }
`
export const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const ContainerSubFrom = styled.div`
  margin-left: 24px;
  .label {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #6f7d95;
  }
  label {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: #6f7d95;
  }
  .ant-form-item {
    margin-bottom: 16px;
  }
`
export const DescriptionsStyled = styled(Descriptions)`
  &.info-user {
    border-bottom: 1px solid transparent;
  }
  &.info-payment,
  &.info-user {
    .ant-descriptions-item-label {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #6f7d95;
      &::after {
        display: none;
      }
      width: 60%;
    }
  }
  .ant-descriptions-item-container {
    margin-top: 16px;
  }
  .vertical {
    .ant-descriptions-item-container {
      flex-direction: column;
      gap: 4px;
    }
    &.ant-descriptions-item {
      padding-bottom: 0px;
    }
  }
  .ant-descriptions-header {
    margin-bottom: 0px;
  }
  .ant-descriptions-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
  }
  .color-success {
    color: #1cce66;
  }
  .ant-descriptions-item-label {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #183b56;
    &::after {
      display: none;
    }
    width: 60%;
  }
  .ant-descriptions-item-content {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    /* padding-right: 50px; */
    flex: 1;
  }

  &.account-balance {
    margin-top: 24px;
    .ant-descriptions-item {
      padding-bottom: 0px;
    }
    .ant-descriptions-item-container {
      margin-top: 0px;
      margin-bottom: 16px;
    }
    .ant-descriptions-item-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 23px;
      color: #183b56;
      &::after {
        display: none;
      }
      width: 70%;
    }
    .ant-descriptions-item-content {
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      /* padding-right: 50px; */
      white-space: nowrap;
      width: 30%;
    }
    @media screen and (max-width: 575px) {
      margin-top: 0px;
      max-width: 100%;
      overflow-x: auto;
    }
  }
  &.credit-card,
  &.slash-payment {
    padding: 0px 35px;
    padding-top: 24px;
    .ant-descriptions-item-container {
      margin-top: 0px;
      margin-bottom: 16px;
    }
    .ant-descriptions-item {
      padding-bottom: 0px;
    }
    .ant-descriptions-item-label {
      width: 70%;
    }
    .ant-descriptions-item-content {
      flex: 1;
    }
    .last-item {
      .ant-descriptions-item-container {
        margin-bottom: 0px;
      }
    }
  }
  &.bank-transfer {
    padding-top: 16px;
    .ant-descriptions-header {
      .ant-descriptions-title {
        margin-bottom: 16px;
      }
    }
    .ant-descriptions-item {
      padding-bottom: 0px;
    }
    .ant-descriptions-item-container {
      margin-top: 0px;
      margin-bottom: 16px;
    }
    .ant-descriptions-item-label {
      .label.payment-amount {
        display: block;
        &.mobile {
          display: none;
        }
      }
    }
    @media screen and (max-width: 575px) {
      padding-top: 20px;
      .ant-descriptions-item-content {
        justify-content: end;
      }
      .ant-descriptions-item-label {
        width: 40%;
        span {
          white-space: nowrap;
        }
        .label.payment-amount {
          display: none;
          &.mobile {
            display: inline-block;
          }
        }
      }
    }
  }
  .container-label-payment-amount {
    display: flex;
    gap: 5px;
    width: 100%;
    @media screen and (max-width: 575px) {
      flex-direction: column;
      span {
        width: fit-content;
        &:first-child {
          text-align: start;
        }
        &:last-child {
          padding-left: 20px;
        }
      }
    }
  }
`
export const ButtonGroupModal = styled.div`
  gap: 8px;
  display: flex;
  justify-content: end;
  &.modal-completed {
    justify-content: center;
    width: 100%;
  }
  @media screen and (max-width: 575px) {
    margin-bottom: 16px;
  }
`
export const ButtonModalStyled = styled(Button)`
  &.ant-btn {
    height: fit-content;
    padding: 0;
    border-radius: 999px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    max-width: 168px;
    width: 100%;
  }
  .ant-btn-icon {
    span {
      padding: 0px;
    }
  }
  span {
    padding: 11px 0px;
  }
  @media screen and (max-width: 575px) {
    &.ant-btn {
      font-size: 14px;
      span {
        padding: 7px 0px;
      }
    }
  }
`

export const ContainerInfo = styled.div`
  padding: 55px;
  padding-top: 0px;
  .image-success {
    text-align: center;
  }
  &.account-balance {
    padding: 55px;
    padding-top: 0px;
    padding-bottom: 32px;
  }
  &.bank-transfer {
    padding: 35px;
    padding-top: 0px;
    padding-bottom: 0px;
    .group-btn-action {
      padding-bottom: 32px;
      padding-top: 25px;
    }
  }
  &.credit-card,
  &.slash-payment {
    padding: 20px;
    padding-top: 0px;
    padding-bottom: 35px;
    .group-btn-action {
      padding: 0 20px;
    }
  }
  .attention {
    font-size: 12px;
    font-weight: 400;
    color: #de1d43;
    margin-top: 14px;
  }
  @media screen and (max-width: 575px) {
    &.account-balance {
      padding: 16px;
      &.success {
        padding-top: 30px;
      }
    }
    &.bank-transfer {
      padding: 16px;
      padding-top: 0px;
      padding-bottom: 0px;
      .group-btn-action {
        padding-bottom: 23px;
        padding-top: 23px;
        margin-bottom: 0px;
      }
    }
  }
`
export const ContainerTitleModalInfo = styled.div`
  border-bottom: 1px solid #f1f1f1;
  padding: 0 25px;
  padding-bottom: 24px;
  padding-top: 32px;
  &.account-balance {
    padding: 0 55px;
    padding-bottom: 24px;
    padding-top: 32px;
  }
  &.credit-card,
  &.slash-payment {
    padding: 0 55px;
    padding-bottom: 24px;
    padding-top: 32px;
  }
  &.bank-transfer {
    padding: 25px 55px;
  }
  @media screen and (max-width: 575px) {
    &.account-balance {
      padding-bottom: 24px;
      padding-top: 24px;
      &.success {
        padding-bottom: 20px;
        padding-top: 20px;
      }
    }
  }
`
export const ContainerCompletedModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 40px;
  .message {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #183b56;
  }
`
export const MessageConfirm = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 28px;
  margin-top: 16px;
  &.account-balance-success {
    margin-bottom: 16px;
    @media screen and (max-width: 575px) {
      margin-bottom: 28px;
    }
  }
  &.credit-card-success,
  &.slash-payment-success {
    margin: 30px 0px;
  }
  @media screen and (max-width: 575px) {
    font-size: 18px;
  }
`

const moveDown = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`
const hideAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const BoxAnimation = styled.div`
  width: 100%;
  &.hidden {
    animation: ${moveDown} 2s;
    animation-fill-mode: forwards;
    animation: ${hideAnimation} 1s forwards;
  }
`
export const Box = styled.div`
  position: relative;

  @media screen and (max-width: 575px) {
    .container-info-ticket {
      .btn-next {
        max-width: 100%;
      }
    }
  }
`
export const FormStyled = styled(Form)`
  .ant-form-item-explain {
    margin: 0px 0px;
    padding-left: 12px;
  }
`
export const DividerModalConfirmStyled = styled(Divider)`
  &.ant-divider {
    margin: 16px 0;
  }
`
export const MessageSendSuccess = styled.div`
  font-size: 18px;
  color: #183b56;
  font-weight: 500;
  line-height: 24px;
  & > div {
    text-align: center;
  }
  & > div:last-child {
    & > span:first-child {
      color: #2969df;
    }
  }
`
export const ContainerInfoBank = styled.div`
  .title {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .content {
    display: flex;
  }
  .item {
    margin-top: 16px;
    .label {
      color: #6f7d95;
      font-size: 14px;
      font-weight: 400;
    }
    .value {
      font-size: 16px;
      font-weight: 500;
      color: #183b56;
      width: calc(100% - 15px);
      /* width: calc(100% - 15px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
    }
  }
  .left,
  .right {
    width: 50%;
  }
`

export const ContainerInfoUser = styled.div`
  .title {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .content {
    display: flex;
  }
  .item {
    margin-top: 16px;
    .label {
      color: #6f7d95;
      font-size: 14px;
      font-weight: 400;
    }
    .value {
      font-size: 16px;
      font-weight: 500;
      color: #183b56;
      width: calc(100% - 15px);
      /* white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
    }
  }
  .left,
  .right {
    width: 50%;
  }
  @media screen and (max-width: 575px) {
    .content {
      flex-direction: column;
      .left,
      .right {
        width: 100%;
      }
    }
  }
`
export const HeaderMenuStyled = styled.div`
  margin-bottom: 10px;
  .ant-typography {
    display: flex;
    align-items: center;
    span {
      font-size: 18px;
      padding: 0px;
      &.icon {
        padding-right: 0px;
      }
      &:nth-child(2) {
        padding-right: 10px;
      }
    }
    margin-bottom: 0px !important;
  }
  &.mobile {
    display: none;
    /* .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    } */
  }
  &.tablet {
    display: none;
    /* .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    } */
  }
  .btn-show-menu {
    width: fit-content;
    &.ant-btn-text:not(:disabled):active {
      background-color: transparent;
    }
    &.ant-btn:not(:disabled):focus-visible {
      outline: 4px solid transparent;
    }
  }

  @media screen and (max-width: 991px) {
    .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 18px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    }
    &.tablet,
    &.mobile {
      display: block;
    }
  }
  @media screen and (max-width: 575px) {
    .ant-typography {
      display: flex;
      align-items: center;
      span {
        font-size: 16px;
        padding: 0px;
        &.icon {
          padding-right: 0px;
        }
        &:nth-child(2) {
          padding-right: 10px;
        }
      }
      margin-bottom: 0px !important;
    }
  }
`

export const PhoneStyled = styled(Phone)`
  &.ant-input-number {
    border-color: #c5bfbf;
  }
  &.ant-input-number:hover {
    border-color: #eb4460;
  }
  &.ant-input-number-focused {
    box-shadow: unset;
    border-color: #eb4460;
  }
`
export const ButtonIconStyled = styled(Button)`
  --font-size: 24px;
  width: fit-content;
  height: fit-content;
  padding: 0;
  box-sizing: border-box;
  border-color: transparent;
  box-shadow: unset;
  border-radius: 50%;
  background-color: transparent;
  .icon {
    padding: 0.25rem;
    font-size: var(--font-size);
    & svg {
      width: 24px;
      height: 24px;
    }
  }
`
