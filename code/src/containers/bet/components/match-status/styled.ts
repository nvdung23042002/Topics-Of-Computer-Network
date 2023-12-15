import styled from 'styled-components'

export const MatchStatusStyled = styled.div`
  .match-status {
    font-size: 12px;
    line-height: 17px;
    padding: 2px 10px;
    width: fit-content;
    border-radius: 3px;
    height: auto;
  }

  .live-status {
    background-color: ${({ theme }: any) => theme.token.colorBg7th};
  }

  .going-status {
    background-color: ${({ theme }: any) => theme.token.colorBg8th};
  }
`
