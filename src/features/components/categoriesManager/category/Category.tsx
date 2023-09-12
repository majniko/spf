import React from 'react'
import { IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './Category.module.css'

export type categoryProps = {
  categoryName: string
}

export const Category = (props: categoryProps) => {
  const { categoryName } = props

  return (
    <div className={styles.category}>
      <div className={styles.categoryName}>
        <p>{categoryName}</p>
      </div>
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
