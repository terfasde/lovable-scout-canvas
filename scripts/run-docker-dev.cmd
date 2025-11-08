@echo off
REM Compatibilidad: este script ahora inicia la arquitectura FULL por defecto
set PATH=%PATH%;C:\Program Files\Docker\Docker\resources\bin
"C:\Program Files\Docker\Docker\resources\bin\docker.exe" compose -f docker-compose.full.yml up -d
echo.
echo Stack FULL iniciado. Accede a:
echo   Web:        http://localhost:5173
echo   Backend:    http://localhost:8080
echo   Mailhog:    http://localhost:8025
echo   MinIO:      http://localhost:9001
echo   Prometheus: http://localhost:9090
echo   Grafana:    http://localhost:3000
