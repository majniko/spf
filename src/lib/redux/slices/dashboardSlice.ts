import { summaryProps } from '@/features/helpers/server/getMonthlySummary'
import { createSlice } from '@reduxjs/toolkit'

export type datasets = {
  label: string
  data: number[]
  backgroundColor: string[]
}

export type graphData = {
  labels: string[]
  datasets: datasets[]
}

export type dashboardSliceState = {
  expense: {
    data: summaryProps[] | []
    graph: graphData
  }
  income: {
    data: summaryProps[] | []
    graph: graphData
  }
  selectedMonth: number
  selectedYear: number
}

export const initialState: dashboardSliceState = {
  expense: {
    data: [],
    graph: {
      labels: [],
      datasets: [],
    },
  },
  income: {
    data: [],
    graph: {
      labels: [],
      datasets: [],
    },
  },
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    dashboardSetData: (
      state,
      action: {
        payload: {
          expenseSum: summaryProps[]
          incomeSum: summaryProps[]
          incomeGraph: graphData
          expenseGraph: graphData
        }
        type: string
      }
    ) => {
      const { expenseSum, incomeSum, incomeGraph, expenseGraph } = action.payload
      state.expense.data = expenseSum
      state.income.data = incomeSum
      state.expense.graph = expenseGraph
      state.income.graph = incomeGraph
    },
  },
})

export const { dashboardSetData } = dashboardSlice.actions
