export default function formatJapanesePostCode(number: any) {
  if (typeof number !== 'string') {
    return ''
  }

  const firstCode = number.substring(0, 3)
  const lastCode = number.substring(3, 7)

  return `${firstCode ? `${firstCode}` : ''}${lastCode ? `-${lastCode}` : ''}`
}
