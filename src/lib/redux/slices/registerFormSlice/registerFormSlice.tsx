import { createSlice } from '@reduxjs/toolkit'

export type registerFormSliceState = {
  username: string
  email: string
  password: string
  isError: boolean
  isNetworkError: boolean
  isSubmitting: boolean
}

const initialState: registerFormSliceState = {
  username: '',
  email: '',
  password: '',
  isError: false,
  isNetworkError: false,
  isSubmitting: false,
}

export const registerFormSlice = createSlice({
  name: 'registerForm',
  initialState,
  reducers: {
    registerSetUsername: (state, action) => {
      state.username = action.payload
    },
    registerSetEmail: (state, action) => {
      state.email = action.payload
    },
    registerSetPassword: (state, action) => {
      state.password = action.payload
    },
    registerSetIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload.isSubmitting
    },
  },
})

export const { registerSetUsername, registerSetEmail, registerSetPassword, registerSetIsSubmitting } =
  registerFormSlice.actions
