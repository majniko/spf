import { summaryProps } from '@/features/helpers/server/getMonthlySummary'
import { graphData } from '@/lib/redux/slices/dashboardSlice'

export const tempPallete: string[] = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
]

export type getGraphDataProps = {
  expenseSum: summaryProps[] | []
  incomeSum: summaryProps[] | []
}

const getGraph = (sum: summaryProps[] | []) => {
  const labels = sum.map(category => category.name)
  const data = sum.map(category => category.amount)
  const backgroundColor = sum.map((category, index) => tempPallete[index % tempPallete.length])

  return {
    labels,
    datasets: [
      {
        label: 'Amount',
        data,
        backgroundColor,
      },
    ],
  }
}

export const getGraphData = (props: getGraphDataProps) => {
  const { expenseSum, incomeSum } = props

  return {
    expenseGraph: getGraph(expenseSum),
    incomeGraph: getGraph(incomeSum),
  }
}
