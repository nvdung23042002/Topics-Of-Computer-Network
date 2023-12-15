import styled from 'styled-components'

export const CardStyled = styled.div`
  display: flex;
  border-radius: 24px;
  border: 1px solid rgba(131, 131, 131, 0.25);
  background: #fff;
  column-gap: 8px;
  box-shadow: 0px 3px 8px -1px rgba(0, 0, 0, 0.08);
  padding: 16px;
  min-height: 185px;
  width: 100%;
  flex: 1;
  &.bottom-card {
    min-height: 210px;
    padding-bottom: 8px;
  }
  .avatar {
    width: 48px;
    height: 48px;
    img {
      min-width: 48px;
      max-width: 100%;
    }
  }

  .content {
    flex-grow: 1;
    & .title {
      font-size: 18px;
      margin-bottom: 14px !important;
    }
    & > div.ant-typography {
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 0;
      color: ${(props) => props.theme.token.colorText};
    }
  }

  @media screen and (max-width: 1023px) {
    border-radius: 20px;
  }
  @media screen and (max-width: 775px) {
    border-radius: 16px;
    .content {
      & .title {
        font-size: 16px;
        margin-bottom: 8px !important;
      }
      & > div.ant-typography {
        margin-bottom: 0;
        color: ${(props) => props.theme.token.colorText};
      }
    }
  }
`
