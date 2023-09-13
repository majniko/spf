import { createSlice } from '@reduxjs/toolkit'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

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
    loginSetUsername: (state, action: { payload: string; type: string }) => {
      state.username = action.payload
    },
    loginSetPassword: (state, action: { payload: string; type: string }) => {
      state.password = action.payload
    },
    loginSetIsSubmitting: (
      state,
      action: { payload: { isSubmitting: boolean; router: AppRouterInstance }; type: string }
    ) => {
      state.isSubmitting = action.payload.isSubmitting
    },
    loginSetIsError: (state, action: { payload: boolean; type: string }) => {
      state.isError = action.payload
    },
    loginSetIsNetworkError: (state, action: { payload: boolean; type: string }) => {
      state.isNetworkError = action.payload
    },
    loginClearForm: () => initialState,
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
