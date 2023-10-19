'use client'
import React, { useEffect } from 'react'
import { entryProps } from '@/features/components/entriesManager/entry/Entry'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { useAppDispatch } from '@/lib/redux/hooks'
import { categoriesSetCategories } from '@/lib/redux/slices/categoriesSlice'
import { entriesSetEntries } from '@/lib/redux/slices/entriesSlice'
import { EntriesManager } from '@/features/components/entriesManager/EntriesManager'
import styles from './EntriesPage.module.css'
import { Divider } from '@mui/material'

export type EntriesPageProps = {
  entries: entryProps[] | []
  categories: categoryProps[] | []
}

export const EntriesPage = (props: EntriesPageProps) => {
  const { categories, entries } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(categoriesSetCategories(categories))
    dispatch(entriesSetEntries(entries))
  })

  return (
    <div className={styles.entriesPage}>
      <div className={styles.title}>
        <h1>Entries</h1>
      </div>
      <Divider className={styles.divider} />
      <EntriesManager />
    </div>
  )
}
