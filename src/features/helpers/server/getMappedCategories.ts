import { categoryProps } from '@/features/components/categoriesManager/category/Category'
import prisma from '@/lib/prisma/prisma'

export const getMappedCategories = async (userId: string): Promise<categoryProps[] | []> => {
  let categories
  try {
    categories = await prisma.categories.findMany({ where: { userId } })
  } catch (e) {
    return []
  }

  return categories.map(category => {
    return {
      id: category.id,
      name: category.name,
      userId: category.userId,
    }
  })
}
