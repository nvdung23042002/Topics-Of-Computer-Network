import { useAppSelector } from '@/hooks/store'
import GlobalNormalBetDetail from './global/global-bet-detail/Normal'
import LocalBetDetail from './local/local-bet-detail'

const BetDetail: React.FC = () => {
  const zone = useAppSelector((state) => state.app?.zone)

  const renderRegionBetDetail = (zone: string | undefined) => {
    return zone === 'global' ? <GlobalNormalBetDetail /> : <LocalBetDetail />
  }

  return <>{renderRegionBetDetail(zone)}</>
}

export default BetDetail
