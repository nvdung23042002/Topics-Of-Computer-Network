import Image from '@/components/common/image'
import { CardStyled } from './styled'
import Typography from '@/components/common/typography'
import { ReactNode } from 'react'

type CardType = {
  className?: string
  avatarSrc: any
  title: string | ReactNode
  subtitle?: string | ReactNode
}

const Card: React.FC<CardType> = ({ avatarSrc, title, subtitle, ...props }: CardType) => {
  return (
    <CardStyled {...props}>
      <div className='avatar'>
        <Image src={avatarSrc} alt='avatar' priority />
      </div>
      <div className='content'>
        <Typography.Title className='title' level={4}>
          {title}
        </Typography.Title>
        {subtitle}
      </div>
    </CardStyled>
  )
}

export default Card
