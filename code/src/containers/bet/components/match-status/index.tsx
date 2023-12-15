import React from 'react'
import cx from 'classnames'
import { Text2th500Styled } from '@/components/styled'
import { MATCH_STATUS } from '@/constants/common'
import { MatchStatusStyled } from './styled'

type Props = {
  matchStatus: string
}

const MatchStatus: React.FC<Props> = ({ matchStatus = MATCH_STATUS.ON_GOING }) => {
  const MATCH_STATUS_OBJ = {
    LIVE: {
      value: MATCH_STATUS.LIVE,
      className: 'live-status'
    },
    ON_GOING: {
      value: MATCH_STATUS.ON_GOING,
      className: 'going-status'
    }
  }

  const renderMatchStatus = (matchStatus: any) => {
    return (
      <div className={cx('match-status', MATCH_STATUS_OBJ[matchStatus]?.className)}>
        <Text2th500Styled>{MATCH_STATUS_OBJ[matchStatus]?.value}</Text2th500Styled>
      </div>
    )
  }

  return <MatchStatusStyled>{renderMatchStatus(matchStatus)}</MatchStatusStyled>
}

export default MatchStatus
