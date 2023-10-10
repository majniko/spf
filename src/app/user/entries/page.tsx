import React from 'react'
import { decodeTokenOrRedirect } from '@/features/helpers/cookies/decodeTokenOrRedirect'
import { AddEntryPage } from '@/features/pages/addEntryPage/AddEntryPage'
import { EntriesPage } from '@/features/pages/entriesPage/entriesPage'
import prisma from '@/lib/prisma/prisma'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'

export default async function Entries(): Promise<React.ReactElement> {
  const decodedToken = decodeTokenOrRedirect()

  let entries = await prisma.entries.findMany({ where: { userId: decodedToken.userId } })
  let categories = await prisma.categories.findMany({ where: { userId: decodedToken.userId } })

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

  return <EntriesPage />
}
