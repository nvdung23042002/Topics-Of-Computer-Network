import { ButtonStyled, CardImageStyled, CardStyled, SponsorListStyled } from './styled'
import Typography from '@/components/common/typography'
import classNames from 'classnames'
import Image from '@/components/common/image'
import DefaultAvatar from '@/assets/images/avatar_default.png'
import EditorViewer from '@/components/common/editor-viewer'
import { RefObject, memo, useRef } from 'react'

type CardType = {
  match?: boolean
  type: string
  selected?: boolean
  content: string
  background?: string
  fighter1Avatar?: string
  fighter2Avatar?: string
  fighter1Name?: string
  fighter2Name?: string
  name?: string
  date?: string
  disabled?: boolean
  listSponsor?: { sponsorId?: number; icon?: string }[]
  onClick?: (e: any) => void
  id?: string
}

const CardImage = memo<any>(({ match, background, fighter1Avatar, fighter2Avatar, listSponsor, date, name }) => (
  <CardImageStyled match={match} background={background}>
    {match ? (
      <>
        <img className='fighter-avatar no-interact' src={fighter1Avatar ?? ''} alt='avatar-1' loading='lazy' />
        <img className='fighter-avatar no-interact' src={fighter2Avatar ?? ''} alt='avatar-2' loading='lazy' />
        <div className='center-box'>
          <Typography.Title className='text-vs font-italic no-interact' level={5}>
            VS
          </Typography.Title>
        </div>
        {listSponsor?.length && (
          <SponsorListStyled
            className='sponsor-list'
            seconds={((listSponsor?.length ?? 0) > 15 ? listSponsor?.length ?? 0 : 15) * 1.2}
          >
            {listSponsor?.map((item) => (
              <div className='img-container no-interact' key={item.sponsorId}>
                <Image fill src={item?.icon} alt='sponsor_avatar' defaultSrc={DefaultAvatar.src} objectFit='cover' />
              </div>
            ))}
          </SponsorListStyled>
        )}
      </>
    ) : (
      <>
        <div className='text'>
          <Typography.Title className='text-date' level={4}>
            {date}
          </Typography.Title>
          <Typography.Title className='text-title' level={2}>
            {name}
          </Typography.Title>
        </div>
        {listSponsor?.length && (
          <SponsorListStyled
            className='sponsor-list'
            seconds={((listSponsor?.length ?? 0) > 15 ? listSponsor?.length ?? 0 : 15) * 1.2}
          >
            {listSponsor?.map((item) => (
              <div className='img-container' key={item.sponsorId}>
                <Image fill src={item?.icon} alt='sponsor_avatar' defaultSrc={DefaultAvatar.src} objectFit='cover' />
              </div>
            ))}
          </SponsorListStyled>
        )}
      </>
    )}
  </CardImageStyled>
))

const Card: React.FC<CardType> = ({
  type,
  match,
  selected,
  content,
  onClick,
  background,
  name,
  date,
  fighter1Name,
  fighter2Name,
  fighter1Avatar,
  fighter2Avatar,
  listSponsor,
  disabled,
  id,
  ...props
}: CardType) => {
  const cardRef: RefObject<any> = useRef<any>()
  const onShowLess = () => {
    if (cardRef?.current) {
      cardRef.current.scrollIntoView({ inline: 'nearest', block: 'nearest' })
    }
  }
  return (
    <CardStyled ref={cardRef} id={id} match={match} {...props}>
      <CardImage {...{ match, background, fighter1Avatar, fighter2Avatar, listSponsor, date, name }} />
      {match && (
        <div className='banline'>
          <Typography.Title level={3} className='fighter-name'>
            {fighter1Name}
          </Typography.Title>
          <Typography.Text className='date desktop'>{date}</Typography.Text>
          <Typography.Title level={3} className='fighter-name text-right'>
            {fighter2Name}
          </Typography.Title>
          <Typography.Text className='date mobile'>{date}</Typography.Text>
        </div>
      )}
      <div className='card-content'>
        <Typography.Title level={5} className='title'>
          {match ? '試合詳細' : '大会内容'}
          <span
            className={classNames({
              status: true,
              one: type === 'SINGLE_SPONSOR',
              multi: type === 'MULTI_SPONSOR'
            })}
          >
            {type === 'MULTI_SPONSOR' ? '複数スポンサー' : '単独スポンサー'}
          </span>
        </Typography.Title>
        <div className='subtitle'>
          <EditorViewer className={'content'} content={content} showLess onShowLess={onShowLess} />
        </div>

        <ButtonStyled
          shape='round'
          type={selected ? 'primary' : 'default'}
          match={match}
          active={selected ? 'true' : 'false'}
          onClick={onClick}
          disabled={disabled}
        >
          スポンサーになる
        </ButtonStyled>
      </div>
    </CardStyled>
  )
}

export default memo(Card)
