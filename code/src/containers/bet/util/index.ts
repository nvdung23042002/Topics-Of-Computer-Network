import _cloneDeep from 'lodash/cloneDeep'
import { TFunction } from 'next-i18next'
import { SUB_TYPE_BET } from '../constants'

export const getTotal = (objTickets: { [key: string]: number }) => {
  const quantities = Object.values(objTickets)
  return quantities.reduce((total: number, quantity: number) => total + quantity, 0) || 0
}

export const getTotalNotItemFree = (cartItems: any, objTicketsEnter: { [key: string]: number }) => {
  const cloneObj = _cloneDeep(objTicketsEnter)
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems?.[i]?.freeBet === 'ON') {
      delete cloneObj[cartItems?.[i]?.votedId]
    }
  }

  const quantities = Object.values(cloneObj)
  return quantities.reduce((total: number, quantity: number) => total + quantity, 0) || 0
}

export const truncatedNumber = (values: number, number = 1 as number) => {
  const calc = Math.floor(values * 10 ** number) / 10 ** number
  return calc === 1 ? 1.01 : calc
}

export const renderDay = (numberDay: string) => {
  switch (numberDay) {
    case '1':
      return '月'
    case '2':
      return '火'
    case '3':
      return '水'
    case '4':
      return '木'
    case '5':
      return '金'
    case '6':
      return '土'
    default:
      return '日'
  }
}

export const calcTicketsBeted = (
  isTypeBet1X2: boolean,
  totalTicketsFt1: number,
  totalTicketsDraw: number,
  totalTicketsFt2: number
) => {
  if (isTypeBet1X2) {
    return Number(totalTicketsFt1 + totalTicketsDraw + totalTicketsFt2 || 0)
  }

  return Number(totalTicketsFt1 + totalTicketsFt2 || 0)
}

export const renderTypeBet = (type: string, t: TFunction) => {
  if (type === 'JUDGMENT') {
    return t('JUDGMENT')
  }

  return SUB_TYPE_BET[type]
}
