import { Dropdown, theme } from 'antd'
import React from 'react'
import Radio, { RadioGroup } from '../radio'
import { DropDownContentStyled } from './styled'
import styled from 'styled-components'

const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export type OptionType = { label: string; value: string | number | object }

type DropDownContentProps = {
  options: OptionType[]
}
type DropDownRadioProps = {
  children: React.ReactNode
  options: OptionType[]
}

const DropDownContent = ({ options }: DropDownContentProps) => {
  const {
    token: { colorPrimary }
  } = theme.useToken()
  return (
    <DropDownContentStyled>
      <RadioGroupStyled>
        {options.map((item: OptionType, index) => {
          return (
            <React.Fragment key={index}>
              <Radio className='radio-item' value={item.value} currentcolor={colorPrimary}>
                {item.label}
              </Radio>
            </React.Fragment>
          )
        })}
      </RadioGroupStyled>
    </DropDownContentStyled>
  )
}
const DropDownRadio = ({ children, options }: DropDownRadioProps) => {
  return (
    <Dropdown
      dropdownRender={() => {
        return <DropDownContent options={options} />
      }}
      trigger={['click']}
      placement='bottomRight'
    >
      {children}
    </Dropdown>
  )
}

export default DropDownRadio
