import { createGlobalStyle } from 'styled-components'

export const GlobalSetting = createGlobalStyle`
  html, body {
    overflow: hidden !important;
  }
`

export const GlobalScrollConfig = createGlobalStyle`
    html {
        height: 100%;
        overflow: hidden;
    }
    body {
        height: 100%;
        overflow: hidden auto;
        scroll-behavior: smooth;
    }
`
