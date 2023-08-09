'use client'

import React from 'react'
import styles from './RegisterForm.module.css'
import { Button, TextField } from '@mui/material'
import { localization } from '@/features/localization/localization'
import { useRegisterForm } from '@/features/components/registerForm/useRegisterForm'
import Link from 'next/link'

export const RegisterForm = (): React.ReactElement => {
  const {
    username,
    email,
    password,
    isSubmitting,
    networkError,
    isSuccess,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onRegisterButtonClick,
  } = useRegisterForm()

  return (
    <div className={styles.registerForm}>
      {isSuccess ? (
        <div className={styles.successText}>
          {localization.en.registerForm.request.success}
          <br />
          <Link href={'/login'}>{localization.en.registerForm.loginLink}</Link>
        </div>
      ) : (
        <>
          <TextField
            className={styles.textField}
            variant={'filled'}
            id="username"
            size={'small'}
            value={username.value}
            onChange={onUsernameChange}
            error={username.error}
            helperText={username.helperText}
            label={localization.en.user.username}
          />
          <TextField
            className={styles.textField}
            variant={'filled'}
            id="email"
            size={'small'}
            value={email.value}
            onChange={onEmailChange}
            error={email.error}
            helperText={email.helperText}
            label={localization.en.user.email}
          />
          <TextField
            className={styles.textField}
            variant={'filled'}
            id="password"
            size={'small'}
            value={password.value}
            onChange={onPasswordChange}
            error={password.error}
            helperText={password.helperText}
            label={localization.en.user.password}
          />
          <Button className={styles.button} variant={'contained'} onClick={onRegisterButtonClick}>
            {localization.en.registerForm.register}
          </Button>
          {networkError && <div className={styles.errorText}>{localization.en.errors.networkError}</div>}
        </>
      )}
    </div>
  )
}
