import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/features/helpers/utils/verifyToken'
import prisma from '@/lib/prisma/prisma'

const jwtSecret = process.env.JWT_SECRET

type reqProps = {
  newCategoryName: string
}

export async function POST(req: Request, res: Response) {
  const cookie = cookies().get('token')
  const decodedCookie = verifyToken(cookie?.value!, jwtSecret!)

  if (decodedCookie === false) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  const user = await prisma.users.findUnique({ where: { id: decodedCookie.userId } })
  if (!user) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  const { newCategoryName }: reqProps = await req.json()

  console.log(newCategoryName)

  const category = await prisma.categories.findMany({
    where: {
      name: newCategoryName,
      userId: user.id,
    },
  })

  if (category.length > 0) {
    return NextResponse.json({ message: 'category_exists' })
  }

  await prisma.categories.create({
    data: {
      name: newCategoryName,
      userId: user.id,
    },
  })

  console.log('added')

  return NextResponse.json({ message: '200' })
}
