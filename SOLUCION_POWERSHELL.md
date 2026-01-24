# Solución para Error de Ejecución de Scripts en PowerShell

## Problema
```
npm : No se puede cargar el archivo C:\nvm4w\nodejs\npm.ps1 porque la ejecución de scripts está deshabilitada en este sistema.
```

## Solución Temporal (Solo para la sesión actual)

Ejecuta este comando cada vez que abras PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

## Solución Permanente (Recomendada)

### Opción 1: Cambiar la política para el usuario actual (Recomendado)

Ejecuta PowerShell **como Administrador** y luego:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Opción 2: Usar un perfil de PowerShell

Crea o edita tu perfil de PowerShell:

```powershell
# Verificar si existe el perfil
Test-Path $PROFILE

# Si no existe, crear el archivo
New-Item -Path $PROFILE -Type File -Force

# Editar el perfil
notepad $PROFILE
```

Agrega esta línea al archivo del perfil:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

Esto aplicará la política automáticamente cada vez que abras PowerShell.

### Opción 3: Ejecutar comandos específicos sin cambiar la política

Puedes ejecutar npm directamente usando:

```powershell
& "C:\nvm4w\nodejs\npm.cmd" install
& "C:\nvm4w\nodejs\npm.cmd" run dev
```

O crear un alias en tu perfil:

```powershell
# En el perfil de PowerShell ($PROFILE)
function npm { & "C:\nvm4w\nodejs\npm.cmd" $args }
```

## Verificar la Política Actual

```powershell
Get-ExecutionPolicy -List
```

## Nota de Seguridad

- `RemoteSigned`: Permite ejecutar scripts locales sin firma, pero requiere firma para scripts descargados de internet (recomendado)
- `Bypass`: Desactiva todas las restricciones (no recomendado por seguridad)
- `Restricted`: Bloquea todos los scripts (valor por defecto en algunos sistemas)

La opción `RemoteSigned` es un buen equilibrio entre seguridad y funcionalidad.
