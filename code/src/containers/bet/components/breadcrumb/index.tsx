/* eslint-disable jsx-a11y/click-events-have-key-events */
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import { Text500Styled } from '@/components/styled'
import { MATCH_STATUS } from '@/constants/common'
import MatchStatus from '@/containers/bet/components/match-status'
import { useRouter } from 'next/router'
import React from 'react'
import { BreadcrumbAntdStyed, BreadcrumbContentStyled } from './styled'

type Props = {
  matchStatus: string
  matchName: string
}

const BreadcrumbComponent: React.FC<Props> = ({ matchStatus, matchName }) => {
  const router = useRouter()

  return (
    <BreadcrumbAntdStyed
      separator=''
      items={[
        {
          title: (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div onClick={() => router.back()}>
              <ArrowLeftIcon />
              <BreadcrumbContentStyled>
                {matchStatus === MATCH_STATUS.LIVE && <MatchStatus matchStatus={matchStatus} />}
                <Text500Styled className='match-name text-nowrap-1'>{matchName}</Text500Styled>
              </BreadcrumbContentStyled>
            </div>
          )
        }
      ]}
    />
  )
}

export default BreadcrumbComponent
