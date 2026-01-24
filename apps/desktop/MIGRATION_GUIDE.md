# Guía de Migración: admin-web → desktop

Esta guía te ayudará a copiar y adaptar las páginas de `admin-web` a `desktop`.

## Cambios Necesarios

### 1. Router (Next.js → React Router)

**Antes (Next.js):**
```typescript
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/dashboard')
```

**Después (React Router):**
```typescript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/dashboard')
```

### 2. Pathname

**Antes (Next.js):**
```typescript
import { usePathname } from 'next/navigation'

const pathname = usePathname()
```

**Después (React Router):**
```typescript
import { useLocation } from 'react-router-dom'

const location = useLocation()
const pathname = location.pathname
```

### 3. Eliminar 'use client'

Las páginas de desktop no necesitan `'use client'` ya que React Router maneja el cliente automáticamente.

### 4. Layouts

**Antes (Next.js):**
```typescript
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Box>{children}</Box>
}
```

**Después (React Router):**
```typescript
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <Box><Outlet /></Box>
}
```

## Pasos para Migrar una Página

1. **Copiar el archivo** desde `apps/admin-web/src/app/dashboard/[page]/page.tsx`
2. **Crear el archivo** en `apps/desktop/src/pages/[PageName].tsx` (PascalCase)
3. **Hacer los reemplazos**:
   - Eliminar `'use client'`
   - `useRouter()` → `useNavigate()`
   - `router.push()` → `navigate()`
   - `usePathname()` → `useLocation().pathname`
   - Cambiar `export default function` a PascalCase si es necesario

## Ejemplo Completo

### Archivo Original (admin-web)
```typescript
'use client'

import { useRouter } from 'next/navigation'

export default function buscarPage() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/dashboard')
  }
  
  return <Button onClick={handleClick}>Ir</Button>
}
```

### Archivo Adaptado (desktop)
```typescript
import { useNavigate } from 'react-router-dom'

export default function BuscarPage() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/dashboard')
  }
  
  return <Button onClick={handleClick}>Ir</Button>
}
```

## Páginas Pendientes de Migrar

- ✅ LoginPage
- ✅ DashboardPage  
- ✅ DashboardLayout
- ⏳ BuscarRepuestoPage
- ⏳ AgregarRepuestoPage
- ⏳ BuscarProveedorPage
- ⏳ AgregarProveedorPage

## Script de Ayuda

Puedes usar este script de PowerShell para ayudar con la migración:

```powershell
# Ejemplo: Migrar buscar/page.tsx
$source = "apps/admin-web/src/app/dashboard/buscar/page.tsx"
$dest = "apps/desktop/src/pages/BuscarRepuestoPage.tsx"

# Copiar y hacer reemplazos básicos
Get-Content $source | 
  ForEach-Object { 
    $_ -replace "'use client'", "" `
       -replace "useRouter", "useNavigate" `
       -replace "from 'next/navigation'", "from 'react-router-dom'" `
       -replace "router\.push", "navigate" `
       -replace "usePathname", "useLocation().pathname"
  } | 
  Set-Content $dest
```

## Notas Importantes

- Las rutas en React Router son las mismas que en Next.js
- `localStorage` funciona igual en ambas aplicaciones
- Los componentes de MUI son idénticos
- Los estilos y temas se comparten
