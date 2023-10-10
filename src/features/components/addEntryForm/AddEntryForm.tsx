'use client'

import { Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useAddEntryForm } from '@/features/components/addEntryForm/useAddEntryForm'
import ComposedDatePicker from '@/features/components/composedDatePicker/ComposedDatePicker'
import styles from './AddEntryForm.module.css'
import { FormControl } from '@mui/material'
import React from 'react'
import { CustomNumericFormat } from '@/features/helpers/utils/CustomNumericFormat'

export const AddEntryForm = () => {
  const {
    categories,
    categoryId,
    onCategoryChange,
    onAmountChange,
    amount,
    onIsExpenseChange,
    isExpense,
    onDateChange,
    date,
    onTitleChange,
    title,
    isSubmitting,
    onSubmitButtonClick,
  } = useAddEntryForm()

  return (
    <div className={styles.addEntryForm}>
      <div className={styles.gridContainer}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={onTitleChange}
          className={styles.titleTextField}
        />
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          value={amount === 0 ? '' : amount}
          onChange={onAmountChange}
          className={styles.amountTextField}
          InputProps={{
            inputComponent: CustomNumericFormat as any,
          }}
        />
        <FormControlLabel
          control={<Checkbox checked={isExpense} onChange={onIsExpenseChange} />}
          label="isExpense"
          className={styles.isExpenseCheckBox}
        />
        <FormControl variant="outlined" style={{ width: '100%' }} className={styles.categorySelect}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            id="category-select"
            label="Category"
            variant="outlined"
            value={categoryId}
            onChange={onCategoryChange}
          >
            <MenuItem value={''}>
              <em>None</em>
            </MenuItem>
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ComposedDatePicker dateString={date} onDateChange={onDateChange} />
        <Button variant="contained" onClick={onSubmitButtonClick} disabled={isSubmitting}>
          Submit
        </Button>
      </div>
    </div>
  )
}
