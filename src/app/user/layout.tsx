import React from 'react'
import { ComposedAppBar } from '@/features/components/composedAppBar/ComposedAppBar'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/features/helpers/utils/verifyToken'
import { decodeTokenOrRedirect } from '@/features/helpers/cookies/decodeTokenOrRedirect'

export type userLayoutProps = {
  children: React.ReactNode
}

const UserLayout = (props: userLayoutProps) => {
  const decodedToken = decodeTokenOrRedirect()

  return (
    <>
      <ComposedAppBar decodedToken={decodedToken} />
      {props.children}
    </>
  )
}

export default UserLayout
