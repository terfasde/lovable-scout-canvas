param(
  [int]$Port = 5173
)

Write-Host "Deteniendo servidor de desarrollo" -ForegroundColor Cyan

$stopped = $false

# 1) Matar procesos que escuchan en el puerto (por defecto Vite usa 5173)
try {
  $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Where-Object { $_.State -eq 'Listen' }
  if ($connections) {
    $pids = $connections | Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique
    foreach ($pid in $pids) {
      try {
        Stop-Process -Id $pid -Force -ErrorAction Stop
  Write-Host "Detenido PID $pid que escuchaba en puerto $Port" -ForegroundColor Green
        $stopped = $true
      } catch {
        Write-Host "Aviso: No se pudo detener PID $pid - $($_)" -ForegroundColor Yellow
      }
    }
  } else {
    Write-Host "No hay procesos escuchando en el puerto $Port" -ForegroundColor Yellow
  }
} catch {
  Write-Host "Aviso: Error revisando el puerto $($Port) - $($_)" -ForegroundColor Yellow
}

# 2) Matar procesos node con 'vite' en la línea de comandos (fallback)
try {
  $viteProcs = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match 'node' -and $_.CommandLine -match 'vite' }

  foreach ($proc in $viteProcs) {
    try {
      Stop-Process -Id $proc.ProcessId -Force -ErrorAction Stop
      Write-Host "Detenido proceso Node con Vite (PID $($proc.ProcessId))" -ForegroundColor Green
      $stopped = $true
    } catch {
      Write-Host "Aviso: No se pudo detener PID $($proc.ProcessId) - $($_)" -ForegroundColor Yellow
    }
  }
} catch {
  Write-Host "Aviso: Error buscando procesos de Vite - $($_)" -ForegroundColor Yellow
}

if (-not $stopped) {
  Write-Host "Nada que detener (servidor ya estaba apagado)" -ForegroundColor DarkGray
}

exit 0
