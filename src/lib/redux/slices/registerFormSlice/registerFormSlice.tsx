import { createSlice } from '@reduxjs/toolkit'

export type registerFormSliceState = {
  username: string
  email: string
  password: string
  isSubmitting: boolean
  isUsernameError: boolean
  isEmailError: boolean
  isNetworkError: boolean
  isSuccess: boolean
}

const initialState: registerFormSliceState = {
  username: '',
  email: '',
  password: '',
  isSubmitting: false,
  isUsernameError: false,
  isEmailError: false,
  isNetworkError: false,
  isSuccess: false,
}

export const registerFormSlice = createSlice({
  name: 'registerForm',
  initialState,
  reducers: {
    registerSetUsername: (state, action) => {
      state.username = action.payload
      state.isUsernameError = false
    },
    registerSetEmail: (state, action) => {
      state.email = action.payload
      state.isEmailError = false
    },
    registerSetPassword: (state, action) => {
      state.password = action.payload
    },
    registerSetIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload.isSubmitting
    },
    registerSetIsUsernameError: (state, action) => {
      state.isUsernameError = action.payload
    },
    registerSetIsEmailError: (state, action) => {
      state.isEmailError = action.payload
    },
    registerSetIsNetworkError: (state, action) => {
      state.isNetworkError = action.payload
    },
    registerSetIsSuccess: (state, action) => {
      state.isSuccess = action.payload
    },
  },
})

export const {
  registerSetUsername,
  registerSetEmail,
  registerSetPassword,
  registerSetIsSubmitting,
  registerSetIsUsernameError,
  registerSetIsEmailError,
  registerSetIsNetworkError,
  registerSetIsSuccess,
} = registerFormSlice.actions
