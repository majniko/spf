import { entryProps } from '@/features/components/entriesManager/entry/Entry'
import prisma from '@/lib/prisma/prisma'
import { dateToString } from '@/features/helpers/utils/dateToString'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { localization } from '@/features/localization/localization'

export const getMappedEntries = async (
  userId: string,
  mappedCategories: categoryProps[]
): Promise<entryProps[] | []> => {
  let entries
  try {
    entries = await prisma.entries.findMany({ where: { userId } })
  } catch (e) {
    return []
  }

  return entries.map(entry => {
    let categoryName = mappedCategories.find(category => category.id === entry.categoryId)?.name
    if (!categoryName) categoryName = localization.en.entries.nonexistentCategory

    return {
      id: entry.id,
      title: entry.title,
      amount: entry.amount,
      isExpense: entry.isExpense,
      categoryId: entry.categoryId,
      categoryName: categoryName,
      date: dateToString(entry.date),
    }
  })
}
