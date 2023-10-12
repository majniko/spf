import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'

export const useEntriesManager = () => {
  const dispatch = useAppDispatch()
  const { entries } = useAppSelector(state => state.entries)
  return { entries }
}
