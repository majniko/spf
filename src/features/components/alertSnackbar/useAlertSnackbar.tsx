import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback } from 'react'
import { alertProps, alertsRemoveAlert } from '@/lib/redux/slices/alertsSlice'

export const useAlertSnackbar = () => {
  const { alerts } = useAppSelector(state => state.alerts)
  const dispatch = useAppDispatch()

  const handleClose = useCallback(
    (alert: alertProps) => (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return
      dispatch(alertsRemoveAlert(alert))
    },
    [dispatch]
  )

  return {
    alerts,
    handleClose,
  }
}
