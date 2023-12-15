import React, { useState } from 'react'
import { ContainerContent, HeaderNFTs, NFTsContainer } from './styled'
import { useTranslation } from 'next-i18next'
import { RadioButtonGroupStyled, RadioButtonStyled } from '../../styled'
import Purchased from './components/purchased'
import TransactionHistory from './components/transaction-history'
import Auction from './components/auction'
import Favorite from './components/favorite'

const NFTs = () => {
  const { t } = useTranslation('history')
  const buttons = [
    {
      label: t('PURCHASED'),
      value: 'PURCHASED'
    },
    {
      label: t('TRANSACTION_HISTORY_NFT'),
      value: 'TRANSACTION_HISTORY_NFT'
    },
    {
      label: t('AUCTION'),
      value: 'AUCTION'
    },
    {
      label: t('FAVORITE'),
      value: 'FAVORITE'
    }
  ]
  const [selectedButton, setSelectedButton] = useState<string>(buttons[0].value)

  return (
    <NFTsContainer>
      <HeaderNFTs>
        <RadioButtonGroupStyled
          className='nfts button-group'
          defaultValue={selectedButton}
          onChange={(e) => {
            setSelectedButton(e.target.value)
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
      </HeaderNFTs>
      <ContainerContent>
        {
          {
            ['PURCHASED']: <Purchased />,
            ['TRANSACTION_HISTORY_NFT']: <TransactionHistory />,
            ['AUCTION']: <Auction />,
            ['FAVORITE']: <Favorite />
          }[selectedButton]
        }
      </ContainerContent>
    </NFTsContainer>
  )
}

export default NFTs
