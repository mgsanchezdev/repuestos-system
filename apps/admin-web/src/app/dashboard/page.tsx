'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Grid,
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
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  Search,
  Add,
  Business,
  Close as CloseIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
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
    path: '',
    isModal: true,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const theme = useTheme()
  const [openProveedorModal, setOpenProveedorModal] = useState(false)
  const [openCodigoModal, setOpenCodigoModal] = useState(false)
  const [codigoEditando, setCodigoEditando] = useState<string | null>(null)
  const [codigosProveedor, setCodigosProveedor] = useState<string[]>([])
  const [nuevoCodigo, setNuevoCodigo] = useState('')
  const [formData, setFormData] = useState({
    razonSocial: '',
    nombreFantasia: '',
    personaContacto: '',
    cuit: '',
    domicilio: '',
    telefono: '',
    sitioWeb: '',
    nombreBanco: '',
    sucursal: '',
    numeroSucursal: '',
    cbu: '',
    alias: '',
  })

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [router])

  const handleCardClick = (card: typeof cards[0]) => {
    if (card.isModal) {
      setOpenProveedorModal(true)
    } else {
      router.push(card.path)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProveedor = () => {
    // Validar campos requeridos
    if (!formData.razonSocial.trim() || !formData.cuit.trim()) {
      alert('Por favor complete los campos requeridos (Razón Social y CUIT)')
      return
    }

    // Obtener proveedores existentes de localStorage
    const proveedoresExistentes = localStorage.getItem('proveedores')
    let todosLosProveedores = []
    
    if (proveedoresExistentes) {
      try {
        todosLosProveedores = JSON.parse(proveedoresExistentes)
      } catch {
        todosLosProveedores = []
      }
    }

    // Crear nuevo proveedor con códigos
    const nuevoProveedor = {
      id: Date.now().toString(),
      ...formData,
      codigos: codigosProveedor,
    }

    // Agregar el nuevo proveedor
    todosLosProveedores.push(nuevoProveedor)

    // Guardar en localStorage
    localStorage.setItem('proveedores', JSON.stringify(todosLosProveedores))

    alert('Proveedor guardado exitosamente')

    // Limpiar formulario
    setFormData({
      razonSocial: '',
      nombreFantasia: '',
      personaContacto: '',
      cuit: '',
      domicilio: '',
      telefono: '',
      sitioWeb: '',
      nombreBanco: '',
      sucursal: '',
      numeroSucursal: '',
      cbu: '',
      alias: '',
    })
    setCodigosProveedor([])

    setOpenProveedorModal(false)
  }

  const handleCloseModal = () => {
    setOpenProveedorModal(false)
    setCodigosProveedor([])
    setFormData({
      razonSocial: '',
      nombreFantasia: '',
      personaContacto: '',
      cuit: '',
      domicilio: '',
      telefono: '',
      sitioWeb: '',
      nombreBanco: '',
      sucursal: '',
      numeroSucursal: '',
      cbu: '',
      alias: '',
    })
  }

  const handleAgregarCodigo = () => {
    if (!nuevoCodigo.trim()) {
      alert('Por favor ingrese un código')
      return
    }
    if (codigoEditando !== null) {
      // Editar código existente
      const codigosActualizados = codigosProveedor.map((codigo, index) =>
        index === parseInt(codigoEditando) ? nuevoCodigo : codigo
      )
      setCodigosProveedor(codigosActualizados)
      setCodigoEditando(null)
    } else {
      // Agregar nuevo código
      setCodigosProveedor([...codigosProveedor, nuevoCodigo])
    }
    setNuevoCodigo('')
    setOpenCodigoModal(false)
  }

  const handleEditarCodigo = (index: number) => {
    setCodigoEditando(index.toString())
    setNuevoCodigo(codigosProveedor[index])
    setOpenCodigoModal(true)
  }

  const handleBorrarCodigo = (index: number) => {
    if (confirm('¿Está seguro de que desea eliminar este código?')) {
      setCodigosProveedor(codigosProveedor.filter((_, i) => i !== index))
    }
  }

  const handleImportarCodigos = () => {
    // Simular importación desde archivo
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv,.txt,.xlsx'
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          const text = event.target.result
          // Simular parseo de archivo (en producción usaría una librería apropiada)
          const codigosImportados = text
            .split('\n')
            .map((line: string) => line.trim())
            .filter((line: string) => line.length > 0)
          setCodigosProveedor([...codigosProveedor, ...codigosImportados])
          alert(`Se importaron ${codigosImportados.length} códigos`)
        }
        reader.readAsText(file)
      }
    }
    input.click()
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

      {/* Modal Agregar Proveedor */}
      <Dialog
        open={openProveedorModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Agregar Proveedor
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            {/* Datos principales */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Razón Social / Nombre de fantasía"
                variant="outlined"
                value={formData.razonSocial}
                onChange={(e) => handleInputChange('razonSocial', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Nombre de fantasía"
                variant="outlined"
                value={formData.nombreFantasia}
                onChange={(e) => handleInputChange('nombreFantasia', e.target.value)}
              />
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                <TextField
                  fullWidth
                  label="Persona de contacto"
                  variant="outlined"
                  value={formData.personaContacto}
                  onChange={(e) => handleInputChange('personaContacto', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="CUIT"
                  variant="outlined"
                  value={formData.cuit}
                  onChange={(e) => handleInputChange('cuit', e.target.value)}
                  required
                />
              </Box>
              <TextField
                fullWidth
                label="Domicilio"
                variant="outlined"
                value={formData.domicilio}
                onChange={(e) => handleInputChange('domicilio', e.target.value)}
              />
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  variant="outlined"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Sitio Web"
                  variant="outlined"
                  value={formData.sitioWeb}
                  onChange={(e) => handleInputChange('sitioWeb', e.target.value)}
                />
              </Box>
            </Box>

            {/* Divider */}
            <Divider />

            {/* Datos Bancarios */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Datos Bancarios
              </Typography>
              <TextField
                fullWidth
                label="Nombre de Banco"
                variant="outlined"
                value={formData.nombreBanco}
                onChange={(e) => handleInputChange('nombreBanco', e.target.value)}
              />
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                <TextField
                  fullWidth
                  label="Sucursal"
                  variant="outlined"
                  value={formData.sucursal}
                  onChange={(e) => handleInputChange('sucursal', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Número de Sucursal"
                  variant="outlined"
                  value={formData.numeroSucursal}
                  onChange={(e) => handleInputChange('numeroSucursal', e.target.value)}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                <TextField
                  fullWidth
                  label="CBU"
                  variant="outlined"
                  value={formData.cbu}
                  onChange={(e) => handleInputChange('cbu', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Alias"
                  variant="outlined"
                  value={formData.alias}
                  onChange={(e) => handleInputChange('alias', e.target.value)}
                />
              </Box>
            </Box>

            {/* Divider */}
            <Divider />

            {/* Códigos de Proveedor */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  Códigos de Proveedor
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    onClick={handleImportarCodigos}
                    size="small"
                  >
                    Importar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                      setCodigoEditando(null)
                      setNuevoCodigo('')
                      setOpenCodigoModal(true)
                    }}
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    Cargar código de proveedor
                  </Button>
                </Box>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography fontWeight="bold">Código</Typography></TableCell>
                      <TableCell align="right"><Typography fontWeight="bold">Acciones</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {codigosProveedor.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                          <Typography variant="body2" color="text.secondary">
                            No hay códigos cargados. Haga clic en "Cargar código de proveedor" para agregar uno.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      codigosProveedor.map((codigo, index) => (
                        <TableRow key={index}>
                          <TableCell>{codigo}</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditarCodigo(index)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleBorrarCodigo(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleSaveProveedor}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Cargar Código de Proveedor */}
      <Dialog
        open={openCodigoModal}
        onClose={() => {
          setOpenCodigoModal(false)
          setCodigoEditando(null)
          setNuevoCodigo('')
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {codigoEditando !== null ? 'Editar Código de Proveedor' : 'Cargar Código de Proveedor'}
          <IconButton
            onClick={() => {
              setOpenCodigoModal(false)
              setCodigoEditando(null)
              setNuevoCodigo('')
            }}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Código de Proveedor"
            variant="outlined"
            value={nuevoCodigo}
            onChange={(e) => setNuevoCodigo(e.target.value)}
            placeholder="Ej: DC-789"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenCodigoModal(false)
              setCodigoEditando(null)
              setNuevoCodigo('')
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleAgregarCodigo}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {codigoEditando !== null ? 'Guardar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
