import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useCallback, useEffect, useMemo } from 'react'
import { entriesCallPost, entriesNewEntryChange, entriesNewEntryReset } from '@/lib/redux/slices/entriesSlice'
import dayjs, { Dayjs } from 'dayjs'
import { SelectChangeEvent } from '@mui/material'

export const useAddEntryForm = () => {
  const dispatch = useAppDispatch()
  const { newEntry, isSubmitting } = useAppSelector(state => state.entries)
  const { categories } = useAppSelector(state => state.categories)
  const { amount, isExpense, date, title, categoryId } = newEntry
  const utcOffset = useMemo(() => dayjs().utcOffset(), [])
  console.log('utcOffset', utcOffset)

  useEffect(() => {
    dispatch(
      entriesNewEntryChange({
        name: 'date',
        value: dayjs().hour(0).minute(utcOffset).second(0).millisecond(0).toISOString(),
      })
    )

    return () => {
      dispatch(entriesNewEntryReset())
    }
  }, [dispatch, utcOffset])

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
            value: dayjs(newValue).hour(0).minute(utcOffset).second(0).millisecond(0).toISOString(),
          })
        )
      } else {
        dispatch(entriesNewEntryChange({ name: 'date', value: '' }))
      }
    },
    [dispatch, utcOffset]
  )

  const onSubmitButtonClick = useCallback(() => {
    dispatch(entriesCallPost())
  }, [dispatch])

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
  }
}
