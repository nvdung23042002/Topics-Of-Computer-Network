import React from 'react'
import {
  SectionStyled,
  SOPartial1Styled,
  SOPartial2Styled,
  SOPartialContentStyled,
  WrapSOPartialStyled,
  ImageStyled
} from './styled'
import Image from '@/components/common/image'

import SOPartial1 from '@/assets/images/SO-partial-1.png'
import SOPartial2JA from '@/assets/images/SO-partial-2-ja.png'
import SOPartial2EN from '@/assets/images/SO-partial-2-en.png'
import SOPartial3JA from '@/assets/images/SO-partial-3-ja.png'
import SOPartial3EN from '@/assets/images/SO-partial-3-en.png'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function Section5() {
  const { t } = useTranslation('guide')

  const router = useRouter()
  const langKey = router?.locale?.toLocaleUpperCase() ?? 'JA'

  const SOParitals = [
    {
      image: SOPartial1.src,
      title: t('BETS_TAB.SO_PART_1_TITLE'),
      content: t('BETS_TAB.SO_PART_1_CONTENT')
    },
    {
      image: langKey === 'JA' ? SOPartial2JA.src : SOPartial2EN.src,
      title: t('BETS_TAB.SO_PART_2_TITLE'),
      content: t('BETS_TAB.SO_PART_2_CONTENT')
    },
    {
      image: langKey === 'JA' ? SOPartial3JA.src : SOPartial3EN.src,
      title: t('BETS_TAB.SO_PART_3_TITLE'),
      content: t('BETS_TAB.SO_PART_3_CONTENT')
    }
  ]

  return (
    <SectionStyled>
      <WrapSOPartialStyled>
        {SOParitals.map((item, index) =>
          index % 2 === 0 ? (
            <SOPartial2Styled className='item' key={index}>
              <SOPartialContentStyled>
                <div className='title'>{item.title}</div>

                <div className='content' dangerouslySetInnerHTML={{ __html: item.content ?? '' }} />
              </SOPartialContentStyled>

              <ImageStyled>
                <Image src={item.image} fill alt={item.title} />
              </ImageStyled>
            </SOPartial2Styled>
          ) : (
            <SOPartial1Styled className='item' key={index}>
              <ImageStyled>
                <Image src={item.image} fill alt={item.title} />
              </ImageStyled>

              <SOPartialContentStyled>
                <div className='title'>{item.title}</div>

                <div className='content'>{item.content}</div>
              </SOPartialContentStyled>
            </SOPartial1Styled>
          )
        )}
      </WrapSOPartialStyled>
    </SectionStyled>
  )
}
