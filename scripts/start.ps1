# Script de inicio rapido para Docker Compose
# 
# Proyecto con stack Docker completo (frontend + backend + monitoreo)
#
# Uso: .\start.ps1 [modo]
#   .\start.ps1         - Modo frontend solo
#   .\start.ps1 dev     - ⚠️ Legacy: Desarrollo con backend local
#   .\start.ps1 full    - Arquitectura completa (RECOMENDADO)
#   .\start.ps1 stop    - Detener servicios

param(
    [Parameter(Position=0)]
    [ValidateSet('simple','dev','full','stop','help')]
    [string]$Modo = "simple"
)

$ErrorActionPreference = "Stop"

Write-Host "Docker Compose - Aplicacion Scout" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

function Show-Menu {
    Write-Host "Modos disponibles:" -ForegroundColor Yellow
    Write-Host "  simple - Solo frontend con mocks locales" -ForegroundColor Green
    Write-Host "  dev    - ⚠️ Legacy: Desarrollo con backend local (no recomendado)" -ForegroundColor DarkYellow
    Write-Host "  full   - Arquitectura completa (RECOMENDADO)" -ForegroundColor Green
    Write-Host "  stop   - Detener servicios actuales" -ForegroundColor White
    Write-Host ""
}

function Start-SimpleMode {
    Write-Host "Iniciando modo SIMPLE (Solo Frontend + Mocks)..." -ForegroundColor Green
    Write-Host ""
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "[ERROR] Docker no está instalado o no está en PATH." -ForegroundColor Red
        Write-Host "Instala Docker Desktop e intenta nuevamente: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
        return
    }

    if (-not (Test-Path -Path "docker-compose.yml")) {
        Write-Host "[ERROR] No se encontró docker-compose.yml en el directorio actual." -ForegroundColor Red
        Write-Host "Ubicación actual: $(Get-Location)" -ForegroundColor Yellow
        return
    }

    docker compose up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] Frontend iniciado correctamente!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Accede a:" -ForegroundColor Yellow
        Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor White
        Write-Host ""
        Write-Host "Usuario por defecto:" -ForegroundColor Yellow
        Write-Host "  Email:     admin@scout.com" -ForegroundColor White
        Write-Host "  Password:  cualquiera" -ForegroundColor White
        Write-Host ""
        Write-Host "Características:" -ForegroundColor Yellow
        Write-Host "  - Autenticación local (localStorage)" -ForegroundColor White
        Write-Host "  - Sin backend necesario" -ForegroundColor White
        Write-Host "  - Sin Supabase" -ForegroundColor White
        Write-Host ""
        Write-Host "Para detener: .\start.ps1 stop" -ForegroundColor Cyan
    } else {
        Write-Host "[ERROR] Falló el inicio de los servicios." -ForegroundColor Red
        Write-Host "Revisa los logs con: docker compose logs -f" -ForegroundColor Yellow
    }
}

function Start-DevMode {
    Write-Host "⚠️ MODO LEGACY - Requiere backend configurado" -ForegroundColor DarkYellow
    Write-Host ""
    Write-Host "Este modo requiere:" -ForegroundColor Yellow
    Write-Host "  1. Python instalado (para better-sqlite3)" -ForegroundColor White
    Write-Host "  2. cd server && npm install" -ForegroundColor White
    Write-Host "  3. Configurar variables de entorno" -ForegroundColor White
    Write-Host ""
    $confirm = Read-Host "¿Continuar de todos modos? (s/N)"
    if ($confirm -ne 's') {
        Write-Host "Cancelado. Usa '.\start.ps1 simple' en su lugar." -ForegroundColor Cyan
        return
    }
    
    Write-Host ""
    Write-Host "Iniciando modo DESARROLLO (SQLite)..." -ForegroundColor Green
    Write-Host ""
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "[ERROR] Docker no está instalado o no está en PATH." -ForegroundColor Red
        Write-Host "Instala Docker Desktop e intenta nuevamente: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
        return
    }

    if (-not (Test-Path -Path "docker-compose.dev.yml")) {
        Write-Host "[ERROR] No se encontró docker-compose.dev.yml en el directorio actual." -ForegroundColor Red
        Write-Host "Ubicación actual: $(Get-Location)" -ForegroundColor Yellow
        return
    }

    docker compose -f docker-compose.dev.yml up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] Servicios iniciados correctamente!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Accede a:" -ForegroundColor Yellow
        Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor White
        Write-Host "  Backend:   http://localhost:8080 (si está configurado)" -ForegroundColor DarkYellow
        Write-Host ""
        Write-Host "Ver logs:    docker compose -f docker-compose.dev.yml logs -f" -ForegroundColor Gray
        Write-Host "Detener:     docker compose -f docker-compose.dev.yml down" -ForegroundColor Gray
        Write-Host ""
    }
}

