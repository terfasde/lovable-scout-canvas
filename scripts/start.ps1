# Script de inicio rápido para Docker Compose
# Uso: .\start.ps1 [modo]
#   .\start.ps1 dev     → Modo desarrollo simple (SQLite)
#   .\start.ps1 full    → Arquitectura completa (PostgreSQL + Monitoreo)
#   .\start.ps1 stop    → Detener servicios

param(
    [Parameter(Position=0)]
    [string]$Modo = "full"
)

$ErrorActionPreference = "Stop"

Write-Host "🐋 Docker Compose - Aplicación Scout" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

function Show-Menu {
    Write-Host "Modos disponibles:" -ForegroundColor Yellow
    Write-Host "  dev   - Desarrollo simple (web + server + SQLite)" -ForegroundColor White
    Write-Host "  full  - Arquitectura completa (PostgreSQL + PgAdmin + Prometheus + Grafana)" -ForegroundColor White
    Write-Host "  stop  - Detener servicios actuales`n" -ForegroundColor White
}

function Start-DevMode {
    Write-Host "🚀 Iniciando modo DESARROLLO (SQLite)...`n" -ForegroundColor Green
    docker compose -f docker-compose.dev.yml up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Servicios iniciados correctamente!" -ForegroundColor Green
        Write-Host "`nAccede a:" -ForegroundColor Yellow
        Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor White
        Write-Host "  Backend:   http://localhost:8080" -ForegroundColor White
        Write-Host "`nVer logs:    docker compose -f docker-compose.dev.yml logs -f" -ForegroundColor Gray
        Write-Host "Detener:     docker compose -f docker-compose.dev.yml down`n" -ForegroundColor Gray
    }
}

function Start-FullMode {
    Write-Host "🚀 Iniciando arquitectura COMPLETA (PostgreSQL + Monitoreo)...`n" -ForegroundColor Green
    docker compose -f docker-compose.full.yml up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Todos los servicios iniciados correctamente!" -ForegroundColor Green
        Write-Host "`nAccede a:" -ForegroundColor Yellow
        Write-Host "  Frontend:   http://localhost:5173" -ForegroundColor White
        Write-Host "  Backend:    http://localhost:8080" -ForegroundColor White
        Write-Host "  PgAdmin:    http://localhost:5050  (admin@scout.local / admin123)" -ForegroundColor White
        Write-Host "  Prometheus: http://localhost:9090" -ForegroundColor White
        Write-Host "  Grafana:    http://localhost:3000  (admin / admin123)" -ForegroundColor White
        Write-Host "`nVer logs:    docker compose -f docker-compose.full.yml logs -f" -ForegroundColor Gray
        Write-Host "Detener:     docker compose -f docker-compose.full.yml down`n" -ForegroundColor Gray
        Write-Host "📚 Documentación completa: DOCKER_ARCHITECTURE.md`n" -ForegroundColor Cyan
    }
}

function Stop-Services {
    Write-Host "🛑 Deteniendo servicios...`n" -ForegroundColor Yellow
    
    Write-Host "Deteniendo modo dev..." -ForegroundColor Gray
    docker compose -f docker-compose.dev.yml down 2>$null
    
    Write-Host "Deteniendo modo full..." -ForegroundColor Gray
    docker compose -f docker-compose.full.yml down 2>$null
    
    Write-Host "`n✅ Servicios detenidos`n" -ForegroundColor Green
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
        Write-Host "⚠️  Modo '$Modo' no reconocido`n" -ForegroundColor Red
        Show-Menu
        Write-Host "Uso: .\start.ps1 [dev|full|stop]`n" -ForegroundColor Yellow
        exit 1
    }
}
