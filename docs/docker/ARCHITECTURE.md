# 🐋 Arquitectura Docker - Aplicación Scout

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Arquitectura](#arquitectura)
- [Servicios](#servicios)
- [Inicio Rápido](#inicio-rápido)
- [Acceso a Servicios](#acceso-a-servicios)
- [Configuración](#configuración)
- [Monitoreo](#monitoreo)
- [Comandos Útiles](#comandos-útiles)
- [Migración desde SQLite](#migración-desde-sqlite)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Descripción General

Este proyecto utiliza una arquitectura de microservicios con contenedores Docker separados para:

- **Frontend**: Aplicación React con Vite
- **Backend API**: Express + Node.js
- **Base de Datos**: PostgreSQL 16
- **Administración DB**: PgAdmin 4
- **Monitoreo**: Prometheus + Grafana
- **Métricas DB**: PostgreSQL Exporter

### Ventajas de esta arquitectura:

✅ **Separación de responsabilidades**: Cada servicio en su propio contenedor  
✅ **Escalabilidad**: Fácil escalar servicios individualmente  
✅ **Desarrollo**: Entorno idéntico a producción  
✅ **Monitoreo**: Observabilidad completa con métricas en tiempo real  
✅ **Mantenibilidad**: Actualizaciones y backups simplificados

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                 │
└────────────┬───────────────────────────────────┬────────────────┘
             │                                   │
             ▼                                   ▼
    ┌────────────────┐                  ┌────────────────┐
    │   Frontend     │                  │   PgAdmin      │
    │   React+Vite   │                  │   :5050        │
    │   :5173        │                  └────────────────┘
    └────────┬───────┘
             │
             ▼
    ┌────────────────┐         ┌────────────────┐
    │   Backend API  │────────▶│   PostgreSQL   │
    │   Express      │         │   :5432        │
    │   :8080        │         └────────────────┘
    └────────┬───────┘                  │
             │                          │
             │                          ▼
             │                 ┌────────────────┐
             │                 │  Postgres      │
             │                 │  Exporter      │
             │                 │  :9187         │
             │                 └────────────────┘
             │                          │
             ▼                          │
    ┌────────────────┐                 │
    │  Prometheus    │◀────────────────┘
    │  :9090         │
    └────────┬───────┘
             │
             ▼
    ┌────────────────┐
    │   Grafana      │
    │   :3000        │
    └────────────────┘
```

---

## 🐳 Servicios

### 1. PostgreSQL (Base de Datos)

**Puerto**: 5432  
**Imagen**: `postgres:16-alpine`  
**Propósito**: Base de datos principal de la aplicación

**Características**:

- Alta disponibilidad con healthcheck
- Volumen persistente para datos
- Script de inicialización automática (`init.sql`)
- Optimizado con Alpine Linux

**Variables de entorno**:

```env
POSTGRES_DB=scoutdb
POSTGRES_USER=scoutuser
POSTGRES_PASSWORD=scout_secure_password_2024
```

---

### 2. PgAdmin (Administración de DB)

**Puerto**: 5050  
**Imagen**: `dpage/pgadmin4:latest`  
**Propósito**: Interfaz web para administrar PostgreSQL

**Credenciales**:

- Email: `admin@scout.local`
- Password: `admin123`

**Funcionalidades**:

- Gestión visual de base de datos
- Editor SQL
- Visualización de tablas y relaciones
- Exportación/importación de datos

---

### 3. Backend (Express API)

**Puerto**: 8080  
**Imagen**: `node:20-alpine`  
**Propósito**: API REST del servidor

**Características**:

- Autenticación JWT
- Upload de imágenes
- WebSockets para tiempo real
- Métricas de Prometheus
- Soporte para PostgreSQL y SQLite

**Endpoints principales**:

- `GET /health` - Health check
- `GET /metrics` - Métricas Prometheus
- `POST /auth/login` - Login
- `GET /api/profiles` - Perfiles
- `GET /api/gallery` - Galería

---

### 4. Frontend (React + Vite)

**Puerto**: 5173  
**Imagen**: `node:20-alpine`  
**Propósito**: Aplicación web del usuario

**Características**:

- React 18 con TypeScript
- Hot Module Replacement (HMR)
- Build optimizado con code splitting
- SEO optimizado

---

### 5. Prometheus (Recolección de Métricas)

**Puerto**: 9090  
**Imagen**: `prom/prometheus:latest`  
**Propósito**: Recolección y almacenamiento de métricas

**Métricas recolectadas**:

- Peticiones HTTP (rate, duración, errores)
- Uso de CPU y memoria
- Conexiones a base de datos
- Transacciones de PostgreSQL

---

### 6. Grafana (Visualización)

**Puerto**: 3000  
**Imagen**: `grafana/grafana:latest`  
**Propósito**: Dashboards de monitoreo

**Credenciales**:

- Usuario: `admin`
- Password: `admin123`

**Dashboards incluidos**:

- Scout - Monitoreo General
  - Tasa de peticiones HTTP
  - Latencia p95
  - Uso de CPU/Memoria
  - Conexiones PostgreSQL
  - Transacciones por segundo

---

### 7. PostgreSQL Exporter

**Puerto**: 9187  
**Imagen**: `prometheuscommunity/postgres-exporter:latest`  
**Propósito**: Exportar métricas de PostgreSQL a Prometheus

---

## 🚀 Inicio Rápido

### Opción 1: Arquitectura completa (Recomendado)

```powershell
# Iniciar todos los servicios
docker compose -f docker-compose.full.yml up -d

# Ver logs
docker compose -f docker-compose.full.yml logs -f

# Detener servicios
docker compose -f docker-compose.full.yml down
```

### Opción 2: Desarrollo simple (solo web + backend + SQLite)

```powershell
# Usar el docker-compose básico
docker compose -f docker-compose.dev.yml up -d
```

---

## 🌐 Acceso a Servicios

Una vez iniciados los contenedores:

| Servicio        | URL                   | Credenciales                 |
| --------------- | --------------------- | ---------------------------- |
| **Frontend**    | http://localhost:5173 | -                            |
| **Backend API** | http://localhost:8080 | -                            |
| **PgAdmin**     | http://localhost:5050 | admin@scout.local / admin123 |
| **Prometheus**  | http://localhost:9090 | -                            |
| **Grafana**     | http://localhost:3000 | admin / admin123             |

---

## ⚙️ Configuración

### Variables de entorno del Backend

Edita `docker-compose.full.yml` para cambiar:

```yaml
environment:
  # Base de datos
  - DB_TYPE=postgres # o 'sqlite' para desarrollo
  - DB_HOST=postgres
  - DB_PORT=5432
  - DB_NAME=scoutdb
  - DB_USER=scoutuser
  - DB_PASSWORD=scout_secure_password_2024

  # JWT y seguridad
  - JWT_SECRET=your-super-secret-jwt-key-change-in-production
  - ADMIN_EMAILS=tu-email@ejemplo.com
```

### Conexión a PostgreSQL desde PgAdmin

1. Abre http://localhost:5050
2. Login con `admin@scout.local` / `admin123`
3. Click derecho en "Servers" → "Register" → "Server"
4. Configuración:
   - **Name**: Scout Database
   - **Host**: `postgres` (nombre del contenedor)
   - **Port**: 5432
   - **Database**: scoutdb
   - **Username**: scoutuser
   - **Password**: scout_secure_password_2024

---

## 📊 Monitoreo

### Ver métricas en tiempo real

1. **Prometheus** (http://localhost:9090):
   - Explora métricas: `http_requests_total`, `process_cpu_percent`
   - Graph → Ejecuta queries PromQL

2. **Grafana** (http://localhost:3000):
   - Login: admin / admin123
   - Dashboard pre-configurado: "Scout - Monitoreo General"

### Métricas disponibles

**Backend API**:

- `http_requests_total` - Total de peticiones HTTP
- `http_request_duration_ms` - Duración de requests
- `process_cpu_percent` - Uso de CPU
- `process_memory_bytes` - Uso de memoria
- `active_connections` - Conexiones activas

**PostgreSQL**:

- `pg_stat_database_numbackends` - Conexiones activas
- `pg_stat_database_xact_commit` - Transacciones
- `pg_stat_database_tup_fetched` - Filas leídas

---

## 🛠️ Comandos Útiles

### Gestión de contenedores

```powershell
# Ver estado de servicios
docker compose -f docker-compose.full.yml ps

# Ver logs de un servicio específico
docker compose -f docker-compose.full.yml logs -f server

# Reiniciar un servicio
docker compose -f docker-compose.full.yml restart server

# Detener y eliminar todo (incluyendo volúmenes)
docker compose -f docker-compose.full.yml down -v

# Reconstruir imágenes
docker compose -f docker-compose.full.yml build
```

### Base de datos

```powershell
# Acceder a PostgreSQL CLI
docker exec -it scout-postgres psql -U scoutuser -d scoutdb

# Backup de la base de datos
docker exec scout-postgres pg_dump -U scoutuser scoutdb > backup.sql

# Restaurar backup
cat backup.sql | docker exec -i scout-postgres psql -U scoutuser -d scoutdb

# Ver logs de PostgreSQL
docker compose -f docker-compose.full.yml logs -f postgres
```

### Dentro del contenedor de PostgreSQL

```sql
-- Ver todas las tablas
\dt

-- Describir tabla
\d profiles

-- Ver conexiones activas
SELECT * FROM pg_stat_activity;

-- Ver tamaño de base de datos
SELECT pg_size_pretty(pg_database_size('scoutdb'));
```

---

## 🔄 Migración desde SQLite

Si ya tienes datos en SQLite y quieres migrar a PostgreSQL:

### 1. Exportar datos de SQLite

```powershell
# Instalar sqlite3 si no lo tienes
# En el directorio server/data
sqlite3 app.db .dump > sqlite_dump.sql
```

### 2. Convertir sintaxis SQLite → PostgreSQL

Edita `sqlite_dump.sql` y reemplaza:

- `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL PRIMARY KEY`
- `TEXT` → `VARCHAR(255)` o `TEXT`
- Elimina `BEGIN TRANSACTION` y `COMMIT`

### 3. Importar a PostgreSQL

```powershell
cat sqlite_dump.sql | docker exec -i scout-postgres psql -U scoutuser -d scoutdb
```

### Herramienta automática (recomendado)

Existe `pgloader` que convierte automáticamente:

```powershell
# Instalar pgloader
docker run --rm -v ${PWD}:/data dimitri/pgloader:latest \
  pgloader /data/app.db postgresql://scoutuser:scout_secure_password_2024@postgres/scoutdb
```

---

## 🔧 Troubleshooting

### El backend no se conecta a PostgreSQL

**Síntoma**: Error `ECONNREFUSED` en logs del servidor

**Solución**:

```powershell
# Verificar que PostgreSQL esté healthy
docker compose -f docker-compose.full.yml ps

# Ver logs de PostgreSQL
docker compose -f docker-compose.full.yml logs postgres

# Reiniciar servicios en orden
docker compose -f docker-compose.full.yml up -d postgres
docker compose -f docker-compose.full.yml up -d server
```

### PgAdmin no se conecta

**Síntoma**: "Unable to connect to server"

**Solución**:

- Usa `postgres` como hostname (no `localhost`)
- Verifica credenciales en `docker-compose.full.yml`
- Ambos contenedores deben estar en la misma red (`scout-network`)

### Puerto ya en uso

**Síntoma**: Error `Bind for 0.0.0.0:5432 failed: port is already allocated`

**Solución**:

```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :5432

# Cambiar puerto en docker-compose.full.yml
ports:
  - "5433:5432"  # Usar 5433 en host
```

### Volúmenes con datos corruptos

**Síntoma**: PostgreSQL no inicia, logs con errores de datos

**Solución**:

```powershell
# CUIDADO: Esto borra todos los datos
docker compose -f docker-compose.full.yml down -v
docker compose -f docker-compose.full.yml up -d
```

### Grafana no muestra datos

**Síntoma**: Dashboards vacíos en Grafana

**Solución**:

1. Verifica Prometheus en http://localhost:9090
2. En Grafana → Configuration → Data Sources
3. Verifica que Prometheus apunte a `http://prometheus:9090`
4. Test & Save

---

## 📚 Recursos Adicionales

- [Documentación PostgreSQL](https://www.postgresql.org/docs/)
- [Prometheus Query Language](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)

---

## 🔒 Seguridad en Producción

**⚠️ IMPORTANTE**: Antes de desplegar a producción:

1. **Cambiar contraseñas**:
   - PostgreSQL: `POSTGRES_PASSWORD`
   - PgAdmin: `PGADMIN_DEFAULT_PASSWORD`
   - Grafana: `GF_SECURITY_ADMIN_PASSWORD`
   - JWT: `JWT_SECRET`

2. **Deshabilitar puertos públicos**:
   - Exponer solo frontend (5173) y backend (8080)
   - PostgreSQL, Prometheus, Grafana solo accesibles internamente

3. **Usar variables de entorno**:

   ```powershell
   # Crear archivo .env con secretos
   docker compose -f docker-compose.full.yml --env-file .env.prod up -d
   ```

4. **Backups automáticos**:
   - Configurar cron job para `pg_dump` diario
   - Backup de volúmenes Docker

---

## 📝 Changelog

### v2.0.0 (2024-11-04)

- ✨ Arquitectura de microservicios con servicios separados
- 🐘 PostgreSQL como base de datos principal
- 📊 Sistema de monitoreo con Prometheus + Grafana
- 🔧 PgAdmin para administración visual
- 📈 Métricas en tiempo real del backend y DB
- 📚 Documentación completa

### v1.0.0

- SQLite con backend local
- Docker Compose básico

---

**Desarrollado con ❤️ para Grupo Scout**
