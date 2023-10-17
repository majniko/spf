import { prismaUserProps } from '@/lib/prisma/types'
import prisma from '@/lib/prisma/prisma'
import { NextResponse } from 'next/server'
import { hashPwd } from '@/features/helpers/utils/hashPwd'
import { validateUsername } from '@/features/helpers/validation/user/validateUsername'
import { validateEmail } from '@/features/helpers/validation/user/validateEmail'
import { validatePassword } from '@/features/helpers/validation/user/validatePassword'

export async function POST(req: Request) {
  const { username, email, password } = await req.json()

  //since the same validation is done on the client side, this is just a precaution in case the client side validation fails or is bypassed
  if (!validateUsername(username) || !validateEmail(email) || !validatePassword(password)) {
    return NextResponse.json({ message: 'invalid_input' })
  }

  let userExists: prismaUserProps | null = null

  try {
    userExists = await prisma.users.findUnique({
      where: {
        username: username,
      },
    })
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  if (userExists) {
    return NextResponse.json({ message: 'username_exists' })
  }

  let emailExists: prismaUserProps | null = null

  try {
    emailExists = await prisma.users.findUnique({
      where: {
        email: email,
      },
    })
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  if (emailExists) {
    return NextResponse.json({ message: 'email_exists' })
  }

  const hashedPwd = hashPwd(password)

  await prisma.users.create({
    data: {
      username: username,
      email: email,
      pwdHash: hashedPwd,
    },
  })

  return NextResponse.json({ message: 'user_created' })
}
