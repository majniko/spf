import { CategoriesPage } from '@/features/pages/categoriesPage/CategoriesPage'
import React from 'react'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma/prisma'
import { verifyToken } from '@/features/helpers/utils/verifyToken'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { decodeTokenOrRedirect } from '@/features/helpers/server/decodeTokenOrRedirect'
import { getMappedCategories } from '@/features/helpers/server/getMappedCategories'

export default async function Categories(): Promise<React.ReactElement> {
  const decodedToken = decodeTokenOrRedirect()

  const mappedCategories = await getMappedCategories(decodedToken.userId)

  return <CategoriesPage categories={mappedCategories} />
}
