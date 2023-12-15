import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Storage from '@/utils/storage'
import { loginSponsorThunk, registerSponsorThunk, getSponsorProfileThunk } from './thunk'
import { ERROR_KEY } from '@/constants/error'
import showMessage from '@/utils/showMessage'
import toast from '@/utils/toast'
import { isNil } from 'lodash'
import { STORAGE_KEY } from '@/constants/common'
import { RootState } from '../store'

interface AuthState {
  isAuthenticated?: boolean
  user?: any
  error?: string | null | any
  loading: boolean
  sponsorProfile: any
}

const initialState: () => AuthState = () => ({
  error: null,
  loading: false,
  isAuthenticated:
    !!(Storage().get(STORAGE_KEY.AUTH_TOKEN)?.token || Storage('session').get(STORAGE_KEY.AUTH_TOKEN)?.token) ||
    undefined,
  sponsorProfile: null
})
const showLoading = (state: AuthState, showToast?: boolean) => {
  state.loading = true
  if (showToast) toast.loading(null, 'auth')
}
const hideLoading = (state: AuthState, message?: any) => {
  state.loading = false
  if (!isNil(message)) showMessage(message)
  else toast.destroy('auth')
}
const authSponsorSlice = createSlice({
  name: 'authSponsor',
  initialState: initialState(),
  reducers: {
    onLoading: (state: AuthState) => showLoading(state),
    offLoading: (state: AuthState) => hideLoading(state),
    signOut: () => {
      Storage().remove(STORAGE_KEY.AUTH_TOKEN)
      return initialState()
    }
  },
  extraReducers(builder) {
    builder.addCase(loginSponsorThunk.pending, (state: AuthState) => {
      state.loading = true
    })
    builder.addCase(loginSponsorThunk.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
      const { expried, token, refreshToken, tokenType, userId } = action.payload
      Storage().set(STORAGE_KEY.AUTH_TOKEN, {
        expried,
        token,
        refreshToken,
        tokenType,
        userId
      })
      state.isAuthenticated = true
    })
    builder.addCase(getSponsorProfileThunk.fulfilled, (state: AuthState, action: any) => {
      state.sponsorProfile = action.payload
      state.loading = false
    })
    builder.addCase(loginSponsorThunk.rejected, (state: AuthState, action: any) => {
      state.loading = false
      const error: ERROR_KEY | string = action?.error?.message
      if (!isNil(error)) showMessage({ error })
    })
    builder.addCase(registerSponsorThunk.pending, (state: AuthState) => {
      state.loading = true
    })
    builder.addCase(registerSponsorThunk.fulfilled, (state: AuthState) => {
      state.loading = false
    })
    builder.addCase(registerSponsorThunk.rejected, (state: AuthState, action: any) => {
      state.loading = false
      const error: ERROR_KEY | string = action?.error?.message
      if (!isNil(error)) showMessage({ error })
    })
  }
})
export const selectAuth = (state: RootState) => state.auth
export const { onLoading, offLoading, signOut } = authSponsorSlice.actions
export default authSponsorSlice.reducer
