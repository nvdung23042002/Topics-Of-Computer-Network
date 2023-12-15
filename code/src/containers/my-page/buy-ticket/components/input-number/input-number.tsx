import React, { FC, useCallback, KeyboardEvent, useRef, useEffect, useState } from 'react'
import { InputNumber as InputNumberAntd, InputNumberProps } from 'antd'
import styled from 'styled-components'
import { BNToFormat } from '@/utils/bigNumber'
import { useRouter } from 'next/router'

const StyledInputNumber = styled(InputNumberAntd)`
  max-width: 560px;
  text-align: right;
  &.ant-input-number {
    border-radius: 999px;
    width: 100%;
    border-color: #c5bfbf;
    .ant-input-number-input {
      height: fit-content;
      border-radius: 999px;
      padding: 11px 15px;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
    }
    &.ant-input-number-disabled {
      color: #183b56;
    }
    &.ant-input-number-disabled:hover {
      border-color: #c5bfbf;
    }
  }
  &.error {
    .ant-input-number-input {
      color: #ea1313;
    }
  }
  &.ant-input-number:hover {
    border-color: #eb4460;
  }
  &.ant-input-number-focused {
    box-shadow: unset;
    border-color: #eb4460;
  }
`

const InputNumber: FC<InputNumberProps & { charFormatter?: string }> = ({
  charFormatter = '円',
  ...props
}: InputNumberProps & { charFormatter?: string }) => {
  const [id, setId] = useState(null)
  const inputRef = useRef<HTMLInputElement | undefined>(undefined)
  const router = useRouter()
  useEffect(() => {
    setId(new Date().getTime() as any)
  }, [router.locale])
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value
      if (inputValue.startsWith('-') && e.key === '-') {
        e.preventDefault()
        return
      }
      if (e.currentTarget.value === charFormatter && e.key == 'Backspace') {
        e.preventDefault()
        return
      }
      if (inputValue.replace(charFormatter, '').length > 6 && Number(e.key) >= 0 && Number(e.key) <= 9) {
        e.preventDefault()
        return
      }
    },
    [charFormatter, props.value]
  )
  return (
    <StyledInputNumber
      key={id}
      ref={inputRef as any}
      formatter={(value: string) => {
        return `${BNToFormat(value)}${charFormatter}`
      }}
      parser={(value: string) => {
        return value!.replace(/\$\s?|(,*)/g, '').replace(charFormatter, '')
      }}
      step={0.0000000001}
      onKeyDown={handleKeyDown}
      controls={false}
      inputMode='decimal'
      onClick={(e) => {
        if (inputRef.current?.selectionStart == inputRef.current?.value.length) {
          const yenIndex = inputRef.current?.value.indexOf(charFormatter) ?? 0
          inputRef.current?.setSelectionRange(yenIndex, yenIndex)
          inputRef.current?.focus()
        }
      }}
      {...props}
    />
  )
}

export default InputNumber
