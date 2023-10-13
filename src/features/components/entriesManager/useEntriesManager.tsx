import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { useCallback, useEffect, useState } from 'react'

export const useEntriesManager = () => {
  const dispatch = useAppDispatch()
  const { entries } = useAppSelector(state => state.entries)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsModalOpen(false)
  }, [entries])

  const swapIsModalOpen = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  return { entries, isModalOpen, swapIsModalOpen }
}
