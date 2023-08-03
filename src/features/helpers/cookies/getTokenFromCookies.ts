import { cookies } from 'next/headers'

export const getTokenFromCookies = (): string | undefined => {
  return cookies().get('token')?.value
}
