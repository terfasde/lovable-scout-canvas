# Script de inicio rapido para Docker Compose
# Uso: .\start.ps1 [modo]
#   .\start.ps1 dev     - Modo desarrollo simple (SQLite)
#   .\start.ps1 full    - Arquitectura completa (PostgreSQL + Monitoreo)
#   .\start.ps1 stop    - Detener servicios

param(
    [Parameter(Position=0)]
    [ValidateSet('dev','full','stop','help')]
    [string]$Modo = "full"
)

$ErrorActionPreference = "Stop"

Write-Host "Docker Compose - Aplicacion Scout" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

function Show-Menu {
    Write-Host "Modos disponibles:" -ForegroundColor Yellow
    Write-Host "  dev   - Desarrollo simple (web + server + SQLite)" -ForegroundColor White
    Write-Host "  full  - Arquitectura completa (PostgreSQL + PgAdmin + Prometheus + Grafana)" -ForegroundColor White
    Write-Host "  stop  - Detener servicios actuales" -ForegroundColor White
    Write-Host ""
}

function Start-DevMode {
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
        Write-Host "  Backend:   http://localhost:8080" -ForegroundColor White
        Write-Host ""
        Write-Host "Ver logs:    docker compose -f docker-compose.dev.yml logs -f" -ForegroundColor Gray
        Write-Host "Detener:     docker compose -f docker-compose.dev.yml down" -ForegroundColor Gray
        Write-Host ""
    }
}

function Start-FullMode {
    Write-Host "Iniciando arquitectura COMPLETA (PostgreSQL + Monitoreo)..." -ForegroundColor Green
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
        Write-Host "  Prometheus: http://localhost:9090" -ForegroundColor White
        Write-Host "  Grafana:    http://localhost:3000  (admin / admin123)" -ForegroundColor White
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
    
    Write-Host "Deteniendo modo dev..." -ForegroundColor Gray
    if (Get-Command docker -ErrorAction SilentlyContinue) {
        docker compose -f docker-compose.dev.yml down 2>$null
        docker compose -f docker-compose.full.yml down 2>$null
    }
    
    Write-Host ""
    Write-Host "[OK] Servicios detenidos" -ForegroundColor Green
    Write-Host ""
}

# Main
switch ($Modo.ToLower()) {
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
