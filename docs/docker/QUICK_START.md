# 🚀 Inicio Rápido - Docker

## Opción 1: Script automático (Recomendado)

### Windows (PowerShell)

```powershell
# Arquitectura completa con PostgreSQL + Monitoreo
.\start.ps1 full

# Desarrollo simple con SQLite
.\start.ps1 dev

# Detener servicios
.\start.ps1 stop
```

### Linux/Mac

```bash
chmod +x start.sh

# Arquitectura completa
./start.sh full

# Desarrollo simple
./start.sh dev

# Detener servicios
./start.sh stop
```

---

## Opción 2: Comandos manuales

### Arquitectura completa (PostgreSQL + Monitoreo)

```bash
docker compose -f docker-compose.full.yml up -d
```

**Incluye**:

- 🌐 Frontend (React + Vite)
- ⚙️ Backend API (Express + TypeScript)
- 🐘 PostgreSQL 16
- 🔧 PgAdmin 4
- 📊 Prometheus
- 📈 Grafana
- 📉 PostgreSQL Exporter

**Acceso**:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080
- PgAdmin: http://localhost:5050 (admin@scout.local / admin123)
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000 (admin / admin123)

---

### Desarrollo simple (SQLite)

```bash
docker compose -f docker-compose.dev.yml up -d
```

**Incluye**:

- 🌐 Frontend
- ⚙️ Backend (SQLite)

**Acceso**:

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

---

## 📚 Documentación completa

Ver **[ARCHITECTURE.md](./ARCHITECTURE.md)** para:

- Arquitectura detallada
- Configuración de servicios
- Monitoreo con Prometheus y Grafana
- Migración desde SQLite a PostgreSQL
- Troubleshooting
- Comandos útiles
