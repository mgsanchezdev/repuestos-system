'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  Add as AddIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material'

// Lista de detalles de auto disponibles para seleccionar
const detallesAutoDisponibles = [
  { marca: 'Toyota', modelo: 'Corolla', motorizacion: '1.6 16V', cilindrada: '1600cc' },
  { marca: 'Toyota', modelo: 'Camry', motorizacion: '1.8 16V', cilindrada: '1800cc' },
  { marca: 'Toyota', modelo: 'RAV4', motorizacion: '2.0 16V', cilindrada: '2000cc' },
  { marca: 'Honda', modelo: 'Civic', motorizacion: '1.8 16V', cilindrada: '1800cc' },
  { marca: 'Honda', modelo: 'Accord', motorizacion: '2.0 16V', cilindrada: '2000cc' },
  { marca: 'Ford', modelo: 'Focus', motorizacion: '1.6 16V', cilindrada: '1600cc' },
  { marca: 'Ford', modelo: 'Fiesta', motorizacion: '1.4 16V', cilindrada: '1400cc' },
  { marca: 'Chevrolet', modelo: 'Cruze', motorizacion: '1.8 16V', cilindrada: '1800cc' },
]

export default function AgregarPage() {
  const router = useRouter()
  const [openDetalleAutoSeleccionModal, setOpenDetalleAutoSeleccionModal] = useState(false)
  const [openDetalleAutoModal, setOpenDetalleAutoModal] = useState(false)
  const [openMarcaSeleccionModal, setOpenMarcaSeleccionModal] = useState(false)
  const [selectedDetallesAuto, setSelectedDetallesAuto] = useState<number[]>([])
  const [openMarcaAgregarModal, setOpenMarcaAgregarModal] = useState(false)
  // Estados para filtros de búsqueda en modal de detalles de auto
  const [filtrosDetalleAuto, setFiltrosDetalleAuto] = useState({
    marca: '',
    modelo: '',
    motorizacion: '',
    cilindrada: '',
  })
  const [openOemModal, setOpenOemModal] = useState(false)
  const [openReemplazosModal, setOpenReemplazosModal] = useState(false)
  const [openComplementariosModal, setOpenComplementariosModal] = useState(false)
  const [openMotorizacionModal, setOpenMotorizacionModal] = useState(false)
  const [detalleAutoEditando, setDetalleAutoEditando] = useState<number | null>(null)
  const [detalleAutoFormData, setDetalleAutoFormData] = useState({
    marca: '',
    modelo: '',
    motorizacion: '',
    cilindrada: '',
  })
  const [selectedComplementarios, setSelectedComplementarios] = useState<number[]>([])
  const [selectedReemplazos, setSelectedReemplazos] = useState<number[]>([])
  // Estados para filtros de búsqueda en modal de productos complementarios
  const [filtrosComplementario, setFiltrosComplementario] = useState({
    fabricante: '',
    codigoFabricante: '',
    proveedor: '',
    codigoProveedor: '',
    ubicacion: '',
  })
  const [selectedMarcas, setSelectedMarcas] = useState<number[]>([])
  // Estados para filtros de búsqueda en modal de reemplazos
  const [filtrosReemplazo, setFiltrosReemplazo] = useState({
    fabricante: '',
    codigoFabricante: '',
    proveedor: '',
    codigoProveedor: '',
    ubicacion: '',
  })
  
  // Estados para el formulario de agregar marca/modelo manualmente
  const [nuevaMarca, setNuevaMarca] = useState('')
  const [nuevoModelo, setNuevoModelo] = useState('')
  const [editandoMarcaIndex, setEditandoMarcaIndex] = useState<number | null>(null)

  // Estados para el formulario del modal OEM
  const [oemFormData, setOemFormData] = useState({
    fabricante: '',
    codigoFabricante: '',
    proveedor: '',
    codigoProveedor: '',
    precioCosto: '',
    precioVenta: '',
    stock: '',
    ubicacion: '',
  })
  const [proveedores, setProveedores] = useState<Array<{ razonSocial: string; codigos: string[] }>>([])
  
  // Estados para el formulario
  const [nombreProducto, setNombreProducto] = useState('')
  const [fotos, setFotos] = useState<string[]>([])
  const [detallesAuto, setDetallesAuto] = useState<{
    marca: string
    modelo: string
    motorizacion: string
    cilindrada: string
  }[]>([])
  // Mantener estados separados para compatibilidad con el guardado
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

  // Lista de marcas y modelos disponibles (usando estado para poder editarla)
  const [marcasModelosDisponibles, setMarcasModelosDisponibles] = useState([
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
  ])

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

  // Función para filtrar productos complementarios disponibles
  const complementariosFiltrados = productosDisponibles.filter((item) => {
    const fabricanteMatch = filtrosComplementario.fabricante === '' || 
      item.fabricante.toLowerCase().includes(filtrosComplementario.fabricante.toLowerCase())
    const codigoFabricanteMatch = filtrosComplementario.codigoFabricante === '' || 
      item.codigoFabricante.toLowerCase().includes(filtrosComplementario.codigoFabricante.toLowerCase())
    const proveedorMatch = filtrosComplementario.proveedor === '' || 
      item.proveedor.toLowerCase().includes(filtrosComplementario.proveedor.toLowerCase())
    const codigoProveedorMatch = filtrosComplementario.codigoProveedor === '' || 
      item.codigoProveedor.toLowerCase().includes(filtrosComplementario.codigoProveedor.toLowerCase())
    const ubicacionMatch = filtrosComplementario.ubicacion === '' || 
      item.ubicacion.toLowerCase().includes(filtrosComplementario.ubicacion.toLowerCase())
    return fabricanteMatch && codigoFabricanteMatch && proveedorMatch && codigoProveedorMatch && ubicacionMatch
  })

  // Mapeo de índices filtrados a índices originales para productos complementarios
  const indicesComplementariosFiltradosAMap = complementariosFiltrados.map((itemFiltrado) => {
    return productosDisponibles.findIndex((item) => 
      item.fabricante === itemFiltrado.fabricante &&
      item.codigoFabricante === itemFiltrado.codigoFabricante &&
      item.proveedor === itemFiltrado.proveedor &&
      item.codigoProveedor === itemFiltrado.codigoProveedor &&
      item.ubicacion === itemFiltrado.ubicacion
    )
  })

  const handleSelectAllComplementarios = () => {
    const todosLosIndicesFiltrados = indicesComplementariosFiltradosAMap
    const todosSeleccionados = todosLosIndicesFiltrados.length > 0 && 
      todosLosIndicesFiltrados.every((idx) => selectedComplementarios.includes(idx))
    
    if (todosSeleccionados) {
      // Deseleccionar todos los filtrados
      setSelectedComplementarios((prev) => prev.filter((idx) => !indicesComplementariosFiltradosAMap.includes(idx)))
    } else {
      // Seleccionar todos los filtrados
      setSelectedComplementarios((prev) => {
        const nuevos = [...prev]
        indicesComplementariosFiltradosAMap.forEach((idx) => {
          if (!nuevos.includes(idx)) {
            nuevos.push(idx)
          }
        })
        return nuevos
      })
    }
  }

  const handleToggleReemplazo = (index: number) => {
    setSelectedReemplazos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  // Función para filtrar reemplazos disponibles
  const reemplazosFiltrados = productosDisponiblesReemplazos.filter((item) => {
    const fabricanteMatch = filtrosReemplazo.fabricante === '' || 
      item.fabricante.toLowerCase().includes(filtrosReemplazo.fabricante.toLowerCase())
    const codigoFabricanteMatch = filtrosReemplazo.codigoFabricante === '' || 
      item.codigoFabricante.toLowerCase().includes(filtrosReemplazo.codigoFabricante.toLowerCase())
    const proveedorMatch = filtrosReemplazo.proveedor === '' || 
      item.proveedor.toLowerCase().includes(filtrosReemplazo.proveedor.toLowerCase())
    const codigoProveedorMatch = filtrosReemplazo.codigoProveedor === '' || 
      item.codigoProveedor.toLowerCase().includes(filtrosReemplazo.codigoProveedor.toLowerCase())
    const ubicacionMatch = filtrosReemplazo.ubicacion === '' || 
      item.ubicacion.toLowerCase().includes(filtrosReemplazo.ubicacion.toLowerCase())
    return fabricanteMatch && codigoFabricanteMatch && proveedorMatch && codigoProveedorMatch && ubicacionMatch
  })

  // Mapeo de índices filtrados a índices originales para reemplazos
  const indicesReemplazosFiltradosAMap = reemplazosFiltrados.map((itemFiltrado) => {
    return productosDisponiblesReemplazos.findIndex((item) => 
      item.fabricante === itemFiltrado.fabricante &&
      item.codigoFabricante === itemFiltrado.codigoFabricante &&
      item.proveedor === itemFiltrado.proveedor &&
      item.codigoProveedor === itemFiltrado.codigoProveedor &&
      item.ubicacion === itemFiltrado.ubicacion
    )
  })

  const handleSelectAllReemplazos = () => {
    const todosLosIndicesFiltrados = indicesReemplazosFiltradosAMap
    const todosSeleccionados = todosLosIndicesFiltrados.length > 0 && 
      todosLosIndicesFiltrados.every((idx) => selectedReemplazos.includes(idx))
    
    if (todosSeleccionados) {
      // Deseleccionar todos los filtrados
      setSelectedReemplazos((prev) => prev.filter((idx) => !indicesReemplazosFiltradosAMap.includes(idx)))
    } else {
      // Seleccionar todos los filtrados
      setSelectedReemplazos((prev) => {
        const nuevos = [...prev]
        indicesReemplazosFiltradosAMap.forEach((idx) => {
          if (!nuevos.includes(idx)) {
            nuevos.push(idx)
          }
        })
        return nuevos
      })
    }
  }

  const handleToggleMarca = (index: number) => {
    setSelectedMarcas((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  const handleSelectAllMarcas = () => {
    if (selectedMarcas.length === marcasModelosDisponibles.length) {
      setSelectedMarcas([])
    } else {
      setSelectedMarcas(marcasModelosDisponibles.map((_, index) => index))
    }
  }

  const handleToggleDetalleAuto = (index: number) => {
    setSelectedDetallesAuto((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  // Función para filtrar detalles de auto disponibles
  const detallesAutoFiltrados = detallesAutoDisponibles.filter((item) => {
    const marcaMatch = filtrosDetalleAuto.marca === '' || 
      item.marca.toLowerCase().includes(filtrosDetalleAuto.marca.toLowerCase())
    const modeloMatch = filtrosDetalleAuto.modelo === '' || 
      item.modelo.toLowerCase().includes(filtrosDetalleAuto.modelo.toLowerCase())
    const motorizacionMatch = filtrosDetalleAuto.motorizacion === '' || 
      item.motorizacion.toLowerCase().includes(filtrosDetalleAuto.motorizacion.toLowerCase())
    const cilindradaMatch = filtrosDetalleAuto.cilindrada === '' || 
      item.cilindrada.toLowerCase().includes(filtrosDetalleAuto.cilindrada.toLowerCase())
    return marcaMatch && modeloMatch && motorizacionMatch && cilindradaMatch
  })

  // Mapeo de índices filtrados a índices originales
  const indicesFiltradosAMap = detallesAutoFiltrados.map((itemFiltrado) => {
    return detallesAutoDisponibles.findIndex((item) => 
      item.marca === itemFiltrado.marca &&
      item.modelo === itemFiltrado.modelo &&
      item.motorizacion === itemFiltrado.motorizacion &&
      item.cilindrada === itemFiltrado.cilindrada
    )
  })

  const handleSelectAllDetallesAuto = () => {
    const todosLosIndicesFiltrados = indicesFiltradosAMap
    const todosSeleccionados = todosLosIndicesFiltrados.length > 0 && 
      todosLosIndicesFiltrados.every((idx) => selectedDetallesAuto.includes(idx))
    
    if (todosSeleccionados) {
      // Deseleccionar todos los filtrados
      setSelectedDetallesAuto((prev) => prev.filter((idx) => !indicesFiltradosAMap.includes(idx)))
    } else {
      // Seleccionar todos los filtrados
      setSelectedDetallesAuto((prev) => {
        const nuevos = [...prev]
        indicesFiltradosAMap.forEach((idx) => {
          if (!nuevos.includes(idx)) {
            nuevos.push(idx)
          }
        })
        return nuevos
      })
    }
  }

  const handleAgregarDetallesAutoSeleccionados = () => {
    const nuevosDetalles = selectedDetallesAuto.map((index: number) => detallesAutoDisponibles[index])
    setDetallesAuto((prev) => [...prev, ...nuevosDetalles])
    setSelectedDetallesAuto([])
    setFiltrosDetalleAuto({ marca: '', modelo: '', motorizacion: '', cilindrada: '' })
  }

  const handleAgregarMarcasSeleccionadas = () => {
    const nuevasMarcas = selectedMarcas.map((index) => marcasModelosDisponibles[index])
    setMarcasModelos((prev) => [...prev, ...nuevasMarcas])
    setSelectedMarcas([])
  }

  const handleEditarMarca = (index: number) => {
    setEditandoMarcaIndex(index)
    setNuevaMarca(marcasModelosDisponibles[index].marca)
    setNuevoModelo(marcasModelosDisponibles[index].modelo)
    setOpenMarcaSeleccionModal(false)
    setOpenMarcaAgregarModal(true)
  }

  const handleBorrarMarca = (index: number) => {
    if (confirm('¿Está seguro de que desea eliminar esta marca/modelo?')) {
      setMarcasModelosDisponibles((prev) => prev.filter((_, i) => i !== index))
      // Si estaba seleccionada, quitarla de la selección y ajustar índices
      setSelectedMarcas((prev) =>
        prev
          .filter((i) => i !== index)
          .map((i) => (i > index ? i - 1 : i))
      )
    }
  }

  // Cargar proveedores y sus códigos
  useEffect(() => {
    const cargarProveedores = () => {
      // Datos hardcodeados de proveedores con códigos
      const proveedoresHardcodeados = [
        {
          razonSocial: 'Distribuidora Central S.A.',
          codigos: ['DC-789', 'DC-111', 'DC-999', 'DC-777', 'DC-333', 'DC-444', 'DC-666'],
        },
        {
          razonSocial: 'Repuestos SA',
          codigos: ['RS-456', 'RS-123', 'RS-222', 'RS-555'],
        },
        {
          razonSocial: 'AutoPartes del Sur SRL',
          codigos: ['AP-888'],
        },
      ]

      // Cargar proveedores desde localStorage
      const proveedoresGuardados = localStorage.getItem('proveedores')
      let proveedoresDesdeStorage: Array<{ razonSocial: string; codigos: string[] }> = []

      if (proveedoresGuardados) {
        try {
          const parsed = JSON.parse(proveedoresGuardados)
          proveedoresDesdeStorage = parsed.map((p: any) => ({
            razonSocial: p.razonSocial,
            codigos: [`${p.razonSocial.substring(0, 2).toUpperCase()}-${Math.floor(Math.random() * 1000)}`], // Generar código basado en el nombre
          }))
        } catch {
          proveedoresDesdeStorage = []
        }
      }

      // Combinar proveedores hardcodeados con los de localStorage
      setProveedores([...proveedoresHardcodeados, ...proveedoresDesdeStorage])
    }

    cargarProveedores()
  }, [])

  // Obtener códigos del proveedor seleccionado
  const codigosProveedorSeleccionado = oemFormData.proveedor
    ? proveedores.find((p) => p.razonSocial === oemFormData.proveedor)?.codigos || []
    : []

  // Inicializar con datos de ejemplo
  useEffect(() => {
    setDetallesAuto([
      { marca: 'Toyota', modelo: 'Corolla', motorizacion: '1.6 16V', cilindrada: '1600cc' },
      { marca: 'Toyota', modelo: 'Camry', motorizacion: '1.8 16V', cilindrada: '1800cc' },
      { marca: 'Honda', modelo: 'Civic', motorizacion: '2.0 16V', cilindrada: '2000cc' },
      { marca: 'Honda', modelo: 'Accord', motorizacion: '1.8 16V', cilindrada: '1800cc' },
      { marca: 'Ford', modelo: 'Focus', motorizacion: '1.6 16V', cilindrada: '1600cc' },
    ])
    // Mantener datos separados para compatibilidad
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

    // Convertir detallesAuto a formato separado para compatibilidad
    const marcasDesdeDetalles = detallesAuto.map((d) => ({ marca: d.marca, modelo: d.modelo }))
    const motorizacionesDesdeDetalles = detallesAuto.map((d) => ({
      nombre: d.motorizacion,
      cilindrada: d.cilindrada,
    }))

    const nuevoRepuesto = {
      id: Date.now().toString(),
      nombre: nombreProducto,
      fotos: fotos,
      detallesAuto: detallesAuto,
      marcas: marcasDesdeDetalles.length > 0 ? marcasDesdeDetalles : marcasModelos,
      motorizaciones: motorizacionesDesdeDetalles.length > 0 ? motorizacionesDesdeDetalles : motorizaciones,
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
    setDetallesAuto([])
    setMarcasModelos([])
    setMotorizaciones([])
    setCodigosOem([])
    setReemplazos([])
    setProductosComplementarios([])
  }

  const handleCancel = () => {
    if (confirm('¿Está seguro de que desea cancelar? Se perderán todos los datos ingresados.')) {
      // Limpiar el formulario
      setNombreProducto('')
      setFotos([])
      setDetallesAuto([])
      setMarcasModelos([])
      setMotorizaciones([])
      setCodigosOem([])
      setReemplazos([])
      setProductosComplementarios([])
      // Redirigir al dashboard
      router.push('/dashboard')
    }
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

          {/* Detalles de Auto */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Detalles de Auto
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDetalleAutoSeleccionModal(true)}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Agregar Detalle auto
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography fontWeight="bold">Marca</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Modelo</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Motorización</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Cilindrada</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Acciones</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detallesAuto.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          No hay detalles de auto cargados. Haga clic en &quot;Agregar Detalle auto&quot; para agregar uno.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    detallesAuto.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.marca}</TableCell>
                        <TableCell>{item.modelo}</TableCell>
                        <TableCell>{item.motorizacion}</TableCell>
                        <TableCell>{item.cilindrada}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              if (confirm('¿Está seguro de que desea eliminar este detalle?')) {
                                setDetallesAuto(detallesAuto.filter((_, i) => i !== index))
                              }
                            }}
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
                    <TableCell><strong>Código Fabricante (OEM)</strong></TableCell>
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

          {/* Botones Guardar y Cancelar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleCancel}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#5568d3',
                  backgroundColor: 'rgba(102, 126, 234, 0.04)',
                },
              }}
            >
              CANCELAR
            </Button>
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

      {/* Modal Selección Marca/Modelo */}
      <Dialog
        open={openMarcaSeleccionModal}
        onClose={() => {
          setOpenMarcaSeleccionModal(false)
          setSelectedMarcas([])
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Seleccionar Marca y Modelo
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditandoMarcaIndex(null)
                setNuevaMarca('')
                setNuevoModelo('')
                setOpenMarcaSeleccionModal(false)
                setOpenMarcaAgregarModal(true)
              }}
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                '&:hover': {
                  borderColor: '#5568d3',
                  backgroundColor: 'rgba(102, 126, 234, 0.04)',
                },
              }}
            >
              Nueva Marca/Modelo
            </Button>
            <IconButton
              onClick={() => {
                setOpenMarcaSeleccionModal(false)
                setSelectedMarcas([])
              }}
              sx={{ ml: 1 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedMarcas.length > 0 &&
                        selectedMarcas.length < marcasModelosDisponibles.length
                      }
                      checked={
                        marcasModelosDisponibles.length > 0 &&
                        selectedMarcas.length === marcasModelosDisponibles.length
                      }
                      onChange={handleSelectAllMarcas}
                    />
                  </TableCell>
                  <TableCell><strong>Marca</strong></TableCell>
                  <TableCell><strong>Modelo</strong></TableCell>
                  <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marcasModelosDisponibles.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedMarcas.includes(index)}
                        onChange={() => handleToggleMarca(index)}
                      />
                    </TableCell>
                    <TableCell>{item.marca}</TableCell>
                    <TableCell>{item.modelo}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditarMarca(index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleBorrarMarca(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenMarcaSeleccionModal(false)
              setSelectedMarcas([])
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // Agregar las marcas seleccionadas a la tabla
              if (selectedMarcas.length > 0) {
                handleAgregarMarcasSeleccionadas()
              } else {
                // Si no hay selecciones, solo cerrar el modal
                setOpenMarcaSeleccionModal(false)
              }
            }}
            disabled={selectedMarcas.length === 0}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Agregar ({selectedMarcas.length})
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Agregar Marca/Modelo Manualmente */}
      <Dialog
        open={openMarcaAgregarModal}
        onClose={() => {
          setOpenMarcaAgregarModal(false)
          setEditandoMarcaIndex(null)
          setNuevaMarca('')
          setNuevoModelo('')
          setOpenMarcaSeleccionModal(true)
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editandoMarcaIndex !== null ? 'Editar Marca y Modelo' : 'Agregar Marca y Modelo'}
          <IconButton
            onClick={() => {
              setOpenMarcaAgregarModal(false)
              setEditandoMarcaIndex(null)
              setNuevaMarca('')
              setNuevoModelo('')
              setOpenMarcaSeleccionModal(true)
            }}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField
                fullWidth
                label="Marca"
                variant="outlined"
                value={nuevaMarca}
                onChange={(e) => setNuevaMarca(e.target.value)}
              />
              <TextField
                fullWidth
                label="Modelo"
                variant="outlined"
                value={nuevoModelo}
                onChange={(e) => setNuevoModelo(e.target.value)}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenMarcaAgregarModal(false)
              setEditandoMarcaIndex(null)
              setNuevaMarca('')
              setNuevoModelo('')
              setOpenMarcaSeleccionModal(true)
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (nuevaMarca.trim() && nuevoModelo.trim()) {
                if (editandoMarcaIndex !== null) {
                  // Editar marca/modelo existente en la lista disponible
                  setMarcasModelosDisponibles((prev) =>
                    prev.map((item, index) =>
                      index === editandoMarcaIndex
                        ? { marca: nuevaMarca, modelo: nuevoModelo }
                        : item
                    )
                  )
                  setEditandoMarcaIndex(null)
                } else {
                  // Agregar nueva marca/modelo a la lista disponible y a la tabla principal
                  const nuevaMarcaModelo = { marca: nuevaMarca, modelo: nuevoModelo }
                  setMarcasModelosDisponibles((prev) => [...prev, nuevaMarcaModelo])
                  setMarcasModelos((prev) => [...prev, nuevaMarcaModelo])
                }
                setNuevaMarca('')
                setNuevoModelo('')
                setOpenMarcaAgregarModal(false)
              } else {
                alert('Por favor complete ambos campos')
              }
            }}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {editandoMarcaIndex !== null ? 'Guardar' : 'Agregar'}
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
              <TextField
                fullWidth
                label="Fabricante"
                variant="outlined"
                value={oemFormData.fabricante}
                onChange={(e) => setOemFormData((prev) => ({ ...prev, fabricante: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Código Fabricante"
                variant="outlined"
                value={oemFormData.codigoFabricante}
                onChange={(e) => setOemFormData((prev) => ({ ...prev, codigoFabricante: e.target.value }))}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <FormControl fullWidth>
                <InputLabel>Proveedor</InputLabel>
                <Select
                  value={oemFormData.proveedor}
                  label="Proveedor"
                  onChange={(e) => {
                    setOemFormData((prev) => ({
                      ...prev,
                      proveedor: e.target.value,
                      codigoProveedor: '', // Limpiar código al cambiar proveedor
                    }))
                  }}
                >
                  <MenuItem value="">
                    <em>Seleccione un proveedor</em>
                  </MenuItem>
                  {proveedores.map((proveedor) => (
                    <MenuItem key={proveedor.razonSocial} value={proveedor.razonSocial}>
                      {proveedor.razonSocial}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth disabled={!oemFormData.proveedor}>
                <InputLabel>Código Proveedor</InputLabel>
                <Select
                  value={oemFormData.codigoProveedor}
                  label="Código Proveedor"
                  onChange={(e) =>
                    setOemFormData((prev) => ({ ...prev, codigoProveedor: e.target.value }))
                  }
                >
                  <MenuItem value="">
                    <em>Seleccione un código</em>
                  </MenuItem>
                  {codigosProveedorSeleccionado.map((codigo) => (
                    <MenuItem key={codigo} value={codigo}>
                      {codigo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField
                fullWidth
                label="Precio Costo"
                type="number"
                variant="outlined"
                value={oemFormData.precioCosto}
                onChange={(e) => setOemFormData((prev) => ({ ...prev, precioCosto: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Precio Venta"
                type="number"
                variant="outlined"
                value={oemFormData.precioVenta}
                onChange={(e) => setOemFormData((prev) => ({ ...prev, precioVenta: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Stock"
                type="number"
                variant="outlined"
                value={oemFormData.stock}
                onChange={(e) => setOemFormData((prev) => ({ ...prev, stock: e.target.value }))}
              />
              <TextField
                fullWidth
                label="Ubicación"
                variant="outlined"
                value={oemFormData.ubicacion}
                onChange={(e) => setOemFormData((prev) => ({ ...prev, ubicacion: e.target.value }))}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenOemModal(false)
              setOemFormData({
                fabricante: '',
                codigoFabricante: '',
                proveedor: '',
                codigoProveedor: '',
                precioCosto: '',
                precioVenta: '',
                stock: '',
                ubicacion: '',
              })
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!oemFormData.fabricante || !oemFormData.codigoFabricante || !oemFormData.proveedor || !oemFormData.codigoProveedor) {
                alert('Por favor complete todos los campos requeridos')
                return
              }
              const nuevoOem = {
                fabricante: oemFormData.fabricante,
                codigoFabricante: oemFormData.codigoFabricante,
                proveedor: oemFormData.proveedor,
                codigoProveedor: oemFormData.codigoProveedor,
                precioCosto: parseFloat(oemFormData.precioCosto) || 0,
                precioVenta: parseFloat(oemFormData.precioVenta) || 0,
                stock: parseInt(oemFormData.stock) || 0,
                ubicacion: oemFormData.ubicacion,
              }
              setCodigosOem((prev) => [...prev, nuevoOem])
              setOpenOemModal(false)
              setOemFormData({
                fabricante: '',
                codigoFabricante: '',
                proveedor: '',
                codigoProveedor: '',
                precioCosto: '',
                precioVenta: '',
                stock: '',
                ubicacion: '',
              })
            }}
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
          setFiltrosReemplazo({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })
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
              setFiltrosReemplazo({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })
            }}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Filtros de búsqueda */}
          <Paper elevation={1} sx={{ p: 2, mb: 3, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SearchIcon sx={{ fontSize: 20, color: '#667eea', mr: 1 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Buscar Reemplazos
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
              <TextField
                fullWidth
                label="Fabricante"
                variant="outlined"
                size="small"
                value={filtrosReemplazo.fabricante}
                onChange={(e) => setFiltrosReemplazo((prev) => ({ ...prev, fabricante: e.target.value }))}
                placeholder="Ej: Toyota"
              />
              <TextField
                fullWidth
                label="Código Fabricante"
                variant="outlined"
                size="small"
                value={filtrosReemplazo.codigoFabricante}
                onChange={(e) => setFiltrosReemplazo((prev) => ({ ...prev, codigoFabricante: e.target.value }))}
                placeholder="Ej: TOY-44444"
              />
              <TextField
                fullWidth
                label="Proveedor"
                variant="outlined"
                size="small"
                value={filtrosReemplazo.proveedor}
                onChange={(e) => setFiltrosReemplazo((prev) => ({ ...prev, proveedor: e.target.value }))}
                placeholder="Ej: Distribuidora Central"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
              <TextField
                fullWidth
                label="Código Proveedor"
                variant="outlined"
                size="small"
                value={filtrosReemplazo.codigoProveedor}
                onChange={(e) => setFiltrosReemplazo((prev) => ({ ...prev, codigoProveedor: e.target.value }))}
                placeholder="Ej: DC-444"
              />
              <TextField
                fullWidth
                label="Ubicación"
                variant="outlined"
                size="small"
                value={filtrosReemplazo.ubicacion}
                onChange={(e) => setFiltrosReemplazo((prev) => ({ ...prev, ubicacion: e.target.value }))}
                placeholder="Ej: D-01"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setFiltrosReemplazo({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })}
              >
                Limpiar Filtros
              </Button>
            </Box>
          </Paper>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        indicesReemplazosFiltradosAMap.length > 0 &&
                        indicesReemplazosFiltradosAMap.some((idx) => selectedReemplazos.includes(idx)) &&
                        !indicesReemplazosFiltradosAMap.every((idx) => selectedReemplazos.includes(idx))
                      }
                      checked={
                        indicesReemplazosFiltradosAMap.length > 0 &&
                        indicesReemplazosFiltradosAMap.every((idx) => selectedReemplazos.includes(idx))
                      }
                      onChange={handleSelectAllReemplazos}
                    />
                  </TableCell>
                  <TableCell><Typography fontWeight="bold">Fabricante</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Código Fabricante</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Proveedor</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Código Proveedor</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Precio Costo</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Precio Venta</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Stock</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Ubicación</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reemplazosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        No se encontraron reemplazos con los filtros aplicados.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  reemplazosFiltrados.map((item, indexFiltrado) => {
                    const indexOriginal = indicesReemplazosFiltradosAMap[indexFiltrado]
                    return (
                      <TableRow key={indexOriginal}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedReemplazos.includes(indexOriginal)}
                            onChange={() => handleToggleReemplazo(indexOriginal)}
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
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenReemplazosModal(false)
              setSelectedReemplazos([])
              setFiltrosReemplazo({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })
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
              setFiltrosReemplazo({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })
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

      {/* Modal Selección Detalle de Auto */}
      <Dialog
        open={openDetalleAutoSeleccionModal}
        onClose={() => {
          setOpenDetalleAutoSeleccionModal(false)
          setSelectedDetallesAuto([])
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Seleccionar Detalle de Auto
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => {
                setDetalleAutoEditando(null)
                setDetalleAutoFormData({
                  marca: '',
                  modelo: '',
                  motorizacion: '',
                  cilindrada: '',
                })
                setOpenDetalleAutoSeleccionModal(false)
                setOpenDetalleAutoModal(true)
              }}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Agregar
            </Button>
            <IconButton
              onClick={() => {
                setOpenDetalleAutoSeleccionModal(false)
                setSelectedDetallesAuto([])
                setFiltrosDetalleAuto({ marca: '', modelo: '', motorizacion: '', cilindrada: '' })
              }}
              sx={{ ml: 1 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* Filtros de búsqueda */}
          <Paper elevation={1} sx={{ p: 2, mb: 3, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SearchIcon sx={{ fontSize: 20, color: '#667eea', mr: 1 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Buscar Detalles de Auto
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
              <TextField
                fullWidth
                label="Marca"
                variant="outlined"
                size="small"
                value={filtrosDetalleAuto.marca}
                onChange={(e) => setFiltrosDetalleAuto((prev) => ({ ...prev, marca: e.target.value }))}
                placeholder="Ej: Toyota"
              />
              <TextField
                fullWidth
                label="Modelo"
                variant="outlined"
                size="small"
                value={filtrosDetalleAuto.modelo}
                onChange={(e) => setFiltrosDetalleAuto((prev) => ({ ...prev, modelo: e.target.value }))}
                placeholder="Ej: Corolla"
              />
              <TextField
                fullWidth
                label="Motorización"
                variant="outlined"
                size="small"
                value={filtrosDetalleAuto.motorizacion}
                onChange={(e) => setFiltrosDetalleAuto((prev) => ({ ...prev, motorizacion: e.target.value }))}
                placeholder="Ej: 1.6 16V"
              />
              <TextField
                fullWidth
                label="Cilindrada"
                variant="outlined"
                size="small"
                value={filtrosDetalleAuto.cilindrada}
                onChange={(e) => setFiltrosDetalleAuto((prev) => ({ ...prev, cilindrada: e.target.value }))}
                placeholder="Ej: 1600cc"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setFiltrosDetalleAuto({ marca: '', modelo: '', motorizacion: '', cilindrada: '' })}
              >
                Limpiar Filtros
              </Button>
            </Box>
          </Paper>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        indicesFiltradosAMap.length > 0 &&
                        indicesFiltradosAMap.some((idx) => selectedDetallesAuto.includes(idx)) &&
                        !indicesFiltradosAMap.every((idx) => selectedDetallesAuto.includes(idx))
                      }
                      checked={
                        indicesFiltradosAMap.length > 0 &&
                        indicesFiltradosAMap.every((idx) => selectedDetallesAuto.includes(idx))
                      }
                      onChange={handleSelectAllDetallesAuto}
                    />
                  </TableCell>
                  <TableCell><Typography fontWeight="bold">Marca</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Modelo</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Motorización</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Cilindrada</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detallesAutoFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        No se encontraron detalles de auto con los filtros aplicados.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  detallesAutoFiltrados.map((item, indexFiltrado) => {
                    const indexOriginal = indicesFiltradosAMap[indexFiltrado]
                    return (
                      <TableRow key={indexOriginal}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedDetallesAuto.includes(indexOriginal)}
                            onChange={() => handleToggleDetalleAuto(indexOriginal)}
                          />
                        </TableCell>
                        <TableCell>{item.marca}</TableCell>
                        <TableCell>{item.modelo}</TableCell>
                        <TableCell>{item.motorizacion}</TableCell>
                        <TableCell>{item.cilindrada}</TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDetalleAutoSeleccionModal(false)
              setSelectedDetallesAuto([])
              setFiltrosDetalleAuto({ marca: '', modelo: '', motorizacion: '', cilindrada: '' })
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedDetallesAuto.length > 0) {
                handleAgregarDetallesAutoSeleccionados()
              }
              setOpenDetalleAutoSeleccionModal(false)
            }}
            disabled={selectedDetallesAuto.length === 0}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Agregar Seleccionados ({selectedDetallesAuto.length})
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Agregar Detalle de Auto */}
      <Dialog
        open={openDetalleAutoModal}
        onClose={() => {
          setOpenDetalleAutoModal(false)
          setDetalleAutoEditando(null)
          setDetalleAutoFormData({
            marca: '',
            modelo: '',
            motorizacion: '',
            cilindrada: '',
          })
          setOpenDetalleAutoSeleccionModal(true)
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {detalleAutoEditando !== null ? 'Editar Detalle de Auto' : 'Agregar Detalle de Auto'}
          <IconButton
            onClick={() => {
              setOpenDetalleAutoModal(false)
              setDetalleAutoEditando(null)
              setDetalleAutoFormData({
                marca: '',
                modelo: '',
                motorizacion: '',
                cilindrada: '',
              })
              setOpenDetalleAutoSeleccionModal(true)
            }}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField
                fullWidth
                label="Marca"
                variant="outlined"
                value={detalleAutoFormData.marca}
                onChange={(e) => setDetalleAutoFormData((prev) => ({ ...prev, marca: e.target.value }))}
                placeholder="Ej: Toyota"
              />
              <TextField
                fullWidth
                label="Modelo"
                variant="outlined"
                value={detalleAutoFormData.modelo}
                onChange={(e) => setDetalleAutoFormData((prev) => ({ ...prev, modelo: e.target.value }))}
                placeholder="Ej: Corolla"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField
                fullWidth
                label="Motorización"
                variant="outlined"
                value={detalleAutoFormData.motorizacion}
                onChange={(e) => setDetalleAutoFormData((prev) => ({ ...prev, motorizacion: e.target.value }))}
                placeholder="Ej: 1.6 16V"
              />
              <TextField
                fullWidth
                label="Cilindrada"
                variant="outlined"
                value={detalleAutoFormData.cilindrada}
                onChange={(e) => setDetalleAutoFormData((prev) => ({ ...prev, cilindrada: e.target.value }))}
                placeholder="Ej: 1600cc"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDetalleAutoModal(false)
              setDetalleAutoEditando(null)
              setDetalleAutoFormData({
                marca: '',
                modelo: '',
                motorizacion: '',
                cilindrada: '',
              })
              setOpenDetalleAutoSeleccionModal(true)
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (
                !detalleAutoFormData.marca.trim() ||
                !detalleAutoFormData.modelo.trim() ||
                !detalleAutoFormData.motorizacion.trim() ||
                !detalleAutoFormData.cilindrada.trim()
              ) {
                alert('Por favor complete todos los campos')
                return
              }
              if (detalleAutoEditando !== null) {
                // Editar detalle existente
                setDetallesAuto((prev) =>
                  prev.map((item, index) => (index === detalleAutoEditando ? detalleAutoFormData : item))
                )
              } else {
                // Agregar nuevo detalle
                setDetallesAuto((prev) => [...prev, detalleAutoFormData])
              }
              setOpenDetalleAutoModal(false)
              setDetalleAutoEditando(null)
              setDetalleAutoFormData({
                marca: '',
                modelo: '',
                motorizacion: '',
                cilindrada: '',
              })
              setOpenDetalleAutoSeleccionModal(true)
            }}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {detalleAutoEditando !== null ? 'Guardar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Productos Complementarios */}
      <Dialog
        open={openComplementariosModal}
        onClose={() => {
          setOpenComplementariosModal(false)
          setSelectedComplementarios([])
          setFiltrosComplementario({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })
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
              setFiltrosComplementario({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })
            }}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Filtros de búsqueda */}
          <Paper elevation={1} sx={{ p: 2, mb: 3, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SearchIcon sx={{ fontSize: 20, color: '#667eea', mr: 1 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                Buscar Productos Complementarios
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
              <TextField
                fullWidth
                label="Fabricante"
                variant="outlined"
                size="small"
                value={filtrosComplementario.fabricante}
                onChange={(e) => setFiltrosComplementario((prev) => ({ ...prev, fabricante: e.target.value }))}
                placeholder="Ej: Toyota"
              />
              <TextField
                fullWidth
                label="Código Fabricante"
                variant="outlined"
                size="small"
                value={filtrosComplementario.codigoFabricante}
                onChange={(e) => setFiltrosComplementario((prev) => ({ ...prev, codigoFabricante: e.target.value }))}
                placeholder="Ej: TOY-11111"
              />
              <TextField
                fullWidth
                label="Proveedor"
                variant="outlined"
                size="small"
                value={filtrosComplementario.proveedor}
                onChange={(e) => setFiltrosComplementario((prev) => ({ ...prev, proveedor: e.target.value }))}
                placeholder="Ej: Distribuidora Central"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}>
              <TextField
                fullWidth
                label="Código Proveedor"
                variant="outlined"
                size="small"
                value={filtrosComplementario.codigoProveedor}
                onChange={(e) => setFiltrosComplementario((prev) => ({ ...prev, codigoProveedor: e.target.value }))}
                placeholder="Ej: DC-111"
              />
              <TextField
                fullWidth
                label="Ubicación"
                variant="outlined"
                size="small"
                value={filtrosComplementario.ubicacion}
                onChange={(e) => setFiltrosComplementario((prev) => ({ ...prev, ubicacion: e.target.value }))}
                placeholder="Ej: C-01"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setFiltrosComplementario({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })}
              >
                Limpiar Filtros
              </Button>
            </Box>
          </Paper>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        indicesComplementariosFiltradosAMap.length > 0 &&
                        indicesComplementariosFiltradosAMap.some((idx) => selectedComplementarios.includes(idx)) &&
                        !indicesComplementariosFiltradosAMap.every((idx) => selectedComplementarios.includes(idx))
                      }
                      checked={
                        indicesComplementariosFiltradosAMap.length > 0 &&
                        indicesComplementariosFiltradosAMap.every((idx) => selectedComplementarios.includes(idx))
                      }
                      onChange={handleSelectAllComplementarios}
                    />
                  </TableCell>
                  <TableCell><Typography fontWeight="bold">Fabricante</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Código Fabricante</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Proveedor</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Código Proveedor</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Precio Costo</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Precio Venta</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Stock</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Ubicación</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complementariosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        No se encontraron productos complementarios con los filtros aplicados.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  complementariosFiltrados.map((item, indexFiltrado) => {
                    const indexOriginal = indicesComplementariosFiltradosAMap[indexFiltrado]
                    return (
                      <TableRow key={indexOriginal}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedComplementarios.includes(indexOriginal)}
                            onChange={() => handleToggleComplementario(indexOriginal)}
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
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenComplementariosModal(false)
              setSelectedComplementarios([])
              setFiltrosComplementario({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })
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
              setFiltrosComplementario({ fabricante: '', codigoFabricante: '', proveedor: '', codigoProveedor: '', ubicacion: '' })
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
