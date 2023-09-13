import { JwtPayload, verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

const jwtSecret = process.env.JWT_SECRET

export const getDecodedToken = (): JwtPayload | false => {
  if (!jwtSecret) return false
  const cookie = cookies().get('token')
  if (!cookie || !cookie.value) return false

  let decodedToken: JwtPayload | string
  try {
    decodedToken = verify(cookie.value, jwtSecret)
  } catch (e) {
    return false
  }

  if (typeof decodedToken === 'object') {
    return decodedToken
  } else return false
}
