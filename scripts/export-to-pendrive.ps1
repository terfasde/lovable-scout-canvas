# Script para exportar el proyecto a un pendrive
# Uso: .\export-to-pendrive.ps1 [ruta_destino]
# Ejemplo: .\export-to-pendrive.ps1 E:\lovable-scout-canvas

param(
    [Parameter(Position=0)]
    [string]$Destino = ""
)

$ErrorActionPreference = "Stop"

Write-Host "Exportacion de Proyecto a Pendrive" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Si no se proporciona destino, solicitarlo
if ([string]::IsNullOrEmpty($Destino)) {
    Write-Host "Ingresa la ruta de destino (ejemplo: E:\lovable-scout-canvas):" -ForegroundColor Yellow
    $Destino = Read-Host "Destino"
}

# Validar que el destino no este vacio
if ([string]::IsNullOrEmpty($Destino)) {
    Write-Host "[ERROR] Debes proporcionar una ruta de destino" -ForegroundColor Red
    exit 1
}

# Convertir a ruta absoluta
$Destino = $Destino.TrimEnd('\')
$OrigenRaiz = Get-Location

Write-Host "Origen:  $OrigenRaiz" -ForegroundColor White
Write-Host "Destino: $Destino" -ForegroundColor White
Write-Host ""

# Confirmar
Write-Host "Se copiaran los archivos excluyendo:" -ForegroundColor Yellow
Write-Host "  - node_modules/" -ForegroundColor Gray
Write-Host "  - dist/" -ForegroundColor Gray
Write-Host "  - .git/" -ForegroundColor Gray
Write-Host "  - server/node_modules/" -ForegroundColor Gray
Write-Host "  - server/dist/" -ForegroundColor Gray
Write-Host "  - archivos temporales y cache" -ForegroundColor Gray
Write-Host ""

$confirmacion = Read-Host "Continuar? (S/N)"
if ($confirmacion -ne "S" -and $confirmacion -ne "s") {
    Write-Host "Exportacion cancelada" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Iniciando exportacion..." -ForegroundColor Green

# Crear carpeta de destino si no existe
if (-not (Test-Path $Destino)) {
    New-Item -ItemType Directory -Path $Destino | Out-Null
    Write-Host "[OK] Carpeta de destino creada" -ForegroundColor Green
}

# Carpetas y archivos a excluir
$Exclusiones = @(
    "node_modules",
    "dist",
    ".git",
    "server\node_modules",
    "server\dist",
    "supabase\.temp",
    ".next",
    ".turbo",
    ".cache",
    "*.log",
    "*.tsbuildinfo",
    ".DS_Store",
    "Thumbs.db"
)

# Crear patron de exclusion para robocopy
$ExcluirDirs = @("node_modules", "dist", ".git", ".temp", ".next", ".turbo", ".cache")
$ExcluirArchivos = @("*.log", "*.tsbuildinfo", ".DS_Store", "Thumbs.db")

Write-Host "Copiando archivos..." -ForegroundColor Cyan

# Usar robocopy para copiar eficientemente
$RobocopyArgs = @(
    $OrigenRaiz,
    $Destino,
    "/E",           # Copiar subdirectorios incluyendo vacios
    "/XD"           # Excluir directorios
) + $ExcluirDirs + @(
    "/XF"           # Excluir archivos
) + $ExcluirArchivos + @(
    "/R:2",         # Reintentos
    "/W:3",         # Espera entre reintentos
    "/NP",          # No mostrar progreso por archivo
    "/NDL",         # No listar directorios
    "/NFL"          # No listar archivos
)

$resultado = robocopy @RobocopyArgs

# Robocopy retorna codigos de salida especiales
# 0-7 son exitosos, 8+ son errores
if ($LASTEXITCODE -lt 8) {
    Write-Host ""
    Write-Host "[OK] Exportacion completada exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Proyecto exportado a: $Destino" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Pasos en la nueva computadora:" -ForegroundColor Yellow
    Write-Host "1. Copiar la carpeta al disco local" -ForegroundColor White
    Write-Host "2. Abrir PowerShell en la carpeta del proyecto" -ForegroundColor White
    Write-Host "3. Ejecutar: npm install" -ForegroundColor White
    Write-Host "4. Ejecutar: cd server" -ForegroundColor White
    Write-Host "5. Ejecutar: npm install" -ForegroundColor White
    Write-Host "6. Ejecutar: cd .." -ForegroundColor White
    Write-Host "7. Copiar .env.example a .env y configurar" -ForegroundColor White
    Write-Host "8. Ejecutar: npm run dev" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "[ERROR] Hubo problemas durante la exportacion" -ForegroundColor Red
    Write-Host "Codigo de error: $LASTEXITCODE" -ForegroundColor Red
    exit 1
}
