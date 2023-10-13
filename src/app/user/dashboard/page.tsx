import { LandingPage } from '@/features/pages/landingPage/LandingPage'
import React from 'react'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'

export default function Dashboard(): React.ReactElement {
  const token = getTokenFromCookies()

  if (!token) {
    redirect('/login')
  }

  return <LandingPage />
}
