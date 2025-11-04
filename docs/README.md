# 📚 Documentación - Lovable Scout Canvas

Índice completo de toda la documentación del proyecto.

---

## 🗂️ Estructura

```
docs/
├── docker/          # Documentación de Docker y contenedores
├── setup/           # Guías de configuración inicial
├── optimization/    # Optimización y rendimiento
├── features/        # Documentación de features específicas
└── guides/          # Guías generales y migraciones
```

---

## 🐳 Docker

Documentación relacionada con Docker, contenedores y orquestación.

| Documento | Descripción |
|-----------|-------------|
| **[QUICK_START.md](docker/QUICK_START.md)** | Guía rápida para iniciar con Docker |
| **[ARCHITECTURE.md](docker/ARCHITECTURE.md)** | Arquitectura completa: PostgreSQL, Prometheus, Grafana |
| **[DEV.md](docker/DEV.md)** | Configuración de desarrollo con Docker |
| **[OVERVIEW.md](docker/OVERVIEW.md)** | Visión general de Docker en el proyecto |
| **[CHANGELOG.md](docker/CHANGELOG.md)** | Historial de cambios de la arquitectura Docker |

**Inicio rápido**:
```powershell
.\scripts\start.ps1 full   # Arquitectura completa
.\scripts\start.ps1 dev    # Desarrollo simple
```

---

## ⚙️ Configuración Inicial (Setup)

Guías paso a paso para configurar servicios externos e integraciones.

| Documento | Descripción |
|-----------|-------------|
| **[GOOGLE_MAPS.md](setup/GOOGLE_MAPS.md)** | Configurar Google Maps API |
| **[GOOGLE_MAPS_BILLING_FIX.md](setup/GOOGLE_MAPS_BILLING_FIX.md)** | Solución alternativa sin facturación (Embed API) |
| **[EMAIL_VERIFICATION.md](setup/EMAIL_VERIFICATION.md)** | Configurar verificación de emails |
| **[AVATAR.md](setup/AVATAR.md)** | Sistema de avatares con recorte |
| **[SUPABASE_FIX.md](setup/SUPABASE_FIX.md)** | Soluciones rápidas de Supabase |

---

## 🚀 Optimización y Rendimiento

Documentación sobre mejoras de performance, optimizaciones aplicadas y buenas prácticas.

| Documento | Descripción |
|-----------|-------------|
| **[OPTIMIZATIONS.md](optimization/OPTIMIZATIONS.md)** | Todas las optimizaciones implementadas |
| **[PERFORMANCE_GUIDE.md](optimization/PERFORMANCE_GUIDE.md)** | Guía completa de rendimiento y mejores prácticas |

**Optimizaciones incluidas**:
- ✅ Code splitting y lazy loading
- ✅ React Query con caché optimizada
- ✅ Build optimizado con Vite
- ✅ SEO y meta tags
- ✅ Componentes optimizados (BackgroundFX, OptimizedImage)

---

## ✨ Features

Documentación de características específicas del proyecto.

| Documento | Descripción |
|-----------|-------------|
| **[PERFIL_FIXES.md](features/PERFIL_FIXES.md)** | Correcciones del perfil de usuario (fecha, username) |
| **[TESTING_AUTOMATION.md](features/TESTING_AUTOMATION.md)** | Automatización de pruebas |

---

## 📖 Guías Generales

Guías y tutoriales sobre migraciones, workflows y procedimientos.

| Documento | Descripción |
|-----------|-------------|
| **[MIGRAR_SIN_SUPABASE.md](guides/MIGRAR_SIN_SUPABASE.md)** | Guía completa de migración sin Supabase |
| **[INSTRUCCIONES_MIGRACIONES.md](guides/INSTRUCCIONES_MIGRACIONES.md)** | Instrucciones para migraciones de base de datos |

---

## 🔧 Documentación Adicional

### Backend
- **[server/README.md](../server/README.md)** - Documentación del backend API

### Scripts
Todos los scripts de utilidad están en [`scripts/`](../scripts/):
- `start.ps1` / `start.sh` - Inicio automático de Docker
- `add-docker-to-path.ps1` - Agregar Docker al PATH
- `run-docker-dev.cmd` - Script batch de Windows

---

## 🔍 Búsqueda Rápida

### Por Tema

**Docker y Contenedores**
→ [docker/](docker/)

**Configurar Google Maps**
→ [setup/GOOGLE_MAPS.md](setup/GOOGLE_MAPS.md) o [setup/GOOGLE_MAPS_BILLING_FIX.md](setup/GOOGLE_MAPS_BILLING_FIX.md)

**Mejorar Rendimiento**
→ [optimization/PERFORMANCE_GUIDE.md](optimization/PERFORMANCE_GUIDE.md)

**Migrar desde Supabase**
→ [guides/MIGRAR_SIN_SUPABASE.md](guides/MIGRAR_SIN_SUPABASE.md)

**Monitoreo (Prometheus/Grafana)**
→ [docker/ARCHITECTURE.md](docker/ARCHITECTURE.md)

**Bugs del Perfil**
→ [features/PERFIL_FIXES.md](features/PERFIL_FIXES.md)

---

## 📝 Contribuir a la Documentación

Para agregar o mejorar documentación:

1. **Ubicación correcta**:
   - Docker → `docs/docker/`
   - Configuración → `docs/setup/`
   - Optimización → `docs/optimization/`
   - Features → `docs/features/`
   - Guías → `docs/guides/`

2. **Formato**: Usa Markdown con emojis para mejor legibilidad

3. **Links**: Actualiza este índice al agregar nuevos documentos

4. **Ejemplos**: Incluye ejemplos de código cuando sea posible

---

## 🔗 Links Útiles

- **[README Principal](../README.md)** - Página principal del proyecto
- **[Backend README](../server/README.md)** - Documentación del servidor
- **[Lovable Project](https://lovable.dev/projects/2419ba1f-39c6-4ef7-a98a-608160a4d0b8)** - Proyecto en Lovable

---

**¿Necesitas ayuda?** Revisa primero esta documentación o abre un issue en el repositorio.
