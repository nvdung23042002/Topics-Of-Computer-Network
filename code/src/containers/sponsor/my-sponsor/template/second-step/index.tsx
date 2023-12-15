/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Text2th400Styled, Text700Styled } from '@/components/styled'
import cx from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  ContentBottomHorizontalStyled,
  ContentGroupVerticalStyled,
  ContentStyled,
  ContentTopHorizontalStyled,
  ContentVerticalStyled,
  ContinueBtnStyled,
  HorizontalTemplateStyled,
  ImgHorizontalStyled,
  ImgVerticalStyled,
  LogoNameStyled,
  LogoStyled,
  NameTemplateStyled,
  SecondStepChooseTpStyled,
  SecondStepControlStyled,
  SecondStepStyled,
  TemplateWrapStyled,
  VerticalTemplateStyled
} from './styled'
import { useWindowSize } from '@/hooks/useWindowResize'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import { AppRoutes } from '@/constants/routes'

const SecondStep: React.FC = () => {
  const router = useRouter()
  const { chooseTemplate } = router.query || {}
  const [chooseTP, setChooseTP] = useState<number>(0)
  const { width } = useWindowSize()
  const isMaxWidth1199 = width <= 1199

  const handleChooseTP = (key: number) => {
    setChooseTP(key)
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        chooseTemplate: key
      }
    })
  }

  const handleClick = () => {
    if (chooseTP !== 0) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          step: 3,
          chooseTemplate: chooseTP
        }
      })
    }
  }

  useEffect(() => {
    setChooseTP(Number(chooseTemplate) || 0)
  }, [chooseTemplate])

  return (
    <SecondStepStyled>
      <SecondStepControlStyled>
        {isMaxWidth1199 ? (
          <div className='breadcrumb-mobile' onClick={() => router.push(AppRoutes.sponsorTemplate)}>
            <ArrowLeftIcon />
            <Text700Styled className='choose-template'>テンプレート選択</Text700Styled>
          </div>
        ) : (
          <>
            <Text700Styled className='choose-template'>テンプレート選択</Text700Styled>
            <ContinueBtnStyled type='primary' onClick={handleClick} disabled={!chooseTP}>
              <Text2th400Styled>次へ</Text2th400Styled>
            </ContinueBtnStyled>
          </>
        )}
      </SecondStepControlStyled>
      <SecondStepChooseTpStyled>
        <TemplateWrapStyled>
          <VerticalTemplateStyled
            className={cx('hover', {
              active: chooseTP === 1
            })}
            onClick={() => handleChooseTP(1)}
          >
            <ImgVerticalStyled />
            <ContentVerticalStyled>
              <ContentGroupVerticalStyled>
                <LogoNameStyled>
                  <LogoStyled />
                  <ContentStyled flex={1} />
                </LogoNameStyled>
                <ContentStyled />
                <ContentStyled />
              </ContentGroupVerticalStyled>
              <ContentGroupVerticalStyled>
                <ContentStyled />
                <ContentStyled />
                <ContentStyled />
                <ContentStyled width={176} />
              </ContentGroupVerticalStyled>
            </ContentVerticalStyled>
          </VerticalTemplateStyled>
          <NameTemplateStyled active={chooseTP === 1}>
            <Text700Styled>テンプレート 1</Text700Styled>
          </NameTemplateStyled>
        </TemplateWrapStyled>
        <TemplateWrapStyled>
          <HorizontalTemplateStyled
            className={cx('hover', {
              active: chooseTP === 2
            })}
            onClick={() => handleChooseTP(2)}
          >
            <ContentTopHorizontalStyled>
              <ImgHorizontalStyled />
              <LogoNameStyled>
                <LogoStyled />
                <ContentStyled width={191} />
              </LogoNameStyled>
              <ContentStyled width={240} />
            </ContentTopHorizontalStyled>
            <ContentBottomHorizontalStyled>
              <ContentStyled />
              <ContentStyled width={297} />
            </ContentBottomHorizontalStyled>
          </HorizontalTemplateStyled>
          <NameTemplateStyled active={chooseTP === 2}>
            <Text700Styled>テンプレート 2</Text700Styled>
          </NameTemplateStyled>
        </TemplateWrapStyled>
      </SecondStepChooseTpStyled>
      {isMaxWidth1199 && (
        <ContinueBtnStyled type='primary' onClick={handleClick} disabled={!chooseTP}>
          <Text2th400Styled>次へ</Text2th400Styled>
        </ContinueBtnStyled>
      )}
    </SecondStepStyled>
  )
}

export default SecondStep
