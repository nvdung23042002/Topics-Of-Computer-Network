import { SelectProps } from 'antd'
import React, { useRef } from 'react'
import { ContainerSelected, SelectStyled } from './styled'
import ArrowSelect from '@/components/icons/ArrowSelectIcon'

const Select = (props: SelectProps) => {
  const containerRef = useRef<any>(null)

  return (
    <ContainerSelected ref={containerRef}>
      <SelectStyled
        {...props}
        suffixIcon={<ArrowSelect />}
        defaultOpen={true}
        getPopupContainer={() => containerRef.current}
      />
    </ContainerSelected>
  )
}

export default Select
