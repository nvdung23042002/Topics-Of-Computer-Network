import Container from '@/components/container'
import { EcoSystemStyled, ContainerStyled, ButtonStyled } from './styled'
import Typography from '@/components/common/typography'
import HightLine from '@/assets/svg/hight-line-short.svg'
import BetWinnerIcon from '@/components/icons/BetWinnerIcon'
import Bet from './bet'
import { Trans, useTranslation } from 'next-i18next'
import { useRouter } from 'next/navigation'
import { memo, useMemo } from 'react'
import { AppRoutes } from '@/constants/routes'
import Nft from './nft'
import NFTIcon from '@/components/icons/NFTIcon'
import Shop from './shop'
import ShopSignIcon from '@/components/icons/ShopSignIcon'

const EcoSystem: React.FC = () => {
  const { t } = useTranslation('home', { useSuspense: false })
  const navigate = useRouter()
  const data: any = useMemo(
    () => [
      {
        image: <Bet />,
        icon: <BetWinnerIcon />,
        iconTitle: 'BETS',
        title: 'BOXING_BET',
        content: 'BOXING_BET_SUB',
        buttonText: 'BET_NOW',
        action: () => navigate.push(AppRoutes.betList)
      },
      {
        image: <Nft />,
        icon: <NFTIcon />,
        iconTitle: 'MARKET_PLACE',
        title: 'MARKET_PLACE_TITLE',
        content: 'MARKET_PLACE_SUB',
        buttonText: 'BROWSE_NFT',
        action: () => navigate.push(AppRoutes.marketplace)
      },
      {
        image: <Shop />,
        icon: <ShopSignIcon />,
        iconTitle: 'ONLINE_SHOP',
        title: 'PURCHASE_TITLE',
        content: 'PURCHASE_SUB',
        buttonText: 'BUY_NOW',
        action: () => navigate.push(AppRoutes.shop)
      }
    ],
    []
  )
  return (
    <Container fullWidth>
      <EcoSystemStyled>
        <ContainerStyled maxWidth={1200}>
          <Typography.Title className='title' level={1}>
            {t('ECO_SYSTEM')}
            <br />
            <img className='hight-light' src={HightLine.src} alt='hight-light' />
          </Typography.Title>

          {data?.map((item, index) => (
            <div key={`eco-system-${index}`} className='box'>
              <div className='image'>{item.image}</div>
              <div className='content'>
                <div className='icon-box'>
                  {item.icon}
                  <Typography.Title className='title' level={3}>
                    {t(item.iconTitle)}
                  </Typography.Title>
                </div>
                <Typography.Title className='title' level={1}>
                  {t(item.title)}
                </Typography.Title>
                <Typography.Paragraph className='sub-title'>
                  <Trans
                    t={t}
                    components={{
                      br: <br />
                    }}
                  >
                    {item.content}
                  </Trans>
                </Typography.Paragraph>
                <ButtonStyled
                  id={index === data?.length - 1 ? 'shop-anchor' : undefined}
                  shape='round'
                  type='primary'
                  onClick={item.action}
                >
                  {t(item.buttonText)}
                </ButtonStyled>
              </div>
            </div>
          ))}
        </ContainerStyled>
      </EcoSystemStyled>
    </Container>
  )
}

export default memo(EcoSystem)
