'use client'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export const EntriesPage = () => {
  const [value, setValue] = React.useState('')

  return (
    <FormControl variant="outlined" style={{ width: '100%' }}>
      <InputLabel id="test-select-label">Label</InputLabel>
      <Select
        value={value}
        onChange={e => setValue(e.target.value)}
        label="Label" // here is the difference
      >
        <MenuItem key={1} value="test">
          Test 1
        </MenuItem>
        <MenuItem key={2} value="test2">
          Test 2
        </MenuItem>
      </Select>
    </FormControl>
  )
}
