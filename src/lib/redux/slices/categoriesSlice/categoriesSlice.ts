import { createSlice } from '@reduxjs/toolkit'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export type categoriesSliceState = {
  categories: [{ name: string; id: number }] | []
  isSubmitting: boolean
  newCategoryName: string
}

export const initialState: categoriesSliceState = {
  categories: [],
  isSubmitting: false,
  newCategoryName: '',
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesSetNewCategoryName: (state, action: { payload: string; type: string }) => {
      state.newCategoryName = action.payload
    },
    categoriesSetIsSubmitting: (
      state,
      action: { payload: { isSubmitting: boolean; router: AppRouterInstance }; type: string }
    ) => {
      state.isSubmitting = action.payload.isSubmitting
    },
    categoriesSetCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

export const { categoriesSetNewCategoryName, categoriesSetIsSubmitting, categoriesSetCategories } =
  categoriesSlice.actions
