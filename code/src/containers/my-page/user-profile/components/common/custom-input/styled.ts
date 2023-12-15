import Input from '@/components/common/form/Input'
import styled from 'styled-components'

export const InputStyled = styled(Input)`
  border-radius: 999px;
  padding: 11px 14px;
  font-size: 16px;
  font-weight: 500;
  &.ant-input[disabled] {
    color: #183b56;
    border-color: #c5bfbf;
  }
`
