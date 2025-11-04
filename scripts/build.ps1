# Script para gestionar entornos y builds
# Uso: .\build.ps1 [dev|staging|prod]

param(
    [Parameter(Position=0)]
    [ValidateSet("dev", "staging", "prod", "help")]
    [string]$Env = "help"
)

$ErrorActionPreference = "Stop"

function Show-Help {
    Write-Host "Gestion de Entornos y Builds" -ForegroundColor Cyan
    Write-Host "=============================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Uso: .\build.ps1 [entorno]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Entornos disponibles:" -ForegroundColor Yellow
    Write-Host "  dev      - Build de desarrollo" -ForegroundColor White
    Write-Host "  staging  - Build de pre-produccion (testing)" -ForegroundColor White
    Write-Host "  prod     - Build de produccion (listo para deploy)" -ForegroundColor White
    Write-Host ""
    Write-Host "Ejemplos:" -ForegroundColor Yellow
    Write-Host "  .\build.ps1 dev      # Build de desarrollo" -ForegroundColor Gray
    Write-Host "  .\build.ps1 staging  # Build de staging" -ForegroundColor Gray
    Write-Host "  .\build.ps1 prod     # Build de produccion" -ForegroundColor Gray
    Write-Host ""
}

function Build-Environment {
    param([string]$Environment)
    
    Write-Host ""
    Write-Host ">> Construyendo para $Environment..." -ForegroundColor Green
    Write-Host ""
    
    # Verificar que el archivo .env existe
    $envFile = ".env.$Environment"
    if (-not (Test-Path $envFile)) {
        Write-Host "[ERROR] No se encuentra el archivo $envFile" -ForegroundColor Red
        Write-Host "Crea el archivo desde .env.$Environment.example" -ForegroundColor Yellow
        exit 1
    }
    
    # Limpiar build anterior
    Write-Host "Limpiando builds anteriores..." -ForegroundColor Cyan
    if (Test-Path "dist") {
        Remove-Item -Path "dist" -Recurse -Force
    }
    
    # Ejecutar build
    Write-Host ""
    Write-Host "Ejecutando build para $Environment..." -ForegroundColor Cyan
    
    switch ($Environment) {
        "dev" {
            npm run build:dev
        }
        "staging" {
            npm run build:staging
        }
        "prod" {
            npm run build
        }
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] Build completado exitosamente!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Archivos generados en: dist/" -ForegroundColor Cyan
        Write-Host ""
        
        # Mostrar tamano del build
        if (Test-Path "dist") {
            $size = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
            $sizeMB = [math]::Round($size / 1MB, 2)
            Write-Host "Tamano total: $sizeMB MB" -ForegroundColor White
        }
        
        Write-Host ""
        Write-Host "Proximo paso:" -ForegroundColor Yellow
        switch ($Environment) {
            "dev" {
                Write-Host "  npm run preview:dev    # Ver build local" -ForegroundColor White
            }
            "staging" {
                Write-Host "  npm run preview:staging # Ver build local" -ForegroundColor White
                Write-Host "  npm run deploy:staging  # Deployar a staging" -ForegroundColor White
            }
            "prod" {
                Write-Host "  npm run preview         # Ver build local" -ForegroundColor White
                Write-Host "  npm run deploy:prod     # Deployar a produccion" -ForegroundColor White
            }
        }
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "[ERROR] Build fallido" -ForegroundColor Red
        exit 1
    }
}

# Main
if ($Env -eq "help") {
    Show-Help
    exit 0
}

Build-Environment -Environment $Env
