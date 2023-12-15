import { Typography } from 'antd'
import styled from 'styled-components'
import button from '../button'

export const TitleStyled = styled(Typography.Title)`
  margin-top: 0;
  margin-bottom: 0 !important;
`

export const TextStyled = styled(Typography.Text)`
  font-weight: 400;
`

export const ParagraphStyled = styled(Typography.Paragraph)``
export const IconButton = styled(button)`
  color: ${(props: any) => props.theme.token.colorBorder} !important;
  padding: 0;
  margin-left: 4px;
  &.ant-btn-icon-only {
    width: 24px;
    height: 24px;
  }

  &:hover,
  &:active,
  &:focus {
    opacity: 0.8;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`
