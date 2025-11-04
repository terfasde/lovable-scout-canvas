param(
  [Parameter(Position=0)]
  [ValidateSet("staging", "prod")]
  [string]$Env = "prod",

  [Parameter(Position=1)]
  [string]$Destination = "",

  [switch]$SkipBuild,
  [switch]$Zip
)

$ErrorActionPreference = "Stop"

Write-Host "Deploy Web (Vite React)" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host "Entorno: $Env" -ForegroundColor White
if ($Destination) { Write-Host "Destino: $Destination" -ForegroundColor White }
Write-Host ""

# 1) Build (a menos que se use -SkipBuild)
if (-not $SkipBuild) {
  Write-Host "[1/4] Construyendo proyecto..." -ForegroundColor Green
  switch ($Env) {
    "staging" { npm run build:staging }
    "prod"    { npm run build }
  }
  if ($LASTEXITCODE -ne 0) { Write-Host "[ERROR] Build fallido" -ForegroundColor Red; exit 1 }
} else {
  Write-Host "[1/4] Omitiendo build por --SkipBuild" -ForegroundColor Yellow
}

# 2) Validar dist/
Write-Host "[2/4] Validando carpeta dist/ ..." -ForegroundColor Green
if (-not (Test-Path "dist")) { Write-Host "[ERROR] No existe dist/. Ejecuta el build." -ForegroundColor Red; exit 1 }
$files = Get-ChildItem -Path "dist" -Recurse -File
if (-not $files -or $files.Count -eq 0) { Write-Host "[ERROR] dist/ está vacío" -ForegroundColor Red; exit 1 }

# 3) Empaquetar artefacto versionado en artifacts/<env>/dist-YYYYMMDD-HHmm
$timestamp = Get-Date -Format "yyyyMMdd-HHmm"
$artifactRoot = Join-Path (Get-Location) "artifacts"
$envFolder = Join-Path $artifactRoot $Env
$artifactFolderName = "dist-$timestamp"
$artifactPath = Join-Path $envFolder $artifactFolderName

Write-Host "[3/4] Generando artefacto: $artifactPath" -ForegroundColor Green
New-Item -ItemType Directory -Path $artifactPath -Force | Out-Null
Copy-Item -Path "dist\*" -Destination $artifactPath -Recurse -Force

# Crear MANIFEST y resumen de tamaños
$manifest = @()
$manifest += "Deploy manifest"
$manifest += "Date: $(Get-Date -Format 'u')"
$manifest += "Env: $Env"
$manifest += "Source: dist/"
$manifest += "Artifact: $artifactFolderName"
$manifest += ""
$manifest += "Files:"
Get-ChildItem -Path $artifactPath -Recurse | ForEach-Object {
  if (-not $_.PSIsContainer) {
    $rel = $_.FullName.Substring($artifactPath.Length).TrimStart('\/')
    $sizeKB = [math]::Round($_.Length / 1KB, 2)
    $manifest += ("  {0}  ({1} KB)" -f $rel, $sizeKB)
  }
}
$manifest | Out-File -FilePath (Join-Path $artifactPath "MANIFEST.txt") -Encoding UTF8

# 4) Opcional: ZIP
$zipPath = ""
if ($Zip) {
  $zipName = "${artifactFolderName}-$Env.zip"
  $zipPath = Join-Path $envFolder $zipName
  Write-Host "[4/4] Creando ZIP: $zipPath" -ForegroundColor Green
  if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [System.IO.Compression.ZipFile]::CreateFromDirectory($artifactPath, $zipPath)
}

# 5) Copia al destino, si se indica
if ($Destination) {
  Write-Host "Copiando artefacto a destino..." -ForegroundColor Green
  if (-not (Test-Path $Destination)) { New-Item -ItemType Directory -Path $Destination -Force | Out-Null }
  if ($Zip -and (Test-Path $zipPath)) {
    Copy-Item -Path $zipPath -Destination (Join-Path $Destination (Split-Path $zipPath -Leaf)) -Force
  } else {
    $target = Join-Path $Destination $artifactFolderName
    Copy-Item -Path $artifactPath -Destination $target -Recurse -Force
  }
}

Write-Host ""
Write-Host "[OK] Deploy empaquetado listo." -ForegroundColor Cyan
Write-Host "Artefacto: $artifactPath" -ForegroundColor White
if ($zipPath) { Write-Host "ZIP:       $zipPath" -ForegroundColor White }
if ($Destination) { Write-Host "Copiado a: $Destination" -ForegroundColor White }
Write-Host ""
Write-Host "Notas:" -ForegroundColor Yellow
Write-Host "- Sube el contenido de 'dist' (o del artefacto) a tu hosting estático (Nginx/Apache/S3/etc.)" -ForegroundColor Gray
Write-Host "- Para probar local: npm run preview(:staging)" -ForegroundColor Gray
