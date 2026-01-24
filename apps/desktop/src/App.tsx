import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from './theme'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import BuscarRepuestoPage from './pages/BuscarRepuestoPage'
import AgregarRepuestoPage from './pages/AgregarRepuestoPage'
import BuscarProveedorPage from './pages/BuscarProveedorPage'
import AgregarProveedorPage from './pages/AgregarProveedorPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="buscar" element={<BuscarRepuestoPage />} />
            <Route path="agregar" element={<AgregarRepuestoPage />} />
            <Route path="buscar-proveedor" element={<BuscarProveedorPage />} />
            <Route path="agregar-proveedor" element={<AgregarProveedorPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
