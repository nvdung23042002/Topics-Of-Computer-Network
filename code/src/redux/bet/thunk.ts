import { HTTP_STATUS_CODE } from '@/constants/status'
import NSBService from '@/services/NSB.service'
import getError from '@/utils/getError'
import storage from '@/utils/storage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ResponseGenerator } from '../type'
import { STORAGE_KEY } from '@/constants/common'
import showMessage from '@/utils/showMessage'

export const getPriceRate = createAsyncThunk('bet/priceRate', async () => {
  try {
    const response: ResponseGenerator = await NSBService.getTicketsToPrice({})

    if (response?.code === HTTP_STATUS_CODE.REQUEST_SUCCEEDED) {
      return response.data
    }

    return undefined
  } catch (err) {
    throw getError(err)
  }
})

export const bettingPayment = createAsyncThunk(
  'auth/createBet',
  async ({
    cartItemsValid,
    cartItemsinValid,
    callbackPaymentSuccess,
    newObjTicketsEnter,
    newObjTicketsPayment
  }: any) => {
    try {
      const response: ResponseGenerator = await NSBService.createBetUser(cartItemsValid)

      if (response?.code === HTTP_STATUS_CODE.REQUEST_SUCCEEDED) {
        storage('local').set(STORAGE_KEY.CART_ITEMS, cartItemsinValid)
        callbackPaymentSuccess(newObjTicketsEnter, newObjTicketsPayment, cartItemsValid)

        return {
          data: response.data,
          cartItems: cartItemsinValid
        }
      }

      return undefined
    } catch (err) {
      const msg = err?.response?.data?.message
      showMessage({ error: msg })
      throw getError(err)
    }
  }
)

// global
export const globalPoolBettingPayment = createAsyncThunk(
  'auth/poolCreateBet',
  async ({
    cartItemsValid,
    cartItemsinValid,
    callbackPaymentSuccess,
    newObjTicketsEnter,
    newObjTicketsPayment
  }: any) => {
    try {
      const response: ResponseGenerator = await NSBService.createPoolBet(cartItemsValid)

      if (response?.code === HTTP_STATUS_CODE.REQUEST_SUCCEEDED) {
        storage('local').set(STORAGE_KEY.CART_ITEMS, cartItemsinValid)
        callbackPaymentSuccess(newObjTicketsEnter, newObjTicketsPayment, cartItemsValid)

        return {
          data: response.data,
          cartItems: cartItemsinValid
        }
      }

      return undefined
    } catch (err) {
      const msg = err?.response?.data?.message
      showMessage({ error: msg })
      throw getError(err)
    }
  }
)

export const globalNormalBettingPayment = createAsyncThunk(
  'auth/normalCreateBet',
  async ({
    cartItemsValid,
    cartItemsinValid,
    callbackPaymentSuccess,
    newObjTicketsEnter,
    newObjTicketsPayment
  }: any) => {
    try {
      const response: ResponseGenerator = await NSBService.createNormalBet(cartItemsValid)

      if (response?.code === HTTP_STATUS_CODE.REQUEST_SUCCEEDED) {
        storage('local').set(STORAGE_KEY.NORMAL_CART_ITEMS, cartItemsinValid)
        callbackPaymentSuccess(newObjTicketsEnter, newObjTicketsPayment, cartItemsValid)

        return {
          data: response.data,
          cartItems: cartItemsinValid
        }
      }

      return undefined
    } catch (err) {
      const msg = err?.response?.data?.message
      showMessage({ error: msg })
      throw getError(err)
    }
  }
)

export const getCartItemSecond = createAsyncThunk(
  'auth/getCartItemSecond',
  async ({ status, page, limit, isSecondaryFetch, callbackSuccess }: any) => {
    try {
      const response: ResponseGenerator = await NSBService.getMyBetProcessTab({ status, page, limit })
      callbackSuccess && callbackSuccess()

      return {
        data: response?.data,
        isSecondaryFetch
      }
    } catch (err) {
      const msg = err?.response?.data?.message
      showMessage({ error: msg })
      throw getError(err)
    }
  }
)

// global
export const getPoolCartItemSecond = createAsyncThunk(
  'auth/getPoolCartItemSecond',
  async ({ status, page, limit, methodBet, isSecondaryFetch, callbackSuccess }: any) => {
    try {
      const response: ResponseGenerator = await NSBService.getGlobalMyBetProcessTab({ status, page, limit, methodBet })
      callbackSuccess && callbackSuccess()

      return {
        data: response?.data,
        isSecondaryFetch
      }
    } catch (err) {
      const msg = err?.response?.data?.message
      showMessage({ error: msg })
      throw getError(err)
    }
  }
)

export const getNormalCartItemSecond = createAsyncThunk(
  'auth/getNormalCartItemSecond',
  async ({ status, page, limit, methodBet, isSecondaryFetch, callbackSuccess }: any) => {
    try {
      const response: ResponseGenerator = await NSBService.getGlobalMyBetProcessTab({ status, page, limit, methodBet })
      callbackSuccess && callbackSuccess()

      return {
        data: response?.data,
        isSecondaryFetch
      }
    } catch (err) {
      const msg = err?.response?.data?.message
      showMessage({ error: msg })
      throw getError(err)
    }
  }
)
