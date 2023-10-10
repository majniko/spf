import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/prisma'
import { getDecodedToken } from '@/features/helpers/server/getDecodedToken'

type postReqProps = {
  newCategoryName: string
}

type putReqProps = {
  categoryId: string
  editedCategoryName: string
}

type deleteReqProps = {
  categoryId: string
}

export async function POST(req: Request) {
  const decodedCookie = getDecodedToken()
  if (!decodedCookie) {
    return NextResponse.json({ message: 'invalid_token' })
  }
  const { newCategoryName }: postReqProps = await req.json()
  let category

  //this verification is not needed because the user is already verified by token, but I'll leave it here for future reference
  //without knowing jwt secret it's impossible to forge a token
  /*let user
  try {
    user = await prisma.users.findUnique({ where: { id: decodedCookie.userId } })
  } catch (e) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  if (!user) {
    return NextResponse.json({ message: 'invalid_token' })
  }*/

  console.log(newCategoryName)

  try {
    category = await prisma.categories.findMany({
      where: {
        name: newCategoryName,
        userId: decodedCookie.userId,
      },
    })
    if (category.length > 0) {
      return NextResponse.json({ message: 'category_exists' })
    }
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  try {
    await prisma.categories.create({
      data: {
        name: newCategoryName,
        userId: decodedCookie.userId,
      },
    })
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  console.log('added')

  return NextResponse.json({ message: 'success' })
}

export async function PUT(req: Request) {
  const decodedCookie = getDecodedToken()
  if (!decodedCookie) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  const { categoryId, editedCategoryName }: putReqProps = await req.json()

  try {
    const category = await prisma.categories.findMany({
      where: {
        name: editedCategoryName,
        userId: decodedCookie.userId,
      },
    })
    if (category.length > 0) {
      return NextResponse.json({ message: 'category_exists' })
    }
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  try {
    await prisma.categories.update({
      where: {
        id: categoryId,
        userId: decodedCookie.userId,
      },
      data: {
        name: editedCategoryName,
      },
    })
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  return NextResponse.json({ message: 'success' })
}

export async function DELETE(req: Request) {
  const decodedCookie = getDecodedToken()
  if (!decodedCookie) {
    return NextResponse.json({ message: 'invalid_token' })
  }

  const { categoryId }: deleteReqProps = await req.json()

  try {
    await prisma.categories.delete({
      where: {
        id: categoryId,
        userId: decodedCookie.userId,
      },
    })
  } catch (e) {
    return NextResponse.json({ message: 'unexpected_prisma_error' })
  }

  return NextResponse.json({ message: 'success' })
}
