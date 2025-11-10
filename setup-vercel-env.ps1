# Script para configurar variables de entorno en Vercel
# Uso: .\setup-vercel-env.ps1

Write-Host "🔧 Configurando variables de entorno en Vercel..." -ForegroundColor Cyan

# Leer archivo .env.vercel
$envFile = Get-Content ".env.vercel" | Where-Object { $_ -notmatch '^#' -and $_ -notmatch '^\s*$' }

Write-Host "`n📝 Variables a configurar:" -ForegroundColor Yellow
$envFile | ForEach-Object {
    $parts = $_ -split '=', 2
    if ($parts.Length -eq 2) {
        $key = $parts[0].Trim()
        Write-Host "  ✓ $key" -ForegroundColor Green
    }
}

Write-Host "`n🚀 Ejecutando comandos Vercel..." -ForegroundColor Cyan

foreach ($line in $envFile) {
    $parts = $line -split '=', 2
    if ($parts.Length -eq 2) {
        $key = $parts[0].Trim()
        $value = $parts[1].Trim()
        
        Write-Host "Adding $key..." -ForegroundColor Gray
        
        # Agregar variable a todos los entornos (production, preview, development)
        echo $value | vercel env add $key production
        echo $value | vercel env add $key preview
        echo $value | vercel env add $key development
    }
}

Write-Host "`n✅ Variables configuradas exitosamente!" -ForegroundColor Green
Write-Host "💡 Ahora ejecuta: vercel --prod" -ForegroundColor Yellow
