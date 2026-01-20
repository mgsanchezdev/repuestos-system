'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material'

interface Proveedor {
  id: string
  razonSocial: string
  nombreFantasia: string
  personaContacto: string
  cuit: string
  domicilio: string
  telefono: string
  sitioWeb: string
  nombreBanco: string
  sucursal: string
  numeroSucursal: string
  cbu: string
  alias: string
  codigosProveedor: string[]
}

export default function AgregarProveedorPage() {
  const router = useRouter()
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

  const handleInputChange = (field: keyof typeof formData, value: string) => {
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
    let todosLosProveedores: Proveedor[] = []
    
    if (proveedoresExistentes) {
      try {
        todosLosProveedores = JSON.parse(proveedoresExistentes)
      } catch {
        todosLosProveedores = []
      }
    }

    // Crear nuevo proveedor
    const nuevoProveedor: Proveedor = {
      id: Date.now().toString(),
      ...formData,
      codigosProveedor: codigosProveedor,
    }

    // Agregar el nuevo proveedor
    todosLosProveedores.push(nuevoProveedor)

    // Guardar en localStorage
    localStorage.setItem('proveedores', JSON.stringify(todosLosProveedores))

    alert('Proveedor guardado exitosamente')

    // Limpiar formulario y redirigir
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
    router.push('/dashboard/buscar-proveedor')
  }

  const handleCancel = () => {
    router.push('/dashboard')
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
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton
          onClick={handleCancel}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Agregar Proveedor
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Datos principales */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
              Datos del Proveedor
            </Typography>
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
                  startIcon={<CloudUploadIcon />}
                  onClick={handleImportarCodigos}
                  size="small"
                >
                  Importar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
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
                          No hay códigos cargados. Haga clic en &quot;Cargar código de proveedor&quot; para agregar uno.
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

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={handleCancel} variant="outlined" size="large">
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProveedor}
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Guardar Proveedor
            </Button>
          </Box>
        </Box>
      </Paper>

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
