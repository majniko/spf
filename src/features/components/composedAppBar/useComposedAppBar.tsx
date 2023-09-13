import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userLogout, userSetUsername } from '@/lib/redux/slices/userSlice'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/redux/hooks'
import { JwtPayload } from 'jsonwebtoken'

export const useComposedAppBar = (decodedToken: JwtPayload) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { username } = useAppSelector(state => state.user)

  const onLogoutButtonClick = useCallback(() => {
    dispatch(userLogout({ router }))
  }, [dispatch, router])

  useEffect(() => {
    if (username === '') {
      dispatch(userSetUsername(decodedToken.username))
    }
  })

  return {
    username,
    onLogoutButtonClick,
  }
}
