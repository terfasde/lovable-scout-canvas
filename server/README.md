# 🔧 Backend Scout - Servidor Express + TypeScript

## Descripción

API REST del proyecto Scout con soporte para:
- **Autenticación**: JWT, bcrypt
- **Base de datos**: PostgreSQL o SQLite
- **Upload**: Gestión de imágenes con Multer
- **Monitoreo**: Métricas Prometheus
- **WebSockets**: Comunicación en tiempo real

---

## 🚀 Instalación

```bash
npm install
```

---

## 📝 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Servidor
PORT=8080
NODE_ENV=development
ORIGIN=http://localhost:5173

# Base de datos (PostgreSQL)
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=scoutdb
DB_USER=scoutuser
DB_PASSWORD=tu_password_seguro

# O usar SQLite para desarrollo
# DB_TYPE=sqlite

# JWT y Autenticación
JWT_SECRET=your-super-secret-jwt-key-change-in-production
ADMIN_EMAILS=tu-email@ejemplo.com
ADMIN_SECRET=admin-secret-key
```

---

## 🏃 Ejecución

### Desarrollo (con hot-reload)

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```

---

## 🐳 Docker

### Desarrollo simple (SQLite)

```bash
docker compose -f ../docker-compose.dev.yml up -d
```

### Producción completa (PostgreSQL + Monitoreo)

```bash
docker compose -f ../docker-compose.full.yml up -d
```

Ver [docs/docker/ARCHITECTURE.md](../docs/docker/ARCHITECTURE.md) para detalles completos.

---

## 📊 Endpoints

### Autenticación

- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Login
- `GET /auth/me` - Usuario actual

### Perfiles

- `GET /api/profiles/:userId` - Obtener perfil
- `PUT /api/profiles/:userId` - Actualizar perfil
- `GET /api/profiles/username/:username` - Buscar por username

### Galería

- `GET /api/gallery` - Listar imágenes
- `POST /api/gallery` - Subir imagen
- `DELETE /api/gallery/:id` - Eliminar imagen

### Monitoreo

- `GET /health` - Health check
- `GET /metrics` - Métricas Prometheus

---

## 🗄️ Base de Datos

### PostgreSQL (Producción)

El servidor se conecta automáticamente a PostgreSQL cuando `DB_TYPE=postgres`.

**Schema**: Ver `db/init.sql` para la estructura completa.

### SQLite (Desarrollo)

Útil para desarrollo rápido sin configurar PostgreSQL.

**Archivo**: `data/app.db`

---

## 📈 Monitoreo

El servidor expone métricas en `/metrics` para Prometheus:

**Métricas disponibles**:
- `http_requests_total` - Total de peticiones HTTP
- `http_request_duration_ms` - Latencia de requests
- `process_cpu_percent` - Uso de CPU
- `process_memory_bytes` - Uso de memoria
- `db_query_duration_ms` - Duración de queries
- `active_connections` - Conexiones activas

**Acceso**: http://localhost:8080/metrics

---

## 🔒 Seguridad

- **JWT**: Autenticación con tokens
- **bcrypt**: Hash de contraseñas (10 rounds)
- **CORS**: Configurado para origen específico
- **Validación**: Zod para validar inputs

---

## 📁 Estructura

```
server/
├── src/
│   ├── index.ts          # Punto de entrada
│   ├── db.ts             # Conexión SQLite
│   ├── db-adapter.ts     # Adaptador PostgreSQL/SQLite
│   ├── metrics.ts        # Métricas Prometheus
│   └── types/
├── db/
│   └── init.sql          # Schema PostgreSQL
├── data/                 # SQLite databases
├── uploads/              # Archivos subidos
└── package.json
```

---

## 🛠️ Solución de problemas en Windows (npm install falla)

Este proyecto usa `better-sqlite3` (módulo nativo). Si falla la instalación:

1. **Node.js**: Asegúrate de tener Node.js 18+ (recomendado 20.x LTS)
2. **Build Tools**: Instala Visual Studio Build Tools con C++ Desktop workload
3. **Python**: Instala Python 3.x y agrégalo al PATH
4. **Configuración NPM**:
   ```powershell
   npm config set msvs_version 2022
   ```
5. **Reintentar**: `npm install`

**Alternativa fácil**: Usa Docker/Compose, que compila dentro del contenedor.

---

## 📚 Tecnologías

- **Runtime**: Node.js 20
- **Lenguaje**: TypeScript
- **Framework**: Express
- **DB**: PostgreSQL (pg) / SQLite (better-sqlite3)
- **Auth**: JWT, bcrypt
- **Upload**: Multer
- **Validación**: Zod
- **Monitoreo**: prom-client
- **WebSockets**: Socket.io

---

Desarrollado para **Grupo Scout** 🏕️

