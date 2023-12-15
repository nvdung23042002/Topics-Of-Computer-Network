import Http from '@/http'
import getError from '@/utils/getError'
import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit'

const getUsers: AsyncThunkPayloadCreator<void, any> = async (params: any) => {
  try {
    const { data: result } = await Http.get(`/api/v1/admin/user`, params)
    return result
  } catch (err) {
    throw getError(err)
  }
}

export const getUsersThunk = createAsyncThunk('auth/getUsers', getUsers)
