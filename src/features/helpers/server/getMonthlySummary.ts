import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { entryProps } from '@/features/components/entriesManager/entry/Entry'

type getMonthlySummaryProps = {
  mappedCategories: categoryProps[]
  mappedEntries: entryProps[]
}

export type summaryProps = {
  name: string
  amount: number
  isEmpty: boolean
}

export const getMonthlySummary = (
  props: getMonthlySummaryProps
): { expenseSum: summaryProps[] | []; incomeSum: summaryProps[] | [] } => {
  const { mappedCategories, mappedEntries } = props

  if (mappedCategories.length === 0) return { expenseSum: [], incomeSum: [] }

  const summary = mappedCategories.map(category => {
    const entries = mappedEntries.filter(entry => entry.categoryId === category.id)
    let amount = 0
    let isEmpty = true

    if (entries.length > 0) {
      isEmpty = false
      entries.forEach(entry => {
        if (entry.isExpense) {
          amount -= entry.amount
        } else {
          amount += entry.amount
        }
      })
    }

    return {
      name: category.name,
      amount,
      isEmpty,
    }
  })

  console.log(summary)

  const notEmptySum = summary.filter(category => !category.isEmpty)
  const expenseSum = notEmptySum.filter(category => category.amount < 0)
  const incomeSum = notEmptySum.filter(category => category.amount > 0)

  return { expenseSum, incomeSum }
}
