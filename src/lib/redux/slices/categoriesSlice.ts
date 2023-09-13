import { createSlice } from '@reduxjs/toolkit'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export type categoriesSliceState = {
  categories: { name: string; id: string; userId: string }[] | []
  isSubmitting: boolean
  newCategoryName: string
  editedCategoryName: string
  editedCategoryId: string
}

export const initialState: categoriesSliceState = {
  categories: [],
  isSubmitting: false,
  newCategoryName: '',
  editedCategoryName: '',
  editedCategoryId: '',
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesSetCategories: (state, action) => {
      state.categories = action.payload
    },
    categoriesSetNewCategoryName: (state, action: { payload: string; type: string }) => {
      state.newCategoryName = action.payload
    },
    categoriesSetEditedCategoryName: (state, action: { payload: string; type: string }) => {
      state.editedCategoryName = action.payload
    },
    categoriesSetEditedCategoryId: (state, action: { payload: string; type: string }) => {
      state.editedCategoryId = action.payload
    },
    categoriesCallPost: (state, action: { payload: { router: AppRouterInstance }; type: string }) => {
      state.isSubmitting = true
    },
    categoriesCallPut: (state, action: { payload: { router: AppRouterInstance }; type: string }) => {
      state.isSubmitting = true
    },
    categoriesCallDelete: (state, action: { payload: { router: AppRouterInstance }; type: string }) => {
      state.isSubmitting = true
    },
    categoriesIsSubmittingSetFalse: state => {
      state.isSubmitting = false
    },
  },
})

export const {
  categoriesSetCategories,
  categoriesSetNewCategoryName,
  categoriesSetEditedCategoryName,
  categoriesSetEditedCategoryId,
  categoriesCallPost,
  categoriesCallPut,
  categoriesCallDelete,
  categoriesIsSubmittingSetFalse,
} = categoriesSlice.actions
