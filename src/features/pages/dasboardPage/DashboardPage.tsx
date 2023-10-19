'use client'

import { summaryProps } from '@/features/helpers/server/getMonthlySummary'
import { useAppDispatch } from '@/lib/redux/hooks'
import React, { useEffect } from 'react'
import { dashboardSetData, graphData } from '@/lib/redux/slices/dashboardSlice'
import styles from './dashboardPage.module.css'
import { Divider, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { GraphSummary } from '@/features/components/graphSummary/GraphSummary'

export type DashboardPageProps = {
  expenseSum: summaryProps[]
  incomeSum: summaryProps[]
  expenseGraph: graphData
  incomeGraph: graphData
}

export const DashboardPage = (props: DashboardPageProps) => {
  const dispatch = useAppDispatch()
  const [displayedGraph, setDisplayedGraph] = React.useState('expense')

  const handleDisplayedGraphChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayedGraph((event.target as HTMLInputElement).value)
  }

  useEffect(() => {
    dispatch(dashboardSetData(props))
  }, [props, dispatch])

  if (props.expenseSum.length === 0 && props.incomeSum.length === 0) {
    return (
      <div>
        <p>No Data To Display.</p>
      </div>
    )
  }

  if (props.expenseSum.length === 0) {
    return (
      <DashboardPageWrapper>
        <GraphSummary isExpense={false} />
      </DashboardPageWrapper>
    )
  }

  if (props.incomeSum.length === 0) {
    return (
      <DashboardPageWrapper>
        <GraphSummary isExpense={true} />
      </DashboardPageWrapper>
    )
  }

  return (
    <DashboardPageWrapper>
      <>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="select-expense-or-income"
            name="expense-income-radio-buttons-group"
            value={displayedGraph}
            onChange={handleDisplayedGraphChange}
          >
            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
            <FormControlLabel value="income" control={<Radio />} label="Income" />
          </RadioGroup>
        </FormControl>
      </>
      {displayedGraph === 'expense' && <GraphSummary isExpense={true} />}
      {displayedGraph === 'income' && <GraphSummary isExpense={false} />}
    </DashboardPageWrapper>
  )
}

export type DashboardPageWrapperProps = {
  children: React.ReactNode
}

export const DashboardPageWrapper = ({ children }: DashboardPageWrapperProps) => {
  return (
    <div className={styles.dashboardPage}>
      <div className={styles.title}>
        <h1>Dashboard</h1>
      </div>
      <Divider className={styles.divider} />
      {children}
    </div>
  )
}
