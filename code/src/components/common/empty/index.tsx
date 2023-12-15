import { EmptyProps, Empty as EmptyAntd } from 'antd'
import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
const EmptyRenderStyled = styled.div`
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const EmptyStyed = styled(EmptyAntd)`
  .ant-empty-image {
    display: ${(props) => (props.image ? 'block' : 'none')};
  }
`
const Empty = (props: EmptyProps) => {
  const { t } = useTranslation('common')
  return (
    <EmptyStyed
      {...props}
      description={
        <EmptyRenderStyled>
          <p>{t('NO_ITEM_FOUND')}</p>
        </EmptyRenderStyled>
      }
      image={null}
    />
  )
}

export default Empty
