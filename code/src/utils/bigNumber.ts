import Config from '@/config'
import BigNumber from 'bignumber.js'

const config: BigNumber.Config = {
  DECIMAL_PLACES: Config.MAXIMUM_DECIMAL_PLACEMENT ?? 10,
  ROUNDING_MODE: 3,
  FORMAT: {
    // string to prepend
    prefix: '',
    // decimal separator
    decimalSeparator: '.',
    // grouping separator of the integer part
    groupSeparator: ',',
    // primary grouping size of the integer part
    groupSize: 3,
    // secondary grouping size of the integer part
    // secondaryGroupSize: 0,
    // grouping separator of the fraction part
    // fractionGroupSeparator: ' ',
    // grouping size of the fraction part
    // fractionGroupSize: 0,
    // string to append
    suffix: ''
  }
}
BigNumber.config(config)

export default (value: number | string | BigNumber) => new BigNumber(value)

/**
 * X / Y
 * @param valueX
 * @param valueY
 * @returns BigNumber
 */
export const divided = (valueX: number | string | BigNumber, valueY: number | string | BigNumber) => {
  const x = new BigNumber(valueX)
  const y = new BigNumber(valueY)
  return x.dividedBy(y)
}

/**
 * X * Y
 * @param valueX
 * @param valueY
 * @returns BigNumber
 */
export const multiple = (valueX: number | string | BigNumber, valueY: number | string | BigNumber) => {
  const x = new BigNumber(valueX)
  const y = new BigNumber(valueY)
  return x.multipliedBy(y)
}

/**
 * X - Y
 * @param valueX
 * @param valueY
 * @returns BigNumber
 */
export const minus = (valueX: number | string | BigNumber, valueY: number | string | BigNumber) => {
  const x = new BigNumber(valueX)
  const y = new BigNumber(valueY)
  return x.minus(y)
}

/**
 * X + Y
 * @param valueX
 * @param valueY
 * @returns BigNumber
 */
export const plus = (valueX: number | string | BigNumber, valueY: number | string | BigNumber) => {
  const x = new BigNumber(valueX)
  const y = new BigNumber(valueY)
  return x.plus(y)
}

export const BNToFormat = (value: number | string | BigNumber, isCrypto = false) => {
  const decimalPlacement: number = isCrypto ? 9 : Config.MAXIMUM_DECIMAL_PLACEMENT ?? 10
  const formatVal = new BigNumber(value)

  if (formatVal.isNaN()) return '0'
  if (formatVal.toFormat().split(config.FORMAT?.decimalSeparator ?? '.')?.[1]?.length > decimalPlacement) {
    return new BigNumber(new BigNumber(value).toFixed(decimalPlacement)).toFormat()
  }
  return formatVal.toFormat()
}
