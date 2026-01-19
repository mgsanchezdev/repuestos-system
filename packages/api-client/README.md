# API Client

SDK TypeScript para consumir la API del backend.

## Uso

```typescript
import { catalogApi, authApi } from '@repuestos-platform/api-client';

// Listar productos
const products = await catalogApi.listProducts();

// Login
const response = await authApi.login({ email: '...', password: '...' });
```

## Configuración

La URL base de la API se configura mediante la variable de entorno `NEXT_PUBLIC_API_URL` o por defecto usa `http://localhost:8080`.

## Desarrollo

```bash
# Build
npm run build

# Watch mode
npm run dev
```
