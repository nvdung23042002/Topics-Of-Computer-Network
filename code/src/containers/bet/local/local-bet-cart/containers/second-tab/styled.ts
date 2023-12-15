import styled from 'styled-components'

export const BetCartPaidContentStyled = styled.div`
  padding: 20px 18px 15px 18px;
  border: 1px solid ${(props: any) => props.theme.token.colorBorder3th};
  background-color: ${(props: any) => props.theme.token.colorBgLayout};
  border-radius: 10px;
`

export const BetCardPaidContentStyled = styled.div`
  height: 100%;
  padding: 20px 15px;

  @media screen and (max-width: 1199px) {
    padding: 16px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > .ant-row {
      height: 100%;

      & > .ant-col:nth-child(1) {
        height: 50%;
      }

      & > .ant-col:nth-child(2) {
        display: flex;
        flex-direction: column;
        justify-content: end;
        margin-bottom: 54px;
      }
    }
  }

  .error {
    color: ${({ theme }: any) => theme.token.colorCancel} !important;
  }
`

export const ScrollParentCartItemsPaidStyled = styled.div`
  @media screen and (min-width: 1200px) {
    max-height: calc(100vh - 400px);
  }

  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
  margin-bottom: 20px;

  @media screen and (max-width: 1199px) {
    width: 100%;
    flex: 1;
    height: 100%;
  }

  .infinite-scroll-component {
    overflow: unset !important;
    overflow-x: hidden;

    @media screen and (max-width: 1199px) {
      & > .ant-row {
        gap: 8px !important;
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
`
