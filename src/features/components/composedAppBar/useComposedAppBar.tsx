import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userLogout, userSetUsername } from '@/lib/redux/slices/userSlice'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/redux/hooks'
import { JwtPayload } from 'jsonwebtoken'
import * as React from 'react'

export const useComposedAppBar = (decodedToken: JwtPayload) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { username } = useAppSelector(state => state.user)
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false)

  const onLogoutButtonClick = useCallback(() => {
    dispatch(userLogout({ router }))
  }, [dispatch, router])

  useEffect(() => {
    if (username === '') {
      dispatch(userSetUsername(decodedToken.username))
    }
  })

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  return {
    username,
    onLogoutButtonClick,
    mobileDrawerOpen,
    handleDrawerToggle,
  }
}
