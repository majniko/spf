import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback } from 'react'
import {
  registerSetEmail,
  registerSetIsSubmitting,
  registerSetPassword,
  registerSetUsername,
} from '@/lib/redux/slices/registerFormSlice/registerFormSlice'

export const useRegisterForm = () => {
  const dispatch = useAppDispatch()
  const { username, email, password, isSubmitting, isUsernameError, isEmailError, isNetworkError, isSuccess } =
    useAppSelector(state => state.registerForm)

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
    dispatch(registerSetIsSubmitting({ isSubmitting: true }))
  }, [dispatch])

  return {
    username,
    email,
    password,
    isUsernameError,
    isEmailError,
    isNetworkError,
    isSubmitting,
    isSuccess,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onRegisterButtonClick,
  }
}
