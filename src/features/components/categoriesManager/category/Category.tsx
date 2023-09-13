import React from 'react'
import { IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import styles from './Category.module.css'
import { useCategory } from '@/features/components/categoriesManager/category/useCategory'

export type categoryProps = {
  id: string
  name: string
  userId?: string
}

export const Category = (props: categoryProps) => {
  const { name, id } = props
  const {
    buttonsDisabled,
    editedCategoryName,
    isEdit,
    onCategoryNameChange,
    onCancelButtonClick,
    onSaveButtonClick,
    onDeleteButtonClick,
    onEditButtonClick,
  } = useCategory({ categoryId: id, categoryName: name })

  if (isEdit)
    return (
      <div className={styles.category}>
        <TextField
          variant={'outlined'}
          size={'small'}
          value={editedCategoryName}
          onChange={onCategoryNameChange}
          className={styles.textField}
          aria-label="category name"
        />
        <IconButton onClick={onSaveButtonClick} aria-label="save">
          <SaveIcon />
        </IconButton>
        <IconButton onClick={onCancelButtonClick} aria-label="cancel">
          <CancelIcon />
        </IconButton>
      </div>
    )

  return (
    <div className={styles.category}>
      <div className={styles.categoryName}>
        <p>{name}</p>
      </div>
      <IconButton onClick={onEditButtonClick} disabled={buttonsDisabled} aria-label="edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDeleteButtonClick} disabled={buttonsDisabled} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
