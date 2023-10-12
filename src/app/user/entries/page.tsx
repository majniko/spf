import React from 'react'
import { decodeTokenOrRedirect } from '@/features/helpers/server/decodeTokenOrRedirect'
import { AddEntryPage } from '@/features/pages/addEntryPage/AddEntryPage'
import { EntriesPage } from '@/features/pages/entriesPage/entriesPage'
import prisma from '@/lib/prisma/prisma'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { getMappedCategories } from '@/features/helpers/server/getMappedCategories'
import { getMappedEntries } from '@/features/helpers/server/getMappedEntries'

export default async function Entries(): Promise<React.ReactElement> {
  const decodedToken = decodeTokenOrRedirect()

  const mappedCategories = await getMappedCategories(decodedToken.userId)
  const mappedEntries = await getMappedEntries(decodedToken.userId, mappedCategories)

  return <EntriesPage entries={mappedEntries} categories={mappedCategories} />
}
