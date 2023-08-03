import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback } from 'react'
import {
  loginSetIsSubmitting,
  loginSetPassword,
  loginSetUsername,
} from '@/lib/redux/slices/loginFormSlice/loginFormSlice'
import { useRouter } from 'next/navigation'

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
    console.log('login button clicked')
    dispatch(loginSetIsSubmitting({ router, isSubmitting: true }))
  }, [dispatch, router])

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
