import React from 'react'
import { LoginPage } from '@/features/pages/loginPage/LoginPage'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'

export default function Login(): React.ReactElement {
  const token = getTokenFromCookies()

  if (token) {
    redirect('/user/landing-page')
  }

  return <LoginPage />
}
