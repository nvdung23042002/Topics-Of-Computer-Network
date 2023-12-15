import Container from '@/components/container'
import { TicketStyled, ContainerStyled } from './styled'
import Typography from '@/components/common/typography'
import Image from 'next/image'
import HightLine from '@/assets/svg/hight-line-short.svg'
import TicketImage from '@/assets/images/home/ticket-bet.png'
import GiftImage from '@/assets/images/home/gift.png'
import FightImage from '@/assets/images/home/fight.png'
import PayImage from '@/assets/images/home/pay.png'
import MemoImage from '@/assets/images/home/memo.png'
import EbetLeftImage from '@/assets/images/home/ebet-left.png'
import EbetRightImage from '@/assets/images/home/ebet-right.png'
import EbetBgImage from '@/assets/images/home/ebet-bg.png'
import EbetLeftIcon from '@/assets/svg/ebet-left-icon.svg'
import EbetRightIcon from '@/assets/svg/ebet-right-icon.svg'
import UserBet from '@/assets/images/home/users.png'
import Card from './components/card'
import { RefObject, memo, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'

const Ticket: React.FC = () => {
  const { t } = useTranslation('home', { useSuspense: false })
  const ticketRef: RefObject<HTMLDivElement> = useRef(null)
  const iconMain0Ref: RefObject<HTMLImageElement> = useRef(null)
  const iconMain1Ref: RefObject<HTMLImageElement> = useRef(null)
  const iconMain2Ref: RefObject<HTMLImageElement> = useRef(null)
  const iconMain3Ref: RefObject<HTMLImageElement> = useRef(null)
  const iconMain4Ref: RefObject<HTMLImageElement> = useRef(null)
  const iconMain5Ref: RefObject<HTMLImageElement> = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Loop over the entries
      entries.forEach((entry) => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          iconMain0Ref.current?.classList.add('animate')
          iconMain1Ref.current?.classList.add('animate')
          iconMain2Ref.current?.classList.add('animate')
          iconMain3Ref.current?.classList.add('animate')
          iconMain4Ref.current?.classList.add('animate')
          iconMain5Ref.current?.classList.add('animate')
          observer.disconnect()
          return
        }
      })
    })

    if (ticketRef?.current) {
      observer.observe(ticketRef?.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Container fullWidth>
      <TicketStyled>
        <ContainerStyled maxWidth={1200}>
          <Typography.Title className='title' level={1}>
            {t('HOW_TO_BUY_TICKET')}
            <br />
            <Typography.Text className='sub-title'>{t('STEP_BY_STEP')}</Typography.Text>
            <img className='hight-light' src={HightLine.src} alt='hight-light' />
          </Typography.Title>

          <div className='content-box'>
            <div>
              <Card
                title={t('MEMO_TITLE')}
                avatarSrc={MemoImage}
                subtitle={
                  <>
                    <Typography.Paragraph>{t('THREE_WAYS')}</Typography.Paragraph>
                    <Typography.Paragraph>{t('PAYMENT_METHOD')}</Typography.Paragraph>
                  </>
                }
              />
              <Card
                title={t('BUY_A_TICKET')}
                avatarSrc={TicketImage}
                subtitle={
                  <>
                    <Typography.Paragraph>{t('TICKET_CONDITION')}</Typography.Paragraph>
                    <Typography.Paragraph>{t('TICKET_CONDITION_2')}</Typography.Paragraph>
                  </>
                }
              />
              <Card
                title={t('BETTING')}
                avatarSrc={FightImage}
                subtitle={<Typography.Paragraph>{t('BETING_SUB')}</Typography.Paragraph>}
              />
            </div>
            <div>
              <Card
                className='bottom-card'
                title={t('WITHDRAW')}
                avatarSrc={PayImage}
                subtitle={
                  <>
                    <Typography.Paragraph>{t('WITHDRAW_SUB')}</Typography.Paragraph>
                    <Typography.Paragraph className='mt-3'>{t('WITHDRAW_SUB_NOTE')}</Typography.Paragraph>
                  </>
                }
              />
              <Card
                className='bottom-card'
                title={t('GIFT')}
                avatarSrc={GiftImage}
                subtitle={
                  <>
                    <Typography.Paragraph>{t('GIFT_SUB')}</Typography.Paragraph>
                    <Typography.Paragraph className='mt-3'>{t('GIFT_SUB_NOTE')}</Typography.Paragraph>
                  </>
                }
              />
            </div>
          </div>
          <div className='icon'>
            <div id='ticket-icon-bg' className='icon-bg'>
              <Image
                ref={iconMain0Ref}
                className='icon-main'
                src={EbetBgImage}
                alt='e-bet-bg'
                width={442.387}
                height={318.207}
                priority
              />
            </div>
            <div id='ticket-icon-left' className='icon-left'>
              <Image
                ref={iconMain1Ref}
                className='icon-main'
                src={EbetLeftImage}
                alt='e-bet-left'
                width={200.448}
                height={275.022}
                priority
              />
              <Image
                ref={iconMain2Ref}
                className='icon-main icon-character'
                src={EbetLeftIcon}
                alt='e-bet-left'
                width={115.061}
                height={81.682}
                priority
              />
            </div>
            <div id='ticket-icon-right' className='icon-right'>
              <Image
                ref={iconMain3Ref}
                className='icon-main'
                src={EbetRightImage}
                alt='e-bet-right'
                width={200.448}
                height={275.022}
                priority
              />
              <Image
                ref={iconMain4Ref}
                className='icon-main icon-character'
                src={EbetRightIcon}
                alt='e-bet-right'
                width={107.756}
                height={90.3}
                priority
              />
            </div>
          </div>
          <div ref={ticketRef} className='icon-bottom'>
            <Image ref={iconMain5Ref} className='icon-main' src={UserBet} alt='e-bet-right' priority />
          </div>
        </ContainerStyled>
      </TicketStyled>
    </Container>
  )
}

export default memo(Ticket)
