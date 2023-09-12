'use client'

import styles from './LandingPage.module.css'
import { localization } from '@/features/localization/localization'
import { Button } from '@mui/material'
import React from 'react'
import Link from 'next/link'

export const LandingPage = (): React.ReactElement => {
  return (
    <div className={styles.page}>
      <h1>You successfully logged in.</h1>
      <Link href={'/categories'}>
        <Button className={styles.button} variant={'contained'}>
          {localization.en.loginForm.logout}
        </Button>
      </Link>
    </div>
  )
}
