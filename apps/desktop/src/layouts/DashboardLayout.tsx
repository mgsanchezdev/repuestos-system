import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Search,
  Add,
  Logout,
  Home,
  Business,
  PersonAdd,
} from '@mui/icons-material'

const drawerWidth = 280

const menuItems = [
  { text: 'Inicio', icon: <Home />, path: '/dashboard' },
  { text: 'Buscar repuesto', icon: <Search />, path: '/dashboard/buscar' },
  { text: 'Agregar repuesto', icon: <Add />, path: '/dashboard/agregar' },
  { text: 'Buscar proveedor', icon: <Business />, path: '/dashboard/buscar-proveedor' },
  { text: 'Agregar proveedor', icon: <PersonAdd />, path: '/dashboard/agregar-proveedor' },
]

export default function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(true)

  useEffect(() => {
    // Verificar autenticación
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [navigate])

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setDesktopOpen(!desktopOpen)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    navigate('/')
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          minHeight: '64px !important',
        }}
      >
        <Box sx={{ width: 64 }} /> {/* Espacio para el icono fijo */}
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/dashboard')}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  borderLeft: '4px solid #667eea',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.15)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.05)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? '#667eea' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Icono fijo siempre visible */}
      <IconButton
        color="inherit"
        aria-label="toggle drawer"
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: theme.zIndex.drawer + 2,
          height: '64px',
          width: '64px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 0,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <AppBar
        position="fixed"
        sx={{
          width: { md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { md: desktopOpen ? `${drawerWidth}px` : 0 },
          pl: '64px', // Espacio para el icono fijo
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => handleNavigation('/dashboard')}
          >
            Fulltronik
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ 
          width: { md: desktopOpen ? drawerWidth : 0 }, 
          flexShrink: { md: 0 },
          overflow: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          open={desktopOpen}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: desktopOpen ? drawerWidth : 0,
              overflow: 'hidden',
              transition: theme.transitions.create(['width', 'box-shadow', 'border'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              ...(!desktopOpen && {
                boxShadow: 'none !important',
                borderRight: 'none !important',
                border: 'none !important',
              }),
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
          mt: '64px',
          background: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
