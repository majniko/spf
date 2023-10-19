import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback, useEffect } from 'react'
import {
  entriesCallPost,
  entriesNewEntryChange,
  entriesNewEntryReset,
  entriesSetError,
} from '@/lib/redux/slices/entriesSlice'
import dayjs, { Dayjs } from 'dayjs'
import { SelectChangeEvent } from '@mui/material'
import { dateToString } from '@/features/helpers/utils/dateToString'
import { useRouter } from 'next/navigation'
import { validateNewEntry } from '@/features/helpers/validation/entry/validateNewEntry'

export const useAddEntryForm = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { newEntry, isSubmitting, isError } = useAppSelector(state => state.entries)
  const { categories } = useAppSelector(state => state.categories)
  const { amount, isExpense, date, title, categoryId } = newEntry

  useEffect(() => {
    dispatch(
      entriesNewEntryChange({
        name: 'date',
        value: dateToString(dayjs()),
      })
    )

    return () => {
      dispatch(entriesNewEntryReset())
    }
  }, [dispatch])

  const onTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(entriesNewEntryChange({ name: 'title', value: event.target.value }))
    },
    [dispatch]
  )

  const onAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(entriesNewEntryChange({ name: 'amount', value: parseFloat(event.target.value) }))
    },
    [dispatch]
  )

  const onIsExpenseChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(entriesNewEntryChange({ name: 'isExpense', value: event.target.checked }))
    },
    [dispatch]
  )

  const onCategoryChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(entriesNewEntryChange({ name: 'categoryId', value: event.target.value }))
    },
    [dispatch]
  )

  const onDateChange = useCallback(
    (newValue: Dayjs | null) => {
      if (newValue) {
        dispatch(
          entriesNewEntryChange({
            name: 'date',
            value: dateToString(newValue),
          })
        )
      } else {
        dispatch(entriesNewEntryChange({ name: 'date', value: '' }))
      }
    },
    [dispatch]
  )

  const onSubmitButtonClick = useCallback(() => {
    if (validateNewEntry({ newEntry, dispatch })) {
      dispatch(entriesCallPost({ router }))
    } else {
      dispatch(entriesSetError(false))
    }
  }, [dispatch, router, newEntry])

  return {
    title,
    amount,
    isExpense,
    date,
    categoryId,
    categories,
    isSubmitting,
    onTitleChange,
    onAmountChange,
    onIsExpenseChange,
    onDateChange,
    onCategoryChange,
    onSubmitButtonClick,
    isError,
  }
}
