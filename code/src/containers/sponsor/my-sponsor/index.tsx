import { useRouter } from 'next/router'
import { MenuStyled, MySponsorStyled } from './styled'
import { GlobalSetting } from '../styled'
import Container from '@/components/container'
import Layout from '@/app/layout-sponsor'
import TransactionHistory from './transaction-history'
import Template from './template'
import Profile from './profile'
import BuildingIcon from '@/components/icons/BuildingIcon'
import DocumentIcon from '@/components/icons/DocumentIcon'
import TemplateIcon from '@/components/icons/TemplateIcon'
import LogoutIcon from '@/components/icons/LogoutIcon'
import NavLink from '@/components/common/nav-link'
import { AppRoutes } from '@/constants/routes'
import { useAppDispatch } from '@/hooks/store'
import { signOut } from '@/redux/auth-sponsor/slice'
import { useWindowSize } from '@/hooks/useWindowResize'

const MySponsor = () => {
  const router = useRouter()
  const { step, id: page } = router.query
  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const menu = [
    {
      icon: <BuildingIcon />,
      name: 'スポンサー情報',
      link: AppRoutes.sponsorProfile
    },
    {
      icon: <DocumentIcon />,
      name: 'スポンサーの支払い',
      link: AppRoutes.sponsorHistory
    },
    {
      icon: <TemplateIcon />,
      name: 'テンプレート管理',
      link: AppRoutes.sponsorTemplate
    },
    {
      icon: <LogoutIcon />,
      name: 'ログアウト',
      onClick: () => {
        dispatch(signOut())
        router.replace(AppRoutes.sponsorLogin)
      }
    }
  ]
  return (
    <Layout mustAuth>
      <GlobalSetting />
      <Container maxWidth={1230}>
        <MySponsorStyled>
          {!isMaxWidth1199 && Number(step) !== 3 && (
            <MenuStyled>
              {menu?.map((item, index) =>
                item.link ? (
                  <NavLink className='menu-item' activeClassName='menu-item-active' href={item.link ?? ''} key={index}>
                    {item.icon}
                    {item.name}
                  </NavLink>
                ) : (
                  <button
                    className='menu-item'
                    key={index}
                    onClick={() => {
                      item.onClick && item.onClick()
                    }}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                )
              )}
            </MenuStyled>
          )}
          {
            {
              ['profile']: <Profile />,
              ['transaction-history']: <TransactionHistory />,
              ['template']: <Template />
            }[(page as string) ?? 'profile']
          }
        </MySponsorStyled>
      </Container>
    </Layout>
  )
}

export default MySponsor
