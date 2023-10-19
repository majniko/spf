import { createSlice } from '@reduxjs/toolkit'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export type entry = {
  id: string
  title: string
  amount: number
  isExpense: boolean
  date: string
  categoryId: string
  categoryName: string
}

export type newEntry = {
  title: string
  amount: number
  isExpense: boolean
  date: string
  categoryId: string
}

export type entriesState = {
  entries: entry[]
  isSubmitting: boolean
  isError: boolean
  newEntry: newEntry
}

const initialState: entriesState = {
  entries: [],
  isSubmitting: false,
  isError: false,
  newEntry: {
    title: '',
    amount: 0,
    isExpense: true,
    date: '',
    categoryId: '',
  },
}

export const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    entriesSetEntries: (state, action: { payload: entry[]; type: string }) => {
      state.entries = action.payload
    },
    entriesNewEntryChange: (
      state,
      action: { payload: { name: keyof newEntry; value: string | number | boolean }; type: string }
    ) => {
      const { name, value } = action.payload
      return {
        ...state,
        newEntry: {
          ...state.newEntry,
          [name]: value,
        },
      }
    },
    entriesNewEntryReset: state => {
      state.newEntry = initialState.newEntry
    },
    entriesCallPost: (state, action: { payload: { router: AppRouterInstance }; type: string }) => {
      state.isSubmitting = true
    },
    entriesSetIsSubmittingFalse: state => {
      state.isSubmitting = false
    },
    entriesSetError: (state, action) => {
      state.isError = action.payload
    },
  },
})

export const {
  entriesSetEntries,
  entriesNewEntryChange,
  entriesNewEntryReset,
  entriesCallPost,
  entriesSetIsSubmittingFalse,
  entriesSetError,
} = entriesSlice.actions
