import { dateTimeFullFormat } from '@/constants/format'
import dayjs from '@/utils/dayjs'
import React, { useEffect, useState } from 'react'
import DateTimeDisplay from './date-time-display'
import { CountdownStyled } from './styled'

type Props = {
  targetDate?: any
}

export const calculateTimeLeft = (targetDate: any) => {
  const difference =
    Date.parse(dayjs(targetDate).format(dateTimeFullFormat)) - Date.parse(dayjs().format(dateTimeFullFormat))
  let timeLeft: any = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  return timeLeft
}

const Countdown: React.FC<Props> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate))

  useEffect(() => {
    if (
      Date.parse(dayjs(targetDate).format(dateTimeFullFormat)) - Date.parse(dayjs().format(dateTimeFullFormat)) <=
      0
    ) {
      setTimeLeft(0)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  })

  return (
    <CountdownStyled>
      <DateTimeDisplay value={timeLeft.days || 0} type={'Days'} />
      <DateTimeDisplay value={timeLeft.hours || 0} type={'Hours'} />
      <DateTimeDisplay value={timeLeft.minutes || 0} type={'Mins'} />
      <DateTimeDisplay value={timeLeft.seconds || 0} type={'Seconds'} />
    </CountdownStyled>
  )
}

export default Countdown
