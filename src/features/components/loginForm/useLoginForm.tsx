import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback, useEffect } from 'react'
import {
  loginClearForm,
  loginSetIsError,
  loginSetIsSubmitting,
  loginSetPassword,
  loginSetUsername,
} from '@/lib/redux/slices/loginFormSlice/loginFormSlice'
import { useRouter } from 'next/navigation'
import { validateUsername } from '@/features/helpers/validation/validateUsername'
import { validatePassword } from '@/features/helpers/validation/validatePassword'

export const useLoginForm = () => {
  const dispatch = useAppDispatch()
  const { username, password, isError, isNetworkError, isSubmitting } = useAppSelector(state => state.loginForm)
  const router = useRouter()

  const onUsernameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(loginSetUsername(event.target.value))
    },
    [dispatch]
  )
  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(loginSetPassword(event.target.value))
    },
    [dispatch]
  )

  const onLoginButtonClick = useCallback(() => {
    let validationError = false

    if (!validateUsername(username)) {
      validationError = true
      dispatch(loginSetIsError(true))
    }

    if (!validatePassword(password)) {
      validationError = true
      dispatch(loginSetIsError(true))
    }

    if (validationError) return

    dispatch(loginSetIsSubmitting({ router, isSubmitting: true }))
  }, [dispatch, password, router, username])

  useEffect(
    () => () => {
      dispatch(loginClearForm())
    },
    [dispatch]
  )

  return {
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    onLoginButtonClick,
    isError,
    isNetworkError,
    isSubmitting,
  }
}
