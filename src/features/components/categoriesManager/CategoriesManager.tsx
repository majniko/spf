'use client'

import { Category } from '@/features/components/categoriesManager/category/Category'
import { Divider, IconButton, TextField } from '@mui/material'
import styles from './CategoriesManager.module.css'
import CheckIcon from '@mui/icons-material/Check'
import { useCategoriesManager } from '@/features/components/categoriesManager/useCategoriesManager'

export const CategoriesManager = () => {
  const { newCategoryName, onNewCategoryNameChange, onSubmitButtonClick, categories } = useCategoriesManager()

  return (
    <div>
      <h1>CategoriesManager</h1>
      {categories.length > 0 ? (
        categories.map(category => <Category key={category.id} categoryName={category.name} />)
      ) : (
        <p>No categories yet</p>
      )}
      <Divider />
      <div className={styles.newCategory}>
        <TextField
          size={'small'}
          value={newCategoryName}
          onChange={onNewCategoryNameChange}
          label="Add New Category"
          id="outlined-basic"
          variant="outlined"
          className={styles.textField}
        />
        <IconButton onClick={onSubmitButtonClick}>
          <CheckIcon />
        </IconButton>
      </div>
    </div>
  )
}
