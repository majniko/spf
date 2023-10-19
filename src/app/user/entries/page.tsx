import React from 'react'
import { decodeTokenOrRedirect } from '@/features/helpers/server/decodeTokenOrRedirect'
import { EntriesPage } from '@/features/pages/entriesPage/EntriesPage'
import { getMappedCategories } from '@/features/helpers/server/getMappedCategories'
import { getMappedEntries } from '@/features/helpers/server/getMappedEntries'
import dayjs from 'dayjs'

export default async function Entries(): Promise<React.ReactElement> {
  const decodedToken = decodeTokenOrRedirect()

  const today = dayjs()
  const month = today.month()
  const year = today.year()

  const mappedCategories = await getMappedCategories(decodedToken.userId)
  const mappedEntries = await getMappedEntries(decodedToken.userId, mappedCategories, month, year)

  return <EntriesPage entries={mappedEntries} categories={mappedCategories} />
}
