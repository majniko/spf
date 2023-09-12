import { Secret, sign } from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { comparePwdWithHash } from '@/features/helpers/utils/comparePwdWithHash'
import prisma from '@/lib/prisma/prisma'
import { prismaUserProps } from '@/lib/prisma/types'
import { validateUsername } from '@/features/helpers/validation/validateUsername'
import { validatePassword } from '@/features/helpers/validation/validatePassword'

const jwtSecret: Secret = process.env.JWT_SECRET!

export async function POST(req: Request, res: Response) {
  const { username, password } = await req.json()

  //since the same validation is done on the client side, this is just a precaution in case the client side validation fails or is bypassed
  if (!validateUsername(username) || !validatePassword(password)) {
    return NextResponse.json({ message: 'invalid_credentials' })
  }

  const user: prismaUserProps | null = await prisma.users.findUnique({
    where: {
      username: username,
    },
  })

  if (!user) {
    return NextResponse.json({ message: 'invalid_credentials' })
  }

  const isPwdCorrect = comparePwdWithHash(password, user.pwdHash)

  if (!isPwdCorrect) {
    return NextResponse.json({ message: 'invalid_credentials' })
  }

  const token = sign({ username, userId: user.id }, jwtSecret)
  const { email } = user

  return NextResponse.json({ token, email, username })
}
