import button from '@/components/common/button'
import container from '@/components/container'
import styled from 'styled-components'

export const InquiryStyled = styled.div`
  background-color: #f6faff;
  padding: 102px 0 108px;
  @media screen and (max-width: 1439px) {
    padding: 80px 0 86px;
  }
  @media screen and (max-width: 995px) {
    padding: 60px 0 66px;
  }
  @media screen and (max-width: 775px) {
    padding: 17px 0 46px;
  }
`
export const ContainerStyled = styled(container)`
  & > .title {
    font-size: 34px;
    margin-bottom: 30px !important;
  }
  .form-inquiry {
    display: flex;
    gap: 0px 54px;
    form {
      & > .subtitle {
        width: 100%;
        font-size: 22px;
        line-height: normal;
        color: ${(props) => props.theme.token.colorText};
      }
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 0px 30px;
      width: 100%;
      max-width: 770px;
      input.ant-input {
        height: 50px;
      }
      input.ant-input,
      textarea.ant-input {
        border: 2px solid #d6e5e9;
        font-size: 18px;
        font-weight: 500;

        &::placeholder {
          color: ${(props) => props.theme.token.colorBorder};
        }
      }
      & > .ant-form-item:nth-child(2),
      & > .ant-form-item:nth-child(3) {
        flex: 1;
      }
      & > .ant-form-item:nth-child(4) {
        width: 100%;
      }
    }
    .remind {
      flex: 1;
      & > .title {
        font-size: 22px;
        margin-bottom: 16px !important;
      }
      & > .description {
        font-size: 18px;
      }
    }
  }

  @media screen and (max-width: 1439px) {
    padding: 0 16px;
    & > .title {
      font-size: 28px;
      margin-bottom: 40px !important;
      .hight-light {
        height: 27px;
      }
    }
    .form-inquiry {
      form {
        & > .subtitle {
          font-size: 18px;
        }
      }
      .remind {
        & > .title {
          font-size: 18px;
        }
        & > .description {
          font-size: 16px;
        }
      }
    }
  }
  @media screen and (max-width: 995px) {
    & > .title {
      margin-bottom: 24px !important;
    }
    .form-inquiry {
      flex-wrap: wrap;
      form {
        flex: auto;
        width: 100%;
      }
      .remind {
        width: 100%;
        flex: auto;
        & > .title {
          text-align: left;
        }
      }
    }
  }
  @media screen and (max-width: 775px) {
    & > .title {
      font-size: 18px;
      text-align: center;
      .hight-light {
        height: 20px;
      }
    }
    .form-inquiry {
      form {
        input.ant-input {
          height: 46px;
        }
        & > .subtitle {
          font-size: 16px;
        }
      }
      .remind {
        & > .title {
          text-align: left;
          font-size: 16px;
        }
        & > .description {
          font-size: 14px;
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    .form-inquiry {
      form {
        & > .ant-form-item:nth-child(2),
        & > .ant-form-item:nth-child(3) {
          width: 100%;
          flex: auto;
        }
      }
    }
  }
`

export const ButtonStyled = styled(button)`
  min-width: 205px;
  height: 50px;
  font-weight: 400;
  font-size: 18px;
  @media screen and (max-width: 775px) {
    height: 40px;
    font-size: 16px;
  }
`
