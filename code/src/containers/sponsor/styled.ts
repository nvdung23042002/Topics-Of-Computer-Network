import styled, { createGlobalStyle } from 'styled-components'

export const GlobalSetting = createGlobalStyle`
  .ant-layout {
    background: #ffffff !important;
  }

`

export const SponsorContainerStyled = styled.div`
  padding: 40px 15px;
  display: grid;

  grid-template-columns: 742px auto;
  gap: 30px;
  position: relative;

  @media screen and (max-width: 1259px) {
    grid-template-columns: calc(742 / 1259 * (100vw - 30px)) calc(100% - (742 / 1259 * (100vw - 30px)) - 30px);
  }
  @media screen and (max-width: 995px) {
    gap: 15px;
    grid-template-columns: calc(742 / 1259 * 100%) calc(100% - (742 / 1259 * 100%) - 15px);
  }
  @media screen and (max-width: 775px) {
    padding: 15px;
    display: block;
  }

  @media screen and (max-width: 570px) {
  }
`
