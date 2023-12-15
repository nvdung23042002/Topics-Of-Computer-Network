import React from 'react'
import {
  ContainerContent,
  ContainerContentBottom,
  ContainerStyled,
  ContainerSubTitle,
  HeaderTitle,
  LineStyled,
  Purchase1Styled,
  Purchase2Styled,
  Purchase3Styled,
  TitleStyled,
  TransferStyled,
  WrapPurchaseStyled
} from './styled'
import Image from '@/components/common/image'
import ImageGuide2 from '@/assets/svg/guide/how-can-i-own-nft-2.svg'
import ImageGuide3 from '@/assets/svg/guide/how-can-i-own-nft-3.svg'
import ImageGuide3EN from '@/assets/svg/guide/how-can-i-own-nft-3-en.svg'

import ImageGuide4 from '@/assets/svg/guide/how-can-i-own-nft-4.svg'
import ImageGuide4EN from '@/assets/svg/guide/how-can-i-own-nft-4-en.svg'

import ImageGuide5 from '@/assets/svg/guide/how-can-i-own-nft-5.svg'

import Purchase1 from '@/assets/images/purchase-nft-1.png'
import Purchase2 from '@/assets/images/purchase-nft-2.png'

import useDetectDevice from '@/hooks/useDetectDevice'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const RowDot = ({ isMobile }) =>
  !isMobile ? (
    <svg xmlns='http://www.w3.org/2000/svg' width='342' height='16' viewBox='0 0 342 16' fill='none'>
      <path
        d='M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM341.707 8.70711C342.098 8.31658 342.098 7.68342 341.707 7.29289L335.343 0.928932C334.953 0.538408 334.319 0.538408 333.929 0.928932C333.538 1.31946 333.538 1.95262 333.929 2.34315L339.586 8L333.929 13.6569C333.538 14.0474 333.538 14.6805 333.929 15.0711C334.319 15.4616 334.953 15.4616 335.343 15.0711L341.707 8.70711ZM5.04762 9C5.5999 9 6.04762 8.55228 6.04762 8C6.04762 7.44772 5.5999 7 5.04762 7V9ZM13.1429 7C12.5906 7 12.1429 7.44772 12.1429 8C12.1429 8.55228 12.5906 9 13.1429 9V7ZM21.2381 9C21.7904 9 22.2381 8.55228 22.2381 8C22.2381 7.44772 21.7904 7 21.2381 7V9ZM29.3333 7C28.781 7 28.3333 7.44772 28.3333 8C28.3333 8.55228 28.781 9 29.3333 9V7ZM37.4286 9C37.9809 9 38.4286 8.55228 38.4286 8C38.4286 7.44772 37.9809 7 37.4286 7V9ZM45.5238 7C44.9715 7 44.5238 7.44772 44.5238 8C44.5238 8.55228 44.9715 9 45.5238 9V7ZM53.619 9C54.1713 9 54.619 8.55228 54.619 8C54.619 7.44772 54.1713 7 53.619 7V9ZM61.7143 7C61.162 7 60.7143 7.44772 60.7143 8C60.7143 8.55228 61.162 9 61.7143 9V7ZM69.8095 9C70.3618 9 70.8095 8.55228 70.8095 8C70.8095 7.44772 70.3618 7 69.8095 7V9ZM77.9048 7C77.3525 7 76.9048 7.44772 76.9048 8C76.9048 8.55228 77.3525 9 77.9048 9V7ZM86 9C86.5523 9 87 8.55228 87 8C87 7.44772 86.5523 7 86 7V9ZM94.0952 7C93.543 7 93.0952 7.44772 93.0952 8C93.0952 8.55228 93.543 9 94.0952 9V7ZM102.19 9C102.743 9 103.19 8.55228 103.19 8C103.19 7.44772 102.743 7 102.19 7V9ZM110.286 7C109.733 7 109.286 7.44772 109.286 8C109.286 8.55228 109.733 9 110.286 9V7ZM118.381 9C118.933 9 119.381 8.55228 119.381 8C119.381 7.44772 118.933 7 118.381 7V9ZM126.476 7C125.924 7 125.476 7.44772 125.476 8C125.476 8.55228 125.924 9 126.476 9V7ZM134.571 9C135.124 9 135.571 8.55228 135.571 8C135.571 7.44772 135.124 7 134.571 7V9ZM142.667 7C142.114 7 141.667 7.44772 141.667 8C141.667 8.55228 142.114 9 142.667 9V7ZM150.762 9C151.314 9 151.762 8.55228 151.762 8C151.762 7.44772 151.314 7 150.762 7V9ZM158.857 7C158.305 7 157.857 7.44772 157.857 8C157.857 8.55228 158.305 9 158.857 9V7ZM166.952 9C167.505 9 167.952 8.55228 167.952 8C167.952 7.44772 167.505 7 166.952 7V9ZM175.048 7C174.495 7 174.048 7.44772 174.048 8C174.048 8.55228 174.495 9 175.048 9V7ZM183.143 9C183.695 9 184.143 8.55228 184.143 8C184.143 7.44772 183.695 7 183.143 7V9ZM191.238 7C190.686 7 190.238 7.44772 190.238 8C190.238 8.55228 190.686 9 191.238 9V7ZM199.333 9C199.886 9 200.333 8.55228 200.333 8C200.333 7.44772 199.886 7 199.333 7V9ZM207.429 7C206.876 7 206.429 7.44772 206.429 8C206.429 8.55228 206.876 9 207.429 9V7ZM215.524 9C216.076 9 216.524 8.55228 216.524 8C216.524 7.44772 216.076 7 215.524 7V9ZM223.619 7C223.067 7 222.619 7.44772 222.619 8C222.619 8.55228 223.067 9 223.619 9V7ZM231.714 9C232.267 9 232.714 8.55228 232.714 8C232.714 7.44772 232.267 7 231.714 7V9ZM239.81 7C239.257 7 238.81 7.44772 238.81 8C238.81 8.55228 239.257 9 239.81 9V7ZM247.905 9C248.457 9 248.905 8.55228 248.905 8C248.905 7.44772 248.457 7 247.905 7V9ZM256 7C255.448 7 255 7.44772 255 8C255 8.55228 255.448 9 256 9V7ZM264.095 9C264.648 9 265.095 8.55228 265.095 8C265.095 7.44772 264.648 7 264.095 7V9ZM272.191 7C271.638 7 271.191 7.44772 271.191 8C271.191 8.55228 271.638 9 272.191 9V7ZM280.286 9C280.838 9 281.286 8.55228 281.286 8C281.286 7.44772 280.838 7 280.286 7V9ZM288.381 7C287.829 7 287.381 7.44772 287.381 8C287.381 8.55228 287.829 9 288.381 9V7ZM296.476 9C297.029 9 297.476 8.55228 297.476 8C297.476 7.44772 297.029 7 296.476 7V9ZM304.572 7C304.019 7 303.572 7.44772 303.572 8C303.572 8.55228 304.019 9 304.572 9V7ZM312.667 9C313.219 9 313.667 8.55228 313.667 8C313.667 7.44772 313.219 7 312.667 7V9ZM320.762 7C320.21 7 319.762 7.44772 319.762 8C319.762 8.55228 320.21 9 320.762 9V7ZM328.857 9C329.41 9 329.857 8.55228 329.857 8C329.857 7.44772 329.41 7 328.857 7V9ZM336.953 7C336.4 7 335.953 7.44772 335.953 8C335.953 8.55228 336.4 9 336.953 9V7ZM1 9H5.04762V7H1V9ZM13.1429 9H21.2381V7H13.1429V9ZM29.3333 9H37.4286V7H29.3333V9ZM45.5238 9H53.619V7H45.5238V9ZM61.7143 9H69.8095V7H61.7143V9ZM77.9048 9H86V7H77.9048V9ZM94.0952 9H102.19V7H94.0952V9ZM110.286 9H118.381V7H110.286V9ZM126.476 9H134.571V7H126.476V9ZM142.667 9H150.762V7H142.667V9ZM158.857 9H166.952V7H158.857V9ZM175.048 9H183.143V7H175.048V9ZM191.238 9H199.333V7H191.238V9ZM207.429 9H215.524V7H207.429V9ZM223.619 9H231.714V7H223.619V9ZM239.81 9H247.905V7H239.81V9ZM256 9H264.095V7H256V9ZM272.191 9H280.286V7H272.191V9ZM288.381 9H296.476V7H288.381V9ZM304.572 9H312.667V7H304.572V9ZM320.762 9H328.857V7H320.762V9ZM336.953 9H341V7H336.953V9Z'
        fill='#D80027'
      />
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='88' viewBox='0 0 16 88' fill='none'>
      <path
        d='M8.99997 1C8.99997 0.447715 8.55225 -2.14279e-07 7.99997 0C7.44768 2.14276e-07 6.99997 0.447716 6.99997 1L8.99997 1ZM7.29289 87.7071C7.68341 88.0976 8.31658 88.0976 8.7071 87.7071L15.0711 81.3431C15.4616 80.9526 15.4616 80.3195 15.0711 79.9289C14.6805 79.5384 14.0474 79.5384 13.6568 79.9289L8 85.5858L2.34314 79.9289C1.95262 79.5384 1.31945 79.5384 0.928926 79.9289C0.538402 80.3195 0.538402 80.9526 0.928926 81.3431L7.29289 87.7071ZM6.99997 5.3C6.99997 5.85229 7.44768 6.3 7.99997 6.3C8.55225 6.3 8.99997 5.85228 8.99997 5.3L6.99997 5.3ZM8.99997 13.9C8.99997 13.3477 8.55226 12.9 7.99997 12.9C7.44769 12.9 6.99997 13.3477 6.99997 13.9L8.99997 13.9ZM6.99997 22.5C6.99997 23.0523 7.44769 23.5 7.99997 23.5C8.55226 23.5 8.99997 23.0523 8.99997 22.5L6.99997 22.5ZM8.99998 31.1C8.99998 30.5477 8.55226 30.1 7.99998 30.1C7.44769 30.1 6.99998 30.5477 6.99998 31.1L8.99998 31.1ZM6.99998 39.7C6.99998 40.2523 7.4477 40.7 7.99998 40.7C8.55227 40.7 8.99998 40.2523 8.99998 39.7L6.99998 39.7ZM8.99998 48.3C8.99998 47.7477 8.55227 47.3 7.99998 47.3C7.4477 47.3 6.99998 47.7477 6.99998 48.3L8.99998 48.3ZM6.99999 56.9C6.99999 57.4523 7.4477 57.9 7.99999 57.9C8.55227 57.9 8.99999 57.4523 8.99999 56.9L6.99999 56.9ZM8.99999 65.5C8.99999 64.9477 8.55227 64.5 7.99999 64.5C7.4477 64.5 6.99999 64.9477 6.99999 65.5L8.99999 65.5ZM6.99999 74.1C6.99999 74.6523 7.44771 75.1 7.99999 75.1C8.55228 75.1 8.99999 74.6523 8.99999 74.1L6.99999 74.1ZM8.99999 82.7C8.99999 82.1477 8.55228 81.7 7.99999 81.7C7.44771 81.7 6.99999 82.1477 6.99999 82.7L8.99999 82.7ZM6.99997 1L6.99997 5.3L8.99997 5.3L8.99997 1L6.99997 1ZM6.99997 13.9L6.99997 22.5L8.99997 22.5L8.99997 13.9L6.99997 13.9ZM6.99998 31.1L6.99998 39.7L8.99998 39.7L8.99998 31.1L6.99998 31.1ZM6.99998 48.3L6.99999 56.9L8.99999 56.9L8.99998 48.3L6.99998 48.3ZM6.99999 65.5L6.99999 74.1L8.99999 74.1L8.99999 65.5L6.99999 65.5ZM6.99999 82.7L7 87L9 87L8.99999 82.7L6.99999 82.7Z'
        fill='#D80027'
      />
    </svg>
  )

