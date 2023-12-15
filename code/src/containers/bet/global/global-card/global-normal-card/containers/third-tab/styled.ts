import styled from 'styled-components'

export const ScrollParentCartItemsResultStyled = styled.div`
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

export const BetCardResultContentStyled = styled.div`
  height: 100%;
  padding: 20px 15px;

  @media screen and (max-width: 1199px) {
    padding: 15px 10px;

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
