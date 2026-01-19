import type { Metadata } from 'next'
import { AppThemeProvider } from './theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fulltronik - Login',
  description: 'Sistema de gestión de repuestos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  )
}
