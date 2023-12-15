import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ERROR_KEY } from '@/constants/error'
import showMessage from '@/utils/showMessage'
import toast from '@/utils/toast'
import { isNil } from 'lodash'
import { RootState } from '../store'
import {
  Cart,
  CartItem,
  History,
  PagingResult,
  SponsorDetail,
  SponsorMatch,
  SponsorTournament,
  SponsorTournamentMatch,
  Transaction
} from '@/services/dto/sponsor'
import {
  createSponsorTransactionThunk,
  getSponsorDetailThunk,
  getSponsorMatchThunk,
  getSponsorPaymentThunk,
  getSponsorTournamentThunk,
  getSponsorTransactionThunk,
  paymentThunk
} from './thunk'

interface SponsorState {
  loading: boolean
  tournamentLoading: boolean
  matchLoading: boolean
  transactionLoading: boolean
  historyLoading: boolean
  detailSponsorLoading: boolean
  cart: Cart<CartItem>
  tournamentList: SponsorTournament[]
  tournamentMatchList: SponsorTournamentMatch<SponsorMatch>[]
  transaction: PagingResult<Transaction>
  openSponsorDetail?: boolean
  sponsorDetail?: SponsorDetail
  history: {
    sponsorTotalAmount: number
    sponsorshipHistoryPages: PagingResult<History>
  }
}

const initialState: SponsorState = {
  loading: false,
  tournamentLoading: false,
  matchLoading: false,
  transactionLoading: false,
  historyLoading: false,
  detailSponsorLoading: false,
  tournamentList: [],
  tournamentMatchList: [],
  transaction: {
    page: 1,
    limit: 10,
    total: 0,
    records: [],
    totalPage: 0
  },
  history: {
    sponsorTotalAmount: 0,
    sponsorshipHistoryPages: {
      page: 1,
      limit: 10,
      total: 0,
      records: [],
      totalPage: 0
    }
  },
  cart: {
    list: [],
    total: 0
  }
}

type LoadingType =
  | 'loading'
  | 'tournamentLoading'
  | 'matchLoading'
  | 'transactionLoading'
  | 'historyLoading'
  | 'detailSponsorLoading'

const showLoading = (state: SponsorState, type: LoadingType, showToast?: boolean) => {
  state[type] = true
  if (showToast) toast.loading(null, 'sponsor')
}
const hideLoading = (state: SponsorState, type: LoadingType, message?: any) => {
  state[type] = false
  if (!isNil(message)) showMessage(message)
  else toast.destroy('auth')
}

