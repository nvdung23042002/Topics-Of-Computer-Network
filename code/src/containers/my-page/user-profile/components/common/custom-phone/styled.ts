import Phone from '@/components/common/form/Phone'
import styled from 'styled-components'

export const InputPhoneStyled = styled(Phone)`
  font-size: 16px;
  font-weight: 500;
  &.ant-input[disabled] {
    color: #183b56;
    border-color: #c5bfbf;
  }
`
