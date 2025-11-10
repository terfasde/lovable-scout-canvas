# 🏕️ Pagina oficial del Grupo Scout Septimo

Aplicación web para gestión de grupos scout con perfil de usuarios, galería, eventos y más.

> **⚠️ IMPORTANTE:** Este proyecto funciona **SIN Supabase**. Toda la autenticación y datos se manejan localmente con `localStorage` y mocks. Ver [Arquitectura Local](docs/LOCAL_ARCHITECTURE.md) para detalles.

---

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Accede a http://localhost:5173

> Nota: Se eliminaron los scripts y configuraciones Docker. El flujo estándar es usar `npm run dev` y desplegar con Vercel.

---

## 📚 Documentación

### 🏗️ Arquitectura

- **[Arquitectura Local](docs/LOCAL_ARCHITECTURE.md)** - Sistema actual sin dependencias externas pesadas
  
### (Legacy removido)

Secciones Docker y arquitecturas completas con PostgreSQL fueron removidas del flujo principal.

### ⚙️ Configuración Inicial

- **[Google Maps](docs/setup/GOOGLE_MAPS.md)** - Configurar Google Maps API
- **[Google Maps Billing Fix](docs/setup/GOOGLE_MAPS_BILLING_FIX.md)** - Solución sin facturación
- **[Email Verification](docs/setup/EMAIL_VERIFICATION.md)** - ⚠️ No disponible sin backend
- **[Avatar](docs/setup/AVATAR.md)** - Configuración de avatares (mockeado)
- **[Supabase Fix](docs/setup/SUPABASE_FIX.md)** - ⚠️ Obsoleto: Supabase removido

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
- **localStorage** - Persistencia de datos local

### Backend (OPCIONAL - No instalado)

- **Node.js 20** con TypeScript
- **Express** - API REST
- **PostgreSQL** o **SQLite** - Base de datos
- **JWT** - Autenticación
- **Multer** - Upload de archivos
- **Socket.io** - WebSockets

> ⚠️ **Nota:** El backend no está configurado actualmente. El proyecto funciona con mocks locales.

### ~~Supabase~~ (REMOVIDO)

- ~~Autenticación~~
- ~~Base de datos~~
- ~~Storage~~
- ~~Real-time~~

Reemplazado por sistema de autenticación local en `src/lib/auth-mock.ts`.

### DevOps

- **Vercel** - Hosting y deploy
- **ESLint / TypeScript** - Calidad de código
- **Scripts PowerShell** - Tareas de build/deploy

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
│   ├── setup/              # Guías de configuración
│   ├── optimization/       # Optimización
│   ├── features/           # Features específicas
│   └── guides/             # Guías generales
├── scripts/                # Scripts de utilidad
├── public/                 # Archivos estáticos
└── scripts/                # Scripts auxiliares
```

---

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

# Deploy
vercel --prod            # Desplegar a producción (requiere CLI y login)
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
- **Backend README**: [server/README.md](server/README.md)
  
> Documentación Docker legacy removida. Usa Git histórico si necesitas esos archivos.

---

**Desarrollado con ❤️ para Grupo Scout**
