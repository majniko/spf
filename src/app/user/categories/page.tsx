import { CategoriesPage } from '@/features/pages/categoriesPage/CategoriesPage'
import React from 'react'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma/prisma'
import { verifyToken } from '@/features/helpers/utils/verifyToken'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { decodeTokenOrRedirect } from '@/features/helpers/cookies/decodeTokenOrRedirect'

export default async function Categories(): Promise<React.ReactElement> {
  const decodedToken = decodeTokenOrRedirect()

  let categories = await prisma.categories.findMany({ where: { userId: decodedToken.userId } })

  //console.log(categories)

  let mappedCategories: categoryProps[] = []

  if (categories.length !== 0) {
    mappedCategories = categories.map(category => {
      //console.log(category)
      return {
        id: category.id,
        name: category.name,
        userId: category.userId,
      }
    })
  }

  //console.log(categories)

  return <CategoriesPage categories={mappedCategories} />
}
