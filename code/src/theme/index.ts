import { ThemeConfig } from 'antd'
export const Theme: ThemeConfig = {
  token: {
    colorText: '#183B56',
    colorBgLayout: '#FFFFFF',
    colorPrimary: '#DE1D43',
    colorBorder: '#6F7D95',
    colorLinkActive: '#DE1D43',
    colorBgMask: '#000000b3',
    fontFamily: 'Noto Sans JP, sans-serif'
  },
  components: {
    Button: {
      borderRadius: 16,
      fontSize: 16
    },
    Typography: {
      colorTextHeading: '#183B56',
      colorText: '#6F7D95',
      fontSize: 14,
      fontSizeHeading1: 26,
      fontSizeHeading2: 24,
      fontSizeHeading3: 22,
      fontSizeHeading4: 20,
      fontSizeHeading5: 18,
      fontSizeLG: 16,
      fontWeightStrong: 700
    }
  }
}

export const DefaultThemeStyled = {
  ...Theme,
  token: {
    colorText: '#183B56',
    colorText2th: '#FFFFFF',
    colorText3th: '#6F7D95',
    colorText4th: '#0052FF',
    colorText5th: '#A8AEBA',
    colorText6th: '#000000',
    colorText7th: '#D80027',
    colorText8th: '#0052B4',
    colorText9th: '#141414',
    colorText10th: '#1C6FEC',
    colorText11th: '#2969DF',
    colorText12th: '#FFA928',
    colorText13th: '#3C50E0',
    colorBgLoading: '#FFFFFF',
    colorBgLayout: '#FFFFFF',
    colorBg2th: '#E0E7F3',
    colorBg3th: '#E9EEF6',
    colorBg4th: '#6f7d9580',
    colorBg5th: '#F6FAFF',
    colorBg6th: '#F1F1F1',
    colorBg7th: '#D80027',
    colorBg8th: '#2969DF',
    colorBg9th: '#EAF0FC',
    colorBg10th: '#FCE8EC',
    colorBg11th: '#d9d9d9',
    colorBg12th: '#FFA928',
    colorBg13th: '#141414',
    colorBg14th: '#EFF4FB',
    colorBgRewardPending: '#1C6FEC',
    colorBgRewardWon: '#1CCE66',
    colorPrimary: '#DE1D43',
    colorSecondary: '#2969DF',
    colorBorder: '#6F7D95',
    colorBorder2th: '#E5E3E3',
    colorBorder3th: '#D6E5E9',
    colorBorder4th: '#E6E3E3',
    colorBorder5th: '#C5BFBF',
    colorBorder6th: '#EAEAEA',
    colorCancel: '#EA1313',
    colorResell: '#FFA928',
    colorTextBlue: '#2969DF',
    colorBgMask: '#000000b3'
  }
}

export const FormTheme: ThemeConfig = {
  ...Theme,
  token: {
    ...Theme.token,
    colorBorder: '#C5BFBF',
    colorPrimary: '#2969DF'
  },
  components: {
    Input: {
      colorPrimary: '#2969DF'
    },
    InputNumber: {
      colorPrimary: '#2969DF'
    },
    Checkbox: {
      colorPrimary: '#2969DF'
    }
  }
}
