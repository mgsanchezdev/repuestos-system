'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
  Business as BusinessIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Upload as UploadIcon,
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
}

// Datos hardcodeados de ejemplo
const proveedoresEjemplo: Proveedor[] = [
  {
    id: '1',
    razonSocial: 'Distribuidora Central S.A.',
    nombreFantasia: 'Distribuidora Central',
    personaContacto: 'Juan Pérez',
    cuit: '30-12345678-9',
    domicilio: 'Av. Corrientes 1234, CABA',
    telefono: '+54 11 4321-5678',
    sitioWeb: 'https://www.distribuidoracentral.com.ar',
    nombreBanco: 'Banco Nación',
    sucursal: 'Centro',
    numeroSucursal: '001',
    cbu: '0110123412345678901234',
    alias: 'DISTRIBUIDORA.CENTRAL',
  },
  {
    id: '2',
    razonSocial: 'Repuestos SA',
    nombreFantasia: 'Repuestos SA',
    personaContacto: 'María González',
    cuit: '30-87654321-0',
    domicilio: 'Rivadavia 5678, CABA',
    telefono: '+54 11 4567-8901',
    sitioWeb: 'https://www.repuestossa.com.ar',
    nombreBanco: 'Banco Santander',
    sucursal: 'Palermo',
    numeroSucursal: '045',
    cbu: '0720123456789012345678',
    alias: 'REPUESTOS.SA',
  },
  {
    id: '3',
    razonSocial: 'AutoPartes del Sur SRL',
    nombreFantasia: 'AutoPartes',
    personaContacto: 'Carlos Rodríguez',
    cuit: '30-11223344-5',
    domicilio: 'San Martín 9012, La Plata',
    telefono: '+54 221 123-4567',
    sitioWeb: 'https://www.autopartes.com.ar',
    nombreBanco: 'Banco Galicia',
    sucursal: 'La Plata',
    numeroSucursal: '123',
    cbu: '0170123456789012345678',
    alias: 'AUTOPARTES.SUR',
  },
]

