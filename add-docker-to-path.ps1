# Script para agregar Docker al PATH del sistema de forma permanente
# Debe ejecutarse con privilegios de administrador

$dockerPath = "C:\Program Files\Docker\Docker\resources\bin"

# Obtener el PATH actual del sistema
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")

# Verificar si Docker ya está en el PATH
if ($currentPath -notlike "*$dockerPath*") {
    Write-Host "Agregando Docker al PATH del sistema..." -ForegroundColor Yellow
    
    # Agregar Docker al PATH
    $newPath = $currentPath + ";" + $dockerPath
    [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
    
    Write-Host "✓ Docker agregado al PATH del sistema exitosamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANTE: Debes REINICIAR VS Code y PowerShell para que los cambios tomen efecto." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Después de reiniciar, ejecuta:" -ForegroundColor White
    Write-Host "  docker --version" -ForegroundColor Yellow
    Write-Host "  npm run dev:docker" -ForegroundColor Yellow
} else {
    Write-Host "✓ Docker ya está en el PATH del sistema" -ForegroundColor Green
    Write-Host ""
    Write-Host "Si el comando 'docker' aún no funciona, reinicia VS Code y PowerShell." -ForegroundColor Cyan
}
