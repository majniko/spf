import { prismaUserProps } from '@/lib/prisma/types'
import prisma from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'
import { hashPwd } from '@/features/helpers/utils/hashPwd'

export async function POST(req: Request, res: Response) {
  const { username, email, password } = await req.json()

  const userExists: prismaUserProps | null = await prisma.users.findUnique({
    where: {
      username: username,
    },
  })

  if (userExists) {
    return NextResponse.json({ message: 'Username already exists.' }, { status: 403 })
  }

  const emailExists: prismaUserProps | null = await prisma.users.findUnique({
    where: {
      email: email,
    },
  })

  if (emailExists) {
    return NextResponse.json({ message: 'Email already exists.' }, { status: 403 })
  }

  const hashedPwd = hashPwd(password)

  await prisma.users.create({
    data: {
      username: username,
      email: email,
      pwdHash: hashedPwd,
    },
  })

  return NextResponse.json({ message: 'User created.' }, { status: 200 })
}
