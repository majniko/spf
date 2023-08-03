'use client'

import { Button, TextField } from '@mui/material'
import { localization } from '@/features/localization/localization'
import React from 'react'
import { useLoginForm } from '@/features/components/loginForm/useLoginForm'
import styles from './LoginForm.module.css'

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
        label={localization.en.username}
      />
      <TextField
        className={styles.textField}
        variant={'filled'}
        id="password"
        size={'small'}
        error={isError}
        value={password}
        onChange={onPasswordChange}
        label={localization.en.password}
      />
      <Button className={styles.button} variant={'contained'} onClick={onLoginButtonClick}>
        {localization.en.login}
      </Button>
      {isError && <div className={styles.errorText}>{localization.en.loginError}</div>}
      {isNetworkError && <div className={styles.errorText}>{localization.en.networkError}</div>}
    </div>
  )
}
