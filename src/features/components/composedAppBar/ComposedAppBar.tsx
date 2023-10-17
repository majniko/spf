'use client'

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useComposedAppBar } from '@/features/components/composedAppBar/useComposedAppBar'
import styles from './ComposedAppBar.module.css'
import { JwtPayload } from 'jsonwebtoken'
import ResponsiveDrawer from '@/features/components/composedAppBar/responsiveDrawer/ResponsiveDrawer'
import { localization } from '@/features/localization/localization'

export type ComposedAppBarProps = {
  decodedToken: JwtPayload
}

export const ComposedAppBar = ({ decodedToken }: ComposedAppBarProps) => {
  const { onLogoutButtonClick, username, mobileDrawerOpen, handleDrawerToggle } = useComposedAppBar(decodedToken)

  return (
    <>
      <AppBar className={styles.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            className={styles.menuIcon}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {localization.en.app.appName}
          </Typography>
          {username ? (
            <>
              <Typography variant="h6" component="div" className={styles.username}>
                Logged in as: {username}
              </Typography>
              <Button onClick={onLogoutButtonClick} color={'inherit'} variant={'outlined'}>
                {localization.en.loginForm.logout}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onLogoutButtonClick} color={'inherit'} variant={'outlined'}>
                {localization.en.loginForm.login}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <ResponsiveDrawer mobileDrawerOpen={mobileDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
    </>
  )
}
