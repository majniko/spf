import React from 'react'
import { decodeTokenOrRedirect } from '@/features/helpers/server/decodeTokenOrRedirect'
import { AddEntryForm } from '@/features/components/addEntryForm/AddEntryForm'
import { AddEntryPage } from '@/features/pages/addEntryPage/AddEntryPage'
import prisma from '@/lib/prisma/prisma'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'

export default async function AddEntry(): Promise<React.ReactElement> {
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

  return <AddEntryPage categories={mappedCategories} />
}
