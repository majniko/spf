import { createSlice } from '@reduxjs/toolkit'

export type actionBundlerSliceState = {}

export const initialState: actionBundlerSliceState = {}

export const actionBundlerSlice = createSlice({
  name: 'actionBundler',
  initialState,
  reducers: {
    actionBundlerAddAction: (state, action: { payload: any; type: string }) => {},
  },
})

export const { actionBundlerAddAction } = actionBundlerSlice.actions
