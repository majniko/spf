import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import styles from './ResponsiveDrawer.module.css'
import { menuItems } from '@/features/components/composedAppBar/responsiveDrawer/menuItems'
import Link from 'next/link'

export type ResponsiveDrawerProps = {
  mobileDrawerOpen: boolean
  handleDrawerToggle: () => void
}

const drawerWidth = 240

export default function ResponsiveDrawer(props: ResponsiveDrawerProps) {
  const { mobileDrawerOpen, handleDrawerToggle } = props

  const drawer = (
    <div className={styles.responsiveDrawer}>
      <Divider />
      <List>
        {menuItems.map(item => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.path} className={styles.linkText}>
              <ListItemButton className={styles.button}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex', position: 'fixed' }} className={styles.responsiveDrawer}>
      <CssBaseline />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
      </Box>
    </Box>
  )
}
