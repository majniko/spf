'use client'

import styles from './LandingPage.module.css'
import { localization } from '@/features/localization/localization'
import { Button } from '@mui/material'
import React from 'react'
import { useLandingPage } from '@/features/pages/landingPage/useLandingPage'

export const LandingPage = (): React.ReactElement => {
  const { onLogoutButtonClick } = useLandingPage()

  return (
    <div>
      <h1>You successfully logged in.</h1>
      <Button className={styles.button} variant={'contained'} onClick={onLogoutButtonClick}>
        {localization.en.loginForm.logout}
      </Button>
    </div>
  )
}
