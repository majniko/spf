import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '@/lib/redux/slices/userSlice/userSlice'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/redux/hooks'

export const useComposedAppBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { username } = useAppSelector(state => state.user)

  const onLogoutButtonClick = useCallback(() => {
    dispatch(userLogout({ router }))
  }, [dispatch, router])

  return {
    username,
    onLogoutButtonClick,
  }
}
