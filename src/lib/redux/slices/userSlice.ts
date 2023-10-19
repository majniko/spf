import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTokenFromCookies } from '@/features/helpers/cookies/clearTokenFromCookies'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

type userSliceState = {
  email: string
  username: string
}

const initialState: userSliceState = {
  email: '',
  username: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSaveLoginData: (state: userSliceState, action: PayloadAction<userSliceState>) => {
      state.username = action.payload.username
      state.email = action.payload.email
    },
    userLogout: (state: userSliceState, action: PayloadAction<{ router: AppRouterInstance }>) => {
      clearTokenFromCookies()
    },
    userSetUsername: (state: userSliceState, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    userLoadDataFromToken: (state: userSliceState, action: PayloadAction<{ username: string; email: string }>) => {
      state.username = action.payload.username
      state.email = action.payload.email
    },
  },
})

export const { userSaveLoginData, userLogout, userSetUsername } = userSlice.actions
