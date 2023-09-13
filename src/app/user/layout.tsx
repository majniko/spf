import React from 'react'
import { ComposedAppBar } from '@/features/components/composedAppBar/ComposedAppBar'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/features/helpers/utils/verifyToken'
import { getDecodedTokenOnServer } from '@/features/helpers/cookies/getDecodedTokenOnServer'

export type userLayoutProps = {
  children: React.ReactNode
}

const UserLayout = (props: userLayoutProps) => {
  const decodedToken = getDecodedTokenOnServer()

  return (
    <>
      <ComposedAppBar decodedToken={decodedToken} />
      {props.children}
    </>
  )
}

export default UserLayout
