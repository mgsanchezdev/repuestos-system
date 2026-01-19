# Script para crear el repositorio en GitHub y hacer push
# Ejecutar después de instalar GitHub CLI

Write-Host "Verificando GitHub CLI..." -ForegroundColor Cyan
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "GitHub CLI no está instalado." -ForegroundColor Red
    Write-Host "Por favor instala GitHub CLI desde: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host "O ejecuta: winget install --id GitHub.cli" -ForegroundColor Yellow
    exit 1
}

Write-Host "GitHub CLI encontrado!" -ForegroundColor Green

Write-Host "`nVerificando autenticación..." -ForegroundColor Cyan
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "No estás autenticado en GitHub CLI." -ForegroundColor Yellow
    Write-Host "Ejecutando: gh auth login" -ForegroundColor Cyan
    gh auth login
}

Write-Host "`nCreando repositorio en GitHub..." -ForegroundColor Cyan
gh repo create repuestos-system --public --source=. --remote=origin --push

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n¡Repositorio creado exitosamente!" -ForegroundColor Green
    Write-Host "URL: https://github.com/mgsanchezdev/repuestos-system" -ForegroundColor Cyan
} else {
    Write-Host "`nError al crear el repositorio." -ForegroundColor Red
    Write-Host "Verifica que tengas permisos y que el repositorio no exista ya." -ForegroundColor Yellow
}
