'use client'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React from 'react'
import { Snackbar } from '@mui/material'
import { useAlertSnackbar } from '@/features/components/alertSnackbar/useAlertSnackbar'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const AlertSnackbar = () => {
  const { alerts, handleClose } = useAlertSnackbar()

  if (!alerts.length) return null

  return (
    <>
      {alerts.map(alert => (
        <Snackbar key={alert.message} open={true} autoHideDuration={6000} onClose={handleClose(alert)}>
          <Alert onClose={handleClose(alert)} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  )
}
