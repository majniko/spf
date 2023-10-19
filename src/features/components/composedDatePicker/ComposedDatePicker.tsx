import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export type composedDatePickerProps = {
  dateString: string
  onDateChange: (date: Dayjs | null) => void
}

export default function ComposedDatePicker({ dateString, onDateChange }: composedDatePickerProps) {
  const value = dayjs(dateString)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Date Picker" value={value} onChange={newValue => onDateChange(newValue)} />
    </LocalizationProvider>
  )
}
