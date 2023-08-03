import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTokenFromCookies } from '@/features/helpers/cookies/clearTokenFromCookies'
import { redirect } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

type userSliceState = {
  email: string
  username: string
  token: string
}

const initialState: userSliceState = {
  email: '',
  username: '',
  token: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSaveLoginData: (state: userSliceState, action: PayloadAction<userSliceState>) => {
      state.username = action.payload.username
      state.token = action.payload.token
      state.email = action.payload.email
    },
    userLogout: (state: userSliceState, action: PayloadAction<{ router: AppRouterInstance }>) => {
      state.username = ''
      state.token = ''
      state.email = ''
      clearTokenFromCookies()
    },
  },
})

export const { userSaveLoginData, userLogout } = userSlice.actions
