'use client'

import { CategoriesManager } from '@/features/components/categoriesManager/CategoriesManager'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { categoriesSetCategories } from '@/lib/redux/slices/categoriesSlice/categoriesSlice'
import { userSetUsername } from '@/lib/redux/slices/userSlice/userSlice'
import { Prisma } from '.prisma/client'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'

export type CategoriesPageProps = {
  categories: categoryProps[] | []
  username: string
}

export const CategoriesPage = (props: CategoriesPageProps) => {
  const { categories, username } = props
  const dispatch = useAppDispatch()
  const userSelector = useAppSelector(state => state.user)

  if (userSelector.username === '') {
    dispatch(userSetUsername(username))
  }

  dispatch(categoriesSetCategories(categories))

  return (
    <div>
      <h1>CategoriesPage</h1>
      <CategoriesManager />
    </div>
  )
}
