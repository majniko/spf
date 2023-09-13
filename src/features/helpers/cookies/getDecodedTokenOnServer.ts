import { JwtPayload } from 'jsonwebtoken'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/features/helpers/utils/verifyToken'

const jwtSecret = process.env.JWT_SECRET!

export const getDecodedTokenOnServer = (): JwtPayload => {
  const token = getTokenFromCookies()

  if (!token) {
    redirect('/login')
  }

  const decodedToken = verifyToken(token, jwtSecret)

  if (!decodedToken) {
    redirect('/login')
  }

  return decodedToken
}
