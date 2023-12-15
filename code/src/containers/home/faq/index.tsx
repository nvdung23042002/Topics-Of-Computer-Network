import Container from '@/components/container'
import {
  ChevronRightIconStyled,
  CollapseStyled,
  ContainerStyled,
  FaqStyled,
  PanelStyled,
  TitleCollapse
} from './styled'
import HightLine from '@/assets/svg/hight-line-short.svg'
import Typography from '@/components/common/typography'
import { Trans, useTranslation } from 'next-i18next'
import { AppRoutes } from '@/constants/routes'
import Anchor from '@/components/common/anchor'
import { memo, useState } from 'react'
import Button from '@/components/common/button'
import { useAppSelector } from '@/hooks/store'
import showMessage from '@/utils/showMessage'

const LPFaq: React.FC = () => {
  const { t } = useTranslation('faq', { useSuspense: false })
  const [activeQuestion, setActiveQuestion] = useState<string[]>([])
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated)

  return (
    <Container fullWidth>
      <FaqStyled>
        <ContainerStyled maxWidth={1000}>
          <Anchor id='faq' route={AppRoutes.faq} />
          <Typography.Title className='title' level={1}>
            {t('FAQS', { ns: 'home' })}
            <br />
            <img className='hight-light' src={HightLine.src} alt='hight-light' />
          </Typography.Title>
          <CollapseStyled
            activeKey={activeQuestion}
            bordered={false}
            onChange={(key: string[]) => setActiveQuestion(key.slice(-1))}
            expandIcon={({ isActive }) => <ChevronRightIconStyled active={isActive ? 'true' : 'false'} />}
          >
            {[...new Array(15)]?.map((item, index) => {
              return (
                <PanelStyled
                  key={index.toString()}
                  forceRender
                  header={<TitleCollapse level={5}>{t(`QUESTION${index + 1}`)}</TitleCollapse>}
                >
                  <Trans
                    t={t}
                    values={{
                      link2: 'https://www.kuronekoyamato.co.jp/ytc/search/estimate/ichiran.html',
                      contactEmail: 'info@ebet.com'
                    }}
                    components={{
                      br: <br />,
                      register: (
                        <Button
                          className='p-0'
                          type='link'
                          onClick={() => {
                            if (isAuthenticated) {
                              showMessage({ warning: t('register_warning') })
                              return
                            }

                            const node = document.getElementById('action-login-button')
                            if (node) node.click()
                          }}
                        />
                      ),
                      contact: <a href={'#contact'}>Contact</a>,
                      a2: (
                        <a
                          href='https://www.kuronekoyamato.co.jp/ytc/search/estimate/ichiran.html'
                          target='_blank'
                          rel='noreferrer'
                        >
                          https://www.kuronekoyamato.co.jp/ytc/search/estimate/ichiran.html
                        </a>
                      )
                    }}
                  >{`ANSWER${index + 1}`}</Trans>
                </PanelStyled>
              )
            })}
          </CollapseStyled>
        </ContainerStyled>
      </FaqStyled>
    </Container>
  )
}

export default memo(LPFaq)
