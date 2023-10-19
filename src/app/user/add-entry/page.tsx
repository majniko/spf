import React from 'react'
import { decodeTokenOrRedirect } from '@/features/helpers/server/decodeTokenOrRedirect'
import { AddEntryPage } from '@/features/pages/addEntryPage/AddEntryPage'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { getMappedCategories } from '@/features/helpers/server/getMappedCategories'

export default async function AddEntry(): Promise<React.ReactElement> {
  const decodedToken = decodeTokenOrRedirect()

  const categories = await getMappedCategories(decodedToken.userId)

  let mappedCategories: categoryProps[] = []

  if (categories.length !== 0) {
    mappedCategories = categories.map(category => {
      return {
        id: category.id,
        name: category.name,
        userId: category.userId,
      }
    })
  }

  return <AddEntryPage categories={mappedCategories} />
}
