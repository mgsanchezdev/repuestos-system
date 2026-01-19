'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Checkbox,
} from '@mui/material'
import {
  Add as AddIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'

export default function AgregarPage() {
  const [openMarcaModal, setOpenMarcaModal] = useState(false)
  const [openOemModal, setOpenOemModal] = useState(false)
  const [openReemplazosModal, setOpenReemplazosModal] = useState(false)
  const [openComplementariosModal, setOpenComplementariosModal] = useState(false)
  const [openMotorizacionModal, setOpenMotorizacionModal] = useState(false)
  const [selectedComplementarios, setSelectedComplementarios] = useState<number[]>([])
  const [selectedReemplazos, setSelectedReemplazos] = useState<number[]>([])
  
  // Estados para el formulario
  const [nombreProducto, setNombreProducto] = useState('')
  const [fotos, setFotos] = useState<string[]>([])
  const [marcasModelos, setMarcasModelos] = useState<{ marca: string; modelo: string }[]>([])
  const [motorizaciones, setMotorizaciones] = useState<{ nombre: string; cilindrada: string }[]>([])
  const [codigosOem, setCodigosOem] = useState<{
    fabricante: string
    codigoFabricante: string
    proveedor: string
    codigoProveedor: string
    precioCosto: number
    precioVenta: number
    stock: number
    ubicacion: string
  }[]>([])
  const [reemplazos, setReemplazos] = useState<{
    fabricante: string
    codigoFabricante: string
    proveedor: string
    codigoProveedor: string
    precioCosto: number
    precioVenta: number
    stock: number
    ubicacion: string
  }[]>([])
  const [productosComplementarios, setProductosComplementarios] = useState<{
    fabricante: string
    codigoFabricante: string
    proveedor: string
    codigoProveedor: string
    precioCosto: number
    precioVenta: number
    stock: number
    ubicacion: string
  }[]>([])

  // Lista de productos disponibles para seleccionar como reemplazos
  const productosDisponiblesReemplazos = [
    {
      fabricante: 'Toyota',
      codigoFabricante: 'TOY-44444',
      proveedor: 'Distribuidora Central',
      codigoProveedor: 'DC-444',
      precioCosto: 13000,
      precioVenta: 21000,
      stock: 18,
      ubicacion: 'D-01',
    },
    {
      fabricante: 'Honda',
      codigoFabricante: 'HON-55555',
      proveedor: 'Repuestos SA',
      codigoProveedor: 'RS-555',
      precioCosto: 15000,
      precioVenta: 23000,
      stock: 14,
      ubicacion: 'D-02',
    },
    {
      fabricante: 'Ford',
      codigoFabricante: 'FOR-66666',
      proveedor: 'Distribuidora Central',
      codigoProveedor: 'DC-666',
      precioCosto: 17000,
      precioVenta: 27000,
      stock: 11,
      ubicacion: 'D-03',
    },
  ]

  // Lista de productos disponibles para seleccionar como complementarios
  const productosDisponibles = [
    {
      fabricante: 'Toyota',
      codigoFabricante: 'TOY-11111',
      proveedor: 'Distribuidora Central',
      codigoProveedor: 'DC-111',
      precioCosto: 12000,
      precioVenta: 20000,
      stock: 20,
      ubicacion: 'C-01',
    },
    {
      fabricante: 'Honda',
      codigoFabricante: 'HON-22222',
      proveedor: 'Repuestos SA',
      codigoProveedor: 'RS-222',
      precioCosto: 14000,
      precioVenta: 22000,
      stock: 12,
      ubicacion: 'C-02',
    },
    {
      fabricante: 'Ford',
      codigoFabricante: 'FOR-33333',
      proveedor: 'Distribuidora Central',
      codigoProveedor: 'DC-333',
      precioCosto: 16000,
      precioVenta: 26000,
      stock: 10,
      ubicacion: 'C-03',
    },
  ]

  const handleToggleComplementario = (index: number) => {
    setSelectedComplementarios((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleSelectAllComplementarios = () => {
    if (selectedComplementarios.length === productosDisponibles.length) {
      setSelectedComplementarios([])
    } else {
      setSelectedComplementarios(productosDisponibles.map((_, index) => index))
    }
  }

  const handleToggleReemplazo = (index: number) => {
    setSelectedReemplazos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleSelectAllReemplazos = () => {
    if (selectedReemplazos.length === productosDisponiblesReemplazos.length) {
      setSelectedReemplazos([])
    } else {
      setSelectedReemplazos(productosDisponiblesReemplazos.map((_, index) => index))
    }
  }

  // Inicializar con datos de ejemplo
  useEffect(() => {
    setMarcasModelos([
      { marca: 'Toyota', modelo: 'Corolla' },
      { marca: 'Toyota', modelo: 'Camry' },
      { marca: 'Honda', modelo: 'Civic' },
      { marca: 'Honda', modelo: 'Accord' },
      { marca: 'Ford', modelo: 'Focus' },
    ])
    setMotorizaciones([
      { nombre: '1.6 16V', cilindrada: '1600cc' },
      { nombre: '1.8 16V', cilindrada: '1800cc' },
      { nombre: '2.0 16V', cilindrada: '2000cc' },
    ])
    setCodigosOem([
      {
        fabricante: 'Toyota',
        codigoFabricante: 'TOY-12345',
        proveedor: 'Distribuidora Central',
        codigoProveedor: 'DC-789',
        precioCosto: 15000,
        precioVenta: 25000,
        stock: 15,
        ubicacion: 'A-12',
      },
      {
        fabricante: 'Honda',
        codigoFabricante: 'HON-67890',
        proveedor: 'Repuestos SA',
        codigoProveedor: 'RS-456',
        precioCosto: 18000,
        precioVenta: 30000,
        stock: 8,
        ubicacion: 'B-05',
      },
    ])
    setProductosComplementarios([
      {
        fabricante: 'Toyota',
        codigoFabricante: 'TOY-12345',
        proveedor: 'Distribuidora Central',
        codigoProveedor: 'DC-789',
        precioCosto: 15000,
        precioVenta: 25000,
        stock: 15,
        ubicacion: 'A-12',
      },
      {
        fabricante: 'Honda',
        codigoFabricante: 'HON-67890',
        proveedor: 'Repuestos SA',
        codigoProveedor: 'RS-456',
        precioCosto: 18000,
        precioVenta: 30000,
        stock: 8,
        ubicacion: 'B-05',
      },
    ])
  }, [])

  const handleSave = () => {
    if (!nombreProducto.trim()) {
      alert('Por favor ingrese el nombre del producto')
      return
    }

    const nuevoRepuesto = {
      id: Date.now().toString(),
      nombre: nombreProducto,
      fotos: fotos,
      marcas: marcasModelos,
      motorizaciones: motorizaciones,
      codigosOem: codigosOem,
      reemplazos: reemplazos,
      productosComplementarios: productosComplementarios,
    }

    // Obtener repuestos existentes de localStorage
    const repuestosExistentes = localStorage.getItem('repuestos')
    let todosLosRepuestos = []
    
    if (repuestosExistentes) {
      try {
        todosLosRepuestos = JSON.parse(repuestosExistentes)
      } catch {
        todosLosRepuestos = []
      }
    }

    // Agregar el nuevo repuesto
    todosLosRepuestos.push(nuevoRepuesto)

    // Guardar en localStorage
    localStorage.setItem('repuestos', JSON.stringify(todosLosRepuestos))

    alert('Repuesto guardado exitosamente')
    
    // Limpiar el formulario
    setNombreProducto('')
    setFotos([])
    setMarcasModelos([])
    setMotorizaciones([])
    setCodigosOem([])
    setReemplazos([])
    setProductosComplementarios([])
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Carga de Repuestos
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Producto */}
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Producto:
            </Typography>
            <TextField
              fullWidth
              label="Nombre del producto"
              variant="outlined"
              placeholder="Ej: Filtro de aire"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
            />
          </Box>

          {/* FOTOS del producto */}
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Fotos del producto
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Subir imágenes
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files
                  if (files) {
                    const fileNames = Array.from(files).map((file) => file.name)
                    setFotos((prev) => [...prev, ...fileNames])
                  }
                }}
              />
            </Button>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {fotos.map((foto, index) => (
                <Chip
                  key={index}
                  label={foto}
                  onDelete={() => {
                    setFotos((prev) => prev.filter((_, i) => i !== index))
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Marca del auto */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Marca del auto:
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenMarcaModal(true)}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Agregar Marca/Modelo
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Marca</strong></TableCell>
                    <TableCell><strong>Modelo compatibles</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marcasModelos.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.marca}</TableCell>
                      <TableCell>{item.modelo}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary" onClick={() => console.log('Editar', index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => console.log('Borrar', index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Motorización */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Motorización
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenMotorizacionModal(true)}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Agregar Motorización
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Nombre</strong></TableCell>
                    <TableCell><strong>Cilindrada</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {motorizaciones.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.nombre}</TableCell>
                      <TableCell>{item.cilindrada}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary" onClick={() => console.log('Editar', index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => console.log('Borrar', index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Código OEM */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Código OEM (Código original de la pieza):
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenOemModal(true)}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Agregar Código OEM
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Fabricante</strong></TableCell>
                    <TableCell><strong>Código Fabricante</strong></TableCell>
                    <TableCell><strong>Proveedor</strong></TableCell>
                    <TableCell><strong>Código Proveedor</strong></TableCell>
                    <TableCell><strong>Precio Costo</strong></TableCell>
                    <TableCell><strong>Precio Venta</strong></TableCell>
                    <TableCell><strong>Stock</strong></TableCell>
                    <TableCell><strong>Ubicación</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {codigosOem.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.fabricante}</TableCell>
                      <TableCell>{item.codigoFabricante}</TableCell>
                      <TableCell>{item.proveedor}</TableCell>
                      <TableCell>{item.codigoProveedor}</TableCell>
                      <TableCell>${item.precioCosto.toLocaleString()}</TableCell>
                      <TableCell>${item.precioVenta.toLocaleString()}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.ubicacion}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary" onClick={() => console.log('Editar', index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => console.log('Borrar', index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Reemplazos */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Reemplazos:
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenReemplazosModal(true)}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Agregar Reemplazo
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Fabricante</strong></TableCell>
                    <TableCell><strong>Código Fabricante</strong></TableCell>
                    <TableCell><strong>Proveedor</strong></TableCell>
                    <TableCell><strong>Código Proveedor</strong></TableCell>
                    <TableCell><strong>Precio Costo</strong></TableCell>
                    <TableCell><strong>Precio Venta</strong></TableCell>
                    <TableCell><strong>Stock</strong></TableCell>
                    <TableCell><strong>Ubicación</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {codigosOem.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.fabricante}</TableCell>
                      <TableCell>{item.codigoFabricante}</TableCell>
                      <TableCell>{item.proveedor}</TableCell>
                      <TableCell>{item.codigoProveedor}</TableCell>
                      <TableCell>${item.precioCosto.toLocaleString()}</TableCell>
                      <TableCell>${item.precioVenta.toLocaleString()}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.ubicacion}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="error" onClick={() => console.log('Borrar', index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Productos complementarios */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Productos complementarios
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenComplementariosModal(true)}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Agregar Producto complementario
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Fabricante</strong></TableCell>
                    <TableCell><strong>Código Fabricante</strong></TableCell>
                    <TableCell><strong>Proveedor</strong></TableCell>
                    <TableCell><strong>Código Proveedor</strong></TableCell>
                    <TableCell><strong>Precio Costo</strong></TableCell>
                    <TableCell><strong>Precio Venta</strong></TableCell>
                    <TableCell><strong>Stock</strong></TableCell>
                    <TableCell><strong>Ubicación</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productosComplementarios.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.fabricante}</TableCell>
                      <TableCell>{item.codigoFabricante}</TableCell>
                      <TableCell>{item.proveedor}</TableCell>
                      <TableCell>{item.codigoProveedor}</TableCell>
                      <TableCell>${item.precioCosto.toLocaleString()}</TableCell>
                      <TableCell>${item.precioVenta.toLocaleString()}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.ubicacion}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="error" onClick={() => console.log('Borrar', index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Botón Guardar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              sx={{
                px: 6,
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                },
              }}
            >
              GUARDAR
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Modal Marca/Modelo */}
      <Dialog
        open={openMarcaModal}
        onClose={() => setOpenMarcaModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Agregar Marca y Modelo Compatible
          <IconButton
            onClick={() => setOpenMarcaModal(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField fullWidth label="Marca" variant="outlined" />
              <TextField fullWidth label="Modelo" variant="outlined" />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMarcaModal(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => setOpenMarcaModal(false)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Código OEM */}
      <Dialog
        open={openOemModal}
        onClose={() => setOpenOemModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Agregar Código OEM
          <IconButton
            onClick={() => setOpenOemModal(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField fullWidth label="Fabricante" variant="outlined" />
              <TextField fullWidth label="Código Fabricante" variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField fullWidth label="Proveedor" variant="outlined" />
              <TextField fullWidth label="Código Proveedor" variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField fullWidth label="Precio Costo" type="number" variant="outlined" />
              <TextField fullWidth label="Precio Venta" type="number" variant="outlined" />
              <TextField fullWidth label="Stock" type="number" variant="outlined" />
              <TextField fullWidth label="Ubicación" variant="outlined" />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOemModal(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => setOpenOemModal(false)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Reemplazos */}
      <Dialog
        open={openReemplazosModal}
        onClose={() => {
          setOpenReemplazosModal(false)
          setSelectedReemplazos([])
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Agregar Reemplazo
          <IconButton
            onClick={() => {
              setOpenReemplazosModal(false)
              setSelectedReemplazos([])
            }}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedReemplazos.length > 0 &&
                        selectedReemplazos.length < productosDisponiblesReemplazos.length
                      }
                      checked={
                        productosDisponiblesReemplazos.length > 0 &&
                        selectedReemplazos.length === productosDisponiblesReemplazos.length
                      }
                      onChange={handleSelectAllReemplazos}
                    />
                  </TableCell>
                  <TableCell><strong>Fabricante</strong></TableCell>
                  <TableCell><strong>Código Fabricante</strong></TableCell>
                  <TableCell><strong>Proveedor</strong></TableCell>
                  <TableCell><strong>Código Proveedor</strong></TableCell>
                  <TableCell><strong>Precio Costo</strong></TableCell>
                  <TableCell><strong>Precio Venta</strong></TableCell>
                  <TableCell><strong>Stock</strong></TableCell>
                  <TableCell><strong>Ubicación</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosDisponiblesReemplazos.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedReemplazos.includes(index)}
                        onChange={() => handleToggleReemplazo(index)}
                      />
                    </TableCell>
                    <TableCell>{item.fabricante}</TableCell>
                    <TableCell>{item.codigoFabricante}</TableCell>
                    <TableCell>{item.proveedor}</TableCell>
                    <TableCell>{item.codigoProveedor}</TableCell>
                    <TableCell>${item.precioCosto.toLocaleString()}</TableCell>
                    <TableCell>${item.precioVenta.toLocaleString()}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.ubicacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenReemplazosModal(false)
              setSelectedReemplazos([])
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log('Reemplazos seleccionados:', selectedReemplazos)
              setOpenReemplazosModal(false)
              setSelectedReemplazos([])
            }}
            disabled={selectedReemplazos.length === 0}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Agregar ({selectedReemplazos.length})
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Motorización */}
      <Dialog
        open={openMotorizacionModal}
        onClose={() => setOpenMotorizacionModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Agregar Motorización
          <IconButton
            onClick={() => setOpenMotorizacionModal(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField fullWidth label="Nombre" variant="outlined" placeholder="Ej: 1.6 16V" />
              <TextField fullWidth label="Cilindrada" variant="outlined" placeholder="Ej: 1600cc" />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMotorizacionModal(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => setOpenMotorizacionModal(false)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Productos Complementarios */}
      <Dialog
        open={openComplementariosModal}
        onClose={() => {
          setOpenComplementariosModal(false)
          setSelectedComplementarios([])
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Agregar Producto Complementario
          <IconButton
            onClick={() => {
              setOpenComplementariosModal(false)
              setSelectedComplementarios([])
            }}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedComplementarios.length > 0 &&
                        selectedComplementarios.length < productosDisponibles.length
                      }
                      checked={
                        productosDisponibles.length > 0 &&
                        selectedComplementarios.length === productosDisponibles.length
                      }
                      onChange={handleSelectAllComplementarios}
                    />
                  </TableCell>
                  <TableCell><strong>Fabricante</strong></TableCell>
                  <TableCell><strong>Código Fabricante</strong></TableCell>
                  <TableCell><strong>Proveedor</strong></TableCell>
                  <TableCell><strong>Código Proveedor</strong></TableCell>
                  <TableCell><strong>Precio Costo</strong></TableCell>
                  <TableCell><strong>Precio Venta</strong></TableCell>
                  <TableCell><strong>Stock</strong></TableCell>
                  <TableCell><strong>Ubicación</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosDisponibles.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedComplementarios.includes(index)}
                        onChange={() => handleToggleComplementario(index)}
                      />
                    </TableCell>
                    <TableCell>{item.fabricante}</TableCell>
                    <TableCell>{item.codigoFabricante}</TableCell>
                    <TableCell>{item.proveedor}</TableCell>
                    <TableCell>{item.codigoProveedor}</TableCell>
                    <TableCell>${item.precioCosto.toLocaleString()}</TableCell>
                    <TableCell>${item.precioVenta.toLocaleString()}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.ubicacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenComplementariosModal(false)
              setSelectedComplementarios([])
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log('Productos seleccionados:', selectedComplementarios)
              setOpenComplementariosModal(false)
              setSelectedComplementarios([])
            }}
            disabled={selectedComplementarios.length === 0}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Agregar ({selectedComplementarios.length})
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
