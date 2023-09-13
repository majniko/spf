import { useAppDispatch } from '@/lib/redux/hooks'
import { userLogout } from '@/lib/redux/slices/userSlice'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export const useLandingPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onLogoutButtonClick = useCallback(() => {
    dispatch(userLogout({ router }))
  }, [dispatch, router])

  return { onLogoutButtonClick }
}
