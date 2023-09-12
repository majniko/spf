import { JwtPayload, verify } from 'jsonwebtoken'

export const verifyToken = (token: string, jwtSecret: string): JwtPayload | false => {
  let decodedToken
  try {
    decodedToken = verify(token, jwtSecret)
    console.log(decodedToken)
  } catch (e) {
    return false
  }

  if (typeof decodedToken === 'object') {
    return decodedToken
  } else return false
}
