import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Storage from '@/utils/storage'
import { getPriceRateThunk, getUserProfileThunk, loginThunk } from './thunk'
import { ERROR_KEY } from '@/constants/error'
import showMessage from '@/utils/showMessage'
import toast from '@/utils/toast'
import { isNil, keyBy, mapValues } from 'lodash'
import { STORAGE_KEY } from '@/constants/common'
import { RootState } from '../store'
import { Web3AuthNoModal } from '@web3auth/no-modal'
import { logoutCodeException } from '@/components/web3-auth'

interface AuthState {
  isAuthenticated?: boolean
  user?: any
  rate?: { [key: string]: string }
  error?: string | null | any
  loading: boolean
  web3Auth?: Web3AuthNoModal
  userProfile?: any
}

const initialState: AuthState = {
  error: null,
  loading: false
}

const showLoading = (state: AuthState, showToast?: boolean) => {
  state.loading = true
  if (showToast) toast.loading(null, 'auth')
}
const hideLoading = (state: AuthState, message?: any) => {
  state.loading = false
  if (!isNil(message)) showMessage(message)
  else toast.destroy('auth')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLoading: (state: AuthState) => showLoading(state),
    offLoading: (state: AuthState) => hideLoading(state),
    login: (state: AuthState, action: PayloadAction<any>) => {
      const { typeOfLogin, profileImage, name, email, privateKey, publicAddress, balance, userId } = action.payload
      state.loading = false
      state.isAuthenticated = true
      state.user = { ...state.user, typeOfLogin, profileImage, name, email, privateKey, balance, publicAddress, userId }
    },
    logout: (state: AuthState) => {
      state.error = null
      state.user = null
      state.isAuthenticated = false
      state.loading = false

      Storage().remove(STORAGE_KEY.W3A_TOKEN)
    },

    syncBalanceTicket: (state: AuthState, action: PayloadAction<any>) => {
      state.user.totalTicket = action.payload?.totalTicket ?? 0
      state.user.accountBalance = action.payload?.accountBalance ?? 0
    },

    syncETHBalance: (state: AuthState, action: PayloadAction<any>) => {
      state.user.balance = action.payload ?? 0
    },

    setWeb3Auth: (state: AuthState, action: PayloadAction<{ web3Auth: Web3AuthNoModal }>) => {
      state.web3Auth = action.payload.web3Auth
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
      const { accessToken, refreshToken, tokenType, isNewAccount, ...profile } = action.payload
      state.isAuthenticated = true
      state.user = profile
      Storage().set(STORAGE_KEY.W3A_TOKEN, {
        accessToken,
        refreshToken,
        tokenType,
        publicAddress: profile.publicAddress,
        userId: profile.userId,
        typeOfLogin: profile?.typeOfLogin,
        email: profile?.email,
        isNewAccount: isNewAccount
      })
    })
    builder.addCase(loginThunk.rejected, (state: AuthState) => {
      state.isAuthenticated = false
      state.user = null

      Storage().remove(STORAGE_KEY.W3A_TOKEN)
    })
    builder.addCase(getPriceRateThunk.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
      state.rate = action.payload ? mapValues(keyBy(action.payload, 'name'), (item) => item.value) : undefined
    })
    builder.addCase(getPriceRateThunk.rejected, (state: AuthState, action: any) => {
      state.rate = undefined
      const error: ERROR_KEY | string = action?.error?.message
      if (!isNil(error)) showMessage({ error })
    })
    builder.addCase(getUserProfileThunk.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
      state.userProfile = action.payload
    })
    builder.addCase(getUserProfileThunk.rejected, (state: AuthState, action: any) => {
      state.userProfile = undefined
      const error: string = action?.error?.message

      const isBlock = logoutCodeException.includes(error)
      const onOk = isBlock
        ? () => {
            const node: any = document.querySelector("li[rootclassname='logout-btn']")
            if (node) node.click()
          }
        : undefined
      if (!isNil(error)) showMessage({ error }, onOk, 'error-message')
    })
  }
})
export const selectAuth = (state: RootState) => state.auth
export const { logout, login, onLoading, offLoading, syncBalanceTicket, setWeb3Auth, syncETHBalance } =
  authSlice.actions
export default authSlice.reducer
