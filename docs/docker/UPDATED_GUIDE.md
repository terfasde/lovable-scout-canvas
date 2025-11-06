# 🐳 Guía Docker Actualizada (Sin Supabase)

## 📋 Estado Actual

El proyecto ha sido completamente migrado para funcionar **sin Supabase**. La configuración de Docker ha sido actualizada para reflejar esta nueva arquitectura.

## 🚀 Uso Rápido

### Opción 1: Docker Compose Simple

```bash
# Iniciar solo frontend
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f web

# Detener
docker compose down
```

**Acceso:**

- Frontend: http://localhost:5173
- Usuario: `admin@scout.com`
- Password: cualquiera

### Opción 2: Script PowerShell

```powershell
# Modo simple (RECOMENDADO)
.\scripts\start.ps1

# Detener servicios
.\scripts\start.ps1 stop

# Ayuda
.\scripts\start.ps1 help
```

## 📁 Archivos Docker

### ✅ `docker-compose.yml` (RECOMENDADO)

**Estado:** Actualizado y funcional  
**Descripción:** Levanta solo el frontend con mocks locales  
**Servicios:**

- `web` - Frontend Vite + React

**Características:**

- ✅ Sin dependencias de backend
- ✅ Sin Supabase
- ✅ Autenticación local (localStorage)
- ✅ Listo para usar

**Variables de entorno:**

```yaml
VITE_BACKEND=disabled
VITE_GALLERY_ADMIN_EMAILS=franciscolorenzo2406@gmail.com
CHOKIDAR_USEPOLLING=true
```

### ⚠️ `docker-compose.dev.yml` (LEGACY)

**Estado:** Desactualizado, requiere configuración  
**Descripción:** Modo desarrollo con backend opcional  
**Servicios:**

- `web` - Frontend
- `server` - Backend (comentado, requiere Python)

**Problemas conocidos:**

- Backend requiere Python para compilar `better-sqlite3`
- Dependencias del servidor no instaladas
- Necesita configuración manual

**Para habilitar:**

1. Instalar Python
2. `cd server && npm install`
3. Descomentar sección `server` en el archivo
4. Cambiar `VITE_BACKEND=disabled` a `VITE_BACKEND=local`

### ⚠️ `docker-compose.full.yml` (LEGACY)

**Estado:** Obsoleto, requiere reconfiguración completa  
**Descripción:** Arquitectura completa con PostgreSQL y monitoreo  
**Servicios:**

- `postgres` - PostgreSQL 16
- `pgadmin` - Administrador de BD
- `server` - Backend Express
- `web` - Frontend
- `prometheus` - Métricas
- `grafana` - Dashboards

**Problemas conocidos:**

- Configurado para arquitectura con Supabase (removido)
- Backend requiere dependencias no instaladas
- Variables de entorno desactualizadas
- Monitoreo configurado para endpoints que no existen

**No recomendado usar** sin actualización completa.

## 🔧 Scripts Actualizados

### `scripts/start.ps1`

```powershell
# Modo simple (nuevo, recomendado)
.\scripts\start.ps1 simple

# Modo dev (legacy, requiere configuración)
.\scripts\start.ps1 dev

# Modo full (legacy, requiere configuración completa)
.\scripts\start.ps1 full

# Detener todos los servicios
.\scripts\start.ps1 stop
```

**Cambios:**

- ✅ Nuevo modo `simple` (por defecto)
- ⚠️ Advertencias en modos legacy
- ✅ Validación de requisitos
- ✅ Mensajes informativos mejorados

## 🎯 Comparación de Modos

| Característica    | Simple           | Dev (Legacy)            | Full (Legacy)                       |
| ----------------- | ---------------- | ----------------------- | ----------------------------------- |
| **Estado**        | ✅ Actualizado   | ⚠️ Requiere config      | ⚠️ Obsoleto                         |
| **Frontend**      | ✅ Funcional     | ✅ Funcional            | ✅ Funcional                        |
| **Backend**       | ❌ No necesario  | ⚠️ Opcional             | ⚠️ Requiere config                  |
| **Base de datos** | ❌ Mocks locales | ⚠️ SQLite               | ⚠️ PostgreSQL                       |
| **Supabase**      | ❌ Removido      | ❌ Removido             | ❌ Removido                         |
| **Auth**          | ✅ localStorage  | ✅ localStorage         | ✅ localStorage                     |
| **Monitoreo**     | ❌ No            | ❌ No                   | ⚠️ Desconfigurado                   |
| **Dependencias**  | Node.js, Docker  | Node.js, Docker, Python | Node.js, Docker, Python, PostgreSQL |

## 📝 Recomendaciones

### Para Desarrollo

**Opción 1: Local (sin Docker)**

```bash
npm install
npm run dev
```

**Ventajas:**

- Más rápido (no necesita construir contenedores)
- Hot reload instantáneo
- Fácil debugging

**Opción 2: Docker Simple**

```bash
docker compose up -d
```

**Ventajas:**

- Entorno aislado
- Mismo ambiente que producción
- No contamina sistema local

### Para Producción

Ver [Deploy Guide](../deployment/DEPLOY.md) (si existe) o usar:

```bash
# Build optimizado
npm run build

# El resultado está en dist/
# Servir con Nginx, Apache, o cualquier servidor estático
```

## 🔄 Migración desde Arquitectura Anterior

Si tienes contenedores corriendo de la arquitectura anterior:

```bash
# Detener y limpiar todo
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.full.yml down -v
docker system prune -f

# Iniciar nueva arquitectura
docker compose up -d
```

## ❓ Solución de Problemas

### Error: "Cannot find module '@supabase/supabase-js'"

**Causa:** Dependencias no actualizadas  
**Solución:**

```bash
npm install
```

### Error: Backend no responde en modo dev

**Causa:** Servidor backend no configurado  
**Solución:** Usar modo simple en su lugar:

```bash
docker compose down
docker compose up -d
```

### Error: Python no encontrado

**Causa:** Backend intenta compilar better-sqlite3  
**Solución:** No usar modos legacy o instalar Python

### Puerto 5173 en uso

**Solución:**

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

## 📚 Referencias

- [Arquitectura Local](../LOCAL_ARCHITECTURE.md) - Detalles del sistema sin Supabase
- [README Principal](../../README.md) - Documentación general
- [Docker Official Docs](https://docs.docker.com/)

---

**Última actualización:** Migración completa a arquitectura sin Supabase
