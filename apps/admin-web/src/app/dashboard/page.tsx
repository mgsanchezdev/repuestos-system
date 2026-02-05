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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  Search,
  Add,
  Business,
  Search as SearchIcon,
  PersonAdd,
  Close as CloseIcon,
  Person as PersonIcon,
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
    modalType: 'alta',
  },
  {
    title: 'Consultar clientes',
    description: 'Busca y consulta clientes registrados',
    icon: <PersonIcon sx={{ fontSize: 60 }} />,
    color: '#8b5cf6',
    path: '',
    isModal: true,
    modalType: 'buscar',
  },
]

interface Cliente {
  id: string
  nombre: string
  apellido: string
  direccion: string
  telefono: string
  cuit: string
  domicilio: string
  provincia: string
  ciudad: string
  tipoIVA: string
  fechaCreacion?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const theme = useTheme()
  const [openClienteModal, setOpenClienteModal] = useState(false)
  const [openBuscarClienteModal, setOpenBuscarClienteModal] = useState(false)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([])
  const [filtrosBusqueda, setFiltrosBusqueda] = useState({
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
    cargarClientes()
  }, [router])

  useEffect(() => {
    filtrarClientes()
  }, [filtrosBusqueda, clientes])

  const cargarClientes = () => {
    const clientesGuardados = localStorage.getItem('clientes')
    let todosLosClientes: Cliente[] = []
    
    if (clientesGuardados) {
      try {
        todosLosClientes = JSON.parse(clientesGuardados)
      } catch {
        todosLosClientes = []
      }
    }
    
    setClientes(todosLosClientes)
  }

  const filtrarClientes = () => {
    const filtros = Object.entries(filtrosBusqueda).filter(([_, value]) => value.trim() !== '')
    
    if (filtros.length === 0) {
      setClientesFiltrados(clientes)
      return
    }

    const filtrados = clientes.filter((cliente) => {
      return filtros.every(([key, value]) => {
        const clienteValue = cliente[key as keyof Cliente]?.toString().toLowerCase() || ''
        return clienteValue.includes(value.toLowerCase())
      })
    })
    
    setClientesFiltrados(filtrados)
  }

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.isModal) {
      if ((card as any).modalType === 'buscar') {
        setOpenBuscarClienteModal(true)
        cargarClientes()
      } else {
        setOpenClienteModal(true)
      }
    } else {
      router.push(card.path)
    }
  }

  const handleFiltroChange = (field: keyof typeof filtrosBusqueda, value: string) => {
    setFiltrosBusqueda((prev) => ({ ...prev, [field]: value }))
  }

  const handleCloseBuscarModal = () => {
    setOpenBuscarClienteModal(false)
    setFiltrosBusqueda({
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
    cargarClientes()
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

      {/* Modal Consultar Clientes */}
      <Dialog
        open={openBuscarClienteModal}
        onClose={handleCloseBuscarModal}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Consultar Clientes
          <IconButton
            onClick={handleCloseBuscarModal}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Filtros de búsqueda */}
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SearchIcon sx={{ fontSize: 20, color: '#8b5cf6', mr: 1 }} />
                <Typography variant="subtitle1" fontWeight={600}>
                  Filtros de Búsqueda
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    variant="outlined"
                    size="small"
                    value={filtrosBusqueda.nombre}
                    onChange={(e) => handleFiltroChange('nombre', e.target.value)}
                    placeholder="Buscar por nombre"
                  />
                  <TextField
                    fullWidth
                    label="Apellido"
                    variant="outlined"
                    size="small"
                    value={filtrosBusqueda.apellido}
                    onChange={(e) => handleFiltroChange('apellido', e.target.value)}
                    placeholder="Buscar por apellido"
                  />
                  <TextField
                    fullWidth
                    label="CUIT"
                    variant="outlined"
                    size="small"
                    value={filtrosBusqueda.cuit}
                    onChange={(e) => handleFiltroChange('cuit', e.target.value)}
                    placeholder="Buscar por CUIT"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    variant="outlined"
                    size="small"
                    value={filtrosBusqueda.telefono}
                    onChange={(e) => handleFiltroChange('telefono', e.target.value)}
                    placeholder="Buscar por teléfono"
                  />
                  <TextField
                    fullWidth
                    select
                    label="Provincia"
                    variant="outlined"
                    size="small"
                    value={filtrosBusqueda.provincia}
                    onChange={(e) => handleFiltroChange('provincia', e.target.value)}
                  >
                    <MenuItem value="">Todas</MenuItem>
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
                    size="small"
                    value={filtrosBusqueda.ciudad}
                    onChange={(e) => handleFiltroChange('ciudad', e.target.value)}
                    placeholder="Buscar por ciudad"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    variant="outlined"
                    size="small"
                    value={filtrosBusqueda.direccion}
                    onChange={(e) => handleFiltroChange('direccion', e.target.value)}
                    placeholder="Buscar por dirección"
                  />
                  <TextField
                    fullWidth
                    label="Domicilio"
                    variant="outlined"
                    size="small"
                    value={filtrosBusqueda.domicilio}
                    onChange={(e) => handleFiltroChange('domicilio', e.target.value)}
                    placeholder="Buscar por domicilio"
                  />
                  <TextField
                    fullWidth
                    select
                    label="Tipo de IVA"
                    variant="outlined"
                    size="small"
                    value={filtrosBusqueda.tipoIVA}
                    onChange={(e) => handleFiltroChange('tipoIVA', e.target.value)}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {tiposIVA.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              {Object.values(filtrosBusqueda).some((f) => f.trim() !== '') && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {clientesFiltrados.length} cliente(s) encontrado(s)
                </Typography>
              )}
            </Paper>

            {/* Tabla de resultados */}
            {clientes.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No hay clientes registrados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Agrega un cliente desde el dashboard principal
                </Typography>
              </Paper>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Nombre</strong></TableCell>
                      <TableCell><strong>Apellido</strong></TableCell>
                      <TableCell><strong>CUIT</strong></TableCell>
                      <TableCell><strong>Teléfono</strong></TableCell>
                      <TableCell><strong>Provincia</strong></TableCell>
                      <TableCell><strong>Ciudad</strong></TableCell>
                      <TableCell><strong>Tipo IVA</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientesFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                            No se encontraron clientes con los filtros aplicados
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      clientesFiltrados.map((cliente) => (
                        <TableRow key={cliente.id} hover>
                          <TableCell>{cliente.nombre}</TableCell>
                          <TableCell>{cliente.apellido}</TableCell>
                          <TableCell>{cliente.cuit || '-'}</TableCell>
                          <TableCell>{cliente.telefono || '-'}</TableCell>
                          <TableCell>{cliente.provincia || '-'}</TableCell>
                          <TableCell>{cliente.ciudad || '-'}</TableCell>
                          <TableCell>{cliente.tipoIVA || '-'}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseBuscarModal} variant="outlined">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
