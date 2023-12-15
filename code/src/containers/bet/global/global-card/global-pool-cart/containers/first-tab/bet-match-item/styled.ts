import styled from 'styled-components'

export const BetFreeStyled = styled.div`
  width: fit-content;
  color: #fff;
  background-color: #4d8cff;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 2px 7px;
  height: auto;
  border-radius: 3px;
  margin-bottom: 12px;
`

export const BetMatchItemStyled = styled.div`
  padding: 20px 18px 15px 18px;
  border: 1px solid ${(props: any) => props.theme.token.colorBorder3th};
  background-color: ${(props: any) => props.theme.token.colorBgLayout};
  border-radius: 10px;
  position: relative;

  @media screen and (max-width: 1199px) {
    padding: 8px;
  }

  .ticket-unit {
    font-size: 14px;
    line-height: 20px;
  }
`

export const CloseIconStyled = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;

  @media screen and (max-width: 1199px) {
    top: 8px;
    right: 8px;
  }
`

export const DateTimeStyled = styled.div`
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 10px;

  @media screen and (max-width: 1199px) {
    font-size: 14px;
    line-height: normal;
    margin-bottom: 4px;
  }
`
export const MatchStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 6px;
  }
`
export const FighterStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

export const FighterNameStyled = styled.div`
  font-size: 16px;
  line-height: 23px;

  & > div {
    word-break: break-all;
  }

  @media screen and (max-width: 1199px) {
    font-size: 14px;
    line-height: normal;
  }
`

export const FighterBetedStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  background-color: ${(props: any) => props.theme.token.colorPrimary};
  padding: 0 11px;
  margin-bottom: 10px;
  gap: 12px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 6px;
  }

  .choose-one {
    display: flex;
    align-items: center;
    gap: 3px;

    .choose-one-name {
      overflow-wrap: anywhere;
    }
  }

  .ant-form-item {
    margin: 0;

    .ant-input {
      border: none;
      color: ${(props: any) => props.theme.token.colorText2th};
      background-color: ${(props: any) => props.theme.token.colorPrimary};
      font-weight: 700;
      padding: 0;
      width: 100px;
      text-align: end;
    }
  }

  & > * {
    font-size: 14px;
    line-height: 20px;
  }

  .odds-view {
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    justify-content: end;

    .odds-view-content {
      display: inline-block;
      vertical-align: top;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`

export const TicketsCountStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 7px;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-background-clip: text;
    transition: background-color 5000s ease-in-out 0s;
  }

  .ant-input-affix-wrapper {
    height: 38px;
    border-radius: 2px;
  }

  .ant-input-affix-wrapper:-webkit-autofill {
    background-color: ${(props: any) => props.theme.token.colorBgLayout} !important;
  }

  .ant-form-item {
    margin: 0;
    width: 100%;
  }
`

export const TotalMoneyStyled = styled.div`
  flex: 1;
  height: 38px;
  background-color: ${(props: any) => props.theme.token.colorBg4th};
  border: 1px solid ${(props: any) => props.theme.token.colorBorder};
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 11px;
`

export const RefundStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > * {
    font-size: 14px;
    line-height: 20px;
  }

  .expect-payment {
    margin: 0;

    @media screen and (max-width: 1199px) {
      width: 150px;
    }

    .ant-form-item-control-input {
      min-height: unset !important;
    }

    .ant-input {
      text-align: end;
      border: unset;
      padding: 0;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
    }

    .ant-input:focus {
      border: unset;
      outline: unset;
      box-shadow: unset;
      border-radius: unset;
    }
  }
`

export const WarningOverQtyStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;

  & > .waining-content {
    font-size: 14px;
    line-height: 20px;
    opacity: 0.7;
  }
`

export const WarningBetFree = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  gap: 10px;

  svg {
    path:nth-child(1) {
      fill: #dd8d14;
    }
  }

  .warning-text {
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    opacity: 0.7;
    color: #dd8d14;
  }
`
