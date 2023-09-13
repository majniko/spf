import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback } from 'react'
import { categoriesSetIsSubmitting, categoriesSetNewCategoryName } from '@/lib/redux/slices/categoriesSlice'
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
    dispatch(categoriesSetIsSubmitting({ isSubmitting: true, router }))
  }, [dispatch, router])

  return {
    categories,
    newCategoryName,
    onNewCategoryNameChange,
    onSubmitButtonClick,
  }
}
