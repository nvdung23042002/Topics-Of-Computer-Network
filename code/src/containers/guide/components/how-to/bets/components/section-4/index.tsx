import React from 'react'
import { SectionStyled, SOStyled, TitleStyled, WrapSOStyled } from './styled'
import { useTranslation } from 'next-i18next'

const STEP_1 = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <path
      d='M6 18H42M6 30H42M24 6V42M15.6 6H32.4C35.7603 6 37.4405 6 38.7239 6.65396C39.8529 7.2292 40.7708 8.14708 41.346 9.27606C42 10.5595 42 12.2397 42 15.6V32.4C42 35.7603 42 37.4405 41.346 38.7239C40.7708 39.8529 39.8529 40.7708 38.7239 41.346C37.4405 42 35.7603 42 32.4 42H15.6C12.2397 42 10.5595 42 9.27606 41.346C8.14708 40.7708 7.2292 39.8529 6.65396 38.7239C6 37.4405 6 35.7603 6 32.4V15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6Z'
      stroke='#DE1D43'
      strokeWidth='3.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const STEP_2 = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <path
      d='M42 42L33.3 33.3M22 12C27.5228 12 32 16.4772 32 22M38 22C38 30.8366 30.8366 38 22 38C13.1634 38 6 30.8366 6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22Z'
      stroke='#DE1D43'
      strokeWidth='3.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const STEP_3 = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <path
      d='M24 32.0002V24.0002M24 16.0002H24.02M6 15.8831V32.1173C6 32.8026 6 33.1452 6.10097 33.4508C6.19029 33.7212 6.33632 33.9693 6.52927 34.1787C6.74737 34.4154 7.0469 34.5818 7.64594 34.9146L22.4459 43.1368C23.0132 43.4519 23.2968 43.6095 23.5971 43.6712C23.8629 43.7259 24.1371 43.7259 24.4029 43.6712C24.7032 43.6095 24.9868 43.4519 25.5541 43.1368L40.3541 34.9146C40.9531 34.5818 41.2526 34.4154 41.4707 34.1787C41.6637 33.9693 41.8097 33.7212 41.899 33.4508C42 33.1452 42 32.8026 42 32.1173V15.8831C42 15.1978 42 14.8551 41.899 14.5495C41.8097 14.2792 41.6637 14.031 41.4707 13.8216C41.2526 13.585 40.9531 13.4186 40.3541 13.0858L25.5541 4.86353C24.9868 4.54842 24.7032 4.39086 24.4029 4.32909C24.1371 4.27442 23.8629 4.27442 23.5971 4.32909C23.2968 4.39086 23.0132 4.54842 22.4459 4.86353L7.64594 13.0858C7.04689 13.4186 6.74737 13.585 6.52927 13.8216C6.33632 14.031 6.19029 14.2792 6.10097 14.5495C6 14.8551 6 15.1978 6 15.8831Z'
      stroke='#DE1D43'
      strokeWidth='3.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const STEP_4 = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <path
      d='M31.9968 18V12C31.9968 7.58172 28.4151 4 23.9968 4C19.5786 4 15.9968 7.58172 15.9968 12V18M7.18084 20.7039L5.98084 33.5039C5.63964 37.1433 5.46905 38.963 6.07293 40.3685C6.60343 41.6033 7.53307 42.6241 8.71287 43.2676C10.0559 44 11.8836 44 15.5389 44H32.4547C36.1101 44 37.9378 44 39.2808 43.2676C40.4606 42.6241 41.3902 41.6033 41.9207 40.3685C42.5246 38.963 42.354 37.1433 42.0128 33.5039L40.8128 20.7039C40.5247 17.6307 40.3807 16.0941 39.6895 14.9323C39.0808 13.9092 38.1815 13.0902 37.106 12.5797C35.8848 12 34.3415 12 31.2547 12L16.7389 12C13.6522 12 12.1089 12 10.8877 12.5797C9.81216 13.0902 8.91285 13.9092 8.30415 14.9323C7.61301 16.0941 7.46896 17.6307 7.18084 20.7039Z'
      stroke='#DE1D43'
      strokeWidth='3.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

const STEP_5 = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48' fill='none'>
    <path
      d='M32 36L36 40L44 32M44 20H4M44 24V16.4C44 14.1598 44 13.0397 43.564 12.184C43.1805 11.4314 42.5686 10.8195 41.816 10.436C40.9603 10 39.8402 10 37.6 10H10.4C8.15979 10 7.03969 10 6.18404 10.436C5.43139 10.8195 4.81947 11.4314 4.43597 12.184C4 13.0397 4 14.1598 4 16.4V31.6C4 33.8402 4 34.9603 4.43597 35.816C4.81947 36.5686 5.43139 37.1805 6.18404 37.564C7.03969 38 8.15979 38 10.4 38H24'
      stroke='#DE1D43'
      strokeWidth='3.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default function Section4() {
  const { t } = useTranslation('guide')

  const SO_STEP = [
    { key: 1, icon: <STEP_1 />, text: t('BETS_TAB.STEP_1') },
    { key: 2, icon: <STEP_2 />, text: t('BETS_TAB.STEP_2') },
    { key: 3, icon: <STEP_3 />, text: t('BETS_TAB.STEP_3') },
    { key: 4, icon: <STEP_4 />, text: t('BETS_TAB.STEP_4') },
    { key: 5, icon: <STEP_5 />, text: t('BETS_TAB.STEP_5') }
  ]

  return (
    <SectionStyled>
      <TitleStyled>{t('BETS_TAB.SO')}</TitleStyled>

      <WrapSOStyled>
        {SO_STEP.map((item, index) => (
          <SOStyled key={index} className={!item.key ? 'none-style' : ''}>
            <div
              className='step'
              dangerouslySetInnerHTML={{ __html: t('BETS_TAB.STEP', { number: item.key }) ?? '' }}
            />

            <div className='content'>
              <div>{item.icon}</div>
            </div>

            <div className='text'>{item.text}</div>
          </SOStyled>
        ))}
      </WrapSOStyled>
    </SectionStyled>
  )
}
