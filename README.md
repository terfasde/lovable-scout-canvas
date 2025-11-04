# 🏕️ Lovable Scout Canvas

Aplicación web para gestión de grupos scout con perfil de usuarios, galería, eventos y más.

---

## 🚀 Inicio Rápido

### Opción 1: Docker (Recomendado)

```powershell
# Arquitectura completa (PostgreSQL + Monitoreo)
.\scripts\start.ps1 full

# Desarrollo simple (SQLite)
.\scripts\start.ps1 dev
```

Ver [Guía de Docker](docs/docker/QUICK_START.md) para más detalles.

### Opción 2: Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Accede a http://localhost:5173

---

## 📚 Documentación

### 🐳 Docker
- **[Inicio Rápido](docs/docker/QUICK_START.md)** - Guía rápida para usar Docker
- **[Arquitectura](docs/docker/ARCHITECTURE.md)** - Arquitectura completa con PostgreSQL y monitoreo
- **[Desarrollo](docs/docker/DEV.md)** - Configuración para desarrollo
- **[Changelog](docs/docker/CHANGELOG.md)** - Historial de cambios de Docker

### ⚙️ Configuración Inicial
- **[Google Maps](docs/setup/GOOGLE_MAPS.md)** - Configurar Google Maps API
- **[Google Maps Billing Fix](docs/setup/GOOGLE_MAPS_BILLING_FIX.md)** - Solución sin facturación
- **[Email Verification](docs/setup/EMAIL_VERIFICATION.md)** - Verificación de emails
- **[Avatar](docs/setup/AVATAR.md)** - Configuración de avatares
- **[Supabase Fix](docs/setup/SUPABASE_FIX.md)** - Soluciones de Supabase

### 🚀 Optimización
- **[Optimizaciones](docs/optimization/OPTIMIZATIONS.md)** - Mejoras de rendimiento aplicadas
- **[Guía de Performance](docs/optimization/PERFORMANCE_GUIDE.md)** - Buenas prácticas

### ✨ Features
- **[Perfil Fixes](docs/features/PERFIL_FIXES.md)** - Correcciones del perfil de usuario
- **[Testing Automation](docs/features/TESTING_AUTOMATION.md)** - Automatización de pruebas

### 📖 Guías
- **[Migrar sin Supabase](docs/guides/MIGRAR_SIN_SUPABASE.md)** - Guía de migración
- **[Instrucciones Migraciones](docs/guides/INSTRUCCIONES_MIGRACIONES.md)** - Migraciones de BD

---

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Estilos utility-first
- **shadcn/ui** - Componentes UI
- **React Query** - Gestión de estado y cache
- **React Router** - Enrutamiento

### Backend
- **Node.js 20** con TypeScript
- **Express** - API REST
- **PostgreSQL** o **SQLite** - Base de datos
- **JWT** - Autenticación
- **Multer** - Upload de archivos
- **Socket.io** - WebSockets

### DevOps
- **Docker** - Contenedores
- **Docker Compose** - Orquestación
- **Prometheus** - Métricas
- **Grafana** - Dashboards
- **PgAdmin** - Administración de BD

---

## 📁 Estructura del Proyecto

```
lovable-scout-canvas/
├── src/                    # Código fuente del frontend
│   ├── components/         # Componentes React
│   ├── pages/              # Páginas/Rutas
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilidades y helpers
│   └── integrations/       # Integraciones (Supabase, etc)
├── server/                 # Backend API
│   ├── src/                # Código TypeScript
│   ├── db/                 # Scripts de base de datos
│   ├── data/               # SQLite databases
│   └── uploads/            # Archivos subidos
├── docs/                   # Documentación
│   ├── docker/             # Docs de Docker
│   ├── setup/              # Guías de configuración
│   ├── optimization/       # Optimización
│   ├── features/           # Features específicas
│   └── guides/             # Guías generales
├── scripts/                # Scripts de utilidad
├── monitoring/             # Configuración de monitoreo
│   ├── prometheus.yml
│   └── grafana/
├── public/                 # Archivos estáticos
└── docker-compose.*.yml    # Configuraciones Docker
```

---

## 🌐 Servicios (Docker Full)

| Servicio | Puerto | Credenciales |
|----------|--------|--------------|
| **Frontend** | 5173 | - |
| **Backend API** | 8080 | - |
| **PostgreSQL** | 5432 | scoutuser / scout_secure_password_2024 |
| **PgAdmin** | 5050 | admin@scout.local / admin123 |
| **Prometheus** | 9090 | - |
| **Grafana** | 3000 | admin / admin123 |

---

## 🧪 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con HMR
npm run build            # Build de producción
npm run preview          # Preview del build

# Calidad de código
npm run type-check       # Verificar tipos TypeScript
npm run lint             # Linter

# Docker
.\scripts\start.ps1 full # Iniciar arquitectura completa
.\scripts\start.ps1 dev  # Iniciar modo desarrollo
.\scripts\start.ps1 stop # Detener servicios
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

---

## 🔗 Links Útiles

- **Lovable Project**: https://lovable.dev/projects/2419ba1f-39c6-4ef7-a98a-608160a4d0b8
- **Documentación Docker**: [docs/docker/](docs/docker/)
- **Backend README**: [server/README.md](server/README.md)

---

**Desarrollado con ❤️ para Grupo Scout**
