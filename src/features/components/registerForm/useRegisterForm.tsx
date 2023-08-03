import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback } from 'react'
import {
  registerSetEmail,
  registerSetPassword,
  registerSetUsername,
} from '@/lib/redux/slices/registerFormSlice/registerFormSlice'

export const useRegisterForm = () => {
  const dispatch = useAppDispatch()
  const { username, email, password, isError, isNetworkError, isSubmitting } = useAppSelector(
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

  return {
    username,
    email,
    password,
    isError,
    isNetworkError,
    isSubmitting,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
  }
}
