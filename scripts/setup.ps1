# scripts/setup.ps1 - Helper mínimo para Windows (PowerShell)
# Ejecutar en PowerShell con permisos de usuario:
#   powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1

param(
  [switch]$SkipSystem
)

Write-Host "🔧 Inicio del setup (Windows)"

function Warn($msg){ Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Info($msg){ Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function ErrorExit($msg){ Write-Host "[ERROR] $msg" -ForegroundColor Red; exit 1 }

# 1) Verificar Node
$required = 'v20.17.0'
$nodeVer = (node -v) 2>$null
if ($LASTEXITCODE -ne 0 -or -not $nodeVer) {
  Warn "Node no instalado o no en PATH. Se recomienda instalar Node 20.17.0."
  Warn "Recomendado: instalar nvm-windows: https://github.com/coreybutler/nvm-windows/releases"
  Write-Host "Si ya instalaste nvm-windows: abrir nueva terminal y ejecutar: nvm install 20.17.0; nvm use 20.17.0"
  Read-Host "Presioná Enter para continuar cuando hayas instalado Node 20.17.0 (o Ctrl+C para salir)"
} else {
  Info "Node detectado: $nodeVer"
}

# 2) Instalar dependencias npm
if (Test-Path package.json) {
  Info "Instalando dependencias (root)..."
  npm install
}
if (Test-Path server\package.json) {
  Info "Instalando dependencias (server)..."
  Push-Location server
  npm install
  Pop-Location
}

# 3) Preparar Husky (si aplica)
if (npm run | Select-String "prepare") {
  Info "Ejecutando npm run prepare"
  npm run prepare
}

# 4) Checks básicos
if (npm run | Select-String "type-check") {
  npm run type-check
}
if (npm run | Select-String "lint") {
  npm run lint
}

Info "Setup Windows finalizado. Editá .env.local con tus credenciales y ejecutá 'npm run dev' (y server/npm run dev en server/)"