const sponsorSlice = createSlice({
  name: 'sponsor',
  initialState,
  reducers: {
    onLoading: (state: SponsorState) => showLoading(state, 'loading'),
    offLoading: (state: SponsorState) => hideLoading(state, 'loading'),
    addCart: (state: SponsorState, action: PayloadAction<CartItem>) => {
      const index = state.cart.list.findIndex(
        (item) => item.id == action.payload.id && item.typeSponsor === action.payload.typeSponsor
      )
      if (index === -1) {
        state.cart.list.push(action.payload)
        state.cart.total = state.cart.list.reduce((prev: number, next: CartItem) => prev + next.sponsorAmount, 0)
      }
    },
    removeCart: (state: SponsorState, action: PayloadAction<Partial<CartItem>>) => {
      const index = state.cart.list.findIndex(
        (item) => item.id == action.payload.id && item.typeSponsor === action.payload.typeSponsor
      )
      if (index !== -1) {
        state.cart.list.splice(index, 1)
        state.cart.total = state.cart.list.reduce((prev: number, next: CartItem) => prev + next.sponsorAmount, 0)
      }
    },
    updateCart: (state: SponsorState, action: PayloadAction<Partial<CartItem>>) => {
      const index = state.cart.list.findIndex(
        (item) => item.id == action.payload.id && item.typeSponsor === action.payload.typeSponsor
      )
      if (index !== -1) {
        state.cart.list[index] = { ...state.cart.list[index], ...action.payload }
        state.cart.total = state.cart.list.reduce((prev: number, next: CartItem) => prev + next.sponsorAmount, 0)
      }
    },
    closeSponsorDetail: (state: SponsorState) => {
      state.detailSponsorLoading = false
      state.sponsorDetail = undefined
    }
  },
  extraReducers(builder) {
    builder.addCase(getSponsorTournamentThunk.pending, (state: SponsorState) => {
      showLoading(state, 'tournamentLoading')
    })
    builder.addCase(getSponsorTournamentThunk.fulfilled, (state: SponsorState, action: PayloadAction<any>) => {
      hideLoading(state, 'tournamentLoading')
      state.tournamentList = action.payload
    })
    builder.addCase(getSponsorTournamentThunk.rejected, (state: SponsorState, action: any) => {
      state.tournamentList = []
      const error: ERROR_KEY | string = action?.error?.message
      hideLoading(state, 'tournamentLoading', { error })
    })
    builder.addCase(getSponsorMatchThunk.pending, (state: SponsorState) => {
      showLoading(state, 'matchLoading')
    })
    builder.addCase(getSponsorMatchThunk.fulfilled, (state: SponsorState, action: PayloadAction<any>) => {
      hideLoading(state, 'matchLoading')
      state.tournamentMatchList = action.payload
    })
    builder.addCase(getSponsorMatchThunk.rejected, (state: SponsorState, action: any) => {
      state.tournamentMatchList = []
      const error: ERROR_KEY | string = action?.error?.message
      hideLoading(state, 'loading', { error })
    })
    builder.addCase(createSponsorTransactionThunk.pending, (state: SponsorState) => {
      showLoading(state, 'loading')
    })
    builder.addCase(createSponsorTransactionThunk.fulfilled, (state: SponsorState) => {
      hideLoading(state, 'loading')
      state.cart = { ...initialState.cart }
    })
    builder.addCase(createSponsorTransactionThunk.rejected, (state: SponsorState, action: any) => {
      const error: ERROR_KEY | string = action?.error?.message
      hideLoading(state, 'loading', { error })
    })
    builder.addCase(getSponsorTransactionThunk.pending, (state: SponsorState) => {
      showLoading(state, 'transactionLoading')
    })
    builder.addCase(getSponsorTransactionThunk.fulfilled, (state: SponsorState, action: PayloadAction<any>) => {
      state.transaction = action.payload
      hideLoading(state, 'transactionLoading')
    })
    builder.addCase(getSponsorTransactionThunk.rejected, (state: SponsorState, action: any) => {
      const error: ERROR_KEY | string = action?.error?.message
      hideLoading(state, 'transactionLoading', { error })
    })
    builder.addCase(getSponsorPaymentThunk.pending, (state: SponsorState) => {
      showLoading(state, 'historyLoading')
    })
    builder.addCase(getSponsorPaymentThunk.fulfilled, (state: SponsorState, action: PayloadAction<any>) => {
      state.history = action.payload.data
      hideLoading(state, 'historyLoading')
    })
    builder.addCase(getSponsorPaymentThunk.rejected, (state: SponsorState, action: any) => {
      const error: ERROR_KEY | string = action?.error?.message
      hideLoading(state, 'historyLoading', { error })
    })
    builder.addCase(paymentThunk.pending, (state: SponsorState) => {
      showLoading(state, 'loading')
    })
    builder.addCase(paymentThunk.fulfilled, (state: SponsorState) => {
      hideLoading(state, 'loading')
    })
    builder.addCase(paymentThunk.rejected, (state: SponsorState, action: any) => {
      const error: ERROR_KEY | string = action?.error?.message
      hideLoading(state, 'loading', { error })
    })
    builder.addCase(getSponsorDetailThunk.pending, (state: SponsorState) => {
      showLoading(state, 'detailSponsorLoading')
    })
    builder.addCase(getSponsorDetailThunk.fulfilled, (state: SponsorState, action: any) => {
      state.sponsorDetail = action.payload.data
      hideLoading(state, 'detailSponsorLoading')
    })
    builder.addCase(getSponsorDetailThunk.rejected, (state: SponsorState, action: any) => {
      state.sponsorDetail = undefined
      const error: ERROR_KEY | string = action?.error?.message
      hideLoading(state, 'detailSponsorLoading', { error })
    })
  }
})
export const selectAuth = (state: RootState) => state.auth
export const { onLoading, offLoading, addCart, removeCart, updateCart, closeSponsorDetail } = sponsorSlice.actions
export default sponsorSlice.reducer
