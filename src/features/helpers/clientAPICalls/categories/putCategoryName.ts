export type postNewCategoryProps = {
  editedCategoryName: string
  categoryId: string
}

export const putCategoryName = async ({ editedCategoryName, categoryId }: postNewCategoryProps) => {
  try {
    const response = await fetch('/api/categories', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ editedCategoryName, categoryId }),
    })
    return await response.json()
  } catch (error) {
    return { error: 'network_error' }
  }
}
