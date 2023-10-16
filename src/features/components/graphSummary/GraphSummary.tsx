'use client'

import { useGraphSummary } from '@/features/components/graphSummary/useGraphSummary'
import { SummaryLine } from '@/features/components/graphSummary/summaryLine/SummaryLine'
import styles from './graphSummary.module.css'
import { ArcElement, Chart, PieController, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(ArcElement, PieController, Tooltip)

export type GraphSummaryProps = {
  isExpense: boolean
}

export const GraphSummary = (props: GraphSummaryProps) => {
  const { income, expense } = useGraphSummary()

  return (
    <div>
      <h1>GraphSummary</h1>
      {props.isExpense ? (
        <>
          <div className={styles.graphContainer}>
            <Pie data={expense.graph} />
          </div>
          <div className={styles.summaryContainer}>
            {expense.data.map(item => (
              <SummaryLine categoryName={item.name} amount={item.amount} key={item.name} />
            ))}
          </div>
        </>
      ) : (
        'income'
      )}
    </div>
  )
}
