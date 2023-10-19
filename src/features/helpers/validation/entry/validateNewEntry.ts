import { newEntry } from '@/lib/redux/slices/entriesSlice'
import { useAppDispatch } from '@/lib/redux/hooks'
import { alertsAddNewAlert } from '@/lib/redux/slices/alertsSlice'
import { localization } from '@/features/localization/localization'

export type validateNewEntryProps = {
  newEntry: newEntry
  dispatch: ReturnType<typeof useAppDispatch>
}

export type validateNewEntryOnServerProps = {
  newEntry: newEntry
}

export const validateTitle = (title: string): boolean => {
  if (title.length < 3) return false
  if (title.length > 20) return false
  return true
}

export const validateDate = (date: string): boolean => {
  return !!new Date(date)
}
export const validateCategoryId = (categoryId: string): boolean => {
  return !(categoryId.length === 0)
}

export const validateNewEntry = ({ newEntry, dispatch }: validateNewEntryProps) => {
  let validate = true

  if (!validateTitle(newEntry.title)) {
    validate = false
    dispatch(alertsAddNewAlert({ severity: 'error', message: localization.en.entries.validation.title }))
  }

  if (!validateDate(newEntry.date)) {
    validate = false
    dispatch(alertsAddNewAlert({ severity: 'error', message: localization.en.entries.validation.date }))
  }

  if (!validateCategoryId(newEntry.categoryId)) {
    validate = false
    dispatch(alertsAddNewAlert({ severity: 'error', message: localization.en.entries.validation.category }))
  }

  return validate
}

export const validateNewEntryOnServer = ({ newEntry }: validateNewEntryOnServerProps) => {
  let validate = true

  if (!validateTitle(newEntry.title)) {
    validate = false
    console.log('validateTitle')
  }

  if (!validateDate(newEntry.date)) {
    validate = false
    console.log('validateDate')
  }

  if (!validateCategoryId(newEntry.categoryId)) {
    validate = false
    console.log('validateCategoryId')
  }

  return validate
}
