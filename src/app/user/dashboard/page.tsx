import React from 'react'
import { decodeTokenOrRedirect } from '@/features/helpers/server/decodeTokenOrRedirect'
import { getMappedCategories } from '@/features/helpers/server/getMappedCategories'
import { getMappedEntries } from '@/features/helpers/server/getMappedEntries'
import dayjs from 'dayjs'
import { getMonthlySummary } from '@/features/helpers/server/getMonthlySummary'
import { getGraphData } from '@/features/helpers/server/getGraphData'
import { DashboardPage } from '@/features/pages/dasboardPage/DashboardPage'

export default async function Dashboard(): Promise<React.ReactElement> {
  const decodedToken = decodeTokenOrRedirect()

  const today = dayjs()
  const month = today.month()
  const year = today.year()

  const mappedCategories = await getMappedCategories(decodedToken.userId)
  const mappedEntries = await getMappedEntries(decodedToken.userId, mappedCategories, month, year)

  const { incomeSum, expenseSum } = getMonthlySummary({ mappedEntries, mappedCategories })

  if (expenseSum.length === 0 && incomeSum.length === 0) {
    return (
      <div>
        <p>No Data To Display.</p>
      </div>
    )
  }

  const { expenseGraph, incomeGraph } = getGraphData({ expenseSum, incomeSum })

  return (
    <DashboardPage
      expenseSum={expenseSum}
      incomeSum={incomeSum}
      expenseGraph={expenseGraph}
      incomeGraph={incomeGraph}
    />
  )
}
