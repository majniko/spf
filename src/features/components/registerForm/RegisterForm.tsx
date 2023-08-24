'use client'

import React from 'react'
import styles from './RegisterForm.module.css'
import { Button, TextField, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
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
          <div className={styles.textFieldBlock}>
            <TextField
              className={styles.textField}
              variant={'filled'}
              id="username"
              size={'small'}
              value={username.value}
              onChange={onUsernameChange}
              error={username.error}
              helperText={username.helperText}
              disabled={isSubmitting}
              label={localization.en.user.username}
            />
            <Tooltip title={localization.en.registerForm.tooltip.username} className={styles.tooltip}>
              <InfoIcon />
            </Tooltip>
          </div>
          <div className={styles.textFieldBlock}>
            <TextField
              className={styles.textField}
              variant={'filled'}
              id="email"
              size={'small'}
              value={email.value}
              onChange={onEmailChange}
              error={email.error}
              helperText={email.helperText}
              disabled={isSubmitting}
              label={localization.en.user.email}
            />
            <Tooltip title={localization.en.registerForm.tooltip.email} className={styles.tooltip}>
              <InfoIcon />
            </Tooltip>
          </div>
          <div className={styles.textFieldBlock}>
            <TextField
              className={styles.textField}
              variant={'filled'}
              id="password"
              size={'small'}
              value={password.value}
              onChange={onPasswordChange}
              error={password.error}
              helperText={password.helperText}
              disabled={isSubmitting}
              label={localization.en.user.password}
            />
            <Tooltip title={localization.en.registerForm.tooltip.password} className={styles.tooltip}>
              <InfoIcon />
            </Tooltip>
          </div>
          <Button
            className={styles.button}
            variant={'contained'}
            onClick={onRegisterButtonClick}
            disabled={isSubmitting}
          >
            {localization.en.registerForm.register}
          </Button>
          {networkError && <div className={styles.errorText}>{localization.en.errors.networkError}</div>}
        </>
      )}
    </div>
  )
}
