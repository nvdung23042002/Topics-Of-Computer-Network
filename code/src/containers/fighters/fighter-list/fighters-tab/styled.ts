import { GridLayoutStyled } from '@/components/styled'
import styled from 'styled-components'

export const FighterListItemsStyled = styled.div`
  min-height: 500px;
  margin-bottom: 24px;
`

export const FighterSearchStyled = styled.div`
  text-align: center;
  margin-bottom: 24px;

  @media screen and (max-width: 1199px) {
    margin-bottom: 16px;
  }
`

export const FighterListStyled = styled.div`
  min-height: 100vh;

  .fighters-list {
    margin-bottom: 26px;

    @media screen and (max-width: 1199px) {
      margin-bottom: 24px;
    }
  }
`

export const FighterListGridStyled = styled(GridLayoutStyled)`
  justify-items: center;

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 8px !important;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px !important;
  }

  @media (min-width: 993px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px !important;
  }
`

export const FighterItemStyled = styled.div`
  width: 288px;
  padding-top: 0;
  border: 1px solid #e5e3e3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  @media screen and (max-width: 1199px) {
    width: 345px;
  }
`

export const FighterHeaderStyled = styled.div`
  width: 100%;
  background-color: ${({ theme }: any) => theme.token.colorBg13th};
  display: flex;
  justify-content: center;
`

export const FighterImgStyled = styled.div`
  position: relative;
  width: 135px;
  height: 203px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FighterInfoStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 16px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 17px;

  @media screen and (max-width: 1199px) {
    padding: 12px 12px 16px 12px;
    gap: 8px;
  }
`

export const FighterNameStyled = styled.div`
  .name-romaji {
    font-style: italic;
    font-size: 18px;
    text-transform: uppercase;
    line-height: 26px;
    word-break: break-all;
  }

  .nname-kanji {
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-all;
  }
`

export const FighterBodyIndexStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`

export const PairBodyIndexStyled = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;

  .label {
    min-width: 76px;
  }

  .value {
    flex: 1;
  }
`

export const NoDataSearchStyled = styled.div`
  text-align: center;
`
