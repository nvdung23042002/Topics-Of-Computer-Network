import styled from 'styled-components'

export const AccountLevelContainer = styled.div`
  border-radius: 10px;
  background: #f1f1f1;
  padding: 25px;
  &.disabled {
    opacity: 0.7;
  }
  @media screen and (max-width: 575px) {
    padding: 13px;
  }
`
export const DescriptionStyled = styled.div`
  margin: 16px 0;
  @media screen and (max-width: 575px) {
    margin: 8px 0;
  }
`
export const FooterAccountLevel = styled.div`
  .footer-content {
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    color: #2969df;
    @media screen and (max-width: 575px) {
      font-size: 14px;
    }
  }
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 575px) {
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    font-weight: 400;
  }
`
export const HeaderAccountLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h1 {
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    margin: 0;
    @media screen and (max-width: 575px) {
      font-size: 16px;
      margin: 0;
    }
  }
  .status {
    padding: 5px 15px;
    display: inline-flex;
    border-radius: 20px;
    background: #8a8a8a;
    color: #fff;
    @media screen and (max-width: 575px) {
      padding: 5px 8px;
      font-size: 12px;
    }
    &.active {
      background-color: #1cce66;
      color: #fff;
    }
  }
`
