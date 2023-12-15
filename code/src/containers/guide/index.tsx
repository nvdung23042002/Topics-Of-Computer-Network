import Layout from '@/app/layout'
import React, { useEffect, useState } from 'react'
import { ContainerStyled, RadioButtonGroupStyled, RadioButtonStyled } from './styled'
import Header from './components/header'
import { useRouter } from 'next/router'
import Bets from './components/how-to/bets'
import NFTs from './components/how-to/nfts'
import { useTranslation } from 'next-i18next'
import { AppRoutes } from '@/constants/routes'

const GuideContainer = () => {
  const router = useRouter()
  const { query } = router
  const { t } = useTranslation('guide')
  const buttons = [
    {
      label: t('BETS'),
      value: 'bets'
    },
    {
      label: t('NFTS'),
      value: 'nfts'
    }
  ]
  const [selectedButton, setSelectedButton] = useState(buttons[0].value)

  useEffect(() => {
    if (!query || !Object.keys(query).length || !['bets', 'nfts'].includes(query?.tabActive as string)) {
      router.replace(AppRoutes.guide('bets'))
    } else {
      setSelectedButton(query?.tabActive as string)
    }
  }, [query, router])
  return (
    <Layout isGuidePage>
      <ContainerStyled maxWidth={1200}>
        <Header />
        <RadioButtonGroupStyled
          className='beds button-group'
          defaultValue={selectedButton}
          onChange={(e) => {
            router.replace(AppRoutes.guide(e.target.value))
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
        {{ bets: <Bets />, nfts: <NFTs /> }[selectedButton]}
      </ContainerStyled>
    </Layout>
  )
}

export default GuideContainer
