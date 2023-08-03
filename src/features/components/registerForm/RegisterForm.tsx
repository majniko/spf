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
    isSubmitting,
    isUsernameError,
    isEmailError,
    isNetworkError,
    isSuccess,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onRegisterButtonClick,
  } = useRegisterForm()

  return (
    <div className={styles.registerForm}>
      isSuccess ??
      <div className={styles.successText}>success</div>
      :
      <TextField
        className={styles.textField}
        variant={'filled'}
        id="username"
        size={'small'}
        error={isUsernameError}
        value={username}
        onChange={onUsernameChange}
        label={localization.en.user.username}
      />
      <TextField
        className={styles.textField}
        variant={'filled'}
        id="email"
        size={'small'}
        error={isEmailError}
        value={email}
        onChange={onEmailChange}
        label={localization.en.user.email}
      />
      <TextField
        className={styles.textField}
        variant={'filled'}
        id="password"
        size={'small'}
        value={password}
        onChange={onPasswordChange}
        label={localization.en.user.password}
      />
      <Button className={styles.button} variant={'contained'} onClick={onRegisterButtonClick} />
    </div>
  )
}
