'use client'

import { CategoriesManager } from '@/features/components/categoriesManager/CategoriesManager'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { categoriesSetCategories } from '@/lib/redux/slices/categoriesSlice'
import { userSetUsername } from '@/lib/redux/slices/userSlice'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { useEffect } from 'react'
import styles from './CategoriesPage.module.css'
import { Divider } from '@mui/material'

export type CategoriesPageProps = {
  categories: categoryProps[] | []
}

export const CategoriesPage = (props: CategoriesPageProps) => {
  const { categories } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(categoriesSetCategories(categories))
  })

  return (
    <div className={styles.categoriesPage}>
      <div className={styles.title}>
        <h1>Categories</h1>
      </div>
      <CategoriesManager />
    </div>
  )
}
