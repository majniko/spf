import React from 'react'
import { ComposedAppBar } from '@/features/components/composedAppBar/ComposedAppBar'
import { getTokenFromCookies } from '@/features/helpers/cookies/getTokenFromCookies'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/features/helpers/utils/verifyToken'
import { decodeTokenOrRedirect } from '@/features/helpers/cookies/decodeTokenOrRedirect'
import styles from './layout.module.css'

export type userLayoutProps = {
  children: React.ReactNode
}

const UserLayout = (props: userLayoutProps) => {
  const decodedToken = decodeTokenOrRedirect()

  return (
    <>
      <ComposedAppBar decodedToken={decodedToken} />
      <div className={styles.privatePage}>{props.children}</div>
    </>
  )
}

export default UserLayout
