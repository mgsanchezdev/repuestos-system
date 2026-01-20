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
  Card,
  CardContent,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'

interface Repuesto {
  id: string
  nombre: string
  fotos: string[]
  marcas: { marca: string; modelo: string }[]
  motorizaciones: { nombre: string; cilindrada: string }[]
  codigosOem: {
    fabricante: string
    codigoFabricante: string
    proveedor: string
    codigoProveedor: string
    precioCosto: number
    precioVenta: number
    stock: number
    ubicacion: string
  }[]
  reemplazos: {
    fabricante: string
    codigoFabricante: string
    proveedor: string
    codigoProveedor: string
    precioCosto: number
    precioVenta: number
    stock: number
    ubicacion: string
  }[]
  productosComplementarios: {
    fabricante: string
    codigoFabricante: string
    proveedor: string
    codigoProveedor: string
    precioCosto: number
    precioVenta: number
    stock: number
    ubicacion: string
  }[]
}

// Datos de marcas y modelos disponibles
const marcasModelosDisponibles = [
  { marca: 'Toyota', modelo: 'Corolla' },
  { marca: 'Toyota', modelo: 'Camry' },
  { marca: 'Toyota', modelo: 'RAV4' },
  { marca: 'Toyota', modelo: 'Hilux' },
  { marca: 'Honda', modelo: 'Civic' },
  { marca: 'Honda', modelo: 'Accord' },
  { marca: 'Honda', modelo: 'CR-V' },
  { marca: 'Ford', modelo: 'Focus' },
  { marca: 'Ford', modelo: 'Fiesta' },
  { marca: 'Ford', modelo: 'Ranger' },
  { marca: 'Chevrolet', modelo: 'Cruze' },
  { marca: 'Chevrolet', modelo: 'Onix' },
  { marca: 'Volkswagen', modelo: 'Gol' },
  { marca: 'Volkswagen', modelo: 'Polo' },
  { marca: 'Fiat', modelo: 'Palio' },
  { marca: 'Fiat', modelo: 'Uno' },
]

// Datos de proveedores y sus códigos
const proveedoresYCodigos: { [key: string]: string[] } = {
  'Distribuidora Central': ['DC-789', 'DC-111', 'DC-999', 'DC-777', 'DC-333', 'DC-444', 'DC-666'],
  'Repuestos SA': ['RS-456', 'RS-123', 'RS-222', 'RS-555'],
  'AutoPartes': ['AP-888'],
}

