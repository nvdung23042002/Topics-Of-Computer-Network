/* eslint-disable no-useless-escape */
export const REGEX_INT = /^[1-9]\d*$/
export const REGEX_POSTCODE = /^[\d]{3}-[\d]{4}$/
export const REGEX_REMOVE_COMMA = /,/g
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.?[a-zA-Z0-9-]+)\.[a-zA-Z]{2,}$/
export const REGEX_PHONENUMBER = /^\d{0,15}$/
export const REGEX_REMOVE_NON_DIGIT_CHARACTERS = /\D/g
export const REGEX_SPLIT_3_NUMBER = /(\d{3})/
export const REGEX_SPLIT_4_NUMBER = /(\d{4})/
export const REGEX_6_NUMBER = /^[0-9]{6,6}$/
export const REGEX_REPLACE_DASH = /-/g
export const REGEX_MAX_LENGTH_PHONE = /^.{10,11}$/
export const REGEX_URL =
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
