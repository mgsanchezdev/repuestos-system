# Repuestos Platform

Monorepo completo para gestión de repuestos con múltiples interfaces.

## 🏗️ Estructura

```
repuestos-platform/
├── apps/
│   ├── admin-web/          # Next.js (Backoffice interno)
│   ├── ecommerce-web/      # Next.js (Público)
│   ├── mobile/             # React Native (Expo)
│   └── desktop/            # Tauri
├── backend/                # Golang API
├── packages/               # Código reutilizable
│   ├── types/             # Tipos TS compartidos
│   └── api-client/        # SDK de consumo API
└── infra/                 # Configuración de infraestructura
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- Go 1.21+
- Docker & Docker Compose

### Instalación

1. Clonar el repositorio
2. Copiar `.env.example` a `.env` y ajustar variables
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Iniciar servicios con Docker:
   ```bash
   docker-compose up -d
   ```
5. Ejecutar migraciones de base de datos (ver backend/README.md)

### Desarrollo

```bash
# Backend
cd backend
go run cmd/api/main.go

# Admin Web
npm run dev:admin

# Ecommerce Web
npm run dev:ecommerce

# Mobile
npm run dev:mobile

# Desktop
npm run dev:desktop
```

## 📦 Servicios

- **Backend**: Go API en puerto 8080
- **PostgreSQL**: Puerto 5432
- **MinIO**: API en 9000, Console en 9001

## 📝 Licencia

Privado
