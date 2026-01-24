# Desktop App - Fulltronik

Aplicación de escritorio construida con Tauri y React, compartiendo el mismo código que la aplicación web admin.

## Estructura

Esta aplicación utiliza React Router en lugar de Next.js Router, pero comparte los mismos componentes y lógica de negocio que `admin-web`.

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run tauri:dev

# Construir para producción
npm run tauri:build
```

## Adaptaciones necesarias

Al copiar código de `admin-web` a esta aplicación, necesitas hacer los siguientes cambios:

1. **Router**: 
   - `useRouter()` de `next/navigation` → `useNavigate()` de `react-router-dom`
   - `router.push(path)` → `navigate(path)`
   - `usePathname()` → `useLocation().pathname`

2. **Layouts**:
   - Los layouts deben usar `<Outlet />` de `react-router-dom` en lugar de `{children}`

3. **Imports**:
   - Eliminar `'use client'` (no necesario en React puro)
   - Cambiar imports de Next.js por React Router

## Script de migración

Puedes usar un script para automatizar la migración de páginas desde `admin-web`:

```bash
# Ejemplo de cómo adaptar una página:
# 1. Copiar el archivo desde apps/admin-web/src/app/dashboard/[page]/page.tsx
# 2. Reemplazar useRouter por useNavigate
# 3. Reemplazar router.push por navigate
# 4. Guardar en apps/desktop/src/pages/[Page].tsx
```
