import React from 'react'
import { EmptyDataStyled } from './styled'
import Ticket01 from '@/components/icons/Ticket01Icon'
import { useTranslation } from 'next-i18next'

const EmptyData = () => {
  const { t } = useTranslation('history')
  return (
    <EmptyDataStyled>
      <div className='icon-ticket'>
        <Ticket01 />
      </div>
      <div className='message'>{t('NO_ITEM_FOUND', { ns: 'common' })}</div>
    </EmptyDataStyled>
  )
}

export default EmptyData
