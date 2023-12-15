import NSBService from '@/services/NSB.service'
import getError from '@/utils/getError'
import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit'

const login: AsyncThunkPayloadCreator<void, any> = async ({ data, profile }: any) => {
  const { typeOfLogin, profileImage, name, email, privateKey, balance } = profile
  try {
    const result: any = await NSBService.login(data)

    return { ...result, typeOfLogin, profileImage, name, email, privateKey, balance }
  } catch (err) {
    throw getError(err)
  }
}

const getPriceRate: AsyncThunkPayloadCreator<void, any> = async () => {
  try {
    const result: any = await NSBService.getPriceRate()
    return result
  } catch (err) {
    throw getError(err)
  }
}
const getUserProfile: AsyncThunkPayloadCreator<void, any> = async () => {
  try {
    const result: any = await NSBService.getUserProfile()
    if (result.isBlocked) throw new Error('ERRORS_AUTH_USER_04')
    return result
  } catch (err) {
    throw getError(err)
  }
}

export const loginThunk = createAsyncThunk('auth/login', login)
export const getPriceRateThunk = createAsyncThunk('auth/getPriceRate', getPriceRate)
export const getUserProfileThunk = createAsyncThunk('auth/getUserProfile', getUserProfile)
