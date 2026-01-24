import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Paper,
  Fade,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  PersonOutline,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Verificar si ya está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Validación hardcoded para desarrollo
    if (username === 'adrian' && password === '123456') {
      // Guardar en localStorage (en producción usarías cookies o tokens)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', username)
      
      // Redirigir al dashboard
      navigate('/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos')
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 5,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Logo/Icon Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  }}
                >
                  <LockOutlined sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </motion.div>
              
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Fulltronik
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                Sistema de gestión de repuestos
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleLogin}>
              {error && (
                <Fade in={!!error}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                </Fade>
              )}

              <TextField
                fullWidth
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                autoComplete="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                    },
                  }}
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </motion.div>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Usuario: <strong>adrian</strong> | Contraseña: <strong>123456</strong>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}
