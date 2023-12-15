import React from 'react'
import {
  SectionStyled,
  SponsorPartial1Styled,
  SponsorPartial2Styled,
  SponsorPartialContentStyled,
  WrapSponsorPartialStyled,
  ImageStyled,
  LineStyled
} from './styled'
import Image from '@/components/common/image'

import SponsorPartial1JA from '@/assets/images/sponser-step-1-ja.png'
import SponsorPartial2JA from '@/assets/images/sponser-step-2-ja.png'
import SponsorPartial3JA from '@/assets/images/sponser-step-3-ja.png'
import SponsorPartial4JA from '@/assets/images/sponser-step-4-ja.png'
import SponsorPartial1EN from '@/assets/images/sponser-step-1-en.png'
import SponsorPartial2EN from '@/assets/images/sponser-step-2-en.png'
import SponsorPartial3EN from '@/assets/images/sponser-step-3-en.png'
import SponsorPartial4EN from '@/assets/images/sponser-step-4-en.png'
import SponsorPartial5 from '@/assets/images/sponser-step-5.png'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function Section7() {
  const { t } = useTranslation('guide')
  const router = useRouter()
  const langKey = router?.locale?.toLocaleUpperCase() ?? 'JA'

  const SponsorParitals = [
    {
      image: langKey === 'JA' ? SponsorPartial1JA.src : SponsorPartial1EN.src,
      title: t('BETS_TAB.SPONSOR_STEP_1_TITLE'),
      content: t('BETS_TAB.SPONSOR_STEP_1_CONTENT')
    },
    {
      image: langKey === 'JA' ? SponsorPartial2JA.src : SponsorPartial2EN.src,
      title: t('BETS_TAB.SPONSOR_STEP_2_TITLE'),
      content: t('BETS_TAB.SPONSOR_STEP_2_CONTENT')
    },
    {
      image: langKey === 'JA' ? SponsorPartial3JA.src : SponsorPartial3EN.src,
      title: t('BETS_TAB.SPONSOR_STEP_3_TITLE'),
      content: t('BETS_TAB.SPONSOR_STEP_3_CONTENT')
    },
    {
      image: langKey === 'JA' ? SponsorPartial4JA.src : SponsorPartial4EN.src,
      title: t('BETS_TAB.SPONSOR_STEP_4_TITLE'),
      content: t('BETS_TAB.SPONSOR_STEP_4_CONTENT')
    }
  ]

  return (
    <SectionStyled>
      <WrapSponsorPartialStyled>
        {SponsorParitals.map((item, index) =>
          index % 2 === 0 ? (
            <SponsorPartial2Styled className='item' key={index}>
              <SponsorPartialContentStyled>
                <div className='title'>{item.title}</div>

                <div className='content'>{item.content}</div>
              </SponsorPartialContentStyled>

              <ImageStyled>
                <Image src={item.image} fill alt={item.title} />
              </ImageStyled>
            </SponsorPartial2Styled>
          ) : (
            <SponsorPartial1Styled className='item' key={index}>
              <ImageStyled>
                <Image src={item.image} fill alt={item.title} />
              </ImageStyled>

              <SponsorPartialContentStyled>
                <div className='title'>{item.title}</div>

                <div className='content' dangerouslySetInnerHTML={{ __html: item.content ?? '' }} />
              </SponsorPartialContentStyled>
            </SponsorPartial1Styled>
          )
        )}
      </WrapSponsorPartialStyled>

      <LineStyled />

      <SponsorPartial1Styled className='last'>
        <ImageStyled>
          <Image src={SponsorPartial5.src} fill alt='PRスポンサー情報' />
        </ImageStyled>

        <SponsorPartialContentStyled>
          <div className='title'>{t('BETS_TAB.SPONSOR_STEP_5_TITLE')}</div>

          <div className='content'>{t('BETS_TAB.SPONSOR_STEP_5_CONTENT')}</div>
        </SponsorPartialContentStyled>
      </SponsorPartial1Styled>
    </SectionStyled>
  )
}
