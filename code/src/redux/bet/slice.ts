import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
  bettingPayment,
  getCartItemSecond,
  getNormalCartItemSecond,
  getPoolCartItemSecond,
  getPriceRate,
  globalNormalBettingPayment,
  globalPoolBettingPayment
} from './thunk'

interface BetState {
  // can be use common for ver pool of local and global. normal of the global version will be handled separately
  objTicketsEnter: any
  objTicketsPayment: any
  loading: boolean
  priceRateList: any[]
  cartItems: any[]
  cartItemsPaid: any[]
  cartItemsPaidLoading: boolean
  cartItemsPaidTotal: number
  isFetchCartItemsPaid: boolean
  sumTicket: number
  sumExpectedAmount: number

  //normal-global
  normalObjTicketsEnter: any
  normalObjTicketsPayment: any
  normalCartItems: any[]
  isFetchNormalCartItemsPaid: boolean
  normalCartItemsPaid: any[]
  normalCartItemsPaidLoading: boolean
  normalCartItemsPaidTotal: number
  normalSumTicket: number
  normalSumExpectedAmount: number
}

const initialState: BetState = {
  objTicketsEnter: {},
  objTicketsPayment: {},
  loading: false,
  priceRateList: [],
  cartItems: [],
  cartItemsPaid: [],
  cartItemsPaidLoading: false,
  cartItemsPaidTotal: 0,
  isFetchCartItemsPaid: false,
  sumTicket: 0,
  sumExpectedAmount: 0,

  //normal-global
  normalObjTicketsEnter: {},
  normalObjTicketsPayment: {},
  normalCartItems: [],
  isFetchNormalCartItemsPaid: false,
  normalCartItemsPaid: [],
  normalCartItemsPaidLoading: false,
  normalCartItemsPaidTotal: 0,
  normalSumTicket: 0,
  normalSumExpectedAmount: 0
}

const BetSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    setObjTicketsEnter: (state: BetState, action: PayloadAction<any>) => {
      state.objTicketsEnter = {
        ...state.objTicketsEnter,
        ...action.payload
      }
    },
    setDeleteObjTicketsEnter: (state: BetState, action: PayloadAction<any>) => {
      state.objTicketsEnter = action.payload
    },
    setObjTicketsPayment: (state: BetState, action: PayloadAction<any>) => {
      state.objTicketsPayment = {
        ...state.objTicketsPayment,
        ...action.payload
      }
    },
    setDeleteObjTicketsPayment: (state: BetState, action: PayloadAction<any>) => {
      state.objTicketsPayment = action.payload
    },
    setCartItems: (state: BetState, action: PayloadAction<any>) => {
      state.cartItems = action.payload
    },
    setCartItemsPaid: (state: BetState, action: PayloadAction<any>) => {
      state.cartItemsPaid = action.payload
    },

    // normal-global
    setNormalObjTicketsEnter: (state: BetState, action: PayloadAction<any>) => {
      state.normalObjTicketsEnter = {
        ...state.normalObjTicketsEnter,
        ...action.payload
      }
    },
    setDeleteNormalObjTicketsEnter: (state: BetState, action: PayloadAction<any>) => {
      state.normalObjTicketsEnter = action.payload
    },
    setNormalObjTicketsPayment: (state: BetState, action: PayloadAction<any>) => {
      state.normalObjTicketsPayment = {
        ...state.normalObjTicketsPayment,
        ...action.payload
      }
    },
    setDeleteNormalObjTicketsPayment: (state: BetState, action: PayloadAction<any>) => {
      state.normalObjTicketsPayment = action.payload
    },
    setNormalCartItems: (state: BetState, action: PayloadAction<any>) => {
      state.normalCartItems = action.payload
    },
    setNormalCartItemsPaid: (state: BetState, action: PayloadAction<any>) => {
      state.normalCartItemsPaid = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPriceRate.pending, (state: BetState) => {
        state.loading = true
      })
      .addCase(getPriceRate.fulfilled, (state: BetState, action: PayloadAction<any>) => {
        state.loading = false
        state.priceRateList = action.payload
      })
      .addCase(getPriceRate.rejected, (state: BetState) => {
        state.loading = false
      })
      .addCase(bettingPayment.pending, (state: BetState) => {
        state.loading = true
      })
      .addCase(bettingPayment.fulfilled, (state: BetState, action: PayloadAction<any>) => {
        state.loading = false
        state.cartItems = action.payload.cartItems
      })
      .addCase(bettingPayment.rejected, (state: BetState) => {
        state.loading = false
      })

      .addCase(getCartItemSecond.pending, (state: BetState) => {
        state.cartItemsPaidLoading = true
      })
      .addCase(getCartItemSecond.fulfilled, (state: BetState, action: PayloadAction<any>) => {
        const { data, isSecondaryFetch } = action.payload
        state.cartItemsPaidLoading = false

        if (isSecondaryFetch) {
          state.cartItemsPaid = data.result
        } else {
          state.cartItemsPaid = [...state.cartItemsPaid, ...data.result]
        }

        state.sumTicket = data.sumTicket
        state.sumExpectedAmount = parseFloat(data?.sumExpectedAmount || 0)
        state.cartItemsPaidTotal = data.total
        state.isFetchCartItemsPaid = true
      })
      .addCase(getCartItemSecond.rejected, (state: BetState) => {
        state.cartItemsPaidLoading = false
        state.isFetchCartItemsPaid = false
      })

      // global - pool
      .addCase(globalPoolBettingPayment.pending, (state: BetState) => {
        state.loading = true
      })
      .addCase(globalPoolBettingPayment.fulfilled, (state: BetState, action: PayloadAction<any>) => {
        state.loading = false
        state.cartItems = action.payload.cartItems
      })
      .addCase(globalPoolBettingPayment.rejected, (state: BetState) => {
        state.loading = false
      })
      .addCase(getPoolCartItemSecond.pending, (state: BetState) => {
        state.cartItemsPaidLoading = true
      })
      .addCase(getPoolCartItemSecond.fulfilled, (state: BetState, action: PayloadAction<any>) => {
        const { data, isSecondaryFetch } = action.payload
        state.cartItemsPaidLoading = false

        if (isSecondaryFetch) {
          state.cartItemsPaid = data.result
        } else {
          state.cartItemsPaid = [...state.cartItemsPaid, ...data.result]
        }

        state.sumTicket = data.sumTicket
        state.sumExpectedAmount = parseFloat(data?.sumExpectedAmount || 0)
        state.cartItemsPaidTotal = data.total
        state.isFetchCartItemsPaid = true
      })
      .addCase(getPoolCartItemSecond.rejected, (state: BetState) => {
        state.cartItemsPaidLoading = false
        state.isFetchCartItemsPaid = false
      })

      // normal
      .addCase(globalNormalBettingPayment.pending, (state: BetState) => {
        state.loading = true
      })
      .addCase(globalNormalBettingPayment.fulfilled, (state: BetState, action: PayloadAction<any>) => {
        state.loading = false
        state.normalCartItems = action.payload.cartItems
      })
      .addCase(globalNormalBettingPayment.rejected, (state: BetState) => {
        state.loading = false
      })
      .addCase(getNormalCartItemSecond.pending, (state: BetState) => {
        state.normalCartItemsPaidLoading = true
      })
      .addCase(getNormalCartItemSecond.fulfilled, (state: BetState, action: PayloadAction<any>) => {
        const { data, isSecondaryFetch } = action.payload
        state.normalCartItemsPaidLoading = false

        if (isSecondaryFetch) {
          state.normalCartItemsPaid = data.result
        } else {
          state.normalCartItemsPaid = [...state.normalCartItemsPaid, ...data.result]
        }

        state.normalSumTicket = data.sumTicket
        state.normalSumExpectedAmount = parseFloat(data?.sumExpectedAmount || 0)
        state.normalCartItemsPaidTotal = data.total
        state.isFetchNormalCartItemsPaid = true
      })
      .addCase(getNormalCartItemSecond.rejected, (state: BetState) => {
        state.normalCartItemsPaidLoading = false
        state.isFetchNormalCartItemsPaid = false
      })
  }
})
export const selectBet = (state: RootState) => state.bet
export const {
  setObjTicketsEnter,
  setObjTicketsPayment,
  setDeleteObjTicketsEnter,
  setDeleteObjTicketsPayment,
  setCartItems,
  setCartItemsPaid,

  //normal-global
  setNormalObjTicketsEnter,
  setDeleteNormalObjTicketsEnter,
  setNormalObjTicketsPayment,
  setDeleteNormalObjTicketsPayment,
  setNormalCartItems,
  setNormalCartItemsPaid
} = BetSlice.actions
export const namespace = 'BetSlice'
export default BetSlice.reducer
