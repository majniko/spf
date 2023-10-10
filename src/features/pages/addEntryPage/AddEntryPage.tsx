'use client'

import { AddEntryForm } from '@/features/components/addEntryForm/AddEntryForm'
import React, { useEffect } from 'react'
import styles from './AddEntryPage.module.css'
import { Divider } from '@mui/material'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { useAppDispatch } from '@/lib/redux/hooks'
import { categoriesSetCategories } from '@/lib/redux/slices/categoriesSlice'

export type AddEntryPageProps = {
  categories: categoryProps[] | []
}

export const AddEntryPage = ({ categories }: AddEntryPageProps): React.ReactElement => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(categoriesSetCategories(categories))
  })

  return (
    <div className={styles.addEntryPage}>
      <div className={styles.title}>
        <h1>Add Entry</h1>
      </div>
      <Divider className={styles.divider} />
      <AddEntryForm />
    </div>
  )
}
