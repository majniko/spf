import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback } from 'react'
import { categoriesCallPost, categoriesSetNewCategoryName } from '@/lib/redux/slices/categoriesSlice'
import { useRouter } from 'next/navigation'

export const useCategoriesManager = () => {
  const dispatch = useDispatch()
  const { newCategoryName, categories } = useAppSelector(state => state.categories)
  const router = useRouter()

  const onNewCategoryNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(categoriesSetNewCategoryName(event.target.value))
    },
    [dispatch]
  )

  const onSubmitButtonClick = useCallback(() => {
    dispatch(categoriesCallPost({ router }))
  }, [dispatch, router])

  return {
    categories,
    newCategoryName,
    onNewCategoryNameChange,
    onSubmitButtonClick,
  }
}
