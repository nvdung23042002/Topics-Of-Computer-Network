import { ButtonStyled, ContainerStyled, NSBIntroStyled, SlideStyled } from './styled'
import Typography from '@/components/common/typography'
import NSBImage0 from '@/assets/images/home/nsb-intro-0.png'
import NSBImage1 from '@/assets/images/home/nsb-intro-1.png'
import NSBImage2 from '@/assets/images/home/nsb-intro-2.png'
import NSBImage3 from '@/assets/images/home/nsb-intro-3.png'
import NSBImage5 from '@/assets/images/home/nsb-intro-5.png'
import NSBImage6 from '@/assets/images/home/nsb-intro-6.png'

import { useTranslation } from 'next-i18next'
import Image from '@/components/common/image'
import { Fragment, memo, useCallback } from 'react'
import { useAppSelector } from '@/hooks/store'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/constants/routes'
import useModal from '@/hooks/useModal'
import { isNil } from 'lodash'

const JoinButton = memo(() => {
  const { t } = useTranslation('home', { useSuspense: false })
  const isAuthenticated = useAppSelector((state) => state.auth?.isAuthenticated)
  const totalTicket = useAppSelector((state) => state.auth?.user?.totalTicket)
  const navigate = useRouter()
  const { openModal, closeModal } = useModal()
  const onJoinClick = useCallback(() => {
    if (isAuthenticated) {
      if (!isNil(totalTicket) && Number(totalTicket) > 0) {
        navigate.push(AppRoutes.betList)
      } else {
        openModal({
          type: 'confirmation',
          title: t('NOT_ENOUGH_TICKET'),
          subContent: t('PLEASE_PURCHASE_TICKET'),
          cancelText: t('CANCEL', { ns: 'common' }) ?? undefined,
          okText: t('OK', { ns: 'common' }) ?? undefined,
          onCancel: closeModal,
          onOk: () => {
            closeModal()
            navigate.push(AppRoutes.ticketPurchase)
          }
        })
      }
    } else if (isAuthenticated === false) {
      const node = document.getElementById('action-login-button')
      if (node) node.click()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, totalTicket, t])
  return (
    <ButtonStyled className='join-btn' type='primary' shape='round' onClick={onJoinClick}>
      {t('JOIN_NOW')}
    </ButtonStyled>
  )
})

const NSBIntro: React.FC = () => {
  const { t } = useTranslation('home', { useSuspense: false })

  return (
    <NSBIntroStyled>
      <ContainerStyled maxWidth={1440}>
        <div className='title-box'>
          <Typography.Title className='title'>
            {t('NSB_INTRO_1')}
            <br />
            {t('NSB_INTRO_2')}
          </Typography.Title>
          <JoinButton />
        </div>
        <div className='icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            width='731'
            height='704'
            fill='none'
            viewBox='0 0 731 704'
          >
            <mask
              id='mask0_8089_61678'
              style={{ maskType: 'alpha' }}
              width='621'
              height='639'
              x='110'
              y='0'
              maskUnits='userSpaceOnUse'
            >
              <path fill='url(#paint0_linear_8089_61678)' d='M110 0H730.627V638.834H110z'></path>
            </mask>
            <g mask='url(#mask0_8089_61678)'>
              <path fill='url(#pattern0)' d='M0 0H620.627V638.834H0z' transform='matrix(-1 0 0 1 730.625 0)'></path>
            </g>
            <g className='nsb-phone'>
              <path
                transform='rotate(7.54919 437.25 237)'
                fill='url(#pattern1)'
                d='M437.25 237H658.25V551H437.25z'
              ></path>
            </g>
            <path
              fill='url(#pattern2)'
              d='M480.602 703.49H1055.725V1011.7470000000001H480.602z'
              transform='rotate(-146.683 480.602 703.49)'
            ></path>
            <g className='nsb-coin-3' filter='url(#filter0_f_8089_61678)'>
              <path
                fill='url(#pattern3)'
                d='M423.258 409.793H458.015V441.461H423.258z'
                transform='rotate(-9.353 423.258 409.793)'
              ></path>
            </g>
            <g className='nsb-coin-4'>
              <path
                fill='url(#pattern4)'
                d='M366 506.909H408.656V545.773H366z'
                transform='rotate(-69.329 366 506.909)'
              ></path>
            </g>
            <g className='nsb-coin-5'>
              <path
                fill='url(#pattern5)'
                d='M316 397.792H358.656V436.65599999999995H316z'
                transform='rotate(-13.271 316 397.792)'
              ></path>
            </g>

            <g className='nsb-coin-6'>
              <path
                fill='url(#pattern6)'
                d='M443 361.051H485.656V399.91499999999996H443z'
                transform='rotate(-52.966 443 361.051)'
              ></path>
            </g>
            <g className='nsb-coin-7'>
              <path
                fill='url(#pattern7)'
                d='M258.695 419H301.351V457.864H258.695z'
                transform='rotate(30.449 258.695 419)'
              ></path>
            </g>

            <defs>
              <pattern id='pattern0' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='matrix(.00051 0 0 .0005 0 0)' xlinkHref='#image0_8089_61678'></use>
              </pattern>
              <pattern id='pattern1' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='matrix(.00072 0 0 .0005 0 0)' xlinkHref='#image1_8089_61678'></use>
              </pattern>
              <pattern id='pattern2' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='matrix(.00084 0 0 .00157 -.345 -.723)' xlinkHref='#image2_8089_61678'></use>
              </pattern>
              <filter
                id='filter0_f_8089_61678'
                width='45.442'
                height='42.895'
                x='420.258'
                y='401.144'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape'></feBlend>
                <feGaussianBlur result='effect1_foregroundBlur_8089_61678' stdDeviation='1.5'></feGaussianBlur>
              </filter>
              <pattern id='pattern3' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.0009 .00098)' xlinkHref='#image3_8089_61678'></use>
              </pattern>
              <pattern id='pattern4' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.0009 .00098)' xlinkHref='#image3_8089_61678'></use>
              </pattern>
              <pattern id='pattern5' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.0009 .00098)' xlinkHref='#image3_8089_61678'></use>
              </pattern>
              <pattern id='pattern6' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.0009 .00098)' xlinkHref='#image3_8089_61678'></use>
              </pattern>
              <pattern id='pattern7' width='1' height='1' patternContentUnits='objectBoundingBox'>
                <use transform='scale(.0009 .00098)' xlinkHref='#image3_8089_61678'></use>
              </pattern>
              <linearGradient
                id='paint0_linear_8089_61678'
                x1='420.314'
                x2='420.314'
                y1='461.908'
                y2='604.003'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0.372' stopColor='#D9D9D9'></stop>
                <stop offset='0.919' stopColor='#D9D9D9' stopOpacity='0'></stop>
              </linearGradient>
              <image id='image0_8089_61678' width='1944' height='2000' xlinkHref={NSBImage1.src} />
              <image id='image1_8089_61678' width='1382' height='1966' xlinkHref={NSBImage2.src} />
              <image id='image2_8089_61678' width='2000' height='1500' xlinkHref={NSBImage0.src} />
              <image id='image3_8089_61678' width='1120' height='1020' xlinkHref={NSBImage3.src} />
            </defs>
          </svg>
        </div>
      </ContainerStyled>
      <SlideStyled>
        {[...new Array(5)].map((item, index) => (
          <Fragment key={index}>
            <div className='image image-5'>
              <Image alt='image-5' src={NSBImage5} priority />
            </div>
            <div className='image image-6'>
              <Image alt='image-6' src={NSBImage6} priority />
            </div>
          </Fragment>
        ))}
      </SlideStyled>
    </NSBIntroStyled>
  )
}

export default memo(NSBIntro)
