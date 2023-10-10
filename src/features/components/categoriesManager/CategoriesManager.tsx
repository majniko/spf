'use client'

import { Category } from '@/features/components/categoriesManager/category/Category'
import { Divider, IconButton, TextField } from '@mui/material'
import styles from './CategoriesManager.module.css'
import CheckIcon from '@mui/icons-material/Check'
import { useCategoriesManager } from '@/features/components/categoriesManager/useCategoriesManager'

export const CategoriesManager = () => {
  const { newCategoryName, onNewCategoryNameChange, onSubmitButtonClick, categories } = useCategoriesManager()

  return (
    <div className={styles.categoriesManager}>
      <Divider className={styles.divider} />
      {categories.length > 0 ? (
        categories.map(category => <Category key={category.id} id={category.id} name={category.name} />)
      ) : (
        <p>No categories yet</p>
      )}
      <Divider className={styles.divider} />
      <div className={styles.newCategory}>
        <TextField
          size={'small'}
          value={newCategoryName}
          onChange={onNewCategoryNameChange}
          label="Add New Category"
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
