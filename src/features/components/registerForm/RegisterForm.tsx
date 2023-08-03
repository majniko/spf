import React from 'react'

import styles from './RegisterForm.module.css'
import { Button, TextField } from '@mui/material'
import { localization } from '@/features/localization/localization'
import { useRegisterForm } from '@/features/components/registerForm/useRegisterForm'

export const RegisterForm = (): React.ReactElement => {
  const {
    username,
    email,
    password,
    isError,
    isNetworkError,
    isSubmitting,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
  } = useRegisterForm()

  return (
    <div className={styles.registerForm}>
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
        id="email"
        size={'small'}
        error={isError}
        value={email}
        onChange={onEmailChange}
        label={localization.en.email}
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
      <Button />
    </div>
  )
}
