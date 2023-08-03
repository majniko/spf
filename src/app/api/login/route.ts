import { Secret, sign } from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { comparePwdWithHash } from '@/features/helpers/utils/comparePwdWithHash'
import prisma from '@/lib/prisma/prisma'
import { prismaUserProps } from '@/lib/prisma/types'

const jwtSecret: Secret = process.env.JWT_SECRET!

export async function POST(req: Request, res: Response) {
  const { username, password } = await req.json()

  const user: prismaUserProps | null = await prisma.users.findUnique({
    where: {
      username: username,
    },
  })

  //console.log("hashedPwd: ", hashPwd(password))

  if (!user) {
    return NextResponse.json({ message: 'Login information is invalid.' }, { status: 403 })
  }

  const isPwdCorrect = comparePwdWithHash(password, user.pwdHash)

  if (!isPwdCorrect) {
    return NextResponse.json({ message: 'Login information is invalid.' }, { status: 403 })
  }

  const token = sign({ username }, jwtSecret)
  const { email } = user

  return NextResponse.json({ token, email, username }, { status: 200 })
}
