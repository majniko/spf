export type deleteCategoryProps = {
  categoryId: string
}

export const deleteCategoryCall = async ({ categoryId }: deleteCategoryProps) => {
  try {
    const response = await fetch('/api/categories', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryId }),
    })
    return await response.json()
  } catch (error) {
    return { error: 'network_error' }
  }
}
