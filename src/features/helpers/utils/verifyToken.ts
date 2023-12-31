import { JwtPayload, verify } from 'jsonwebtoken'

export const verifyToken = (token: string, jwtSecret: string): JwtPayload | false => {
  let decodedToken: JwtPayload | string
  try {
    decodedToken = verify(token, jwtSecret)
  } catch (e) {
    return false
  }

  if (typeof decodedToken === 'object') {
    return decodedToken
  } else return false
}
