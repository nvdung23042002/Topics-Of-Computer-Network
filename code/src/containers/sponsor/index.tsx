import { GlobalSetting, SponsorContainerStyled } from './styled'
import Layout from '@/app/layout-sponsor'
import Container from '@/components/container'
import TournamentMatchList from './components/tournament-match-list'
import Cart from './components/cart'
import { useAppSelector } from '@/hooks/store'

const Sponsor = () => {
  const profile = useAppSelector((state) => state.authSponsor.sponsorProfile)

  return (
    <Layout mustAuth>
      <GlobalSetting />

      <Container maxWidth={1230}>
        <SponsorContainerStyled>
          <TournamentMatchList {...{ profile }} />
          <Cart />
        </SponsorContainerStyled>
      </Container>
    </Layout>
  )
}

export default Sponsor
