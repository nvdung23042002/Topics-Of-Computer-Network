import ETHIcon from '@/components/icons/ETHIcon'
import React, { useMemo } from 'react'
import { InputPriceStyled } from './styled'
import { useAppSelector } from '@/hooks/store'
import { BNToFormat, divided, multiple } from '@/utils/bigNumber'

type Props = {
  defaultValue?: number
  color: 'blue' | 'green'
  name?: string
  value?: number
  onChange?: (value: string | number) => void
}

const InputPrice = ({ defaultValue, color, name, ...props }: Props) => {
  const ethToJpy: string = useAppSelector((state) => state.auth.rate?.['ETH_TO_JPY'] ?? '0')
  const usdToJpy: string = useAppSelector((state) => state.auth.rate?.['USD_TO_JPY'] ?? '0')
  const yenPrice = useMemo(() => multiple(props.value || '0', ethToJpy), [props.value])
  const usdPrice = useMemo(() => divided(yenPrice ?? 0, usdToJpy ?? 1), [yenPrice])
  return (
    <InputPriceStyled>
      <div className='prefix'>
        <ETHIcon className={`icon ${color}`} />
        <span>ETH</span>
      </div>
      <div className='d-flex j-content-end flex-col input-wrapper'>
        <input
          defaultValue={defaultValue}
          className='input-price text-right'
          placeholder='0'
          inputMode='decimal'
          type='number'
          name={name}
          step={0.0000000001}
          onKeyDown={(e) => {
            if ((e.target as any)?.value?.length > 10 && Number(e.key) >= 0 && Number(e.key) <= 9) e.preventDefault()
          }}
          {...props}
          onChange={(e) => {
            if (props.onChange) {
              props.onChange(e.target.value)
            }
          }}
          onBlur={(e) => {
            e.target.value = Number(e.target.value).toString()
          }}
        />
        <div className='currency'>
          <span>{BNToFormat(usdPrice)} USD</span>
          <span>{BNToFormat(yenPrice)} JPY</span>
        </div>
      </div>
    </InputPriceStyled>
  )
}

export default InputPrice
