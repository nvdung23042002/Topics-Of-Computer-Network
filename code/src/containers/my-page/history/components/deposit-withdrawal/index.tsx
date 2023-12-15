import React, { useEffect, useState } from 'react'
import { ContainerDeposits, ContentContainer, HeaderDeposits } from './styled'
import { RadioButtonGroupStyled, RadioButtonStyled } from '../../styled'
import { useTranslation } from 'next-i18next'
import BuyTicketTable from './components/table-desposit/buy-ticket'
import WithDrawalTable from './components/table-desposit/withdrawal'
import { useRouter } from 'next/router'

const DepositsWithdrawal = () => {
  const { t } = useTranslation('history')
  const buttons = [
    {
      label: t('BUY_TICKETS'),
      value: 'BUY_TICKETS'
    },
    {
      label: t('WITHDRAWAL'),
      value: 'WITHDRAWAL'
    }
  ]
  const [selectedButton, setSelectedButton] = useState('BUY_TICKETS')
  const { query, asPath } = useRouter()
  const router = useRouter()

  useEffect(() => {
    switch (query?.tabChildActive as any) {
      case 'BUY_TICKETS':
        setSelectedButton('BUY_TICKETS')
        break
      case 'WITHDRAWAL':
        setSelectedButton('WITHDRAWAL')
        break
      default:
        break
    }
  }, [query, asPath])
  return (
    <ContainerDeposits>
      <HeaderDeposits>
        <RadioButtonGroupStyled
          className='beds button-group'
          defaultValue={selectedButton}
          value={selectedButton}
          onChange={(e) => {
            setSelectedButton(e.target.value)
            router.query.tabChildActive = e.target.value
            router.replace(router)
          }}
        >
          {buttons.map((item) => {
            return (
              <RadioButtonStyled key={item.value} value={item.value}>
                {item.label}
              </RadioButtonStyled>
            )
          })}
        </RadioButtonGroupStyled>
        <ContentContainer>
          {
            {
              ['BUY_TICKETS']: <BuyTicketTable />,
              ['WITHDRAWAL']: <WithDrawalTable />
            }[selectedButton]
          }
        </ContentContainer>
      </HeaderDeposits>
    </ContainerDeposits>
  )
}

export default DepositsWithdrawal
