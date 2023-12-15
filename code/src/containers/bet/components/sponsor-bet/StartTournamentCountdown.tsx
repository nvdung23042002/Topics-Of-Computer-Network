import { calculateTimeLeft } from '@/components/countdown'
import React, { useEffect, useState } from 'react'
import dayjs from '@/utils/dayjs'
import { dateTimeFullFormat } from '@/constants/format'
import { Text700Styled } from '@/components/styled'
import { useTranslation } from 'next-i18next'

type Props = {
  startDateTime?: any
}

export default (({ startDateTime }) => {
  const { t } = useTranslation('bet-list')
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDateTime))
  const getHours = timeLeft?.days * 24 + timeLeft?.hours || 0
  const getMinutes = timeLeft?.minutes || 0

  useEffect(() => {
    if (
      Date.parse(dayjs(startDateTime).format(dateTimeFullFormat)) - Date.parse(dayjs().format(dateTimeFullFormat)) <=
      0
    ) {
      setTimeLeft(0)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(startDateTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Text700Styled>
      {getHours < 10 ? `0${getHours}` : getHours}
      {t('HOUR', {
        ns: 'bet-list'
      })}
      {getMinutes < 10 ? `0${getMinutes}` : getMinutes}
      {t('MINUTE', {
        ns: 'bet-list'
      })}
    </Text700Styled>
  )
}) as React.FC<Props>
