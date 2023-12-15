import HightLine from '@/assets/svg/hight-line.svg'
import MatchIntro1 from '@/assets/images/home/match-intro-1.png'
import MatchIntro2 from '@/assets/images/home/match-intro-2.png'
import MatchIntro3 from '@/assets/images/home/match-intro-3.png'
import MatchIntro4 from '@/assets/images/home/match-intro-4.png'
import MatchIntro5 from '@/assets/images/home/match-intro-5.png'
import { ContainerStyled, MatchIntroStyled, SlideStyled, SponsorContainer } from './styled'
import Typography from '@/components/common/typography'
import { LegacyRef, RefObject, memo, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import dayjs from '@/utils/dayjs'
import { dateTimeReverseFormat } from '@/constants/format'
import Image from '@/components/common/image'
import DefaultAvatar from '@/assets/images/avatar_default.png'

type MatchType = {
  matchName: string
  startDatetime: string
  imageUrl: string
  listSponsorLogoDtos: {
    sponsorId?: number
    icon?: string
  }[]
}
const MatchIntro: React.FC = ({ listMatches }: { listMatches: MatchType[] }) => {
  const { t } = useTranslation('home', { useSuspense: false })
  const matchIconRef: RefObject<HTMLDivElement> | undefined = useRef(null)
  const matchIntro0Ref: LegacyRef<SVGPathElement> | undefined = useRef(null)
  const matchIntro1Ref: LegacyRef<SVGPathElement> | undefined = useRef(null)
  const matchIntro2Ref: LegacyRef<SVGPathElement> | undefined = useRef(null)
  const matchIntro3Ref: LegacyRef<SVGPathElement> | undefined = useRef(null)
  const matchIntro4Ref: LegacyRef<SVGPathElement> | undefined = useRef(null)
  const matchIntro5Ref: LegacyRef<SVGPathElement> | undefined = useRef(null)
  const matchIntro6Ref: LegacyRef<SVGPathElement> | undefined = useRef(null)
  const matchIntro7Ref: LegacyRef<SVGPathElement> | undefined = useRef(null)

  const listMatchInfo = listMatches
    ?.map((match) => `${match.matchName} - ${dayjs(match.startDatetime).format(dateTimeReverseFormat)}`)
    .join(' | ')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Loop over the entries
      entries.forEach((entry) => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          if (window?.innerWidth < 577) {
            matchIntro5Ref.current?.classList.add('animate')
            matchIntro6Ref.current?.classList.add('animate')
            matchIntro7Ref.current?.classList.add('animate')
          } else {
            matchIntro0Ref.current?.classList.add('animate')
            matchIntro1Ref.current?.classList.add('animate')
            matchIntro2Ref.current?.classList.add('animate')
            matchIntro3Ref.current?.classList.add('animate')
            matchIntro4Ref.current?.classList.add('animate')
          }
          observer.disconnect()
          return
        }
      })
    })

    if (matchIconRef?.current) {
      observer.observe(matchIconRef?.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <MatchIntroStyled lineInfoTime={(listMatchInfo?.length / 400) * 60}>
      <ContainerStyled fullWidth>
        <div className='title-box'>
          <Typography.Title className='title'>
            {t('MATCH_INTRO_1')}
            <br />
            {t('MATCH_INTRO_2')}
            <br />
            <img className='hight-light' src={HightLine.src} alt='hight-light' loading='lazy' />
          </Typography.Title>
        </div>
        <div className='icon'>
          <svg
            className='desktop'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='1163'
            height='651'
            fill='none'
            viewBox='0 0 1163 651'
          >
            <path
              ref={matchIntro0Ref}
              className='match-intro match-intro-1'
              fill='url(#pattern0_match)'
              d='M413 173H753V651H413z'
            ></path>
            <g ref={matchIntro1Ref} className='match-intro match-intro-right'>
              <path fill='url(#pattern1_match)' d='M983 315H1163V495H983z'></path>
              <path fill='url(#pattern2_match)' d='M771 315H951V495H771z'></path>
            </g>
            <g ref={matchIntro2Ref} className='match-intro match-intro-left'>
              <path fill='url(#pattern3_match)' d='M3 315H183V495H3z'></path>
              <path fill='url(#pattern4_match)' d='M215 315H395V495H215z'></path>
            </g>
            <g ref={matchIntro3Ref} className='match-intro match-intro-top-1'>
              <g filter='url(#filter0_f_9014_66692)'>
                <path
                  fill='url(#paint0_radial_9014_66692)'
                  d='M37.344 59.614c24.183 13.857 48.1 17.721 53.295 8.594l6.263-10.992L9.297 6.918 3.035 17.844c-5.263 9.194 10.06 27.847 34.309 41.77z'
                ></path>
                <path
                  fill='url(#paint1_linear_9014_66692)'
                  d='M43.673 48.622c24.183 13.857 48.032 17.72 53.296 8.594 5.262-9.127-10.127-27.78-34.376-41.704C38.41 1.655 14.56-2.142 9.297 6.918c-5.263 9.194 10.127 27.847 34.376 41.704z'
                ></path>
                <path
                  stroke='url(#paint2_linear_9014_66692)'
                  strokeWidth='2'
                  d='M89.57 53.02c-.998 1.798-2.93 2.93-5.728 3.53-2.732.533-6.263.533-10.326-.133-8.061-1.266-18.12-5.063-28.247-10.793-10.126-5.796-18.453-12.657-23.583-18.853-2.598-3.198-4.397-6.129-5.263-8.794-.866-2.598-.866-4.93.133-6.728 1-1.799 2.931-2.931 5.73-3.531 2.73-.533 6.262-.533 10.325.133 8.061 1.266 18.12 5.063 28.247 10.793C70.984 24.438 79.311 31.3 84.441 37.496c2.598 3.197 4.397 6.129 5.263 8.794.933 2.664.933 4.93-.133 6.728z'
                  opacity='0.5'
                ></path>
                <path
                  fill='#fff'
                  d='M64.522 33.433l-8.128-4.997c-.266.2-.866.534-1.732.933-2.598 1.466-4.663 2.732-6.196 3.664 6.33 3.93 9.927 6.396 10.793 7.462.333.732-.733.533-3.198-.733-.333-.2-.8-.533-1.266-1-1.998-1.798-6.262-4.663-12.79-8.66-.8-.466-1.8-.933-3.065-1.332-.467-.2-.733-.267-.733-.4-.4-.267.2-.466 1.665-.533 3.398-2.532 5.53-4.197 6.33-4.93 1.532-.266 2.93-.2 4.33.133.066.067.2.134.333.267.8.666 1.532 1.199 2.265 1.665 5.662 3.598 9.593 5.996 11.725 7.195 1.465.866 2.598 1.532 3.397 1.999 1.532 1.132 2.332 1.998 2.532 2.731.066.4-.467.467-1.599.133-1.666-.532-2.998-.932-4.197-1.199-1.532-.2-1.666-.4-.4-.533 1.066-.133 1.6-.333 1.6-.533.199 0-.334-.466-1.666-1.332zm-20.586-6.862l-2.998 1.865 6.529 3.998 2.865-1.932-6.396-3.93zm.8-.733l6.528 3.997 3.664-2.265c-3.797-2.331-6.129-3.53-6.995-3.53-.6 0-1.665.666-3.197 1.798z'
                ></path>
              </g>
              <g filter='url(#filter1_f_9014_66692)'>
                <path
                  fill='url(#paint3_radial_9014_66692)'
                  d='M88.793 101.34c29.809-12.345 50.276-31.518 45.593-42.738l-5.636-13.516L20.672 89.735l5.576 13.469c4.697 11.327 32.628 10.494 62.545-1.864z'
                ></path>
                <path
                  fill='url(#paint4_linear_9014_66692)'
                  d='M83.204 87.763c29.809-12.345 50.229-31.457 45.593-42.738-4.635-11.28-32.614-10.386-62.531 1.973C36.457 59.342 16.099 78.5 20.673 89.734c4.697 11.327 32.675 10.433 62.531-1.972z'
                ></path>
                <path
                  stroke='url(#paint5_linear_9014_66692)'
                  strokeWidth='2'
                  d='M119.718 48.828c.94 2.189.61 4.76-.821 7.747-1.445 2.88-3.944 6.114-7.43 9.365-6.865 6.488-17.463 13.015-29.879 18.236-12.475 5.174-24.655 7.945-33.96 8.259-4.769.117-8.727-.31-11.781-1.403-2.993-1.046-5.129-2.696-6.07-4.884-.94-2.189-.61-4.76.822-7.748 1.445-2.879 3.943-6.113 7.43-9.364 6.865-6.488 17.463-13.015 29.878-18.236 12.476-5.174 24.655-7.945 33.961-8.259 4.768-.117 8.727.31 11.781 1.403 3.101 1.032 5.175 2.635 6.069 4.884z'
                  opacity='0.5'
                ></path>
                <path
                  fill='#fff'
                  d='M84.05 57.911L73.72 61.82c-.005.385-.124 1.17-.371 2.247-.496 3.417-.799 6.205-1.029 8.268 8.08-3.015 12.884-4.566 14.473-4.605.907.214-.03 1.049-2.934 2.41a7.828 7.828 0 01-1.811.453c-3.063.558-8.704 2.436-16.987 5.587-.993.402-2.127.987-3.389 1.864-.513.286-.763.483-.885.389-.527.177-.286-.514.69-1.903.087-4.904.07-8.036-.036-9.287a12.129 12.129 0 013.187-3.872c.108-.014.264-.089.48-.117a25.072 25.072 0 003.129-.896c7.303-2.64 12.282-4.544 14.889-5.648 1.83-.73 3.242-1.295 4.235-1.697 2.122-.602 3.481-.722 4.294-.386.413.222.097.757-1.01 1.559-1.666 1.148-2.976 2.086-4.068 2.995-1.268 1.263-1.545 1.243-.772-.01.633-1.071.827-1.7.644-1.842.141-.184-.663-.025-2.4.582zm-20.855 14l-.414 4.067 8.283-3.152.257-3.991-8.127 3.076zm-.106-1.25l8.282-3.152.519-4.96c-4.824 1.829-7.572 3.116-8.185 3.91-.425.548-.569 1.996-.616 4.201z'
                ></path>
              </g>
              <path
                fill='url(#paint6_radial_9014_66692)'
                d='M115.054 152.483c36.3 20.8 72.199 26.6 79.999 12.9l9.4-16.5-131.5-75.5-9.4 16.4c-7.9 13.8 15.1 41.8 51.501 62.7z'
              ></path>
              <path
                fill='url(#paint7_linear_9014_66692)'
                d='M124.555 135.983c36.3 20.8 72.1 26.6 80 12.9 7.9-13.7-15.2-41.7-51.6-62.6-36.3-20.8-72.1-26.5-80-12.9-7.9 13.8 15.2 41.8 51.6 62.6z'
              ></path>
              <path
                stroke='url(#paint8_linear_9014_66692)'
                strokeWidth='2'
                d='M193.454 142.583c-1.5 2.7-4.4 4.4-8.6 5.3-4.1.8-9.4.8-15.5-.2-12.1-1.9-27.2-7.6-42.4-16.2-15.2-8.7-27.7-19-35.4-28.3-3.9-4.8-6.6-9.2-7.9-13.2-1.3-3.9-1.3-7.4.2-10.1 1.5-2.7 4.4-4.4 8.6-5.3 4.1-.8 9.4-.8 15.5.2 12.1 1.9 27.2 7.6 42.4 16.2 15.2 8.7 27.7 19 35.4 28.3 3.9 4.8 6.6 9.2 7.9 13.2 1.4 4 1.4 7.4-.2 10.1z'
                opacity='0.5'
              ></path>
              <path
                fill='#fff'
                d='M155.854 113.183l-12.2-7.5c-.4.3-1.3.8-2.6 1.4-3.9 2.2-7 4.1-9.3 5.5 9.5 5.9 14.9 9.6 16.2 11.2.5 1.1-1.1.8-4.8-1.1-.5-.3-1.2-.8-1.9-1.5-3-2.7-9.4-7-19.2-13-1.2-.7-2.7-1.4-4.6-2-.7-.3-1.1-.4-1.1-.6-.6-.4.3-.7 2.5-.8 5.1-3.8 8.3-6.3 9.5-7.4 2.3-.4 4.4-.3 6.5.2.1.1.3.2.5.4 1.2 1 2.3 1.8 3.4 2.5 8.5 5.4 14.4 9 17.6 10.8 2.2 1.3 3.9 2.3 5.1 3 2.3 1.7 3.5 3 3.8 4.1.1.6-.7.7-2.4.2-2.5-.8-4.5-1.4-6.3-1.8-2.3-.3-2.5-.6-.6-.8 1.6-.2 2.4-.5 2.4-.8.3 0-.5-.7-2.5-2zm-30.9-10.3l-4.5 2.8 9.8 6 4.3-2.9-9.6-5.9zm1.2-1.1l9.8 6 5.5-3.4c-5.7-3.5-9.2-5.3-10.5-5.3-.9 0-2.5 1-4.8 2.7z'
              ></path>
            </g>
            <g ref={matchIntro4Ref} className='match-intro match-intro-top-2'>
              <g filter='url(#filter2_f_9014_66692)'>
                <path
                  fill='url(#paint9_radial_9014_66692)'
                  d='M965.644 111.721c25.323 24.914 53.556 37.424 62.916 27.855l11.28-11.522-91.704-90.378-11.258 11.44c-9.466 9.63 3.382 37.587 28.766 62.605z'
                ></path>
                <path
                  fill='url(#paint10_linear_9014_66692)'
                  d='M977.002 100.221c25.328 24.914 53.468 37.402 62.918 27.855 9.44-9.547-3.49-37.526-28.87-62.544-25.325-24.914-53.496-37.32-62.918-27.855-9.465 9.629 3.464 37.608 28.87 62.544z'
                ></path>
                <path
                  stroke='url(#paint11_linear_9014_66692)'
                  strokeWidth='2'
                  d='M1032.17 120.507c-1.82 1.894-4.57 2.664-8.21 2.497-3.54-.227-7.89-1.371-12.69-3.508-9.52-4.171-20.695-12.111-31.322-22.453-10.606-10.425-18.649-21.58-22.966-30.88-2.168-4.783-3.436-8.979-3.64-12.544-.226-3.484.529-6.358 2.343-8.252 1.815-1.894 4.563-2.664 8.207-2.497 3.539.228 7.892 1.371 12.686 3.509 9.527 4.17 20.698 12.11 31.322 22.452 10.61 10.425 18.65 21.58 22.97 30.88 2.17 4.783 3.43 8.979 3.64 12.545.29 3.587-.45 6.379-2.34 8.251z'
                  opacity='0.5'
                ></path>
                <path
                  fill='#fff'
                  d='M974.837 76.386l2.121-1.726 17.356 9.126-8.62-16.312 2.122-1.725 8.295 15.875 2.912-2.396 3.137 3.107-4.016 3.247 3.136 3.106 4.01-3.247 3.14 3.106-4.02 3.247 6.29 6.13-2.01 1.665-6.29-6.13-4.018 3.247-3.134-3.106 4.013-3.247-3.052-3.085-4.014 3.248-3.135-3.107 2.891-2.313-17.114-8.71z'
                ></path>
              </g>
              <path
                fill='url(#paint12_radial_9014_66692)'
                d='M1090 86.83l-10.69-15.593-125.022 85.801 10.693 15.693c8.873 13.031 44.189 4.371 78.709-19.273 34.61-23.751 55.29-53.505 46.31-66.627z'
              ></path>
              <path
                fill='url(#paint13_linear_9014_66692)'
                d='M1079.31 71.237c-8.96-12.922-44.19-4.37-78.71 19.273-34.603 23.752-55.384 53.514-46.41 66.536 8.973 13.023 44.192 4.371 78.71-19.273 34.61-23.652 55.39-53.414 46.41-66.536z'
              ></path>
              <path
                stroke='url(#paint14_linear_9014_66692)'
                strokeWidth='2'
                d='M963.743 139.825c.975-4.091 3.314-8.694 6.816-13.791 6.93-9.887 18.564-21.156 33.021-31.047 14.46-9.791 29.05-16.684 40.96-19.548 6-1.486 11.28-1.91 15.43-1.442 4.26.56 7.29 2.022 9 4.593s1.99 6.06 1.01 10.052c-.97 4.091-3.31 8.694-6.82 13.791-6.92 9.887-18.56 21.156-33.01 31.047-14.46 9.791-29.06 16.684-40.966 19.548-6.001 1.486-11.283 1.911-15.434 1.442-4.259-.56-7.286-2.022-8.998-4.593-1.811-2.563-2.084-5.952-1.009-10.052z'
                opacity='0.5'
              ></path>
              <path
                fill='#fff'
                d='M1024.06 95.245l3.52 1.422-10.81 15.216 25.13-9.345 3.52 1.422-24.65 9.006 4.77 2.023-4.46 3.069-6.54-2.685-4.38 2.961 6.54 2.684-4.38 2.961-6.53-2.685-8.75 6.021-3.318-1.339 8.748-6.02-6.539-2.685 4.379-2.96 6.53 2.684 4.38-2.96-6.54-2.784 4.37-2.961 4.67 1.932 10.34-14.977z'
              ></path>
            </g>

            <defs>
              <pattern id='pattern0_match' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='matrix(.00052 0 0 .00037 -.001 0)' xlinkHref='#image0_8304_61817'></use>
              </pattern>
              <pattern id='pattern1_match' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.00067)' xlinkHref='#image1_8304_61817'></use>
              </pattern>
              <pattern id='pattern2_match' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.00067)' xlinkHref='#image2_8304_61817'></use>
              </pattern>
              <pattern id='pattern3_match' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.00067)' xlinkHref='#image3_8304_61817'></use>
              </pattern>
              <pattern id='pattern4_match' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.00067)' xlinkHref='#image4_8304_61817'></use>
              </pattern>
              <filter
                id='filter0_f_9014_66692'
                width='100'
                height='75.156'
                x='0'
                y='0'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_9014_66692' stdDeviation='1'></feGaussianBlur>
              </filter>
              <filter
                id='filter1_f_9014_66692'
                width='119.023'
                height='78.068'
                x='18.031'
                y='35.114'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_9014_66692' stdDeviation='1'></feGaussianBlur>
              </filter>
              <filter
                id='filter2_f_9014_66692'
                width='113.242'
                height='112.29'
                x='931.766'
                y='32.503'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_9014_66692' stdDeviation='1'></feGaussianBlur>
              </filter>
              <radialGradient
                id='paint0_radial_9014_66692'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(27.741 -71.033 111.169) scale(62.5526)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint1_linear_9014_66692'
                x1='62.621'
                x2='43.644'
                y1='15.518'
                y2='48.624'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint2_linear_9014_66692'
                x1='20.11'
                x2='86.034'
                y1='1.414'
                y2='62.814'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <radialGradient
                id='paint3_radial_9014_66692'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(-24.568 237.498 -142.125) scale(72.4106)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint4_linear_9014_66692'
                x1='66.291'
                x2='83.186'
                y1='46.975'
                y2='87.79'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint5_linear_9014_66692'
                x1='23.284'
                x2='126.186'
                y1='75.931'
                y2='59.001'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <radialGradient
                id='paint6_radial_9014_66692'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(27.741 -204.69 317.836) scale(93.8955)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint7_linear_9014_66692'
                x1='152.997'
                x2='124.512'
                y1='86.291'
                y2='135.986'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint8_linear_9014_66692'
                x1='89.19'
                x2='188.145'
                y1='65.12'
                y2='157.285'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <radialGradient
                id='paint9_radial_9014_66692'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(42.461 364.353 1306.854) scale(79.7287)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint10_linear_9014_66692'
                x1='1011.07'
                x2='976.978'
                y1='65.555'
                y2='100.198'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint11_linear_9014_66692'
                x1='963.23'
                x2='1024.61'
                y1='34.408'
                y2='131.45'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <radialGradient
                id='paint12_radial_9014_66692'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(147.66 496.974 216.523) scale(93.8955)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint13_linear_9014_66692'
                x1='1000.57'
                x2='1032.92'
                y1='90.532'
                y2='137.752'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint14_linear_9014_66692'
                x1='1062.49'
                x2='971.241'
                y1='64.324'
                y2='164.127'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
            </defs>
          </svg>
          <svg
            className='mobile'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='354'
            height='363'
            fill='none'
            viewBox='0 0 354 363'
          >
            <g ref={matchIntro5Ref} className='match-intro match-intro-left'>
              <path fill='url(#pattern0_match_mobile)' d='M6 105H96V195H6z'></path>
              <path fill='url(#pattern3_match_mobile)' d='M6 250H96V340H6z'></path>
            </g>
            <g ref={matchIntro6Ref} className='match-intro match-intro-right'>
              <path fill='url(#pattern1_match_mobile)' d='M259 105H349V195H259z'></path>
              <path fill='url(#pattern2_match_mobile)' d='M259 250H349V340H259z'></path>
            </g>
            <path
              ref={matchIntro7Ref}
              className='match-intro match-intro-1'
              fill='url(#pattern4_match_mobile)'
              d='M90 115H266V363H90z'
            ></path>
            <g filter='url(#filter0_f_8350_61872)'>
              <path
                fill='url(#paint0_radial_8350_61872)'
                d='M15.243 25.587c9.06 5.192 18.022 6.64 19.969 3.22l2.346-4.118L4.734 5.843 2.388 9.936C.416 13.381 6.157 20.37 15.243 25.587z'
              ></path>
              <path
                fill='url(#paint1_linear_8350_61872)'
                d='M17.614 21.469c9.061 5.192 17.997 6.64 19.97 3.22 1.971-3.42-3.795-10.41-12.88-15.626-9.062-5.192-17.998-6.615-19.97-3.22-1.972 3.444 3.794 10.434 12.88 15.626z'
              ></path>
              <path
                stroke='url(#paint2_linear_8350_61872)'
                strokeWidth='2'
                d='M34.812 23.116c-.374.674-1.098 1.099-2.147 1.323-1.023.2-2.346.2-3.869-.05-3.02-.474-6.79-1.897-10.583-4.043-3.794-2.172-6.915-4.743-8.837-7.065-.973-1.198-1.647-2.296-1.972-3.294-.324-.974-.324-1.848.05-2.521.375-.674 1.099-1.099 2.147-1.323 1.023-.2 2.346-.2 3.87.05 3.02.474 6.789 1.897 10.583 4.043 3.794 2.172 6.914 4.743 8.836 7.064.974 1.198 1.648 2.297 1.972 3.295.35.999.35 1.847-.05 2.521z'
                opacity='0.5'
              ></path>
              <path
                fill='#fff'
                d='M25.426 15.777l-3.046-1.872c-.1.075-.324.2-.649.35-.973.549-1.747 1.023-2.321 1.373 2.371 1.472 3.72 2.396 4.044 2.795.124.275-.275.2-1.198-.274-.125-.075-.3-.2-.475-.375-.749-.674-2.346-1.747-4.792-3.245-.3-.174-.674-.35-1.149-.499-.174-.075-.274-.1-.274-.15-.15-.1.075-.174.624-.2 1.273-.948 2.072-1.572 2.371-1.846a3.925 3.925 0 011.623.05c.025.024.075.05.124.1.3.249.575.449.85.623 2.12 1.348 3.594 2.247 4.392 2.696l1.273.75c.575.423.874.748.949 1.023.025.15-.175.174-.6.05-.623-.2-1.122-.35-1.572-.45-.574-.075-.624-.15-.15-.2.4-.05.6-.124.6-.2.075 0-.125-.174-.624-.498zm-7.713-2.57l-1.124.698 2.447 1.498 1.073-.724-2.397-1.473zm.3-.275l2.445 1.498 1.373-.85c-1.423-.873-2.296-1.322-2.62-1.322-.225 0-.625.25-1.199.674z'
              ></path>
            </g>
            <g filter='url(#filter1_f_8350_61872)'>
              <path
                fill='url(#paint3_radial_8350_61872)'
                d='M34.519 41.221c11.169-4.625 18.837-11.809 17.083-16.013l-2.112-5.064L8.995 36.873l2.089 5.047c1.76 4.244 12.225 3.932 23.435-.699z'
              ></path>
              <path
                fill='url(#paint4_linear_8350_61872)'
                d='M32.425 36.134c11.17-4.625 18.82-11.786 17.084-16.013-1.737-4.227-12.22-3.891-23.43.739-11.17 4.625-18.797 11.804-17.083 16.013 1.76 4.244 12.243 3.91 23.43-.739z'
              ></path>
              <path
                stroke='url(#paint5_linear_8350_61872)'
                strokeWidth='2'
                d='M46.107 21.546c.352.82.229 1.783-.308 2.903-.541 1.078-1.477 2.29-2.784 3.508-2.572 2.431-6.543 4.877-11.195 6.833-4.674 1.939-9.238 2.977-12.724 3.095-1.787.043-3.27-.116-4.414-.526-1.122-.392-1.922-1.01-2.274-1.83-.353-.82-.23-1.784.307-2.903.542-1.079 1.478-2.29 2.784-3.508 2.572-2.432 6.543-4.877 11.195-6.833 4.675-1.939 9.238-2.977 12.725-3.095 1.786-.044 3.27.116 4.414.526 1.162.386 1.94.987 2.274 1.83z'
                opacity='0.5'
              ></path>
              <path
                fill='#fff'
                d='M32.742 24.95l-3.87 1.464c-.002.144-.047.438-.14.842-.185 1.28-.299 2.325-.385 3.098 3.028-1.13 4.828-1.711 5.423-1.726.34.08-.011.393-1.1.903a2.93 2.93 0 01-.678.17c-1.147.209-3.261.912-6.364 2.093a6.5 6.5 0 00-1.27.699c-.193.107-.286.18-.332.145-.198.067-.107-.192.259-.713.032-1.837.026-3.01-.014-3.48a4.545 4.545 0 011.194-1.45c.04-.005.099-.033.18-.044.44-.098.818-.208 1.172-.335 2.737-.99 4.602-1.703 5.579-2.117.686-.273 1.215-.485 1.587-.636.795-.225 1.304-.27 1.609-.144.155.083.036.283-.378.584-.625.43-1.116.781-1.525 1.122-.475.473-.579.466-.289-.004.237-.401.31-.637.241-.69.053-.069-.248-.01-.899.218zm-7.814 5.245l-.155 1.523 3.103-1.18.097-1.496-3.045 1.153zm-.04-.469l3.104-1.18.194-1.859c-1.807.685-2.837 1.167-3.067 1.465-.159.205-.213.748-.23 1.574z'
              ></path>
            </g>
            <path
              fill='url(#paint6_radial_8350_61872)'
              d='M44.36 60.384c13.601 7.793 27.052 9.966 29.975 4.833l3.522-6.182-49.271-28.289-3.522 6.145c-2.96 5.17 5.657 15.662 19.296 23.493z'
            ></path>
            <path
              fill='url(#paint7_linear_8350_61872)'
              d='M47.92 54.202c13.602 7.793 27.016 9.966 29.976 4.833 2.96-5.133-5.695-15.624-19.334-23.455-13.601-7.794-27.015-9.93-29.975-4.834-2.96 5.17 5.695 15.662 19.334 23.456z'
            ></path>
            <path
              stroke='url(#paint8_linear_8350_61872)'
              strokeWidth='2'
              d='M73.735 56.674c-.562 1.012-1.648 1.649-3.222 1.986-1.536.3-3.522.3-5.808-.075-4.533-.712-10.191-2.847-15.886-6.07-5.696-3.26-10.38-7.119-13.264-10.603-1.462-1.799-2.473-3.447-2.96-4.946-.487-1.461-.487-2.773.075-3.784.562-1.012 1.648-1.65 3.222-1.986 1.536-.3 3.522-.3 5.808.075 4.533.712 10.191 2.847 15.886 6.07 5.696 3.26 10.38 7.119 13.264 10.603 1.462 1.799 2.473 3.447 2.96 4.946.525 1.499.525 2.773-.075 3.784z'
              opacity='0.5'
            ></path>
            <path
              fill='#fff'
              d='M59.647 45.658l-4.572-2.81c-.15.113-.487.3-.974.525-1.461.824-2.623 1.536-3.484 2.06 3.56 2.211 5.582 3.598 6.07 4.197.187.412-.413.3-1.799-.412-.187-.112-.45-.3-.712-.562-1.124-1.012-3.522-2.623-7.194-4.87a8.43 8.43 0 00-1.724-.75c-.262-.113-.412-.15-.412-.225-.224-.15.113-.262.937-.3 1.911-1.424 3.11-2.36 3.56-2.773a5.894 5.894 0 012.435.075c.038.038.113.075.187.15.45.375.862.675 1.274.937 3.185 2.023 5.396 3.372 6.595 4.047.824.487 1.461.861 1.91 1.124.862.637 1.312 1.124 1.425 1.536.037.225-.263.262-.9.075-.936-.3-1.686-.525-2.36-.675-.862-.112-.937-.224-.225-.3.6-.074.9-.187.9-.3.112 0-.188-.261-.938-.748zM48.069 41.8l-1.686 1.05 3.671 2.248 1.612-1.087-3.597-2.21zm.45-.412l3.671 2.248 2.061-1.274c-2.136-1.311-3.447-1.986-3.934-1.986-.337 0-.937.375-1.799 1.012z'
            ></path>
            <g filter='url(#filter2_f_8350_61872)'>
              <path
                fill='url(#paint9_radial_8350_61872)'
                d='M302.229 32.35c9.627 9.47 20.358 14.225 23.917 10.588l4.288-4.38-34.86-34.355-4.279 4.349c-3.598 3.66 1.285 14.288 10.934 23.798z'
              ></path>
              <path
                fill='url(#paint10_linear_8350_61872)'
                d='M306.547 27.977c9.626 9.471 20.327 14.218 23.916 10.59 3.59-3.63-1.324-14.265-10.974-23.776-9.626-9.47-20.335-14.186-23.916-10.588-3.598 3.66 1.317 14.296 10.974 23.774z'
              ></path>
              <path
                stroke='url(#paint11_linear_8350_61872)'
                strokeWidth='2'
                d='M327.516 35.689c-.689.72-1.734 1.013-3.119.95-1.346-.087-3-.522-4.823-1.335-3.621-1.585-7.868-4.603-11.907-8.535-4.032-3.962-7.089-8.203-8.73-11.738-.824-1.818-1.306-3.413-1.384-4.768-.086-1.325.201-2.417.891-3.137.69-.72 1.734-1.013 3.119-.95 1.346.087 3 .522 4.823 1.334 3.621 1.586 7.868 4.604 11.907 8.535 4.032 3.963 7.09 8.204 8.731 11.739.823 1.818 1.305 3.413 1.383 4.768.109 1.364-.17 2.425-.891 3.137z'
                opacity='0.5'
              ></path>
              <path
                fill='#fff'
                d='M305.724 18.917l.807-.656 6.597 3.469-3.276-6.2.806-.657 3.153 6.035 1.107-.91 1.192 1.18-1.526 1.235 1.192 1.18 1.525-1.234 1.192 1.18-1.526 1.235 2.392 2.33-.767.633-2.392-2.33-1.525 1.234-1.192-1.18 1.526-1.235-1.161-1.172-1.525 1.234-1.192-1.18 1.099-.88-6.506-3.311z'
              ></path>
            </g>
            <path
              fill='url(#paint12_radial_8350_61872)'
              d='M349.499 22.887l-4.061-5.927-47.525 32.615 4.065 5.966c3.373 4.953 16.799 1.66 29.919-7.327 13.155-9.028 21.016-20.339 17.602-25.327z'
            ></path>
            <path
              fill='url(#paint13_linear_8350_61872)'
              d='M345.438 16.96c-3.407-4.913-16.798-1.662-29.919 7.326-13.155 9.029-21.054 20.342-17.643 25.292 3.411 4.95 16.799 1.662 29.919-7.326 13.158-8.99 21.057-20.304 17.643-25.292z'
            ></path>
            <path
              stroke='url(#paint14_linear_8350_61872)'
              strokeWidth='2'
              d='M301.507 43.032c.371-1.555 1.26-3.304 2.591-5.242 2.634-3.759 7.057-8.042 12.551-11.802 5.497-3.722 11.045-6.342 15.572-7.43 2.281-.566 4.289-.727 5.867-.549 1.618.213 2.769.769 3.42 1.746.65.977.757 2.304.383 3.821-.37 1.555-1.259 3.305-2.591 5.242-2.634 3.759-7.056 8.043-12.55 11.802-5.498 3.722-11.045 6.342-15.572 7.43-2.281.566-4.289.727-5.867.55-1.619-.214-2.77-.77-3.42-1.747-.689-.974-.792-2.263-.384-3.82z'
              opacity='0.5'
            ></path>
            <path
              fill='#fff'
              d='M324.434 26.086l1.34.54-4.111 5.785 9.553-3.553 1.34.541-9.373 3.423 1.816.77-1.698 1.166-2.485-1.02-1.664 1.125 2.485 1.02-1.664 1.126-2.484-1.02-3.325 2.288-1.261-.509 3.324-2.288-2.484-1.02 1.663-1.126 2.485 1.02 1.664-1.125-2.488-1.059 1.664-1.125 1.775.734 3.928-5.693z'
            ></path>
            <defs>
              <pattern id='pattern0_match_mobile' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.00067)' xlinkHref='#image3_8304_61817'></use>
              </pattern>
              <pattern id='pattern1_match_mobile' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.00067)' xlinkHref='#image1_8304_61817'></use>
              </pattern>
              <pattern id='pattern2_match_mobile' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.00067)' xlinkHref='#image2_8304_61817'></use>
              </pattern>
              <pattern id='pattern3_match_mobile' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.00067)' xlinkHref='#image4_8304_61817'></use>
              </pattern>
              <pattern id='pattern4_match_mobile' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='matrix(.00052 0 0 .00037 -.003 0)' xlinkHref='#image0_8304_61817'></use>
              </pattern>
              <filter
                id='filter0_f_8350_61872'
                width='39.97'
                height='30.661'
                x='0'
                y='0'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_8350_61872' stdDeviation='1'></feGaussianBlur>
              </filter>
              <filter
                id='filter1_f_8350_61872'
                width='47.096'
                height='31.752'
                x='6.755'
                y='13.157'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_8350_61872' stdDeviation='1'></feGaussianBlur>
              </filter>
              <filter
                id='filter2_f_8350_61872'
                width='43.056'
                height='41.688'
                x='290.178'
                y='1.712'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_8350_61872' stdDeviation='1'></feGaussianBlur>
              </filter>
              <filter
                id='filter0_f_8350_61872'
                width='39.97'
                height='30.661'
                x='0'
                y='2'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_8350_61872' stdDeviation='1'></feGaussianBlur>
              </filter>
              <filter
                id='filter1_f_8350_61872'
                width='47.096'
                height='31.752'
                x='6.755'
                y='15.157'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_8350_61872' stdDeviation='1'></feGaussianBlur>
              </filter>
              <filter
                id='filter2_f_8350_61872'
                width='45.526'
                height='45.165'
                x='288.112'
                y='0.996'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_8350_61872' stdDeviation='1'></feGaussianBlur>
              </filter>
              <radialGradient
                id='paint0_radial_8350_61872'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(27.741 -32.572 45.811) scale(23.4376)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint1_linear_8350_61872'
                x1='24.714'
                x2='17.604'
                y1='9.065'
                y2='21.469'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint2_linear_8350_61872'
                x1='8.786'
                x2='33.487'
                y1='3.781'
                y2='26.786'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <radialGradient
                id='paint3_radial_8350_61872'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(-24.568 97.076 -54.495) scale(27.1312)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint4_linear_8350_61872'
                x1='26.088'
                x2='32.419'
                y1='20.852'
                y2='36.145'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint5_linear_8350_61872'
                x1='9.975'
                x2='48.531'
                y1='31.701'
                y2='25.357'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <radialGradient
                id='paint6_radial_8350_61872'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(27.741 -82.651 123.247) scale(35.1814)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint7_linear_8350_61872'
                x1='58.578'
                x2='47.905'
                y1='35.583'
                y2='54.203'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint8_linear_8350_61872'
                x1='34.669'
                x2='71.746'
                y1='27.65'
                y2='62.183'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <radialGradient
                id='paint9_radial_8350_61872'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(42.461 119.104 408.262) scale(30.3072)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint10_linear_8350_61872'
                x1='319.498'
                x2='306.538'
                y1='14.8'
                y2='27.969'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint11_linear_8350_61872'
                x1='301.312'
                x2='324.645'
                y1='2.96'
                y2='39.849'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <radialGradient
                id='paint12_radial_8350_61872'
                cx='0'
                cy='0'
                r='1'
                gradientTransform='rotate(147.66 157.963 67.847) scale(35.6924)'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FF9460'></stop>
                <stop offset='0.604' stopColor='#FFC271'></stop>
                <stop offset='1' stopColor='#FFF383'></stop>
              </radialGradient>
              <linearGradient
                id='paint13_linear_8350_61872'
                x1='315.505'
                x2='327.805'
                y1='24.294'
                y2='42.244'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#FFF584'></stop>
                <stop offset='0.344' stopColor='#FEC171'></stop>
                <stop offset='0.947' stopColor='#FE9462'></stop>
              </linearGradient>
              <linearGradient
                id='paint14_linear_8350_61872'
                x1='339.043'
                x2='304.358'
                y1='14.332'
                y2='52.27'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#fff'></stop>
                <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
              </linearGradient>
              <image id='image0_8304_61817' width='1923' height='2696' xlinkHref={MatchIntro1.src} />
              <image id='image1_8304_61817' width='1501' height='1501' xlinkHref={MatchIntro5.src} />
              <image id='image2_8304_61817' width='1501' height='1501' xlinkHref={MatchIntro4.src} />
              <image id='image3_8304_61817' width='1501' height='1501' xlinkHref={MatchIntro3.src} />
              <image id='image4_8304_61817' width='1501' height='1501' xlinkHref={MatchIntro2.src} />
            </defs>
          </svg>
        </div>
      </ContainerStyled>

      <span ref={matchIconRef} />

      <SlideStyled lineBannerTime={listMatches?.length * 4.5}>
        {listMatches?.map((item, index) => (
          <div className='match-container' key={index}>
            <div className='image-container'>
              {[...new Array(3)].map((_, itemIndex) => (
                <div className='sponsors-list' key={`list-${2 - itemIndex}`}>
                  {item.listSponsorLogoDtos[7 * (2 - itemIndex)] &&
                    item.listSponsorLogoDtos
                      ?.slice(7 * (2 - itemIndex), 7 * (2 - itemIndex) + 7)
                      .map((sponsor, index) => (
                        <SponsorContainer key={sponsor.sponsorId ?? `sponsor-${index}`} index={index + 1}>
                          <Image
                            fill
                            src={sponsor?.icon}
                            alt='sponsor_avatar'
                            defaultSrc={DefaultAvatar.src}
                            objectFit='cover'
                          />
                        </SponsorContainer>
                      ))}
                </div>
              ))}

              <Image alt='image' src={item.imageUrl} priority fill objectFit='contain' />
            </div>
            <div className='match-name'>
              {dayjs(item.startDatetime).format(dateTimeReverseFormat)} <br />
              {item.matchName}
            </div>
          </div>
        ))}
      </SlideStyled>
    </MatchIntroStyled>
  )
}

export default memo(MatchIntro)
