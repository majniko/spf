import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'

export const useGraphSummary = () => {
  const dispatch = useAppDispatch()
  const { expense, income, selectedMonth, selectedYear } = useAppSelector(state => state.dashboard)

  return { expense, income }
}
