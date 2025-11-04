@echo off
set PATH=%PATH%;C:\Program Files\Docker\Docker\resources\bin
"C:\Program Files\Docker\Docker\resources\bin\docker.exe" compose -f docker-compose.dev.yml up --build
