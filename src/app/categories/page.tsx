import { CategoriesPage } from '@/features/pages/categoriesPage/CategoriesPage'
import React from 'react'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma/prisma'
import { verify } from 'jsonwebtoken'
import { verifyToken } from '@/features/helpers/utils/verifyToken'

const jwtSecret = process.env.JWT_SECRET!

export default async function Categories(): Promise<React.ReactElement> {
  const token = getTokenFromCookies()

  if (!token) {
    redirect('/login')
  }

  const decodedToken = verifyToken(token, jwtSecret)

  if (!decodedToken) {
    redirect('/login')
  }

  let categories = await prisma.categories.findMany({ where: { userId: decodedToken.userId } })

  console.log(categories)

  console.log(decodedToken)

  return <CategoriesPage categories={categories} username={decodedToken.username} />
}