function Start-FullMode {
    Write-Host "Iniciando arquitectura COMPLETA (PostgreSQL + Monitoreo + Storage)" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Levantando contenedores..." -ForegroundColor Green
    Write-Host ""
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Host "[ERROR] Docker no está instalado o no está en PATH." -ForegroundColor Red
        Write-Host "Instala Docker Desktop e intenta nuevamente: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
        return
    }

    if (-not (Test-Path -Path "docker-compose.full.yml")) {
        Write-Host "[ERROR] No se encontró docker-compose.full.yml en el directorio actual." -ForegroundColor Red
        Write-Host "Ubicación actual: $(Get-Location)" -ForegroundColor Yellow
        return
    }

    docker compose -f docker-compose.full.yml up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] Todos los servicios iniciados correctamente!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Accede a:" -ForegroundColor Yellow
        Write-Host "  Frontend:   http://localhost:5173" -ForegroundColor White
        Write-Host "  Backend:    http://localhost:8080" -ForegroundColor White
        Write-Host "  PgAdmin:    http://localhost:5050  (admin@scout.local / admin123)" -ForegroundColor White
    Write-Host "  Mailhog:    http://localhost:8025" -ForegroundColor White
    Write-Host "  MinIO:      http://localhost:9001 (minio / minio12345)" -ForegroundColor White
    Write-Host "  Uploader:   http://localhost:4001" -ForegroundColor White
    Write-Host "  Prometheus: http://localhost:9090" -ForegroundColor White
    Write-Host "  Grafana:    http://localhost:3000  (admin / admin)" -ForegroundColor White
        Write-Host ""
        Write-Host "Ver logs:    docker compose -f docker-compose.full.yml logs -f" -ForegroundColor Gray
        Write-Host "Detener:     docker compose -f docker-compose.full.yml down" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Documentacion completa: docs/docker/ARCHITECTURE.md" -ForegroundColor Cyan
        Write-Host ""
    }
}

function Stop-Services {
    Write-Host "Deteniendo servicios..." -ForegroundColor Yellow
    Write-Host ""
    
    if (Get-Command docker -ErrorAction SilentlyContinue) {
        Write-Host "Deteniendo modo simple..." -ForegroundColor Gray
        docker compose down 2>$null
        
        Write-Host "Deteniendo modo dev..." -ForegroundColor Gray
        docker compose -f docker-compose.dev.yml down 2>$null
        
        Write-Host "Deteniendo modo full..." -ForegroundColor Gray
        docker compose -f docker-compose.full.yml down 2>$null
    }
    
    Write-Host ""
    Write-Host "[OK] Servicios detenidos" -ForegroundColor Green
    Write-Host ""
}

# Main
switch ($Modo.ToLower()) {
    "simple" {
        Start-SimpleMode
    }
    "dev" {
        Start-DevMode
    }
    "full" {
        Start-FullMode
    }
    "stop" {
        Stop-Services
    }
    "help" {
        Show-Menu
    }
    default {
        Write-Host "[ERROR] Modo no reconocido: $Modo" -ForegroundColor Red
        Write-Host ""
        Show-Menu
        Write-Host "Uso: .\start.ps1 [dev|full|stop]" -ForegroundColor Yellow
        Write-Host ""
        exit 1
    }
}
