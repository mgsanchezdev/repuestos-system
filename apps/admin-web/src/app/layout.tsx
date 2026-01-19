import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Admin - Repuestos Platform',
  description: 'Panel de administración interno',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