export default function BuscarProveedorPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState<Proveedor[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openCodigoModal, setOpenCodigoModal] = useState(false)
  const [codigoEditando, setCodigoEditando] = useState<number | null>(null)
  // Códigos hardcodeados de ejemplo
  const [codigosProveedor, setCodigosProveedor] = useState<string[]>([
    'DC-789',
    'DC-111',
    'DC-999',
    'RS-456',
    'RS-123',
    'AP-888',
  ])
  const [nuevoCodigo, setNuevoCodigo] = useState('')
  const [proveedorEditando, setProveedorEditando] = useState<Proveedor | null>(null)
  const [formData, setFormData] = useState<Proveedor>({
    id: '',
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
    cargarProveedores()
  }, [])

  useEffect(() => {
    filtrarProveedores()
  }, [busqueda, proveedores])

  const cargarProveedores = () => {
    const proveedoresGuardados = localStorage.getItem('proveedores')
    let todosLosProveedores: Proveedor[] = []
    
    if (proveedoresGuardados) {
      try {
        todosLosProveedores = JSON.parse(proveedoresGuardados)
      } catch {
        todosLosProveedores = []
      }
    }
    
    // Combinar datos guardados con datos hardcodeados
    const todosProveedores = [...todosLosProveedores, ...proveedoresEjemplo]
    setProveedores(todosProveedores)
  }

  const filtrarProveedores = () => {
    if (!busqueda.trim()) {
      setProveedoresFiltrados(proveedores)
      return
    }

    const busquedaLower = busqueda.toLowerCase()
    const filtrados = proveedores.filter(
      (p) =>
        p.razonSocial.toLowerCase().includes(busquedaLower) ||
        p.nombreFantasia.toLowerCase().includes(busquedaLower) ||
        p.cuit.toLowerCase().includes(busquedaLower) ||
        p.personaContacto.toLowerCase().includes(busquedaLower) ||
        p.telefono.toLowerCase().includes(busquedaLower)
    )
    setProveedoresFiltrados(filtrados)
  }

  const handleEdit = (proveedor: Proveedor) => {
    setProveedorEditando(proveedor)
    setFormData(proveedor)
    setOpenEditModal(true)
  }

  const handleInputChange = (field: keyof Proveedor, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveEdit = () => {
    if (!formData.razonSocial.trim() || !formData.cuit.trim()) {
      alert('Por favor complete los campos requeridos (Razón Social y CUIT)')
      return
    }

    const proveedoresActualizados = proveedores.map((p) =>
      p.id === formData.id ? formData : p
    )

    localStorage.setItem('proveedores', JSON.stringify(proveedoresActualizados))
    setProveedores(proveedoresActualizados)
    setOpenEditModal(false)
    setProveedorEditando(null)
    alert('Proveedor actualizado exitosamente')
  }

  const handleAgregarCodigo = () => {
    if (!nuevoCodigo.trim()) {
      alert('Por favor ingrese un código')
      return
    }
    if (codigoEditando !== null) {
      // Editar código existente
      const codigosActualizados = codigosProveedor.map((codigo, index) =>
        index === codigoEditando ? nuevoCodigo : codigo
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
    setCodigoEditando(index)
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

  const handleCloseModal = () => {
    setOpenEditModal(false)
    setProveedorEditando(null)
    setFormData({
      id: '',
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

  const proveedoresAMostrar = busqueda.trim() ? proveedoresFiltrados : proveedores

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Buscar Proveedor
      </Typography>

      {/* Campo de búsqueda */}
      <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SearchIcon sx={{ fontSize: 32, color: '#667eea', mr: 2 }} />
          <Typography variant="h6" fontWeight={600}>
            Buscar Proveedor
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="Buscar por razón social, nombre de fantasía, CUIT, contacto o teléfono"
          variant="outlined"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Ej: Distribuidora Central"
        />
        {busqueda.trim() && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {proveedoresFiltrados.length} resultado(s) encontrado(s)
          </Typography>
        )}
      </Paper>

      {proveedoresAMostrar.length === 0 ? (
        <Paper sx={{ p: 4, mt: 3, textAlign: 'center' }}>
          <BusinessIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No hay proveedores registrados
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Agrega un proveedor desde el dashboard principal
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {proveedoresAMostrar.map((proveedor) => (
            <Card key={proveedor.id} sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {proveedor.razonSocial}
                    </Typography>
                    {proveedor.nombreFantasia && (
                      <Typography variant="body1" color="text.secondary" gutterBottom>
                        Nombre de fantasía: {proveedor.nombreFantasia}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(proveedor)}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    Editar
                  </Button>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {proveedor.personaContacto && (
                      <Typography variant="body2">
                        <strong>Persona de contacto:</strong> {proveedor.personaContacto}
                      </Typography>
                    )}
                    {proveedor.cuit && (
                      <Typography variant="body2">
                        <strong>CUIT:</strong> {proveedor.cuit}
                      </Typography>
                    )}
                    {proveedor.telefono && (
                      <Typography variant="body2">
                        <strong>Teléfono:</strong> {proveedor.telefono}
                      </Typography>
                    )}
                  </Box>
                  {proveedor.domicilio && (
                    <Typography variant="body2">
                      <strong>Domicilio:</strong> {proveedor.domicilio}
                    </Typography>
                  )}
                  {proveedor.sitioWeb && (
                    <Typography variant="body2">
                      <strong>Sitio Web:</strong>{' '}
                      <a href={proveedor.sitioWeb} target="_blank" rel="noopener noreferrer">
                        {proveedor.sitioWeb}
                      </a>
                    </Typography>
                  )}

                  {(proveedor.nombreBanco ||
                    proveedor.sucursal ||
                    proveedor.numeroSucursal ||
                    proveedor.cbu ||
                    proveedor.alias) && (
                    <>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                        Datos Bancarios
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {proveedor.nombreBanco && (
                          <Typography variant="body2">
                            <strong>Banco:</strong> {proveedor.nombreBanco}
                          </Typography>
                        )}
                        {(proveedor.sucursal || proveedor.numeroSucursal) && (
                          <Typography variant="body2">
                            <strong>Sucursal:</strong> {proveedor.sucursal}
                            {proveedor.numeroSucursal && ` - N° ${proveedor.numeroSucursal}`}
                          </Typography>
                        )}
                        {proveedor.cbu && (
                          <Typography variant="body2">
                            <strong>CBU:</strong> {proveedor.cbu}
                          </Typography>
                        )}
                        {proveedor.alias && (
                          <Typography variant="body2">
                            <strong>Alias:</strong> {proveedor.alias}
                          </Typography>
                        )}
                      </Box>
                    </>
                  )}

                  {/* Códigos de Proveedor */}
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                    Códigos de Proveedor
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {proveedor.razonSocial === 'Distribuidora Central S.A.' && (
                      <>
                        <Typography variant="body2" sx={{ px: 1.5, py: 0.5, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                          DC-789
                        </Typography>
                        <Typography variant="body2" sx={{ px: 1.5, py: 0.5, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                          DC-111
                        </Typography>
                        <Typography variant="body2" sx={{ px: 1.5, py: 0.5, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                          DC-999
                        </Typography>
                      </>
                    )}
                    {proveedor.razonSocial === 'Repuestos SA' && (
                      <>
                        <Typography variant="body2" sx={{ px: 1.5, py: 0.5, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                          RS-456
                        </Typography>
                        <Typography variant="body2" sx={{ px: 1.5, py: 0.5, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                          RS-123
                        </Typography>
                      </>
                    )}
                    {proveedor.razonSocial === 'AutoPartes del Sur SRL' && (
                      <Typography variant="body2" sx={{ px: 1.5, py: 0.5, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                        AP-888
                      </Typography>
                    )}
                    {/* Mostrar códigos desde localStorage si existen */}
                    {(proveedor as any).codigos && Array.isArray((proveedor as any).codigos) && (
                      <>
                        {(proveedor as any).codigos.map((codigo: string, index: number) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{ px: 1.5, py: 0.5, bgcolor: '#e3f2fd', borderRadius: 1 }}
                          >
                            {codigo}
                          </Typography>
                        ))}
                      </>
                    )}
                    {(!(proveedor as any).codigos || 
                      ((proveedor as any).codigos && Array.isArray((proveedor as any).codigos) && (proveedor as any).codigos.length === 0)) &&
                      proveedor.razonSocial !== 'Distribuidora Central S.A.' &&
                      proveedor.razonSocial !== 'Repuestos SA' &&
                      proveedor.razonSocial !== 'AutoPartes del Sur SRL' && (
                        <Typography variant="body2" color="text.secondary">
                          No hay códigos registrados
                        </Typography>
                      )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Modal Editar Proveedor */}
      <Dialog
        open={openEditModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Editar Proveedor
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
            onClick={handleSaveEdit}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Guardar Cambios
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
