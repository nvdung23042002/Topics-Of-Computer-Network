import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '@/redux/auth/slice'
import AuthSponsorReducer from '@/redux/auth-sponsor/slice'
import SponsorReducer from '@/redux/sponsor/slice'
import BetReducer from '@/redux/bet/slice'
import AppReducer from '@/redux/app/slice'

const ignoredActionPaths: string[] = [
  'meta.arg',
  'payload.onOk',
  'payload.onCancel',
  'payload.title',
  'payload.content',
  'payload.subContent',
  'payload.web3Auth'
]
const ignoredPaths: string[] = [
  'app.modal.onOk',
  'app.modal.onCancel',
  'app.modal.title',
  'app.modal.content',
  'app.modal.subContent',
  'auth.web3Auth'
]
const store = configureStore({
  reducer: {
    app: AppReducer,
    auth: AuthReducer,
    authSponsor: AuthSponsorReducer,
    sponsor: SponsorReducer,
    bet: BetReducer
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths,
        ignoredPaths
      }
    })
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
