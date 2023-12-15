import React from 'react'
import { ButtonStyled } from './styled'
import { ButtonProps as ButtonAntdProps, ConfigProvider } from 'antd'

interface ButtonProps extends ButtonAntdProps {
  theme: 'RESALE' | 'AUCTION' | 'CANCEL' | 'RESALE_OFFER_ACTIVE' | 'RESALE_OFFER_INACTIVE'
}

const Button = ({ theme, ...props }: ButtonProps) => {
  const enumColor = {
    RESALE: '#FFA928',
    AUCTION: '#FFA928',
    CANCEL: '#EA1313',
    RESALE_OFFER_ACTIVE: '#EA1313',
    RESALE_OFFER_INACTIVE: '#6F7D95'
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: enumColor[theme],
          colorBgContainerDisabled: enumColor[theme]
        }
      }}
    >
      <ButtonStyled {...props} />
    </ConfigProvider>
  )
}

export default Button
