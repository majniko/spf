import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback } from 'react'
import {
  categoriesCallDelete,
  categoriesCallPut,
  categoriesSetEditedCategoryId,
  categoriesSetEditedCategoryName,
} from '@/lib/redux/slices/categoriesSlice'
import { useRouter } from 'next/navigation'

export type useCategoryProps = {
  categoryId: string
  categoryName: string
}

export const useCategory = ({ categoryId, categoryName }: useCategoryProps) => {
  const { editedCategoryName, editedCategoryId } = useAppSelector(state => state.categories)
  const dispatch = useAppDispatch()
  const [isEdit, setIsEdit] = React.useState(false)
  const [buttonsDisabled, setButtonsDisabled] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    if (editedCategoryId !== '') {
      setButtonsDisabled(true)
    } else {
      setButtonsDisabled(false)
    }
  }, [editedCategoryId])

  const onEditButtonClick = useCallback((): void => {
    setIsEdit(true)
    dispatch(categoriesSetEditedCategoryId(categoryId))
    dispatch(categoriesSetEditedCategoryName(categoryName))
  }, [categoryId, categoryName, dispatch])

  const onCancelButtonClick = useCallback((): void => {
    setIsEdit(false)
    dispatch(categoriesSetEditedCategoryId(''))
    dispatch(categoriesSetEditedCategoryName(''))
  }, [dispatch])

  const onCategoryNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(categoriesSetEditedCategoryName(event.target.value))
    },
    [dispatch]
  )

  const onSaveButtonClick = useCallback((): void => {
    setIsEdit(false)
    dispatch(categoriesCallPut({ router }))
  }, [dispatch, router])

  const onDeleteButtonClick = useCallback((): void => {
    dispatch(categoriesCallDelete({ router }))
  }, [dispatch, router])

  return {
    buttonsDisabled,
    editedCategoryName,
    isEdit,
    onCategoryNameChange,
    onCancelButtonClick,
    onDeleteButtonClick,
    onEditButtonClick,
    onSaveButtonClick,
  }
}
