export default function formatPhoneNumber(code?: string, number?: string, onlyNumber?: boolean) {
  const temp: string = `${code ? `${code} ` : ''}${number ?? ''}`?.replace(/[\w]+/, '')
  if (onlyNumber) return temp.replace(/\s*\(|\)\s*/g, '')
  return temp
}
export function formatPhoneNumberWithDynamicCountryCode(phoneNumber) {
  // Use a regular expression to extract the country code (e.g., +81)
  const countryCodeMatches = phoneNumber.match(/\+(\d+)/)

  // Check if a country code was found
  if (countryCodeMatches && countryCodeMatches.length >= 2) {
    const countryCode = countryCodeMatches[1]

    // Remove the original country code from the phone number
    const cleanedNumber = phoneNumber.replace(/\D/g, '')

    // Construct the formatted number with the extracted country code
    const formattedNumber = `+${countryCode}${cleanedNumber.slice(countryCode.length)}`

    return formattedNumber
  } else {
    // If no country code is found, return the original number
    return phoneNumber
  }
}
