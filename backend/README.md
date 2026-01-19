# Backend - Go API

API REST desarrollada en Go para la plataforma de repuestos.

## Estructura

```
backend/
├── cmd/api/          # Punto de entrada
├── internal/
│   ├── config/       # Configuración
│   ├── db/           # Conexión a base de datos
│   ├── modules/      # Módulos de negocio
│   ├── middleware/   # Middlewares
│   └── utils/        # Utilidades
└── migrations/       # Migraciones de base de datos
```

## Desarrollo

```bash
# Instalar dependencias
go mod download

# Ejecutar con hot reload (air)
air

# O ejecutar directamente
go run cmd/api/main.go
```

## Variables de Entorno

Ver `.env.example` en la raíz del proyecto.

## Migraciones

Las migraciones se ejecutan con herramientas como `golang-migrate` o `sql-migrate`.
