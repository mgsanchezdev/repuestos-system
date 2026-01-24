# Cómo usar la aplicación Desktop con Tauri

## Configuración Inicial

1. **Instalar dependencias:**
```bash
cd apps/desktop
npm install
```

2. **Instalar Rust y Tauri CLI** (si no lo tienes):
```bash
# Windows (usando PowerShell como administrador)
# Descargar e instalar Rust desde https://rustup.rs/
# O usar winget:
winget install Rustlang.Rustup

# Luego instalar Tauri CLI globalmente (opcional)
npm install -g @tauri-apps/cli
```

## Desarrollo

```bash
# Desde la raíz del monorepo
npm run dev:desktop

# O desde apps/desktop
npm run tauri:dev
```

Esto iniciará:
- Vite dev server en `http://localhost:1420`
- La ventana de Tauri con la aplicación

## Migrar Páginas desde admin-web

Para copiar las páginas restantes desde `admin-web`, sigue estos pasos:

### Ejemplo: Migrar BuscarRepuestoPage

1. **Copiar el archivo:**
```bash
# Desde la raíz del proyecto
cp apps/admin-web/src/app/dashboard/buscar/page.tsx apps/desktop/src/pages/BuscarRepuestoPage.tsx
```

2. **Hacer los cambios necesarios:**
   - Eliminar `'use client'`
   - Cambiar `import { useRouter } from 'next/navigation'` → `import { useNavigate } from 'react-router-dom'`
   - Cambiar `const router = useRouter()` → `const navigate = useNavigate()`
   - Cambiar `router.push(path)` → `navigate(path)`
   - Si usa `usePathname()`, cambiar a `useLocation().pathname`

3. **Verificar que funciona:**
```bash
npm run tauri:dev
```

## Estructura de Archivos

```
apps/desktop/
├── src/
│   ├── pages/           # Páginas de la aplicación
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ...
│   ├── layouts/         # Layouts compartidos
│   │   └── DashboardLayout.tsx
│   ├── App.tsx          # Componente principal con rutas
│   ├── main.tsx         # Punto de entrada
│   ├── theme.ts         # Tema de MUI
│   └── index.css        # Estilos globales
├── src-tauri/           # Código Rust de Tauri
│   ├── src/
│   │   └── main.rs
│   └── tauri.conf.json  # Configuración de Tauri
└── package.json
```

## Diferencias Clave con admin-web

| admin-web (Next.js) | desktop (Tauri + React Router) |
|---------------------|-------------------------------|
| `useRouter()` | `useNavigate()` |
| `router.push()` | `navigate()` |
| `usePathname()` | `useLocation().pathname` |
| `{children}` en layouts | `<Outlet />` |
| `'use client'` | No necesario |
| App Router | React Router |

## Construir para Producción

```bash
npm run tauri:build
```

Esto generará los ejecutables en `src-tauri/target/release/`

## Notas

- La aplicación comparte el mismo código que `admin-web`, solo cambia el router
- `localStorage` funciona igual en ambas aplicaciones
- Los componentes de MUI son idénticos
- Los estilos y temas se comparten
