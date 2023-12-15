import styled from 'styled-components'

export const NormalNewsStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  /* min-height: 1465px; */

  @media screen and (max-width: 1199px) {
    min-height: 0;
  }
`

export const NormalNewsItemStyled = styled.div`
  display: flex;
  align-items: stretch;
  gap: 22px;
  border-radius: 15px;
  border: 1px solid ${({ theme }: any) => theme.token.colorBorder3th};
  padding: 24px;

  @media screen and (max-width: 1199px) {
    gap: 6px;
    padding: 6px;
    border-radius: 4px;
  }
`

export const NormalNewsItemImgStyled = styled.div`
  width: 300px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: 1199px) {
    border-radius: 4px;
    width: 158px;
    height: 96px;

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`

export const NormalNewsItemContentStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1199px) {
    justify-content: space-between;
  }
`

export const NormalNewsPaginationStyled = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 30px;

  @media screen and (max-width: 1199px) {
    margin-top: 0;
  }
`
