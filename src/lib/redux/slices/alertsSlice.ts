import { createSlice } from '@reduxjs/toolkit'

export type alertProps = {
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
}

export type alertsSliceState = {
  alerts: alertProps[] | []
}

export const initialState: alertsSliceState = {
  alerts: [],
}

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    alertsAddNewAlert: (state, action: { payload: alertProps; type: string }) => {
      const { message, severity } = action.payload
      if (!message || !severity) return
      state.alerts = [...state.alerts, { message, severity }]
    },
    alertsRemoveAlert: (state, action: { payload: alertProps; type: string }) => {
      const { message, severity } = action.payload
      if (!message || !severity) return
      state.alerts = state.alerts.filter(alert => alert.message !== message && alert.severity !== severity)
    },
  },
})

export const { alertsAddNewAlert, alertsRemoveAlert } = alertsSlice.actions
