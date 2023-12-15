import Container from '@/components/container'
import { IntroductionStyled } from './styled'
import NSBIntro from './components/nsb-intro'
import MatchIntro from './components/match-intro'
import { memo } from 'react'

const Introduction: React.FC<any> = (props: any) => {
  return (
    <Container fullWidth>
      <IntroductionStyled>
        <NSBIntro />
        <MatchIntro {...props} />
      </IntroductionStyled>
    </Container>
  )
}

export default memo(Introduction)
