import CategoryIcon from '@mui/icons-material/Category'
import DescriptionIcon from '@mui/icons-material/Description'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

export const menuItems = [
  {
    name: 'Categories',
    path: '/user/categories',
    icon: CategoryIcon,
  },
  {
    name: 'Entries',
    path: '/user/entries',
    icon: DescriptionIcon,
  },
  {
    name: 'Add Entry',
    path: '/user/add-entry',
    icon: NoteAddIcon,
  },
  {
    name: 'Dashboard',
    path: '/user/landing-page',
    icon: SpaceDashboardIcon,
  },
]
