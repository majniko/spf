import { createSlice } from '@reduxjs/toolkit'

export type registerFormSliceState = {
  username: { value: string; error: boolean; helperText: string }
  email: { value: string; error: boolean; helperText: string }
  password: { value: string; error: boolean; helperText: string }
  isSubmitting: boolean
  networkError: boolean
  isSuccess: boolean
}

const initialState: registerFormSliceState = {
  username: { value: '', error: false, helperText: ' ' },
  email: { value: '', error: false, helperText: ' ' },
  password: { value: '', error: false, helperText: ' ' },
  isSubmitting: false,
  networkError: false,
  isSuccess: false,
}

export const registerFormSlice = createSlice({
  name: 'registerForm',
  initialState,
  reducers: {
    registerSetUsername: (state, action: { payload: string; type: string }) => {
      state.username.value = action.payload
    },
    registerSetEmail: (state, action: { payload: string; type: string }) => {
      state.email.value = action.payload
    },
    registerSetPassword: (state, action: { payload: string; type: string }) => {
      state.password.value = action.payload
    },
    registerSetIsSubmitting: (state, action: { payload: boolean; type: string }) => {
      state.isSubmitting = action.payload
    },
    registerSetRequestUsernameError: (state, action: { payload: boolean; type: string }) => {
      state.username.error = action.payload
    },
    registerSetRequestEmailError: (state, action: { payload: boolean; type: string }) => {
      state.email.error = action.payload
    },
    registerSetNetworkError: (state, action: { payload: boolean; type: string }) => {
      state.networkError = action.payload
    },
    registerSetIsSuccess: (state, action: { payload: boolean; type: string }) => {
      state.isSuccess = action.payload
    },
    registerSetUsernameError: (state, action: { payload: string; type: string }) => {
      state.username.helperText = action.payload
      state.username.error = true
    },
    registerClearUsernameError: state => {
      state.username.helperText = ' '
      state.username.error = false
    },
    registerSetEmailError: (state, action: { payload: string; type: string }) => {
      state.email.helperText = action.payload
      state.email.error = true
    },
    registerClearEmailError: state => {
      state.email.helperText = ' '
      state.email.error = false
    },
    registerSetPasswordError: (state, action: { payload: string; type: string }) => {
      state.password.helperText = action.payload
      state.password.error = true
    },
    registerClearPasswordError: state => {
      state.password.helperText = ' '
      state.password.error = false
    },
    registerClearForm: () => initialState,
  },
})

export const {
  registerSetUsername,
  registerSetEmail,
  registerSetPassword,
  registerSetIsSubmitting,
  registerSetIsSuccess,
  registerSetUsernameError,
  registerClearUsernameError,
  registerSetEmailError,
  registerClearEmailError,
  registerSetPasswordError,
  registerClearPasswordError,
  registerSetNetworkError,
  registerClearForm,
} = registerFormSlice.actions
