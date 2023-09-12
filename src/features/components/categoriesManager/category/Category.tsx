import React from 'react'
import { IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './Category.module.css'

export type categoryProps = {
  id: string
  name: string
  userId: string
}

export const Category = (props: categoryProps) => {
  const { name } = props

  return (
    <div className={styles.category}>
      <div className={styles.categoryName}>
        <p>{name}</p>
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
