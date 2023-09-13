'use client'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useComposedAppBar } from '@/features/components/composedAppBar/useComposedAppBar'
import styles from './ComposedAppBar.module.css'
import { JwtPayload } from 'jsonwebtoken'

export type ComposedAppBarProps = {
  decodedToken: JwtPayload
}

export const ComposedAppBar = ({ decodedToken }: ComposedAppBarProps) => {
  const { onLogoutButtonClick, username } = useComposedAppBar(decodedToken)

  return (
    <AppBar className={styles.appBar}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          AppName
        </Typography>
        {username ? (
          <>
            <Typography variant="h6" component="div" className={styles.username}>
              Logged in as: {username}
            </Typography>
            <Button onClick={onLogoutButtonClick} color={'inherit'} variant={'outlined'}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button onClick={onLogoutButtonClick} color={'inherit'} variant={'outlined'}>
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
