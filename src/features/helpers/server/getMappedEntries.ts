import { entryProps } from '@/features/components/entriesManager/entry/Entry'
import prisma from '@/lib/prisma/prisma'
import { dateToString } from '@/features/helpers/utils/dateToString'
import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import { localization } from '@/features/localization/localization'
import dayjs from 'dayjs'

export const getMappedEntries = async (
  userId: string,
  mappedCategories: categoryProps[],
  month: number,
  year: number
): Promise<entryProps[] | []> => {
  let entries

  const date = dayjs(new Date(year, month))
  const fromOffset = dayjs(date).startOf('month').utcOffset()
  let toOffset = dayjs(date).endOf('month').utcOffset()

  const from = dayjs(date).startOf('month').minute(fromOffset)
  const to = dayjs(date).endOf('month').minute(toOffset)

  console.log(from.toDate(), to.toDate())

  try {
    entries = await prisma.entries.findMany({ where: { userId, date: { gte: from.toDate(), lte: to.toDate() } } })
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
