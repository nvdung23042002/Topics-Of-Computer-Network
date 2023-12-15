import SponsorService from '@/services/Sponsor.service'
import getError from '@/utils/getError'
import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit'

const getSponsorTournament: AsyncThunkPayloadCreator<void, any> = async () => {
  try {
    const result: any = await SponsorService.getSponsorTournament()

    return result
  } catch (err) {
    throw getError(err)
  }
}

const getSponsorMatch: AsyncThunkPayloadCreator<void, any> = async () => {
  try {
    const result: any = await SponsorService.getSponsorMatch()

    return result
  } catch (err) {
    throw getError(err)
  }
}

const createSponsorTransaction: AsyncThunkPayloadCreator<void, any> = async (data) => {
  try {
    const result: any = await SponsorService.createSponsorTransaction(data)

    return result
  } catch (err) {
    throw getError(err)
  }
}

const getSponsorTransaction: AsyncThunkPayloadCreator<void, any> = async (params) => {
  try {
    const result: any = await SponsorService.getSponsorTransaction(params)

    return result
  } catch (err) {
    throw getError(err)
  }
}
const getSponsorPayment: AsyncThunkPayloadCreator<void, any> = async (params) => {
  try {
    const result: any = await SponsorService.getSponsorPayment(params)

    return result
  } catch (err) {
    throw getError(err)
  }
}

const payment: AsyncThunkPayloadCreator<any, any> = async (params) => {
  try {
    const result: any = await SponsorService.payment(params)

    return result
  } catch (err) {
    throw getError(err)
  }
}

const getSponsorDetail: AsyncThunkPayloadCreator<void, any> = async (params: any) => {
  try {
    const result: any = await SponsorService.getSponsorDetail(params)

    return result
  } catch (err) {
    throw getError(err)
  }
}

export const getSponsorTournamentThunk = createAsyncThunk('sponsor/getSponsorTournament', getSponsorTournament)
export const getSponsorMatchThunk = createAsyncThunk('sponsor/getSponsorMatch', getSponsorMatch)
export const createSponsorTransactionThunk = createAsyncThunk(
  'sponsor/createSponsorTransaction',
  createSponsorTransaction
)
export const getSponsorTransactionThunk = createAsyncThunk('sponsor/getSponsorTransaction', getSponsorTransaction)
export const getSponsorPaymentThunk = createAsyncThunk('sponsor/getSponsorPayment', getSponsorPayment)
export const paymentThunk = createAsyncThunk('sponsor/payment', payment)
export const getSponsorDetailThunk = createAsyncThunk('sponsor/getSponsorDetail', getSponsorDetail)
