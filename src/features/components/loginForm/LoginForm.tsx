'use client'

import { Button, TextField } from '@mui/material'
import { localization } from '@/features/localization/localization'
import React from 'react'
import { useLoginForm } from '@/features/components/loginForm/useLoginForm'
import styles from './LoginForm.module.css'
import Link from 'next/link'

export const LoginForm = () => {
  const {
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    onLoginButtonClick,
    isError,
    isNetworkError,
    isSubmitting,
  } = useLoginForm()

  return (
    <div className={styles.loginForm}>
      <TextField
        className={styles.textField}
        variant={'filled'}
        id="username"
        size={'small'}
        error={isError}
        value={username}
        onChange={onUsernameChange}
        disabled={isSubmitting}
        label={localization.en.user.username}
      />
      <TextField
        className={styles.textField}
        variant={'filled'}
        id="password"
        size={'small'}
        error={isError}
        value={password}
        disabled={isSubmitting}
        onChange={onPasswordChange}
        label={localization.en.user.password}
      />
      <Button className={styles.button} variant={'contained'} onClick={onLoginButtonClick} disabled={isSubmitting}>
        {localization.en.loginForm.login}
      </Button>
      <Link href={'/register'}>{localization.en.registerForm.register}</Link>
      {isError && <div className={styles.errorText}>{localization.en.loginForm.loginError}</div>}
      {isNetworkError && <div className={styles.errorText}>{localization.en.errors.networkError}</div>}
    </div>
  )
}