const HowCanIOwnNFTs = () => {
  const { t } = useTranslation('guide')
  const deviceDetect = useDetectDevice()

  const router = useRouter()
  const langKey = router?.locale?.toLocaleUpperCase() ?? 'JA'

  const { isMobile } = deviceDetect

  return (
    <ContainerStyled>
      <HeaderTitle>{t('NFTS_TAB.TITLE')}</HeaderTitle>

      <ContainerContent>
        <TitleStyled className='title-content'>{t('NFTS_TAB.NFT_PLAYER')}</TitleStyled>

        <ContainerSubTitle>
          <p>{t('NFTS_TAB.NFT_USER')}</p>
          <p>{t('NFTS_TAB.NFT_ADMIN')}</p>
        </ContainerSubTitle>

        <WrapPurchaseStyled>
          <Purchase1Styled>
            <div className='img'>
              <Image src={Purchase1.src} fill alt='Purchase1' />
            </div>
          </Purchase1Styled>

          <Purchase2Styled>
            <TransferStyled>
              <div className='content-dot'>{t('NFTS_TAB.NFT_TRANSFER')}</div>

              <RowDot isMobile={isMobile()} />
            </TransferStyled>
          </Purchase2Styled>

          <Purchase3Styled>
            <div className='img'>
              <Image src={Purchase2.src} fill alt='Purchase2' />
            </div>
          </Purchase3Styled>
        </WrapPurchaseStyled>
      </ContainerContent>

      <LineStyled />

      <ContainerContentBottom>
        <div className='item'>
          <div className='image'>
            <Image src={ImageGuide2} alt={'image-guide-how-i-can-own-nft-2'} />
          </div>
          <div className='content-guide'>
            <TitleStyled className='title-content'>{t('NFTS_TAB.NFT_TITLE_1')}</TitleStyled>
            <ContainerSubTitle className='sub-content'>
              <p>{t('NFTS_TAB.NFT_CONTENT_1')}</p>
            </ContainerSubTitle>
          </div>
        </div>
        <div className='item'>
          <div className='content-guide'>
            <TitleStyled className='title-content'>{t('NFTS_TAB.NFT_TITLE_2')}</TitleStyled>
            <ContainerSubTitle className='sub-content'>
              <div dangerouslySetInnerHTML={{ __html: t('NFTS_TAB.NFT_CONTENT_2') ?? '' }} />
            </ContainerSubTitle>
          </div>
          <div className='image'>
            <Image src={langKey === 'JA' ? ImageGuide3 : ImageGuide3EN} alt={'image-guide-how-i-can-own-nft-3'} />
          </div>
        </div>
        <div className='item'>
          <div className='image'>
            <Image src={langKey === 'JA' ? ImageGuide4 : ImageGuide4EN} alt={'image-guide-how-i-can-own-nft-4'} />
          </div>
          <div className='content-guide'>
            <TitleStyled className='title-content'>{t('NFTS_TAB.NFT_TITLE_3')}</TitleStyled>
            <ContainerSubTitle className='sub-content'>
              <p>{t('NFTS_TAB.NFT_CONTENT_3')}</p>
            </ContainerSubTitle>
          </div>
        </div>
        <div className='item'>
          <div className='content-guide'>
            <TitleStyled className='title-content'>{t('NFTS_TAB.NFT_TITLE_4')}</TitleStyled>
            <ContainerSubTitle className='sub-content'>
              <p>{t('NFTS_TAB.NFT_CONTENT_4')}</p>
            </ContainerSubTitle>
          </div>
          <div className='image'>
            <Image src={ImageGuide5} alt={'image-guide-how-i-can-own-nft-5'} />
          </div>
        </div>
      </ContainerContentBottom>
    </ContainerStyled>
  )
}

export default HowCanIOwnNFTs
