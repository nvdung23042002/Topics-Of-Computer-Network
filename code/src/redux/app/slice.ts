import { ModalPropsType } from '@/components/modal'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface AppState {
  loading: boolean
  modal?: ModalPropsType
  blockRouter?: any
  zone?: string
}

const initialState: AppState = {
  loading: false,
  blockRouter: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setZone(state: AppState, action: PayloadAction<string>) {
      state.zone = action.payload
    },
    blockRouter(state: AppState) {
      state.blockRouter = true
    },
    unblockRouter(state: AppState) {
      state.blockRouter = false
    },
    onModal(state: AppState, action: PayloadAction<any>) {
      state.modal = { open: true, ...action.payload }
    },
    updateModal(state: AppState, action: PayloadAction<any>) {
      state.modal = { ...state.modal, ...action.payload }
    },
    destroyModal(state: AppState) {
      const newProps: ModalPropsType = {
        open: false,
        type: state.modal?.type ?? 'confirmation',
        theme: state.modal?.theme ?? 'success'
      }
      state.modal = newProps
    }
  }
})

// Action creators are generated for each case reducer function
export const { onModal, updateModal, destroyModal, unblockRouter, blockRouter, setZone } = appSlice.actions

export default appSlice.reducer
