import { ProgressProps } from 'antd/es/progress/progress'
import { BetTicketsChartStyled, BetTicketsLineChartStyled } from './styled'

interface Props extends ProgressProps {
  isThreeBet: boolean
  totalTicketsFt1: number
  totalTicketsFt2: number
  totalTicketsDraw: number
}

export const BetTicketsChart: React.FC<Props> = ({
  isThreeBet,
  totalTicketsFt1,
  totalTicketsFt2,
  totalTicketsDraw
}) => {
  const percentProgress = isThreeBet
    ? ((totalTicketsDraw + totalTicketsFt2) / (totalTicketsFt1 + totalTicketsDraw + totalTicketsFt2)) * 100
    : (totalTicketsFt2 / (totalTicketsFt1 + totalTicketsFt2)) * 100
  const successProgress = isThreeBet
    ? {
        percent: (totalTicketsFt2 / (totalTicketsFt1 + totalTicketsDraw + totalTicketsFt2)) * 100
      }
    : undefined
  const strokeColor = isThreeBet
    ? !totalTicketsFt1 && !totalTicketsFt2 && !totalTicketsDraw
      ? '#ccc'
      : '#FFA928'
    : !totalTicketsFt1 && !totalTicketsFt2
    ? '#ccc'
    : '#0052B4'
  const trailColor = isThreeBet
    ? !totalTicketsFt1 && !totalTicketsFt2 && !totalTicketsDraw
      ? '#ccc'
      : '#D80027'
    : !totalTicketsFt1 && !totalTicketsFt2
    ? '#ccc'
    : '#D80027'

  return (
    <BetTicketsChartStyled
      percent={percentProgress}
      success={successProgress}
      type='circle'
      showInfo={false}
      strokeLinecap='butt'
      strokeColor={strokeColor}
      trailColor={trailColor}
      strokeWidth={10}
    />
  )
}

export const BetTicketsLineChart: React.FC<Props> = ({
  isThreeBet,
  totalTicketsFt1,
  totalTicketsFt2,
  totalTicketsDraw
}) => {
  const percentProgress = isThreeBet
    ? ((totalTicketsDraw + totalTicketsFt1) / (totalTicketsFt1 + totalTicketsDraw + totalTicketsFt2)) * 100
    : (totalTicketsFt1 / (totalTicketsFt1 + totalTicketsFt2)) * 100

  const successProgress = isThreeBet
    ? {
        percent: (totalTicketsFt1 / (totalTicketsFt1 + totalTicketsDraw + totalTicketsFt2)) * 100
      }
    : undefined

  const strokeColor = isThreeBet
    ? !totalTicketsFt1 && !totalTicketsFt2 && !totalTicketsDraw
      ? '#ccc'
      : '#FFA928'
    : !totalTicketsFt1 && !totalTicketsFt2
    ? '#ccc'
    : '#D80027'

  const trailColor = isThreeBet
    ? !totalTicketsFt1 && !totalTicketsFt2 && !totalTicketsDraw
      ? '#ccc'
      : '#0052B4'
    : !totalTicketsFt1 && !totalTicketsFt2
    ? '#ccc'
    : '#0052B4'

  return (
    <BetTicketsLineChartStyled
      percent={percentProgress}
      success={successProgress}
      type='line'
      showInfo={false}
      strokeLinecap='butt'
      strokeColor={strokeColor}
      trailColor={trailColor}
      strokeWidth={10}
    />
  )
}
