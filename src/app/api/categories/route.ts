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
  const { newCategoryName }: reqProps = await req.json()
  let user, category

  if (decodedCookie === false) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  try {
    user = await prisma.users.findUnique({ where: { id: decodedCookie.userId } })
  } catch (e) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  if (!user) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  console.log(newCategoryName)

  try {
    category = await prisma.categories.findMany({
      where: {
        name: newCategoryName,
        userId: user.id,
      },
    })
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  if (category.length > 0) {
    return NextResponse.json({ message: 'category_exists' })
  }

  try {
    await prisma.categories.create({
      data: {
        name: newCategoryName,
        userId: user.id,
      },
    })
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  console.log('added')

  return NextResponse.json({ message: 'success' })
}

export async function PUT(req: Request, res: Response) {}
