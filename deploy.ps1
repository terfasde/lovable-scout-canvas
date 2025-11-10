# Script de deploy rápido a Vercel
# Uso: .\deploy.ps1

Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan

# Build local para verificar que compila
Write-Host "`n📦 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!`n" -ForegroundColor Green

# Deploy a producción
Write-Host "🌐 Deploying to production..." -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✨ Deployment successful! Check your Vercel dashboard." -ForegroundColor Green
} else {
    Write-Host "`n❌ Deployment failed." -ForegroundColor Red
    exit 1
}
