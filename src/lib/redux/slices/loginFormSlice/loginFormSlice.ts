import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export type loginFormSliceState = {
  username: string
  password: string
  isSubmitting: boolean
  isError: boolean
  isNetworkError: boolean
}

const initialState: loginFormSliceState = {
  username: '',
  password: '',
  isSubmitting: false,
  isError: false,
  isNetworkError: false,
}

export const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    loginSetUsername: (state: loginFormSliceState, action) => {
      state.username = action.payload
      state.isError = false
    },
    loginSetPassword: (state: loginFormSliceState, action) => {
      state.password = action.payload
      state.isError = false
    },
    loginSetIsSubmitting: (
      state: loginFormSliceState,
      action: PayloadAction<{ isSubmitting: boolean; router: AppRouterInstance }>
    ) => {
      state.isSubmitting = action.payload.isSubmitting
    },
    loginClearForm: (state: loginFormSliceState) => {
      state.username = ''
      state.password = ''
    },
    loginSetIsError: (state: loginFormSliceState, action) => {
      state.isError = action.payload
    },
    loginSetIsNetworkError: (state: loginFormSliceState, action) => {
      state.isNetworkError = action.payload
    },
  },
})

export const {
  loginSetUsername,
  loginSetPassword,
  loginSetIsSubmitting,
  loginClearForm,
  loginSetIsError,
  loginSetIsNetworkError,
} = loginFormSlice.actions
