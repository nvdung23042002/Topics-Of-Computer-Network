import React from 'react'
import {
  SectionStyled,
  Match1Styled,
  Match2Styled,
  MatchContentStyled,
  TitleStyled,
  WrapMatchStyled,
  ImageStyled
} from './styled'
import Image from '@/components/common/image'

import Match1 from '@/assets/images/match-1.png'
import Match2 from '@/assets/images/match-2.png'
import { useTranslation } from 'next-i18next'

export default function Section3() {
  const { t } = useTranslation('guide')

  return (
    <SectionStyled>
      <TitleStyled>{t('BETS_TAB.MATCH')}</TitleStyled>

      <WrapMatchStyled>
        <Match1Styled>
          <ImageStyled>
            <Image src={Match1.src} fill alt='Match-1' />
          </ImageStyled>

          <MatchContentStyled>
            <div className='title'>{t('BETS_TAB.TOURNAMENT')}</div>

            <div className='content'>
              <ol className='list' type='1'>
                <li>{t('BETS_TAB.TOURNAMENT_1')}</li>
                <li>{t('BETS_TAB.TOURNAMENT_2')}</li>
                <li>{t('BETS_TAB.TOURNAMENT_3')}</li>
                <li>{t('BETS_TAB.TOURNAMENT_4')}</li>
                <li>{t('BETS_TAB.TOURNAMENT_5')}</li>
                <li>{t('BETS_TAB.TOURNAMENT_6')}</li>
                <li>{t('BETS_TAB.TOURNAMENT_7')}</li>
                <li>{t('BETS_TAB.TOURNAMENT_8')}</li>
              </ol>

              <div className='text'>{t('BETS_TAB.TOURNAMENT_9')}</div>
            </div>
          </MatchContentStyled>
        </Match1Styled>

        <Match2Styled>
          <MatchContentStyled>
            <div className='title'>{t('BETS_TAB.GAME')}</div>

            <div className='content'>
              <ol className='list' type='1'>
                <li>{t('BETS_TAB.GAME_1')}</li>
                <li>{t('BETS_TAB.GAME_2')}</li>
                <li>
                  <div dangerouslySetInnerHTML={{ __html: t('BETS_TAB.GAME_3') ?? '' }}></div>
                </li>
                <li>{t('BETS_TAB.GAME_4')}</li>
              </ol>

              <div className='text' dangerouslySetInnerHTML={{ __html: t('BETS_TAB.GAME_5') ?? '' }} />
            </div>
          </MatchContentStyled>

          <ImageStyled>
            <Image src={Match2.src} fill alt='Match-2' />
          </ImageStyled>
        </Match2Styled>
      </WrapMatchStyled>
    </SectionStyled>
  )
}
