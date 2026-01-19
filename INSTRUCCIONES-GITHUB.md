# Instrucciones para crear el repositorio en GitHub

## Opción 1: Usar GitHub CLI (Recomendado)

### Paso 1: Instalar GitHub CLI

Descarga e instala GitHub CLI desde: https://cli.github.com/

O usando winget (en PowerShell como Administrador):
```powershell
winget install --id GitHub.cli
```

### Paso 2: Autenticarte

Después de instalar, ejecuta:
```powershell
gh auth login
```

Sigue las instrucciones para autenticarte con tu cuenta de GitHub.

### Paso 3: Crear el repositorio

Una vez autenticado, ejecuta:
```powershell
.\setup-github-repo.ps1
```

O manualmente:
```powershell
gh repo create repuestos-system --public --source=. --remote=origin --push
```

## Opción 2: Crear manualmente en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `repuestos-system`
3. Visibilidad: Public (o Private si prefieres)
4. **NO** marques ninguna opción (README, .gitignore, licencia)
5. Click en "Create repository"
6. Luego ejecuta:
   ```powershell
   git push -u origin main
   ```

## Verificar estado actual

Tu repositorio local ya está listo:
- ✅ Git inicializado
- ✅ Rama `main` creada
- ✅ Commit inicial realizado (83 archivos)
- ✅ Remote configurado

Solo falta crear el repositorio en GitHub y hacer push.
