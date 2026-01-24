import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  useTheme,
} from '@mui/material'
import {
  Search,
  Add,
  Business,
  Search as SearchIcon,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const cards = [
  {
    title: 'Buscar repuesto',
    description: 'Busca repuestos en el catálogo',
    icon: <Search sx={{ fontSize: 60 }} />,
    color: '#764ba2',
    path: '/dashboard/buscar',
  },
  {
    title: 'Agregar repuesto',
    description: 'Agrega nuevos repuestos al sistema',
    icon: <Add sx={{ fontSize: 60 }} />,
    color: '#ec4899',
    path: '/dashboard/agregar',
  },
  {
    title: 'Buscar proveedor',
    description: 'Busca y gestiona proveedores',
    icon: <SearchIcon sx={{ fontSize: 60 }} />,
    color: '#3b82f6',
    path: '/dashboard/buscar-proveedor',
  },
  {
    title: 'Agregar proveedor',
    description: 'Agrega nuevos proveedores al sistema',
    icon: <Business sx={{ fontSize: 60 }} />,
    color: '#10b981',
    path: '/dashboard/agregar-proveedor',
  },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [navigate])

  const handleCardClick = (card: typeof cards[0]) => {
    navigate(card.path)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        width: '100%',
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            style={{ width: '280px', minWidth: '280px', maxWidth: '280px' }}
          >
            <Card
              sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                },
              }}
              onClick={() => handleCardClick(card)}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  pt: 4,
                  px: 3,
                  pb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    mb: 3,
                    boxShadow: `0 8px 20px ${card.color}40`,
                  }}
                >
                  {card.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom 
                  fontWeight={600}
                  sx={{ 
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    lineHeight: 1.3,
                    mb: 1,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    px: 1,
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}dd 100%)`,
                    px: 4,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${card.color}dd 0%, ${card.color} 100%)`,
                    },
                  }}
                >
                  Acceder
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  )
}
