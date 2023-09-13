export type postNewCategoryProps = {
  newCategoryName: string
}

export const postCategoryName = async ({ newCategoryName }: postNewCategoryProps) => {
  try {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newCategoryName }),
    })
    return await response.json()
  } catch (error) {
    return { error: 'network_error' }
  }
}
