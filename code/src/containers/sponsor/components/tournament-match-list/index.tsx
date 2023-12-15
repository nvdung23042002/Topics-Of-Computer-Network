import { Tab, TournamentMatchStyled } from './styled'
import Typography from '@/components/common/typography'
import { Avatar, TabsProps } from 'antd'
import TournamentList from './tournaments'
import MatchList from './matches'
import DefaultAvatar from '@/assets/images/avatar_default.png'

const TournamentMatchList = ({ profile }: any) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `大会`,
      children: <TournamentList />
    },
    {
      key: '2',
      label: `試合`,
      children: <MatchList />
    }
  ]
  return (
    <TournamentMatchStyled>
      <div className='header'>
        <div className='avatar'>
          <Avatar className='image' src={profile?.icon ?? DefaultAvatar.src} />
          <Typography.Title className='name text-nowrap-2' level={2} title={profile?.companyName}>
            {profile?.companyName}
          </Typography.Title>
        </div>
      </div>
      <Tab defaultActiveKey='1' listItem={items} destroyInactiveTabPane />
    </TournamentMatchStyled>
  )
}

export default TournamentMatchList
