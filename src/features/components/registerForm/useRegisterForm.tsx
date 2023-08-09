import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback, useEffect } from 'react'
import {
  registerSetEmail,
  registerSetIsSubmitting,
  registerSetPassword,
  registerSetUsername,
  registerSetEmailError,
  registerSetPasswordError,
  registerSetUsernameError,
  registerClearForm,
} from '@/lib/redux/slices/registerFormSlice/registerFormSlice'
import { validateUsername } from '@/features/helpers/validation/validateUsername'
import { validateEmail } from '@/features/helpers/validation/validateEmail'
import { validatePassword } from '@/features/helpers/validation/validatePassword'
import { localization } from '@/features/localization/localization'

export const useRegisterForm = () => {
  const dispatch = useAppDispatch()
  const { username, email, password, isSubmitting, networkError, isSuccess } = useAppSelector(
    state => state.registerForm
  )

  const onUsernameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerSetUsername(event.target.value))
    },
    [dispatch]
  )

  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerSetEmail(event.target.value))
    },
    [dispatch]
  )

  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(registerSetPassword(event.target.value))
    },
    [dispatch]
  )

  const onRegisterButtonClick = useCallback(() => {
    let validationError = false

    if (!validateUsername(username.value)) {
      validationError = true
      dispatch(registerSetUsernameError(localization.en.registerForm.validation.usernameError))
    }
    if (!validateEmail(email.value)) {
      validationError = true
      dispatch(registerSetEmailError(localization.en.registerForm.validation.emailError))
    }
    if (!validatePassword(password.value)) {
      validationError = true
      dispatch(registerSetPasswordError(localization.en.registerForm.validation.passwordError))
    }

    if (validationError) return

    dispatch(registerSetIsSubmitting(true))
  }, [dispatch, username, email, password])

  useEffect(
    () => () => {
      dispatch(registerClearForm())
    },
    [dispatch]
  )

  return {
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
  }
}
