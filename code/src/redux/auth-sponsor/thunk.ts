import SponsorService from '@/services/Sponsor.service'
import { LoginType, RegisterType } from '@/services/dto/sponsor'
import getError from '@/utils/getError'
import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit'
import { signOut } from './slice'

const loginSponsor: AsyncThunkPayloadCreator<void, LoginType> = async ({ email, password, ...data }) => {
  try {
    const result: any = await SponsorService.loginSponsor({ email, password })
    return { ...result, ...data }
  } catch (err) {
    throw getError(err)
  }
}

const registerSponsor: AsyncThunkPayloadCreator<void, RegisterType> = async (data) => {
  try {
    const result: any = await SponsorService.registerSponsor(data)
    return result
  } catch (err) {
    throw getError(err)
  }
}

const getSponsorProfile: AsyncThunkPayloadCreator<void> = async (_: any, { dispatch }) => {
  try {
    const { data } = await SponsorService.getProfile()

    if (data.isBlocked) throw new Error('ERRORS_AUTH_USER_04')

    return { ...data }
  } catch (err) {
    dispatch(signOut())
  }
}
export const loginSponsorThunk = createAsyncThunk('auth-sponsor/loginSponsor', loginSponsor)
export const registerSponsorThunk = createAsyncThunk('auth-sponsor/registerSponsor', registerSponsor)
export const getSponsorProfileThunk = createAsyncThunk('auth-sponsor/getSponsorProfile', getSponsorProfile)
