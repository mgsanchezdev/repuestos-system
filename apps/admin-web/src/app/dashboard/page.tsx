'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  MenuItem,
} from '@mui/material'
import {
  Search,
  Add,
  Business,
  Search as SearchIcon,
  PersonAdd,
  Close as CloseIcon,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const cards = [
  {
    title: 'Buscar repuesto',
    description: 'Busca repuestos en el catálogo',
    icon: <Search sx={{ fontSize: 60 }} />,
    color: '#764ba2',
    path: '/dashboard/buscar',
    isModal: false,
  },
  {
    title: 'Agregar repuesto',
    description: 'Agrega nuevos repuestos al sistema',
    icon: <Add sx={{ fontSize: 60 }} />,
    color: '#ec4899',
    path: '/dashboard/agregar',
    isModal: false,
  },
  {
    title: 'Buscar proveedor',
    description: 'Busca y gestiona proveedores',
    icon: <SearchIcon sx={{ fontSize: 60 }} />,
    color: '#3b82f6',
    path: '/dashboard/buscar-proveedor',
    isModal: false,
  },
  {
    title: 'Agregar proveedor',
    description: 'Agrega nuevos proveedores al sistema',
    icon: <Business sx={{ fontSize: 60 }} />,
    color: '#10b981',
    path: '/dashboard/agregar-proveedor',
    isModal: false,
  },
  {
    title: 'Alta de cliente',
    description: 'Registra nuevos clientes en el sistema',
    icon: <PersonAdd sx={{ fontSize: 60 }} />,
    color: '#f59e0b',
    path: '',
    isModal: true,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const theme = useTheme()
  const [openClienteModal, setOpenClienteModal] = useState(false)
  const [clienteFormData, setClienteFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    cuit: '',
    domicilio: '',
    provincia: '',
    ciudad: '',
    tipoIVA: '',
  })

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [router])

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.isModal) {
      setOpenClienteModal(true)
    } else {
      router.push(card.path)
    }
  }

  const handleInputChange = (field: keyof typeof clienteFormData, value: string) => {
    setClienteFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCloseClienteModal = () => {
    setOpenClienteModal(false)
    setClienteFormData({
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      cuit: '',
      domicilio: '',
      provincia: '',
      ciudad: '',
      tipoIVA: '',
    })
  }

  const handleSaveCliente = () => {
    // Validar campos requeridos
    if (!clienteFormData.nombre.trim() || !clienteFormData.apellido.trim()) {
      alert('Por favor complete los campos requeridos (Nombre y Apellido)')
      return
    }

    // Obtener clientes existentes de localStorage
    const clientesExistentes = localStorage.getItem('clientes')
    let todosLosClientes: any[] = []
    
    if (clientesExistentes) {
      try {
        todosLosClientes = JSON.parse(clientesExistentes)
      } catch {
        todosLosClientes = []
      }
    }

    // Crear nuevo cliente
    const nuevoCliente = {
      id: Date.now().toString(),
      ...clienteFormData,
      fechaCreacion: new Date().toISOString(),
    }

    // Agregar el nuevo cliente
    todosLosClientes.push(nuevoCliente)

    // Guardar en localStorage
    localStorage.setItem('clientes', JSON.stringify(todosLosClientes))

    alert('Cliente registrado exitosamente')
    handleCloseClienteModal()
  }

  const tiposIVA = [
    'Responsable Inscripto',
    'Monotributista',
    'Exento',
    'Consumidor Final',
    'No Responsable',
  ]

  const provincias = [
    'Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán',
  ]

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

      {/* Modal Alta de Cliente */}
      <Dialog
        open={openClienteModal}
        onClose={handleCloseClienteModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Alta de Cliente
          <IconButton
            onClick={handleCloseClienteModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  value={clienteFormData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Apellido"
                  variant="outlined"
                  value={clienteFormData.apellido}
                  onChange={(e) => handleInputChange('apellido', e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Dirección"
                  variant="outlined"
                  value={clienteFormData.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label="Domicilio"
                  variant="outlined"
                  value={clienteFormData.domicilio}
                  onChange={(e) => handleInputChange('domicilio', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  variant="outlined"
                  value={clienteFormData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  type="tel"
                />
                <TextField
                  fullWidth
                  label="CUIT"
                  variant="outlined"
                  value={clienteFormData.cuit}
                  onChange={(e) => handleInputChange('cuit', e.target.value)}
                  placeholder="XX-XXXXXXXX-X"
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  select
                  label="Provincia"
                  variant="outlined"
                  value={clienteFormData.provincia}
                  onChange={(e) => handleInputChange('provincia', e.target.value)}
                >
                  {provincias.map((provincia) => (
                    <MenuItem key={provincia} value={provincia}>
                      {provincia}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Ciudad"
                  variant="outlined"
                  value={clienteFormData.ciudad}
                  onChange={(e) => handleInputChange('ciudad', e.target.value)}
                />
                <TextField
                  fullWidth
                  select
                  label="Tipo de IVA"
                  variant="outlined"
                  value={clienteFormData.tipoIVA}
                  onChange={(e) => handleInputChange('tipoIVA', e.target.value)}
                >
                  {tiposIVA.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseClienteModal} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleSaveCliente}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #f59e0bdd 100%)',
            }}
          >
            Guardar Cliente
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
