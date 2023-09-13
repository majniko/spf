import { redirect } from 'next/navigation'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'

export default function Root() {
  const token = getTokenFromCookies()

  if (token) {
    redirect('/user/landing-page')
  }

  redirect('/login')
}
