import { createSlice } from '@reduxjs/toolkit'

export type entry = {
  id: string
  title: string
  amount: number
  isExpense: boolean
  date: string
  categoryId: string
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
  newEntry: newEntry
}

const initialState: entriesState = {
  entries: [],
  isSubmitting: false,
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
    entriesAddEntry: (state, action) => {
      state.isSubmitting = true
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
    entriesCallPost: state => {
      state.isSubmitting = true
    },
    entriesSetIsSubmittingFalse: state => {
      state.isSubmitting = false
    },
  },
})

export const {
  entriesAddEntry,
  entriesNewEntryChange,
  entriesNewEntryReset,
  entriesCallPost,
  entriesSetIsSubmittingFalse,
} = entriesSlice.actions
