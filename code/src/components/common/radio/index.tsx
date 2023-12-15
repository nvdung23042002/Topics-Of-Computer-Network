'use client'
import React, { Ref } from 'react'
import { RadioGroupProps, RadioProps } from 'antd'
import { RadioButtonProps } from 'antd/es/radio/radioButton'
import { RadioAntStyled, RadioButtonStyled, RadioGroupStyled } from './styled'

const Radio = React.forwardRef((props: RadioProps & { currentcolor?: string }, ref: Ref<HTMLElement> | undefined) => {
  return <RadioAntStyled ref={ref} {...props} />
})
export const RadioGroup = React.forwardRef((props: RadioGroupProps, ref: Ref<HTMLDivElement> | undefined) => {
  return <RadioGroupStyled ref={ref} {...props} />
})

export const RadioButton = React.forwardRef((props: RadioButtonProps, ref: Ref<HTMLDivElement> | undefined) => {
  return <RadioButtonStyled {...props} ref={ref} />
})

export default Radio