export default function BuscarPage() {
  const [filtros, setFiltros] = useState({
    nombre: '',
    marca: '',
    modelo: '',
    codigoFabricante: '',
    codigoProveedor: '',
    proveedor: '',
  })
  const [repuestos, setRepuestos] = useState<Repuesto[]>([])
  const [repuestosFiltrados, setRepuestosFiltrados] = useState<Repuesto[]>([])

  // Obtener marcas únicas
  const marcasUnicas = Array.from(new Set(marcasModelosDisponibles.map((m) => m.marca)))

  // Obtener modelos filtrados por marca seleccionada
  const modelosFiltrados = filtros.marca
    ? marcasModelosDisponibles
        .filter((m) => m.marca === filtros.marca)
        .map((m) => m.modelo)
    : []

  // Obtener proveedores únicos
  const proveedoresUnicos = Object.keys(proveedoresYCodigos)

  // Obtener códigos de proveedor filtrados por proveedor seleccionado
  const codigosProveedorFiltrados = filtros.proveedor
    ? proveedoresYCodigos[filtros.proveedor] || []
    : []

  // Cargar datos de ejemplo o desde localStorage
  useEffect(() => {
    // Datos de ejemplo para demostración
    const datosEjemplo: Repuesto[] = [
      {
        id: '1',
        nombre: 'Filtro de aire',
        fotos: ['filtro-aire-1.jpg', 'filtro-aire-2.jpg'],
        marcas: [
          { marca: 'Toyota', modelo: 'Corolla' },
          { marca: 'Toyota', modelo: 'Camry' },
        ],
        motorizaciones: [
          { nombre: '1.6 16V', cilindrada: '1600cc' },
          { nombre: '1.8 16V', cilindrada: '1800cc' },
        ],
        codigosOem: [
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
        ],
        reemplazos: [
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
        ],
        productosComplementarios: [
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
        ],
      },
      {
        id: '2',
        nombre: 'Filtro de aceite',
        fotos: ['filtro-aceite-1.jpg'],
        marcas: [
          { marca: 'Honda', modelo: 'Civic' },
          { marca: 'Honda', modelo: 'Accord' },
        ],
        motorizaciones: [
          { nombre: '2.0 16V', cilindrada: '2000cc' },
        ],
        codigosOem: [
          {
            fabricante: 'Honda',
            codigoFabricante: 'HON-54321',
            proveedor: 'Repuestos SA',
            codigoProveedor: 'RS-123',
            precioCosto: 12000,
            precioVenta: 20000,
            stock: 25,
            ubicacion: 'A-15',
          },
        ],
        reemplazos: [],
        productosComplementarios: [],
      },
      {
        id: '3',
        nombre: 'Pastillas de freno',
        fotos: ['pastillas-1.jpg', 'pastillas-2.jpg'],
        marcas: [
          { marca: 'Ford', modelo: 'Focus' },
        ],
        motorizaciones: [
          { nombre: '1.6 16V', cilindrada: '1600cc' },
        ],
        codigosOem: [
          {
            fabricante: 'Ford',
            codigoFabricante: 'FOR-99999',
            proveedor: 'Distribuidora Central',
            codigoProveedor: 'DC-999',
            precioCosto: 25000,
            precioVenta: 40000,
            stock: 10,
            ubicacion: 'B-20',
          },
        ],
        reemplazos: [
          {
            fabricante: 'Ford',
            codigoFabricante: 'FOR-88888',
            proveedor: 'AutoPartes',
            codigoProveedor: 'AP-888',
            precioCosto: 22000,
            precioVenta: 38000,
            stock: 5,
            ubicacion: 'B-21',
          },
        ],
        productosComplementarios: [
          {
            fabricante: 'Ford',
            codigoFabricante: 'FOR-77777',
            proveedor: 'Distribuidora Central',
            codigoProveedor: 'DC-777',
            precioCosto: 8000,
            precioVenta: 15000,
            stock: 15,
            ubicacion: 'C-10',
          },
        ],
      },
    ]

    // Intentar cargar desde localStorage, si no hay datos usar los de ejemplo
    const datosGuardados = localStorage.getItem('repuestos')
    if (datosGuardados) {
      try {
        const parsed = JSON.parse(datosGuardados)
        setRepuestos(parsed.length > 0 ? parsed : datosEjemplo)
      } catch {
        setRepuestos(datosEjemplo)
      }
    } else {
      setRepuestos(datosEjemplo)
    }
  }, [])

  // Filtrar repuestos cuando cambian los filtros o los datos
  useEffect(() => {
    let filtrados = [...repuestos]

    if (filtros.nombre) {
      filtrados = filtrados.filter((r) =>
        r.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
      )
    }

    if (filtros.marca) {
      filtrados = filtrados.filter((r) =>
        r.marcas.some((m) =>
          m.marca.toLowerCase().includes(filtros.marca.toLowerCase())
        )
      )
    }

    if (filtros.modelo) {
      filtrados = filtrados.filter((r) =>
        r.marcas.some((m) =>
          m.modelo.toLowerCase().includes(filtros.modelo.toLowerCase())
        )
      )
    }

    if (filtros.codigoFabricante) {
      filtrados = filtrados.filter((r) =>
        r.codigosOem.some((oem) =>
          oem.codigoFabricante
            .toLowerCase()
            .includes(filtros.codigoFabricante.toLowerCase())
        )
      )
    }

    if (filtros.codigoProveedor) {
      filtrados = filtrados.filter((r) =>
        r.codigosOem.some((oem) =>
          oem.codigoProveedor
            .toLowerCase()
            .includes(filtros.codigoProveedor.toLowerCase())
        )
      )
    }

    if (filtros.proveedor) {
      filtrados = filtrados.filter((r) =>
        r.codigosOem.some((oem) =>
          oem.proveedor.toLowerCase().includes(filtros.proveedor.toLowerCase())
        )
      )
    }

    setRepuestosFiltrados(filtrados)
  }, [filtros, repuestos])

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => {
      const nuevosFiltros = { ...prev, [campo]: valor }
      // Si cambia la marca, limpiar el modelo
      if (campo === 'marca') {
        nuevosFiltros.modelo = ''
      }
      // Si cambia el proveedor, limpiar el código de proveedor
      if (campo === 'proveedor') {
        nuevosFiltros.codigoProveedor = ''
      }
      return nuevosFiltros
    })
  }

  const handleLimpiarFiltros = () => {
    setFiltros({
      nombre: '',
      marca: '',
      modelo: '',
      codigoFabricante: '',
      codigoProveedor: '',
      proveedor: '',
    })
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Buscar Repuesto
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SearchIcon sx={{ fontSize: 32, color: '#667eea', mr: 2 }} />
          <Typography variant="h6" fontWeight={600}>
            Filtros de Búsqueda
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <TextField
              fullWidth
              label="Nombre del producto"
              variant="outlined"
              value={filtros.nombre}
              onChange={(e) => handleFiltroChange('nombre', e.target.value)}
              placeholder="Ej: Filtro de aire"
            />
            <FormControl fullWidth>
              <InputLabel>Marca</InputLabel>
              <Select
                value={filtros.marca}
                label="Marca"
                onChange={(e) => handleFiltroChange('marca', e.target.value)}
              >
                <MenuItem value="">
                  <em>Todas</em>
                </MenuItem>
                {marcasUnicas.map((marca) => (
                  <MenuItem key={marca} value={marca}>
                    {marca}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <FormControl fullWidth disabled={!filtros.marca}>
              <InputLabel>Modelo</InputLabel>
              <Select
                value={filtros.modelo}
                label="Modelo"
                onChange={(e) => handleFiltroChange('modelo', e.target.value)}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {modelosFiltrados.map((modelo) => (
                  <MenuItem key={modelo} value={modelo}>
                    {modelo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Código Fabricante"
              variant="outlined"
              value={filtros.codigoFabricante}
              onChange={(e) => handleFiltroChange('codigoFabricante', e.target.value)}
              placeholder="Ej: TOY-12345"
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
            <FormControl fullWidth>
              <InputLabel>Proveedor</InputLabel>
              <Select
                value={filtros.proveedor}
                label="Proveedor"
                onChange={(e) => handleFiltroChange('proveedor', e.target.value)}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {proveedoresUnicos.map((proveedor) => (
                  <MenuItem key={proveedor} value={proveedor}>
                    {proveedor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth disabled={!filtros.proveedor}>
              <InputLabel>Código Proveedor</InputLabel>
              <Select
                value={filtros.codigoProveedor}
                label="Código Proveedor"
                onChange={(e) => handleFiltroChange('codigoProveedor', e.target.value)}
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {codigosProveedorFiltrados.map((codigo) => (
                  <MenuItem key={codigo} value={codigo}>
                    {codigo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleLimpiarFiltros}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Limpiar Filtros
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
            {repuestosFiltrados.length} resultado(s) encontrado(s)
          </Typography>
        </Box>
      </Paper>

      {/* Resultados */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {repuestosFiltrados.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No se encontraron repuestos con los filtros aplicados
            </Typography>
          </Paper>
        ) : (
          repuestosFiltrados.map((repuesto) => (
            <Card key={repuesto.id} sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {repuesto.nombre}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {repuesto.fotos.map((foto, idx) => (
                        <Chip key={idx} label={foto} size="small" />
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Marcas y Modelos */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Marcas y Modelos Compatibles ({repuesto.marcas.length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Marca</strong></TableCell>
                            <TableCell><strong>Modelo</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {repuesto.marcas.map((marca, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{marca.marca}</TableCell>
                              <TableCell>{marca.modelo}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>

                {/* Motorización */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Motorización ({repuesto.motorizaciones.length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell><strong>Cilindrada</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {repuesto.motorizaciones.map((motor, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{motor.nombre}</TableCell>
                              <TableCell>{motor.cilindrada}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>

                {/* Códigos OEM */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Códigos OEM ({repuesto.codigosOem.length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table size="small">
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
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {repuesto.codigosOem.map((oem, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{oem.fabricante}</TableCell>
                              <TableCell>{oem.codigoFabricante}</TableCell>
                              <TableCell>{oem.proveedor}</TableCell>
                              <TableCell>{oem.codigoProveedor}</TableCell>
                              <TableCell>${oem.precioCosto.toLocaleString()}</TableCell>
                              <TableCell>${oem.precioVenta.toLocaleString()}</TableCell>
                              <TableCell>{oem.stock}</TableCell>
                              <TableCell>{oem.ubicacion}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>

                {/* Reemplazos */}
                {repuesto.reemplazos.length > 0 && (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Reemplazos ({repuesto.reemplazos.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
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
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {repuesto.reemplazos.map((reemplazo, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{reemplazo.fabricante}</TableCell>
                                <TableCell>{reemplazo.codigoFabricante}</TableCell>
                                <TableCell>{reemplazo.proveedor}</TableCell>
                                <TableCell>{reemplazo.codigoProveedor}</TableCell>
                                <TableCell>${reemplazo.precioCosto.toLocaleString()}</TableCell>
                                <TableCell>${reemplazo.precioVenta.toLocaleString()}</TableCell>
                                <TableCell>{reemplazo.stock}</TableCell>
                                <TableCell>{reemplazo.ubicacion}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Productos Complementarios */}
                {repuesto.productosComplementarios.length > 0 && (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Productos Complementarios ({repuesto.productosComplementarios.length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
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
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {repuesto.productosComplementarios.map((complementario, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{complementario.fabricante}</TableCell>
                                <TableCell>{complementario.codigoFabricante}</TableCell>
                                <TableCell>{complementario.proveedor}</TableCell>
                                <TableCell>{complementario.codigoProveedor}</TableCell>
                                <TableCell>${complementario.precioCosto.toLocaleString()}</TableCell>
                                <TableCell>${complementario.precioVenta.toLocaleString()}</TableCell>
                                <TableCell>{complementario.stock}</TableCell>
                                <TableCell>{complementario.ubicacion}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  )
}
