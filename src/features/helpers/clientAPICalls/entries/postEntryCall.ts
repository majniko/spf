export type postEntryCallProps = {
  newEntry: {
    title: string
    amount: number
    isExpense: boolean
    categoryId: string
    date: string
  }
}

export const postEntryCall = async ({ newEntry }: postEntryCallProps) => {
  try {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newEntry }),
    })
    return await response.json()
  } catch (error) {
    return { error: 'network_error' }
  }
}
