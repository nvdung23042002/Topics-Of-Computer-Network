import { useAppSelector } from '@/hooks/store'
import GlobalTabsWrapper from './global/global-bet-list'
import LocalBetList from './local/local-bet-list'

const Bet = () => {
  const zone = useAppSelector((state) => state.app?.zone)

  const renderRegionBet = (zone: string | undefined) => {
    return zone === 'global' ? <GlobalTabsWrapper /> : <LocalBetList />
  }

  return <>{renderRegionBet(zone)}</>
}

export default Bet
