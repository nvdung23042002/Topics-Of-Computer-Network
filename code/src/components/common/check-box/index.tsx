import { CheckboxProps } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'
import React from 'react'
import { CheckBoxGroupStyled, CheckBoxStyled } from './styled'

const CheckBox = (props: CheckboxProps) => {
  return <CheckBoxStyled {...props} />
}

export const CheckBoxGroup = (props: CheckboxGroupProps) => {
  return <CheckBoxGroupStyled {...props} />
}

export default CheckBox
